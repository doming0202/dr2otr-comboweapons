/**
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

/** ゲーム内のドリンク色（名称 → 文字色）。ミックスジュース一覧に準拠 */
export const DRINK_COLORS: Record<string, string> = {
  Energizer: "#4caf50",       // 緑
  Nectar: "#fdd835",         // 黄
  "Quick Step": "#ffffff",   // 白
  Randomizer: "#78909c",     // 黒（暗い背景で見えるよう明るめグレー）
  Spitfire: "#2196f3",       // 青
  Untouchable: "#ff5722",    // 赤
  Zombait: "#e91e63",        // 桃
  "Pain Killer": "#00bcd4",  // 水色
  Repulse: "#9c27b0",        // 紫
};

/** ドリンク名に対応するゲーム内の文字色を返す。未定義なら null */
export function getDrinkColor(drinkName: string): string | null {
  return DRINK_COLORS[drinkName] ?? null;
}

/** ゲーム内のドリンク効果（名称 → 効果説明）。ミックスジュース一覧に準拠 */
export const DRINK_EFFECTS: Record<string, string> = {
  Energizer: "被ダメージを無効化",
  Nectar: "周囲に女王蜂が出現",
  "Quick Step": "移動速度が上昇",
  Randomizer: "嘔吐状態になる 稀に他のミックスジュースの効果",
  Spitfire: "素手状態でAIM時攻撃で炎を吐く",
  Untouchable: "ゾンビに組み付かれなくなる（攻撃はしてくる）",
  Zombait: "ゾンビが自キャラを狙ってくる",
  "Pain Killer": "被ダメージが半減",
  Repulse: "ゾンビに見つからなくなる",
};

/** ドリンク名に対応する効果説明を返す。未定義なら null */
export function getDrinkEffect(drinkName: string): string | null {
  return DRINK_EFFECTS[drinkName] ?? null;
}

