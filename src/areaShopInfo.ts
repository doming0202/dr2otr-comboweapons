/**
 * 建物・エリアコード・店舗情報
 * ポップアップ表示用の補足情報として使用
 */

export type AreaShopInfo = {
  building: string;
  shopName: string;
  shopType: string;
};

/** エリアコード → 店舗情報のマップ */
export const AREA_SHOP_MAP: Record<string, AreaShopInfo> = {
  A101: { building: "AMERICANA CASINO", shopName: "Bennie Jack's BBQ Shack", shopType: "レストラン" },
  A102: { building: "AMERICANA CASINO", shopName: "Shots & Awe", shopType: "バー" },
  A103: { building: "AMERICANA CASINO", shopName: "The American Historium", shopType: "土産物屋" },
  T101: { building: "ATLANTIC CASINO", shopName: "Sipparellos", shopType: "バー" },
  F101: { building: "FOOD COURT", shopName: "Wild West Grill House", shopType: "レストラン" },
  F102: { building: "FOOD COURT", shopName: "Cucina Donnacci", shopType: "レストラン" },
  F103: { building: "FOOD COURT", shopName: "Cheesecake Mania", shopType: "レストラン" },
  F104: { building: "FOOD COURT", shopName: "Lombardi's", shopType: "レストラン" },
  F105: { building: "FOOD COURT", shopName: "Hamburger Fiefdom", shopType: "レストラン" },
  F106: { building: "FOOD COURT", shopName: "Rojo Diablo Mexican Restaurant", shopType: "レストラン" },
  F107: { building: "FOOD COURT", shopName: "Hungry Joe's Pizzeria", shopType: "レストラン" },
  F108: { building: "FOOD COURT", shopName: "Speedy Expresso", shopType: "レストラン" },
  E101: { building: "FORTUNE CITY ARENA", shopName: "Terror Togs", shopType: "グッズ売り場" },
  E102: { building: "FORTUNE CITY ARENA", shopName: "Hostile Zone", shopType: "グッズ売り場" },
  P101: { building: "PALISADES MALL", shopName: "Finders Peepers", shopType: "眼鏡屋" },
  P102: { building: "PALISADES MALL", shopName: "FairMoans", shopType: "化粧品" },
  P103: { building: "PALISADES MALL", shopName: "Ultimate Playhouse", shopType: "玩具" },
  P104: { building: "PALISADES MALL", shopName: "Flexin'", shopType: "スポーツジム" },
  P105: { building: "PALISADES MALL", shopName: "Beach Body Swim House", shopType: "サーフショップ" },
  P106: { building: "PALISADES MALL", shopName: "Wallington's", shopType: "紳士服" },
  P107: { building: "PALISADES MALL", shopName: "Shank's", shopType: "刃物店" },
  P108: { building: "PALISADES MALL", shopName: "Bagged!", shopType: "バッグ類" },
  P109: { building: "PALISADES MALL", shopName: "The Venus Touch", shopType: "化粧品&日焼けサロン" },
  P110: { building: "PALISADES MALL", shopName: "KokoNutz Sports Town(1F)", shopType: "スポーツ用品" },
  P111: { building: "PALISADES MALL", shopName: "Chocolate Confession", shopType: "菓子" },
  P112: { building: "PALISADES MALL", shopName: "For Your Leisure", shopType: "カジュアル服" },
  P113: { building: "PALISADES MALL", shopName: "Trendy Cindy", shopType: "婦人服" },
  P114: { building: "PALISADES MALL", shopName: "Entertainment Isle", shopType: "CD屋" },
  P201: { building: "PALISADES MALL", shopName: "Kicks of Her", shopType: "婦人靴" },
  P202: { building: "PALISADES MALL", shopName: "Que's Hats", shopType: "帽子" },
  P203: { building: "PALISADES MALL", shopName: "Brand New U", shopType: "婦人服" },
  P204: { building: "PALISADES MALL", shopName: "Ned's Knicknackery", shopType: "骨董品店" },
  P205: { building: "PALISADES MALL", shopName: "Space", shopType: "洋服" },
  P206: { building: "PALISADES MALL", shopName: "Stan's Large Print Books and Magazines", shopType: "書店" },
  P207: { building: "PALISADES MALL", shopName: "Under the Sea Travels", shopType: "旅行用品" },
  P208: { building: "PALISADES MALL", shopName: "Army Surplus Gift Store", shopType: "LOOTERの質屋" },
  P209: { building: "PALISADES MALL", shopName: "Kids' Choice Clothing", shopType: "子供服" },
  P210: { building: "PALISADES MALL", shopName: "The Cleroux Collection", shopType: "ギャラリー" },
  P211: { building: "PALISADES MALL", shopName: "Leigh's Fine Liquor", shopType: "酒屋" },
  P212: { building: "PALISADES MALL", shopName: "Sever Ties", shopType: "弁護士事務所" },
  P213: { building: "PALISADES MALL", shopName: "Robsaka Digital", shopType: "CD" },
  P214: { building: "PALISADES MALL", shopName: "KokoNutz Sports Town(2F)", shopType: "スポーツ用品" },
  P215: { building: "PALISADES MALL", shopName: "Everything Diamond", shopType: "宝石類" },
  P216: { building: "PALISADES MALL", shopName: "Chris' Fine Foods", shopType: "食料品" },
  P217: { building: "PALISADES MALL", shopName: "Robsaka Mobile", shopType: "携帯電話" },
  P218: { building: "PALISADES MALL", shopName: "High-Noon Shooting Range", shopType: "銃砲店" },
  S101: { building: "PLATINUM STRIP", shopName: "TIR Souvenir Kiosk", shopType: "グッズ売り場" },
  S102: { building: "PLATINUM STRIP", shopName: "Cash Gordon's Casino", shopType: "カジノ" },
  S103: { building: "PLATINUM STRIP", shopName: "Juggz Bar & Grill", shopType: "アルコール" },
  S104: { building: "PLATINUM STRIP", shopName: "Paradise Platinum Screens", shopType: "映画館" },
  S105: { building: "PLATINUM STRIP", shopName: "Moe's Maginations", shopType: "LOOTERSの店" },
  S106: { building: "PLATINUM STRIP", shopName: "Dining at Davey's", shopType: "レストラン" },
  S107: { building: "PLATINUM STRIP", shopName: "From Fortune With Love", shopType: "土産物売り場" },
  S108: { building: "PLATINUM STRIP", shopName: "TIR Souvenir Kiosk", shopType: "グッズ売り場" },
  R101: { building: "Royal Flush Plaza", shopName: "Casual Gals", shopType: "婦人服" },
  R102: { building: "Royal Flush Plaza", shopName: "In the Closet", shopType: "ヒップホップグッズ" },
  R103: { building: "Royal Flush Plaza", shopName: "The Man's Sport", shopType: "スポーツ用品店" },
  R104: { building: "Royal Flush Plaza", shopName: "The Shoehorn", shopType: "靴屋" },
  R105: { building: "Royal Flush Plaza", shopName: "Tunemakers", shopType: "楽器店" },
  R106: { building: "Royal Flush Plaza", shopName: "Wave of Style", shopType: "美容室" },
  R107: { building: "Royal Flush Plaza", shopName: "Ye Olde Toybox", shopType: "玩具店" },
  R108: { building: "Royal Flush Plaza", shopName: "Marriage Makers", shopType: "宝飾店" },
  R109: { building: "Royal Flush Plaza", shopName: "Roy's Mart", shopType: "ドラッグストア" },
  R110: { building: "Royal Flush Plaza", shopName: "Modern Businessman", shopType: "紳士服" },
  R111: { building: "Royal Flush Plaza", shopName: "Stylin' Toddlers", shopType: "子供服" },
  R112: { building: "Royal Flush Plaza", shopName: "SporTrance(1F)", shopType: "スポーツ用品店" },
  R113: { building: "Royal Flush Plaza", shopName: "The Chieftain's Hut", shopType: "ネイティブアメリカングッズ" },
  R114: { building: "Royal Flush Plaza", shopName: "Yesterday, Today & Tomorrow", shopType: "書店" },
  R115: { building: "Royal Flush Plaza", shopName: "Hat Racks", shopType: "帽子屋" },
  R116: { building: "Royal Flush Plaza", shopName: "Universe of Optics", shopType: "眼鏡屋" },
  R117: { building: "Royal Flush Plaza", shopName: "Three Club Monte", shopType: "紳士服" },
  R118: { building: "Royal Flush Plaza", shopName: "Astonishing Illusions", shopType: "グッズ売り場" },
  R119: { building: "Royal Flush Plaza", shopName: "Sturdy Package", shopType: "旅行用品" },
  R120: { building: "Royal Flush Plaza", shopName: "The Dark Bean", shopType: "カフェ" },
  R201: { building: "Royal Flush Plaza", shopName: "Albert's Apparel", shopType: "紳士服" },
  R202: { building: "Royal Flush Plaza", shopName: "Wily Travels", shopType: "旅行代理店" },
  R203: { building: "Royal Flush Plaza", shopName: "Antoine's", shopType: "調理用品" },
  R204: { building: "Royal Flush Plaza", shopName: "Estelle's Fine-lady Cosmetics", shopType: "化粧品店" },
  R205: { building: "Royal Flush Plaza", shopName: "Just in Time Payday Loans", shopType: "LOOTERの質屋" },
  R206: { building: "Royal Flush Plaza", shopName: "Eternal Timepieces", shopType: "宝飾店" },
  R207: { building: "Royal Flush Plaza", shopName: "Kathy's Space", shopType: "女性服" },
  R208: { building: "Royal Flush Plaza", shopName: "Earmark Leather", shopType: "カウボーイグッズ" },
  R209: { building: "Royal Flush Plaza", shopName: "Children's Castle", shopType: "玩具店" },
  R210: { building: "Royal Flush Plaza", shopName: "Small Fry Duds", shopType: "子供服" },
  R211: { building: "Royal Flush Plaza", shopName: "Rush Wireless", shopType: "携帯電話" },
  R212: { building: "Royal Flush Plaza", shopName: "Ragazines", shopType: "書店" },
  R213: { building: "Royal Flush Plaza", shopName: "Players", shopType: "CD屋" },
  R214: { building: "Royal Flush Plaza", shopName: "SporTrance(2F)", shopType: "スポーツ用品" },
  N101: { building: "SILVER STRIP", shopName: "Swept Away", shopType: "結婚式場" },
  N102: { building: "SILVER STRIP", shopName: "One Little Duck Bingo", shopType: "カジノ" },
  N103: { building: "SILVER STRIP", shopName: "Tinkerbox", shopType: "LOOTERの質屋" },
  N104: { building: "SILVER STRIP", shopName: "Barrel of Goods", shopType: "グッズ屋台" },
  N105: { building: "SILVER STRIP", shopName: "LuaiiWauwii", shopType: "レストラン" },
  N106: { building: "SILVER STRIP", shopName: "Shamrock Casino", shopType: "カジノ" },
  N107: { building: "SILVER STRIP", shopName: "Pub O'Gold", shopType: "アルコール" },
  N108: { building: "SILVER STRIP", shopName: "Rocket Red Glare", shopType: "花火" },
  N109: { building: "SILVER STRIP", shopName: "Peep Hole", shopType: "覗き小屋" },
  N110: { building: "SILVER STRIP", shopName: "Hot Excitorama", shopType: "アダルトショップ" },
  N111: { building: "SILVER STRIP", shopName: "Juggz Bar & Grill Kiosk", shopType: "アルコール" },
  Y101: { building: "YUCATAN CASINO", shopName: "Baron Von Brathaus", shopType: "食料品" },
  Y102: { building: "YUCATAN CASINO", shopName: "Shoal Nightclub", shopType: "酒類" },
};

