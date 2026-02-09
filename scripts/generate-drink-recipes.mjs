/**
 * ユーザーが提供した飲み物レシピデータを解析して、TypeScript形式に変換するスクリプト
 * 
 * 使用方法:
 * 1. ユーザーが提供したデータをクリップボードからコピー
 * 2. このスクリプトを実行: node scripts/generate-drink-recipes.mjs < input.txt
 * または、データをファイルに保存して: node scripts/generate-drink-recipes.mjs input.txt
 */

import { readFileSync } from 'fs';

function cleanItemName(text) {
  if (!text) return '';
  
  text = text.trim();
  
  // "Dead rising" プレフィックスを削除
  text = text.replace(/^Dead rising\s+/i, '');
  
  // "(Dead Rising 2)" サフィックスを削除
  text = text.replace(/\s*\(Dead Rising 2\)\s*/gi, ' ');
  
  // 最後の単語を取得（通常は実際のアイテム名）
  const parts = text.split(/\s+/).filter(p => p);
  if (parts.length > 1) {
    // "Energizer (Dead Rising 2) Energizer" のような形式の場合
    // 最後の単語を取得
    return parts[parts.length - 1];
  }
  return text.trim();
}

function parseLine(line) {
  if (!line.trim() || !line.includes('Dead rising')) {
    return null;
  }
  
  const parts = line.split('\t').map(p => p.trim()).filter(p => p);
  if (parts.length < 3) {
    return null;
  }
  
  const drink = cleanItemName(parts[0]);
  const ing1 = cleanItemName(parts[1]);
  const ing2Raw = parts[2];
  
  // "Mustard Mustard or Dead rising Ketchup Ketchup" のような形式を処理
  if (ing2Raw.includes('or') && (ing2Raw.includes('Mustard') || ing2Raw.includes('Ketchup'))) {
    const recipes = [];
    if (ing2Raw.includes('Mustard')) {
      const mustardPart = ing2Raw.split('or')[0];
      const ing2Mustard = cleanItemName(mustardPart);
      if (drink && ing1 && ing2Mustard) {
        recipes.push({ drink, ing1, ing2: ing2Mustard });
      }
    }
    if (ing2Raw.includes('Ketchup')) {
      const ketchupPart = ing2Raw.split('or')[1] || ing2Raw;
      const ing2Ketchup = cleanItemName(ketchupPart);
      if (drink && ing1 && ing2Ketchup) {
        recipes.push({ drink, ing1, ing2: ing2Ketchup });
      }
    }
    return recipes.length > 0 ? recipes : null;
  }
  
  const ing2 = cleanItemName(ing2Raw);
  
  if (drink && ing1 && ing2) {
    return [{ drink, ing1, ing2 }];
  }
  
  return null;
}

// データを読み込む
const inputFile = process.argv[2];
const rawData = inputFile 
  ? readFileSync(inputFile, 'utf-8')
  : readFileSync(0, 'utf-8');

const lines = rawData.split('\n');
const recipes = [];
let currentDrink = null;

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  
  // 飲み物名の行を検出（"Energizer", "Nectar"など）
  if (/^[A-Z][a-zA-Z\s]+$/.test(trimmed) && 
      trimmed !== 'Creates' && 
      !trimmed.includes('Ingredient')) {
    currentDrink = trimmed;
    continue;
  }
  
  // レシピの行を解析
  const result = parseLine(line);
  if (result) {
    recipes.push(...result);
  }
}

// グループ化
const grouped = {};
for (const recipe of recipes) {
  if (!grouped[recipe.drink]) {
    grouped[recipe.drink] = [];
  }
  grouped[recipe.drink].push(recipe);
}

// TypeScript形式で出力
let output = `/**
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

export const DRINK_RECIPES: DrinkRecipe[] = [
`;

for (const drink of Object.keys(grouped).sort()) {
  output += `  // === ${drink} ===\n`;
  for (const recipe of grouped[drink]) {
    output += `  { name: "${recipe.drink}", ingredient1: "${recipe.ing1}", ingredient2: "${recipe.ing2}", games: ["DR2", "OTR"] },\n`;
  }
}

output += `];
`;

console.log(output);
