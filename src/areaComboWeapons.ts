/**
 * エリア別コンボ武器
 * itemLocations.ts を参照し、各エリアで作成できるコンボ武器を算出
 */

import { COMBO_WEAPONS, type ComboWeapon, type Game } from "./comboWeapons";
import { getItemLocations } from "./itemLocations";

/** 主要エリア一覧（表示名） */
export const MAIN_AREAS = [
  "AMERICANA CASINO",
  "ATLANTIC CASINO",
  "FOOD COURT",
  "FORTUNE CITY ARENA",
  "FORTUNE CITY HOTEL",
  "FORTUNE PARK",
  "PALISADES MALL",
  "PLATINUM STRIP",
  "Royal Flush Plaza",
  "SILVER STRIP",
  "SLOT RANCH CASINO",
  "SOUTH PLAZA",
  "UNDERGROUND",
  "YUCATAN CASINO",
] as const;

export type MainArea = (typeof MAIN_AREAS)[number];

/** エリア名の別名・部分一致用キーワード（表示名 -> マッチするキーワード） */
const AREA_KEYWORDS: Record<MainArea, string[]> = {
  "AMERICANA CASINO": ["Americana Casino", "Americana"],
  "ATLANTIC CASINO": ["Atlantic Casino", "Atlantica Casino", "Atlantica"],
  "FOOD COURT": ["Food Court"],
  "FORTUNE CITY ARENA": ["Fortune City Arena", "Fortune City Arena security"],
  "FORTUNE CITY HOTEL": ["Fortune City Hotel"],
  "FORTUNE PARK": ["Fortune Park"],
  "PALISADES MALL": ["Palisades Mall", "Palisades"],
  "PLATINUM STRIP": ["Platinum Strip", "Platinum Strip main"],
  "Royal Flush Plaza": ["Royal Flush Plaza", "Royal Flush"],
  "SILVER STRIP": ["Silver Strip"],
  "SLOT RANCH CASINO": ["Slot Ranch Casino", "Slot Ranch"],
  "SOUTH PLAZA": ["South Plaza"],
  "UNDERGROUND": ["Underground"],
  "YUCATAN CASINO": ["Yucatan Casino", "Yucatan"],
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