/** エリアコードに一致する正規表現（P107, A101, R114 などを検出） */
const AREA_CODE_PATTERN = /\b([A-Z]\d{3})\b/gi;

/** 店舗名の別表記（itemLocations で使われうる表記ゆれ）店舗名 → 正規のエリアコード */
const SHOP_NAME_ALIASES: Record<string, string> = {
  "Tune Makers": "R105",
  Tunemakers: "R105",
  "Tune makers": "R105",
  Sportance: "R112", // SporTrance(1F)
  "Sportrance": "R112",
  "KokoNutz Sports Town": "P110", // 1Fを優先
  "Chris's Fine Foods": "P216",
  "Chris' Fine Foods": "P216",
  "Luaii Wauwii": "N105",
  LuaiiWauwii: "N105",
  "Rockets Red Glare": "N108",
  "Rocket Red Glare": "N108",
  "Wave Of Style": "R106",
  "Wave of Style": "R106",
  Shanks: "P107",
  "Shank's": "P107",
};

/** 店舗名 → エリアコードの逆引き（AREA_SHOP_MAP から自動生成 + 別名） */
function buildShopNameToCodeMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [code, info] of Object.entries(AREA_SHOP_MAP)) {
    const name = info.shopName.toLowerCase();
    if (!map.has(name)) map.set(name, code);
  }
  for (const [alias, code] of Object.entries(SHOP_NAME_ALIASES)) {
    map.set(alias.toLowerCase(), code);
  }
  return map;
}

