/**
 * エリア別コンボ武器
 * itemLocations.ts を参照し、各エリアで作成できるコンボ武器を算出
 */

import { COMBO_WEAPONS, type ComboWeapon, type Game } from "./comboWeapons";
import { getItemLocations } from "./itemLocations";

/** 主要エリア一覧（表示名） */
export const MAIN_AREAS = [
  "Fortune City",
  "Royal Flush Plaza",
  "Maintenance Room",
  "Palisades Mall",
  "Fortune City Emergency Shelter",
  "Hot Excitorama",
  "Fortune City Bank",
  "Yucatan Casino",
] as const;

export type MainArea = (typeof MAIN_AREAS)[number];

/** エリア名の別名・部分一致用キーワード（表示名 -> マッチするキーワード） */
const AREA_KEYWORDS: Record<MainArea, string[]> = {
  "Fortune City": ["Fortune City", "Fortune Park", "Fortune City Arena", "Fortune City Hotel"],
  "Royal Flush Plaza": ["Royal Flush Plaza", "Royal Flush"],
  "Maintenance Room": ["Maintenance Room", "Maintenance Hall", "Maintenance halls"],
  "Palisades Mall": ["Palisades Mall", "Palisades"],
  "Fortune City Emergency Shelter": [
    "Safe House",
    "Emergency Shelter",
    "Fortune City Emergency Shelter",
  ],
  "Hot Excitorama": ["Hot Excitorama", "Excitorama"],
  "Fortune City Bank": ["Bank", "Vault", "Fortune City Bank", "Security Offices"],
  "Yucatan Casino": ["Yucatan Casino", "Yucatan"],
};

/** アイテムが指定エリアで取得可能か */
export function isItemInArea(itemName: string, area: MainArea): boolean {
  const locations = getItemLocations(itemName);
  const keywords = AREA_KEYWORDS[area];
  for (const loc of locations) {
    const locLower = loc.toLowerCase();
    for (const kw of keywords) {
      if (locLower.includes(kw.toLowerCase())) return true;
    }
  }
  return false;
}

/** 指定エリアで作成できるコンボ武器一覧（両材料がそのエリアで取得可能なもの） */
export function getComboWeaponsByArea(
  area: MainArea,
  gameFilter?: Game
): ComboWeapon[] {
  return COMBO_WEAPONS.filter((weapon) => {
    const ing1 = weapon.ingredient1.split(" or ")[0].trim();
    const ing2 = weapon.ingredient2.split(" or ")[0].trim();
    const bothInArea = isItemInArea(ing1, area) && isItemInArea(ing2, area);
    const matchesGame = !gameFilter || weapon.games.includes(gameFilter);
    return bothInArea && matchesGame;
  });
}

/** 全エリア × コンボ武器のマップ（表示用） */
export function getComboWeaponsByAllAreas(
  gameFilter?: Game
): Record<MainArea, ComboWeapon[]> {
  const result = {} as Record<MainArea, ComboWeapon[]>;
  for (const area of MAIN_AREAS) {
    result[area] = getComboWeaponsByArea(area, gameFilter);
  }
  return result;
}
