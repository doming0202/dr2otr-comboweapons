#!/usr/bin/env python3
"""
飲み物レシピデータを解析して、TypeScript形式に変換するスクリプト
"""

import re
import sys

def clean_item_name(text):
    """アイテム名から不要なプレフィックスとサフィックスを削除"""
    # "Dead rising X (Dead Rising 2) Y" の形式から "Y" を抽出
    # または "Dead rising X" の形式から "X" を抽出
    text = text.strip()
    
    # "Dead rising" プレフィックスを削除
    text = re.sub(r'^Dead rising\s+', '', text)
    
    # "(Dead Rising 2)" サフィックスを削除
    text = re.sub(r'\s*\(Dead Rising 2\)\s*', ' ', text)
    
    # 最後の単語を取得（通常は実際のアイテム名）
    parts = text.split()
    if len(parts) > 1:
        # "Energizer (Dead Rising 2) Energizer" のような形式の場合
        # 最後の単語を取得
        return parts[-1]
    return text.strip()

def parse_line(line):
    """1行を解析してレシピ情報を抽出"""
    if not line.strip() or 'Dead rising' not in line:
        return None
    
    parts = [p.strip() for p in line.split('\t') if p.strip()]
    if len(parts) < 3:
        return None
    
    drink = clean_item_name(parts[0])
    ing1 = clean_item_name(parts[1])
    ing2_raw = parts[2]
    
    # "Mustard Mustard or Dead rising Ketchup Ketchup" のような形式を処理
    if 'or' in ing2_raw and ('Mustard' in ing2_raw or 'Ketchup' in ing2_raw):
        recipes = []
        if 'Mustard' in ing2_raw:
            ing2_mustard = clean_item_name(ing2_raw.split('or')[0])
            recipes.append((drink, ing1, ing2_mustard))
        if 'Ketchup' in ing2_raw:
            ing2_ketchup = clean_item_name(ing2_raw.split('or')[1] if 'or' in ing2_raw else ing2_raw)
            recipes.append((drink, ing1, ing2_ketchup))
        return recipes
    
    ing2 = clean_item_name(ing2_raw)
    
    if drink and ing1 and ing2:
        return [(drink, ing1, ing2)]
    
    return None

def main():
    # 標準入力からデータを読み込む
    data = sys.stdin.read()
    lines = data.split('\n')
    
    recipes = []
    current_drink = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # 飲み物名の行を検出（"Energizer", "Nectar"など）
        if re.match(r'^[A-Z][a-zA-Z\s]+$', line) and line not in ['Creates', 'Ingredient one', 'Ingredient two']:
            current_drink = line.strip()
            continue
        
        # レシピの行を解析
        result = parse_line(line)
        if result:
            recipes.extend(result)
    
    # TypeScript形式で出力
    grouped = {}
    for drink, ing1, ing2 in recipes:
        if drink not in grouped:
            grouped[drink] = []
        grouped[drink].append((ing1, ing2))
    
    print('export const DRINK_RECIPES: DrinkRecipe[] = [')
    
    for drink in sorted(grouped.keys()):
        print(f'  // === {drink} ===')
        for ing1, ing2 in grouped[drink]:
            print(f'  {{ name: "{drink}", ingredient1: "{ing1}", ingredient2: "{ing2}", games: ["DR2", "OTR"] }},')
    
    print('];')

if __name__ == '__main__':
    main()
