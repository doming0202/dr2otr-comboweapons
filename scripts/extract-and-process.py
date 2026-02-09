#!/usr/bin/env python3
"""
トランスクリプトからデータを抽出して処理
"""

import re
import sys

def clean_item_name(text):
    """アイテム名から不要なプレフィックスとサフィックスを削除"""
    if not text:
        return ''
    
    text = text.strip()
    
    # "Dead rising" プレフィックスを削除
    text = re.sub(r'^Dead rising\s+', '', text, flags=re.IGNORECASE)
    
    # "(Dead Rising 2)" サフィックスを削除
    text = re.sub(r'\s*\(Dead Rising 2\)\s*', ' ', text, flags=re.IGNORECASE)
    
    # 最後の単語を取得（通常は実際のアイテム名）
    parts = text.split()
    if len(parts) > 1:
        return parts[-1]
    return text.strip()

def parse_line(line, current_drink=None):
    """1行を解析してレシピ情報を抽出"""
    if not line.strip() or 'Dead rising' not in line:
        return None
    
    parts = [p.strip() for p in line.split('\t') if p.strip()]
    if len(parts) < 3:
        return None
    
    # current_drinkが設定されている場合はそれを使用、そうでない場合は行から抽出
    if current_drink:
        drink = current_drink
    else:
        drink = clean_item_name(parts[0])
    
    ing1 = clean_item_name(parts[1])
    ing2_raw = parts[2]
    
    # "Mustard Mustard or Dead rising Ketchup Ketchup" のような形式を処理
    if 'or' in ing2_raw and ('Mustard' in ing2_raw or 'Ketchup' in ing2_raw):
        recipes = []
        if 'Mustard' in ing2_raw:
            mustard_part = ing2_raw.split('or')[0]
            ing2_mustard = clean_item_name(mustard_part)
            if drink and ing1 and ing2_mustard:
                recipes.append((drink, ing1, ing2_mustard))
        if 'Ketchup' in ing2_raw:
            ketchup_part = ing2_raw.split('or')[1] if 'or' in ing2_raw else ing2_raw
            ing2_ketchup = clean_item_name(ketchup_part)
            if drink and ing1 and ing2_ketchup:
                recipes.append((drink, ing1, ing2_ketchup))
        return recipes if recipes else None
    
    ing2 = clean_item_name(ing2_raw)
    
    if drink and ing1 and ing2:
        return [(drink, ing1, ing2)]
    
    return None

def main():
    transcript_path = r'C:\Users\domin\.cursor\projects\f-dr2otr-comboweapons/agent-transcripts/8bfa0e70-6ed9-44e6-a2ff-12854a144a2e.txt'
    
    # トランスクリプトからデータ部分を読み取る（行3から1869まで）
    with open(transcript_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # データ部分を抽出（行3からassistant:が始まるまで）
    data_lines = []
    for i, line in enumerate(lines[2:], start=3):  # 行3から開始
        if line.strip().startswith('assistant:'):
            break
        if line.strip():
            data_lines.append(line.rstrip('\n'))
    
    recipes = []
    current_drink = None
    
    for line in data_lines:
        original_line = line
        line = line.strip()
        if not line:
            continue
        
        # 飲み物名の行を検出（"Energizer", "Nectar", "Quick Step"など）
        # タブが含まれていない行で、大文字で始まり、数字や特殊文字が含まれていない行
        if (not '\t' in original_line and 
            re.match(r'^[A-Z][a-zA-Z\s]+$', line) and 
            line not in ['Creates', 'Ingredient one', 'Ingredient two'] and
            len(line.strip()) > 0):
            current_drink = line.strip()
            continue
        
        # レシピの行を解析（current_drinkを使用）
        if current_drink:
            result = parse_line(original_line, current_drink)
            if result:
                recipes.extend(result)
    
    # TypeScript形式で出力
    grouped = {}
    for drink, ing1, ing2 in recipes:
        if drink not in grouped:
            grouped[drink] = []
        grouped[drink].append((ing1, ing2))
    
    output = []
    output.append('export const DRINK_RECIPES: DrinkRecipe[] = [')
    
    for drink in sorted(grouped.keys()):
        output.append(f'  // === {drink} ===')
        for ing1, ing2 in grouped[drink]:
            output.append(f'  {{ name: "{drink}", ingredient1: "{ing1}", ingredient2: "{ing2}", games: ["DR2", "OTR"] }},')
    
    output.append('];')
    
    output_text = '\n'.join(output)
    print(output_text)
    
    # ファイルに保存
    with open('src/drinkRecipes.ts', 'w', encoding='utf-8') as f:
        f.write('''/**
 * Dead Rising 2 & Off the Record 飲み物レシピデータ
 * 参考: Dead Rising Wiki
 */

import type { Game } from "./comboWeapons";

export interface DrinkRecipe {
  name: string;
  ingredient1: string;
  ingredient2: string;
  games: Game[];
}

''')
        f.write(output_text)
        f.write('\n')
    
    print(f"\nProcessed {len(recipes)} recipes for {len(grouped)} drinks", file=sys.stderr)
    print(f"Drinks found: {', '.join(sorted(grouped.keys()))}", file=sys.stderr)
    print("Saved to src/drinkRecipes.ts", file=sys.stderr)

if __name__ == '__main__':
    main()
