/**
 * Dead Rising Wiki からアイテム取得場所をスクレイプ
 * Locations セクションのうち、Dead Rising 2 / Off the Record が
 * 記載されているサブセクションのみを対象（Case Zero / Case West は除外）
 * 実行: pnpm wiki:fetch または node scripts/fetch-wiki-locations.mjs
 * 出力: scripts/wiki-locations.json
 *
 * 出力構造（ゲームタイトル → 場所リスト）:
 *   {
 *     "Item Name": {
 *       "Dead Rising 2": ["場所1", "場所2", "場所3"],
 *       "Off the Record": ["場所1", "場所2"]
 *     }
 *   }
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

/** DR2/OTR 関連のサブセクションか判定（Case Zero / Case West は除外） */
function isDr2OtrSection(headingText) {
  const t = headingText.toLowerCase();
  if (t.includes("case zero") || t.includes("case west")) return false;
  return t.includes("dead rising 2") || t.includes("off the record");
}

/** 目次・見出し・攻撃説明などを除外し、実際の取得場所か判定 */
function isValidLocationText(text) {
  const t = text.trim();
  if (!t || t.length < 10) return false;
  // 目次パターン: "1 Attacks", "2.1 Dead Rising 2", "2 Locations 2.1 Case Zero" 等
  if (/^\d+(\.\d+)*\s+(Attacks|Locations|Trivia|Gallery|References|Recipes|Attack|Video)/i.test(t))
    return false;
  if (/^(Attacks|Locations|Trivia|Gallery|References|Recipes|Attack|Video)\s*$/i.test(t))
    return false;
  if (/^\d+\.\d+\s+(Case Zero|Dead Rising|Off the Record|Case West)/i.test(t))
    return false;
  if (/^\d+\s+(Attacks|Locations|Trivia|Gallery|References)/i.test(t))
    return false;
  // 攻撃説明 "Main:", "Alternate:", "Combo:"
  if (/^(Main|Alternate|Combo):/i.test(t)) return false;
  // "2 Locations 2.1..." のような目次行
  if (/^2\s+Locations\s+2\.\d+/i.test(t)) return false;
  return true;
}

/**
 * Locations セクションから DR2/OTR 記載部分をパース
 * ゲームタイトル（h3）ごとに場所リストを返す
 * 戻り値: { "Dead Rising 2": ["場所1","場所2"], "Off the Record": ["場所1"] }
 */
function parseLocationsSection(html) {
  const byGame = {};
  const seen = new Set();

  // Locations セクションを取得（h2 Locations から次の h2 まで）
  const sectionMatch = html.match(
    /<h2[^>]*>[\s\S]*?Locations[\s\S]*?<\/h2>([\s\S]*?)(?=<h2\b|$)/i
  );
  if (!sectionMatch) return byGame;

  const section = sectionMatch[1];

  // h3 で分割：ゲームタイトルごとに ・場所1 ・場所2 ・場所3 の構造
  const h3Blocks = section.split(/<h3[^>]*>/i);

  for (let i = 1; i < h3Blocks.length; i++) {
    const block = h3Blocks[i];
    const headingEnd = block.indexOf("</h3>");
    const headingHtml = headingEnd >= 0 ? block.slice(0, headingEnd) : "";
    const headingText = extractTextFromHtml(headingHtml);
    const content = headingEnd >= 0 ? block.slice(headingEnd + 5) : block;

    // Case Zero / Case West はスキップ、DR2/OTR のみ
    if (!isDr2OtrSection(headingText)) continue;

    // ゲーム名を正規化（"Dead Rising 2 and Off the Record" は両方に分配するか、そのまま1キーに）
    const gameKey = headingText.trim();
    if (!byGame[gameKey]) byGame[gameKey] = [];

    const liMatches = content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    for (const m of liMatches) {
      const raw = m[1];
      const text = extractTextFromHtml(raw);
      if (text && isValidLocationText(text)) {
        const dedupKey = `${gameKey}\0${text}`;
        if (!seen.has(dedupKey)) {
          seen.add(dedupKey);
          byGame[gameKey].push(text);
        }
      }
    }
  }

  return byGame;
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
      let byGame = html ? parseLocationsSection(html) : {};
      // API失敗時は直接HTMLを取得
      if (Object.keys(byGame).length === 0) {
        html = await fetchWikiPage(url);
        if (html) byGame = parseLocationsSection(html);
      }
      if (!html) {
        process.stderr.write("404 or error\n");
        continue;
      }
      const totalLocs = Object.values(byGame).flat().length;
      if (totalLocs > 0) {
        results[item] = byGame;
        process.stderr.write(`${Object.keys(byGame).join(", ")}: ${totalLocs} locations\n`);
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
