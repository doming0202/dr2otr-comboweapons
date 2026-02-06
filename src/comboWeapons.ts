/**
 * Dead Rising 2 & Off the Record コンボ武器データ
 * 参考: https://deadrising.fandom.com/wiki/Combo_Weapons_(Dead_Rising_2)
 *
 * OTR には Sterilizer と Impact Blaster は存在しない
 */

export type Game = "DR2" | "OTR";

export interface ComboWeapon {
  name: string;
  ingredient1: string;
  ingredient2: string;
  games: Game[];
}

export const COMBO_WEAPONS: ComboWeapon[] = [
  // === Dead Rising 2 ===
  { name: "Air Horn", ingredient1: "Pylon", ingredient2: "Spray Paint", games: ["DR2", "OTR"] },
  { name: "Auger", ingredient1: "Pitchfork", ingredient2: "Drill Motor", games: ["DR2", "OTR"] },
  { name: "Beer Hat", ingredient1: "Construction Hat", ingredient2: "Beer", games: ["DR2", "OTR"] },
  { name: "Blambow", ingredient1: "Bow and Arrow", ingredient2: "Dynamite", games: ["DR2", "OTR"] },
  { name: "Blazing Aces", ingredient1: "Tennis Racquet", ingredient2: "Tiki Torch", games: ["DR2", "OTR"] },
  { name: "Blitzkrieg", ingredient1: "Electric Chair", ingredient2: "LMG or Merc Assault Rifle", games: ["DR2", "OTR"] },
  { name: "Boomstick", ingredient1: "Pitchfork", ingredient2: "Shotgun", games: ["DR2", "OTR"] },
  { name: "Burning Skull", ingredient1: "Bull Skull", ingredient2: "Motor Oil", games: ["DR2", "OTR"] },
  { name: "Defiler", ingredient1: "Sledge Hammer", ingredient2: "Fire Axe", games: ["DR2", "OTR"] },
  { name: "Drill Bucket", ingredient1: "Bucket", ingredient2: "Power Drill", games: ["DR2", "OTR"] },
  { name: "Driller", ingredient1: "Power Drill", ingredient2: "Spear", games: ["DR2", "OTR"] },
  { name: "Dynameat", ingredient1: "Hunk of Meat", ingredient2: "Dynamite", games: ["DR2", "OTR"] },
  { name: "Electric Chair", ingredient1: "Battery", ingredient2: "Wheelchair", games: ["DR2", "OTR"] },
  { name: "Electric Rake", ingredient1: "Leaf Rake", ingredient2: "Battery", games: ["DR2", "OTR"] },
  { name: "Exsanguinator", ingredient1: "Vacuum Cleaner", ingredient2: "Saw Blade", games: ["DR2", "OTR"] },
  { name: "Fire Spitter", ingredient1: "Toy Spitball Gun", ingredient2: "Tiki Torch", games: ["DR2", "OTR"] },
  { name: "Flamethrower", ingredient1: "Water Gun", ingredient2: "Gasoline Canister", games: ["DR2", "OTR"] },
  { name: "Flaming Gloves", ingredient1: "Boxing Gloves", ingredient2: "Motor Oil", games: ["DR2", "OTR"] },
  { name: "Fountain Lizard", ingredient1: "Lizard Mask", ingredient2: "Fountain Firework", games: ["DR2", "OTR"] },
  { name: "Freedom Bear", ingredient1: "Robot Bear", ingredient2: "LMG", games: ["DR2", "OTR"] },
  { name: "Freezer Bomb", ingredient1: "Fire Extinguisher", ingredient2: "Dynamite", games: ["DR2", "OTR"] },
  { name: "Gem Blower", ingredient1: "Leaf Blower", ingredient2: "Gems", games: ["DR2", "OTR"] },
  { name: "Hacker", ingredient1: "Flashlight", ingredient2: "Computer Case", games: ["DR2", "OTR"] },
  { name: "Hail Mary", ingredient1: "Football", ingredient2: "Grenade", games: ["DR2", "OTR"] },
  { name: "Handy Chipper", ingredient1: "Lawn Mower", ingredient2: "Wheelchair", games: ["DR2", "OTR"] },
  { name: "Heliblade", ingredient1: "Toy Helicopter", ingredient2: "Machete", games: ["DR2", "OTR"] },
  { name: "Holy Arms", ingredient1: "Training Sword", ingredient2: "Box of Nails", games: ["DR2", "OTR"] },
  { name: "Infernal Arms", ingredient1: "Training Sword", ingredient2: "Motor Oil", games: ["DR2", "OTR"] },
  { name: "I.E.D.", ingredient1: "Propane Tank", ingredient2: "Box of Nails", games: ["DR2", "OTR"] },
  { name: "Knife Gloves", ingredient1: "Boxing Gloves", ingredient2: "Bowie Knife", games: ["DR2", "OTR"] },
  { name: "Laser Sword", ingredient1: "Flashlight", ingredient2: "Gems", games: ["DR2", "OTR"] },
  { name: "Molotov", ingredient1: "Whiskey", ingredient2: "Newspaper", games: ["DR2", "OTR"] },
  { name: "Paddlesaw", ingredient1: "Paddle", ingredient2: "Chainsaw", games: ["DR2", "OTR"] },
  { name: "Parablower", ingredient1: "Leaf Blower", ingredient2: "Parasol", games: ["DR2", "OTR"] },
  { name: "Plate Launcher", ingredient1: "Plates", ingredient2: "Cement Saw", games: ["DR2", "OTR"] },
  { name: "Pole Weapon", ingredient1: "Push Broom", ingredient2: "Machete", games: ["DR2", "OTR"] },
  { name: "Porta Mower", ingredient1: "Lawn Mower", ingredient2: "2\" x 4\"", games: ["DR2", "OTR"] },
  { name: "Power Guitar", ingredient1: "Electric Guitar", ingredient2: "Amplifier", games: ["DR2", "OTR"] },
  { name: "Ripper", ingredient1: "Cement Saw", ingredient2: "Saw Blade", games: ["DR2", "OTR"] },
  { name: "Roaring Thunder", ingredient1: "Goblin Mask", ingredient2: "Battery", games: ["DR2", "OTR"] },
  { name: "Rocket Launcher", ingredient1: "Lead Pipe", ingredient2: "Rocket Fireworks", games: ["DR2", "OTR"] },
  { name: "Snowball Cannon", ingredient1: "Water Gun", ingredient2: "Fire Extinguisher", games: ["DR2", "OTR"] },
  { name: "Spear Launcher", ingredient1: "Leaf Blower", ingredient2: "Spear", games: ["DR2", "OTR"] },
  { name: "Spiked Bat", ingredient1: "Baseball Bat", ingredient2: "Box of Nails", games: ["DR2", "OTR"] },
  { name: "Sticky Bomb", ingredient1: "Lawn Dart", ingredient2: "Dynamite", games: ["DR2", "OTR"] },
  { name: "Super B.F.G.", ingredient1: "Blast Frequency Gun", ingredient2: "Amplifier", games: ["DR2", "OTR"] },
  { name: "Super Slicer", ingredient1: "Servbot Mask", ingredient2: "Lawn Mower", games: ["DR2", "OTR"] },
  { name: "Tenderizers", ingredient1: "MMA Gloves", ingredient2: "Box of Nails", games: ["DR2", "OTR"] },
  { name: "Tesla Ball", ingredient1: "Bingo Ball Cage", ingredient2: "Battery", games: ["DR2", "OTR"] },
  { name: "Wingman", ingredient1: "Queen", ingredient2: "Nectar", games: ["DR2", "OTR"] },

  // === Case West (DR2 のみ - Impact Blaster), OTR には Impact Blaster なし
  { name: "Impact Blaster", ingredient1: "Blast Frequency Gun", ingredient2: "Impact Hammer", games: ["DR2"] },

  // === Case West (両方)
  { name: "Laser Gun", ingredient1: "Laser Sword", ingredient2: "Lightning Gun", games: ["DR2", "OTR"] },
  { name: "Lightning Gun", ingredient1: "Blast Frequency Gun", ingredient2: "Electric Prod", games: ["DR2", "OTR"] },
  { name: "Reaper", ingredient1: "Sickle", ingredient2: "Katana", games: ["DR2", "OTR"] },
  { name: "Shocker", ingredient1: "Defibrillator", ingredient2: "Medical Tray", games: ["DR2", "OTR"] },
  // Sterilizer は DR2 のみ、OTR には存在しない
  { name: "Sterilizer", ingredient1: "Syringe Gun", ingredient2: "Chemicals", games: ["DR2"] },
  { name: "Zap N' Shine", ingredient1: "Floor Buffer", ingredient2: "Electric Prod", games: ["DR2", "OTR"] },

  // === Off the Record 専用 ===
  { name: "Bouncing Beauty", ingredient1: "Propane Tank", ingredient2: "Rocket Fireworks", games: ["OTR"] },
  { name: "Cryo Pod", ingredient1: "Fire Extinguisher", ingredient2: "Escape Pod", games: ["OTR"] },
  { name: "Decapitator", ingredient1: "Boomerang", ingredient2: "Chef Knife", games: ["OTR"] },
  { name: "Electric Crusher", ingredient1: "Sledge Hammer", ingredient2: "Battery", games: ["OTR"] },
  { name: "Laser Eyes", ingredient1: "Alien Head", ingredient2: "Gems", games: ["OTR"] },
  { name: "Molten Cannon", ingredient1: "Motor Oil", ingredient2: "Tennis Ball Launcher", games: ["OTR"] },
  { name: "Pegasus", ingredient1: "Stick Pony", ingredient2: "Rocket Fireworks", games: ["OTR"] },
  { name: "Saw Launcher", ingredient1: "Saw Blade", ingredient2: "Tennis Ball Launcher", games: ["OTR"] },
  { name: "Super Massager", ingredient1: "Leaf Blower", ingredient2: "Massager", games: ["OTR"] },
  { name: "Weed Tendonizer", ingredient1: "Grass Trimmer", ingredient2: "Chef Knife", games: ["OTR"] },
];

/**
 * 検索クエリに一致するコンボ武器を取得
 * 材料名（ingredient1 または ingredient2）に部分一致する武器を返す
 */
export function searchComboWeapons(
  query: string,
  gameFilter?: Game
): ComboWeapon[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  return COMBO_WEAPONS.filter((weapon) => {
    const matchesIngredient =
      weapon.ingredient1.toLowerCase().includes(normalizedQuery) ||
      weapon.ingredient2.toLowerCase().includes(normalizedQuery) ||
      weapon.name.toLowerCase().includes(normalizedQuery);

    const matchesGame = !gameFilter || weapon.games.includes(gameFilter);

    return matchesIngredient && matchesGame;
  });
}