// データを解析して追加
export const DRINK_RECIPES: DrinkRecipe[] = [
  // === Energizer ===
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Apple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Drink Cocktail", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Pain Killer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Whiskey", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Bacon", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Baked Potato", ingredient2: "Baked Potato", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Baked Potato", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Baked Potato", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Baked Potato", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Chicken", ingredient2: "BBQ Chicken", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Chicken", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Chicken", ingredient2: "Mayonnaise", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Chicken", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Ribs", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Ribs", ingredient2: "Mayonnaise", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "BBQ Ribs", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Beans", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Beans", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Beer", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Beer", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Beer", ingredient2: "Pizza", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Beer", ingredient2: "Steak", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Brownie", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Brownie", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Burrito", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Cake", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Chili", ingredient2: "Chili", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Chili", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Chili", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Coffee Creamer", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Coffee", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Coffee", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Cookies", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Cookies", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Donut", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Donut", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Drink Cocktail", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Energizer", ingredient2: "Quick Step", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Fish", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Fish", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Fish", ingredient2: "Randomizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Fish", ingredient2: "Untouchable", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Fries", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Fries", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hamburger", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hamburger", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hamburger", ingredient2: "Pizza", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hamburger", ingredient2: "Steak", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hamburger", ingredient2: "Sushi", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hamburger", ingredient2: "Taco", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hot Dog", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Hot Dog", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Ice Cream", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Ice Cream", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Jellybeans", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Jellybeans", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Large Soda", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Large Soda", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Pasta", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Pizza", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Steak", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Sushi", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Taco", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Lobster", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Mayonnaise", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Melon", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Melon", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Melon", ingredient2: "Sushi", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Milk", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Nectar", ingredient2: "Spitfire", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Nectar", ingredient2: "Pain Killer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Onion Rings", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Onion Rings", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Orange Juice", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Orange Juice", ingredient2: "Repulse", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Orange Juice", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Pizza", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Steak", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Sushi", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Taco", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pasta", ingredient2: "Whiskey", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pie", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pie", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pineapple", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pineapple", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pineapple", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Pizza", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Randomizer", ingredient2: "Zombait", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Snack", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Steak", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Sushi", ingredient2: "Randomizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Sushi", ingredient2: "Untouchable", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Taco", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Vodka", ingredient2: "Energizer", games: ["DR2", "OTR"] },
  { name: "Energizer", ingredient1: "Whiskey", ingredient2: "Energizer", games: ["DR2", "OTR"] },

  // === Nectar ===
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Apple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Baked Potato", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Beer", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Mustard", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Ketchup", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Cookies", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Donut", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Fish", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Ice Cream", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Milk", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Quick Step", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Snack", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Spitfire", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Sushi", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Untouchable", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Bacon", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Bacon", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Bacon", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Bacon", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Bacon", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Baked Potato", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Baked Potato", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Baked Potato", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Baked Potato", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Baked Potato", ingredient2: "Snack", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "BBQ Chicken", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "BBQ Chicken", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "BBQ Chicken", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "BBQ Ribs", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "BBQ Ribs", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "BBQ Ribs", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beans", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beans", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beans", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beans", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beer", ingredient2: "Jellybeans", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beer", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beer", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beer", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beer", ingredient2: "Pie", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Beer", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Brownie", ingredient2: "Drink Cocktail", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Brownie", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Brownie", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Brownie", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Brownie", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Brownie", ingredient2: "Whiskey", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Burrito", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cake", ingredient2: "Drink Cocktail", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cake", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cake", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cake", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cake", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cake", ingredient2: "Whiskey", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Chili", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Coffee Creamer", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Coffee", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Coffee", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Mustard", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Ketchup", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Mustard", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Ketchup", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Mustard", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Ketchup", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cookies", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cookies", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cookies", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cookies", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Cookies", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Donut", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Donut", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Donut", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Donut", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Cookies", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Fries", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Drink Cocktail", ingredient2: "Snack", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Energizer", ingredient2: "Randomizer", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Energizer", ingredient2: "Zombait", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fish", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fish", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fish", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fries", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fries", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fries", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Fries", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hamburger", ingredient2: "Large Soda", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hamburger", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hamburger", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hamburger", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hot Dog", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hot Dog", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Hot Dog", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Ice Cream", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Ice Cream", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Jellybeans", ingredient2: "Drink Cocktail", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Jellybeans", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Jellybeans", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Jellybeans", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Jellybeans", ingredient2: "Pie", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Large Soda", ingredient2: "Lobster", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Large Soda", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Large Soda", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Lobster", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Lobster", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Lobster", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Milk", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Pasta", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Pie", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Pizza", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Snack", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Steak", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Melon", ingredient2: "Taco", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Milk", ingredient2: "Vodka", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Nectar", ingredient2: "Zombait", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Onion Rings", ingredient2: "Melon", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Onion Rings", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Onion Rings", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Milk", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Orange Juice", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Pineapple", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Quick Step", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Snack", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Spitfire", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Untouchable", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Orange Juice", ingredient2: "Whiskey", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pasta", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pasta", ingredient2: "Pasta", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pineapple", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pineapple", ingredient2: "Pizza", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pineapple", ingredient2: "Snack", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pineapple", ingredient2: "Sushi", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pineapple", ingredient2: "Whiskey", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Pizza", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Snack", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Taco", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Taco", ingredient2: "Taco", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Vodka", ingredient2: "Nectar", games: ["DR2", "OTR"] },
  { name: "Nectar", ingredient1: "Whiskey", ingredient2: "Nectar", games: ["DR2", "OTR"] },
];

/** 材料Aに一致するレシピを取得。返却: 候補ドリンク名と材料Bの配列 */
export function getRecipesByIngredient(ingredientA: string): Array<{ name: string; ingredientB: string }> {
  const normalized = ingredientA.trim();
  if (!normalized) return [];
  const out: Array<{ name: string; ingredientB: string }> = [];
  const seen = new Set<string>();
  for (const r of DRINK_RECIPES) {
    const other =
      r.ingredient1 === normalized ? r.ingredient2 : r.ingredient2 === normalized ? r.ingredient1 : null;
    if (other == null) continue;
    const key = `${r.name}\t${other}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name: r.name, ingredientB: other });
  }
  return out;
}

/** ドリンクレシピに登場する材料名の一覧（重複なし・ソート済み） */
export function getAllDrinkIngredients(): string[] {
  const set = new Set<string>();
  for (const r of DRINK_RECIPES) {
    set.add(r.ingredient1);
    set.add(r.ingredient2);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "en"));
}
