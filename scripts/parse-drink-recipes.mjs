/**
 * 飲み物レシピデータを解析して、適切な形式に変換するスクリプト
 */

// ユーザーが提供したデータをここに貼り付け
const rawData = `Creates	Ingredient one	Ingredient two

Energizer
	
Dead rising Energizer (Dead Rising 2) Energizer	Dead rising Apple (Dead Rising 2) Apple	Dead rising BBQ Chicken BBQ Chicken
...`;

function parseDrinkRecipes(data) {
  const lines = data.split('\n').filter(l => l.trim());
  const recipes = [];
  let currentDrink = null;

  for (const line of lines) {
    // 飲み物名の行を検出（"Energizer", "Nectar"など）
    if (line.match(/^\s*[A-Z][a-zA-Z\s]+$/)) {
      const drinkName = line.trim();
      if (drinkName && drinkName !== 'Creates' && !drinkName.includes('Ingredient')) {
        currentDrink = drinkName;
        continue;
      }
    }

    // レシピの行を検出
    if (line.includes('Dead rising')) {
      const parts = line.split('\t').filter(p => p.trim());
      if (parts.length >= 3) {
        // 結果アイテム名を抽出
        const drinkPart = parts[0].trim();
        const drinkMatch = drinkPart.match(/Dead rising\s+([^(]+)\s*\([^)]+\)\s*(.+)/);
        const drink = drinkMatch ? drinkMatch[2].trim() : drinkPart.replace(/Dead rising\s+/g, '').replace(/\s*\([^)]+\)/g, '').trim();

        // 材料1を抽出
        const ing1Part = parts[1].trim();
        const ing1Match = ing1Part.match(/Dead rising\s+([^(]+)\s*\([^)]+\)\s*(.+)/);
        const ing1 = ing1Match ? ing1Match[2].trim() : ing1Part.replace(/Dead rising\s+/g, '').replace(/\s*\([^)]+\)/g, '').trim();

        // 材料2を抽出
        const ing2Part = parts[2].trim();
        const ing2Match = ing2Part.match(/Dead rising\s+([^(]+)\s*\([^)]+\)\s*(.+)/);
        let ing2 = ing2Match ? ing2Match[2].trim() : ing2Part.replace(/Dead rising\s+/g, '').replace(/\s*\([^)]+\)/g, '').trim();
        
        // "Mustard or Ketchup" の処理
        if (ing2.includes('Mustard') || ing2.includes('Ketchup')) {
          if (ing2.includes('or')) {
            // "Mustard Mustard or Dead rising Ketchup Ketchup" のような形式
            const mustardMatch = ing2.match(/Mustard\s+Mustard/);
            const ketchupMatch = ing2.match(/Ketchup\s+Ketchup/);
            if (mustardMatch) {
              recipes.push({ drink, ing1, ing2: 'Mustard' });
            }
            if (ketchupMatch) {
              recipes.push({ drink, ing1, ing2: 'Ketchup' });
            }
            continue;
          }
        }

        if (drink && ing1 && ing2) {
          recipes.push({ drink, ing1, ing2 });
        }
      }
    }
  }

  return recipes;
}

// データをグループ化してTypeScript形式で出力
function formatAsTypeScript(recipes) {
  const grouped = {};
  for (const recipe of recipes) {
    if (!grouped[recipe.drink]) {
      grouped[recipe.drink] = [];
    }
    grouped[recipe.drink].push(recipe);
  }

  let output = 'export const DRINK_RECIPES: DrinkRecipe[] = [\n';
  
  for (const [drink, recipeList] of Object.entries(grouped)) {
    output += `  // === ${drink} ===\n`;
    for (const recipe of recipeList) {
      output += `  { name: "${recipe.drink}", ingredient1: "${recipe.ing1}", ingredient2: "${recipe.ing2}", games: ["DR2", "OTR"] },\n`;
    }
  }
  
  output += '];\n';
  return output;
}

// テスト用の小さなデータセット
const testData = `Creates	Ingredient one	Ingredient two

Energizer
	
Dead rising Energizer (Dead Rising 2) Energizer	Dead rising Apple (Dead Rising 2) Apple	Dead rising BBQ Chicken BBQ Chicken
Dead rising Energizer (Dead Rising 2) Energizer	Dead rising Apple (Dead Rising 2) Apple	Dead rising Drink Cocktail Drink Cocktail`;

console.log('Test parsing:');
const testRecipes = parseDrinkRecipes(testData);
console.log(JSON.stringify(testRecipes, null, 2));
