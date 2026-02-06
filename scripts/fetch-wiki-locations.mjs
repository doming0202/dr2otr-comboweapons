/**
 * Dead Rising Wiki からアイテム取得場所をスクレイプ
 * 実行: node scripts/fetch-wiki-locations.mjs
 * 出力: scripts/wiki-locations.json
 */

const WIKI_BASE = "https://deadrising.fandom.com/wiki/";

// アイテム名 -> Wikiページ名のマッピング（標準形式と異なる場合）
const WIKI_PAGE_MAP = {
  "2\" x 4\"": "2\"_x_4\"_(Dead_Rising_2)",
  LMG: "Light_Machine_Gun_(Dead_Rising_2)",
  "Merc Assault Rifle": "Merc_Assault_Rifle_(Dead_Rising_2)",
  "LMG or Merc Assault Rifle": "Light_Machine_Gun_(Dead_Rising_2)", // 最初の方を試す
  Beer: "Beer_(Dead_Rising_2)",
  Nectar: "Nectar_(Dead_Rising_2)",
  "Impact Hammer": "Impact_Hammer_(Case_West)",
  "Electric Prod": "Electric_Prod_(Dead_Rising_2)",
  Defibrillator: "Defibrillator_(Dead_Rising_2)",
  "Medical Tray": "Medical_Tray_(Dead_Rising_2)",
  "Syringe Gun": "Syringe_Gun",
  Chemicals: "Chemicals_(Case_West)",
  "Floor Buffer": "Floor_Buffer",
  Sickle: "Sickle_(Dead_Rising_2)",
  Katana: "Katana_(Dead_Rising_2)",
  Boomerang: "Boomerang_(Off_the_Record)",
  "Alien Head": "Alien_Head",
  "Tennis Ball Launcher": "Tennis_Ball_Launcher_(Off_the_Record)",
  "Grass Trimmer": "Grass_Trimmer_(Off_the_Record)",
  "Escape Pod": "Escape_Pod",
};