const SHOP_NAME_TO_CODE = buildShopNameToCodeMap();

/** 店舗名でマッチするか検索（長い名前を優先） */
function findInfoByShopName(location: string): AreaShopInfo | null {
  const locLower = location.toLowerCase();
  const candidates: { len: number; code: string }[] = [];

  for (const [shopName, code] of SHOP_NAME_TO_CODE) {
    if (locLower.includes(shopName)) {
      candidates.push({ len: shopName.length, code });
    }
  }
  if (candidates.length === 0) return null;

  candidates.sort((a, b) => b.len - a.len);
  const info = AREA_SHOP_MAP[candidates[0].code];
  return info ? { ...info } : null;
}

/**
 * 取得場所テキストから建物・店舗情報を取得する
 * エリアコード（R101等）と店舗名の両方に対応
 */
export function enrichLocationWithAreaInfo(location: string): { text: string; info: AreaShopInfo | null } {
  // 1. エリアコードで検索（従来方式・優先）
  const codeMatch = location.match(AREA_CODE_PATTERN);
  if (codeMatch) {
    const areaCode = codeMatch[0].toUpperCase();
    const info = AREA_SHOP_MAP[areaCode] ?? null;
    if (info) {
      return { text: location, info: { ...info } };
    }
  }

  // 2. 店舗名で検索（R101 なし・店名のみ表記など）
  const infoByShop = findInfoByShopName(location);
  if (infoByShop) {
    return { text: location, info: infoByShop };
  }

  return { text: location, info: null };
}