function getWikiSlug(itemName) {
  const base = itemName.split(" or ")[0].trim();
  if (WIKI_PAGE_MAP[base] || WIKI_PAGE_MAP[itemName]) {
    return WIKI_PAGE_MAP[base] || WIKI_PAGE_MAP[itemName];
  }
  const slug = base.replace(/\s+/g, "_").replace(/"/g, "%22");
  return `${slug}_(Dead_Rising_2)`;
}

function getWikiUrl(itemName) {
  const slug = getWikiSlug(itemName);
  return WIKI_BASE + encodeURIComponent(slug);
}

/** HTML の <li> 内テキストを抽出（タグを除去） */
function extractTextFromHtml(html) {
  return html
    .replace(/<a[^>]*>([^<]*)<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Locations セクションをパースして取得場所の配列を返す（HTML対応） */
function parseLocationsSection(html) {
  const locations = [];
  const seen = new Set();
  // Fandom/MediaWiki: <h2>内に<span id="Locations">等でLocationsが含まれる
  // または Markdown風: ## Locations
  let section = null;
  const htmlMatch = html.match(/<h2[^>]*>[\s\S]*?Locations[\s\S]*?<\/h2>([\s\S]*?)(?=<h2\b|$)/i);
  const mdMatch = html.match(/##\s*Locations[\s\S]*?(?=##\s+[A-Za-z]|$)/i);
  if (htmlMatch) section = htmlMatch[1];
  else if (mdMatch) section = mdMatch[0];
  if (!section) return locations;

  // <li>...</li> を抽出
  const liMatches = section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  for (const m of liMatches) {
    const raw = m[1];
    const text = extractTextFromHtml(raw);
    if (text && text.length > 2 && !seen.has(text)) {
      seen.add(text);
      locations.push(text);
    }
  }
  // <li>が見つからない場合: Markdown形式 (* で始まる行) を試す
  if (locations.length === 0) {
    const lines = section.split(/\r?\n/);
    for (const line of lines) {
      const bulletMatch = line.match(/^\s*[*\-]\s+(.+)/);
      if (bulletMatch) {
        let text = bulletMatch[1]
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/\s+/g, " ")
          .trim();
        if (text && text.length > 2 && !seen.has(text)) {
          seen.add(text);
          locations.push(text);
        }
      }
    }
  }
  return locations;
}

/** コンボ武器の材料（ユニーク、comboWeapons.ts から抽出） */
const INGREDIENTS = [
  "2\" x 4\"", "Alien Head", "Amplifier", "Battery", "Bingo Ball Cage",
  "Blast Frequency Gun", "Boomerang", "Bow and Arrow", "Bowie Knife",
  "Box of Nails", "Boxing Gloves", "Bucket", "Bull Skull", "Chef Knife",
  "Chemicals", "Chainsaw", "Computer Case", "Construction Hat",
  "Defibrillator", "Drill Motor", "Dynamite", "Electric Chair",
  "Electric Guitar", "Electric Prod", "Escape Pod", "Fire Axe",
  "Fire Extinguisher", "Flashlight", "Floor Buffer", "Football",
  "Fountain Firework", "Gems", "Goblin Mask", "Grass Trimmer", "Grenade",
  "Hunk of Meat", "Impact Hammer", "Katana", "Lawn Dart", "Lawn Mower",
  "Lead Pipe", "Leaf Blower", "Leaf Rake", "Lizard Mask", "LMG",
  "LMG or Merc Assault Rifle", "Machete", "Massager", "Medical Tray",
  "Motor Oil", "Newspaper", "Paddle", "Parasol", "Plates", "Power Drill",
  "Propane Tank", "Push Broom", "Pylon", "Queen", "Nectar", "Robot Bear",
  "Rocket Fireworks", "Saw Blade", "Servbot Mask", "Shotgun", "Sickle",
  "Sledge Hammer", "Spear", "Spray Paint", "Stick Pony", "Syringe Gun",
  "Tennis Ball Launcher", "Tennis Racquet", "Tiki Torch", "Toy Helicopter",
  "Toy Spitball Gun", "Training Sword", "Vacuum Cleaner", "Water Gun",
  "Gasoline Canister", "Cement Saw", "Wheelchair", "MMA Gloves",
  "Baseball Bat", "Beer",
].sort();

const UA = "DR2-OTR-ComboWeapons/1.0 (wiki location scraper)";

async function fetchWikiPage(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) return null;
  return res.text();
}

/** MediaWiki API でページの parsed HTML を取得（SPA対策） */
async function fetchViaApi(slug) {
  const pageTitle = decodeURIComponent(slug).replace(/_/g, " ");
  const url = `https://deadrising.fandom.com/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=text&format=json&origin=*`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const json = await res.json();
    const text = json.parse?.text?.["*"];
    if (text) return text;
  } catch (_) {}
  return null;
}

async function main() {
  const ingredients = INGREDIENTS;

  const results = {};
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  for (let i = 0; i < ingredients.length; i++) {
    const item = ingredients[i];
    const url = getWikiUrl(item);
    process.stderr.write(`[${i + 1}/${ingredients.length}] ${item}... `);

    try {
      const slug = getWikiSlug(item);
      // MediaWiki API を優先（FandomはSPAでHTMLから取得できない場合がある）
      let html = await fetchViaApi(slug);
      let locations = html ? parseLocationsSection(html) : [];
      // API失敗時は直接HTMLを取得
      if (locations.length === 0) {
        html = await fetchWikiPage(url);
        if (html) locations = parseLocationsSection(html);
      }
      if (!html) {
        process.stderr.write("404 or error\n");
        continue;
      }
      if (locations.length > 0) {
        results[item] = locations;
        process.stderr.write(`${locations.length} locations\n`);
      } else {
        process.stderr.write("no locations found\n");
      }
    } catch (err) {
      process.stderr.write(`error: ${err.message}\n`);
    }
    await delay(500); // レート制限対策
  }

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(process.cwd(), "scripts", "wiki-locations.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nWrote ${Object.keys(results).length} items to ${outPath}`);
}

main().catch(console.error);
