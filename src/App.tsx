import { useState, useMemo } from "react";
import {
  COMBO_WEAPONS,
  searchComboWeapons,
  getAllIngredients,
  getComboWeaponsByIngredient,
  type Game,
} from "./comboWeapons";
import {
  getItemLocations,
  getItemWikiUrl,
} from "./itemLocations";
import { enrichLocationWithAreaInfo } from "./areaShopInfo";
import {
  MAIN_AREAS,
  getComboWeaponsByAllAreas,
  type MainArea,
} from "./areaComboWeapons";
import "./App.css";

type ViewMode = "search" | "area" | "material";

function ClickableIngredient({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="ingredient-link"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title="クリックで取得場所を表示"
    >
      {name}
    </button>
  );
}

function ItemLocationModal({
  itemName,
  onClose,
}: {
  itemName: string;
  onClose: () => void;
}) {
  const locations = getItemLocations(itemName);
  const wikiUrl = getItemWikiUrl(itemName);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="button"
      tabIndex={0}
      aria-label="閉じる"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">{itemName}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <h3 className="locations-heading">取得場所</h3>
          {locations.length > 0 ? (
            <ul className="locations-list">
              {locations.map((loc, i) => {
                const { text, info, areaCode } = enrichLocationWithAreaInfo(loc);
                const alreadyHasCode = areaCode != null && text.includes(areaCode);
                return (
                  <li key={i}>
                    {text}
                    {info && areaCode && (
                      <span className="location-area-info">
                        {" "}
                        <small>
                          {alreadyHasCode
                            ? `[${info.building} / ${info.shopName} (${info.shopType})]`
                            : `${areaCode} [${info.building} / ${info.shopName} (${info.shopType})]`}
                        </small>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="no-locations">
              このアイテムの取得場所データはまだ登録されていません。
              Wikiで確認してください。
            </p>
          )}

          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wiki-link"
          >
            Dead Rising Wiki で詳細を確認 →
          </a>
          {locations.some((loc) => {
            const { text } = enrichLocationWithAreaInfo(loc);
            return text.includes("Maintenance Room");
          }) && (
            <a
              href="https://deadrising.fandom.com/wiki/Maintenance_Room#Dead_Rising_2_2"
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-link"
              style={{ display: "block", marginTop: "0.5rem" }}
            >
              メンテナンスルーム →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function WeaponCard({
  weapon,
  onSelectIngredient,
  showCombinationLabel = false,
}: {
  weapon: { name: string; ingredient1: string; ingredient2: string; games: Game[] };
  onSelectIngredient: (name: string) => void;
  showCombinationLabel?: boolean;
}) {
  return (
    <li
      key={`${weapon.name}-${weapon.games.join("-")}`}
      className="weapon-card"
    >
      <div className="weapon-name">{weapon.name}</div>
      <div className="weapon-recipe">
        {showCombinationLabel && <span className="recipe-label">組み合わせ: </span>}
        <ClickableIngredient
          name={weapon.ingredient1}
          onClick={() => onSelectIngredient(weapon.ingredient1)}
        />
        {" + "}
        <ClickableIngredient
          name={weapon.ingredient2}
          onClick={() => onSelectIngredient(weapon.ingredient2)}
        />
      </div>
      <div className="weapon-games">
        {weapon.games.map((g) => (
          <span
            key={g}
            className={`game-badge ${g}`}
            title={g === "DR2" ? "Dead Rising 2" : "Off the Record"}
          >
            {g}
          </span>
        ))}
      </div>
    </li>
  );
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("search");
  const [query, setQuery] = useState("");
  const [gameFilter, setGameFilter] = useState<Game | "">("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");

  const results = useMemo(() => {
    const filter: Game | undefined = gameFilter || undefined;
    return searchComboWeapons(query, filter);
  }, [query, gameFilter]);

  const areaWeapons = useMemo(() => {
    const filter: Game | undefined = gameFilter || undefined;
    return getComboWeaponsByAllAreas(filter);
  }, [gameFilter]);

  const ingredients = useMemo(() => getAllIngredients(), []);

  const materialWeapons = useMemo(() => {
    if (!selectedMaterial.trim()) return [];
    const filter: Game | undefined = gameFilter || undefined;
    return getComboWeaponsByIngredient(selectedMaterial, filter);
  }, [selectedMaterial, gameFilter]);

  const showAllOnEmpty = query.trim() === "";
  const displayResults = showAllOnEmpty ? COMBO_WEAPONS : results;

  return (
    <main className="container">
      <header className="header">
        <h1>Dead Rising 2 コンボ武器検索</h1>
        <p className="subtitle">
          DR2 & Off the Record のコンボ武器をアイテム名で検索
        </p>
      </header>

      <section className="view-tabs">
        <button
          type="button"
          className={`view-tab ${viewMode === "search" ? "active" : ""}`}
          onClick={() => setViewMode("search")}
        >
          検索
        </button>
        <button
          type="button"
          className={`view-tab ${viewMode === "material" ? "active" : ""}`}
          onClick={() => setViewMode("material")}
        >
          素材から探す
        </button>
        <button
          type="button"
          className={`view-tab ${viewMode === "area" ? "active" : ""}`}
          onClick={() => setViewMode("area")}
        >
          エリア別
        </button>
      </section>

      <section className="search-section">
        {viewMode === "material" ? (
          <div className="search-box material-select-box">
            <label htmlFor="material-select" className="material-label">
              素材を選択
            </label>
            <select
              id="material-select"
              className="material-select"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="">-- 素材を選んでください --</option>
              {ingredients.map((ing) => (
                <option key={ing} value={ing}>
                  {ing}
                </option>
              ))}
            </select>
            <select
              className="game-filter"
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value as Game | "")}
            >
              <option value="">全作品</option>
              <option value="DR2">Dead Rising 2 のみ</option>
              <option value="OTR">Off the Record のみ</option>
            </select>
          </div>
        ) : (
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="アイテム名を入力（例: Chainsaw, Dynamite, Battery）"
              autoFocus
            />
            <select
              className="game-filter"
              value={gameFilter}
              onChange={(e) => setGameFilter(e.target.value as Game | "")}
            >
              <option value="">全作品</option>
              <option value="DR2">Dead Rising 2 のみ</option>
              <option value="OTR">Off the Record のみ</option>
            </select>
          </div>
        )}
      </section>

      <section className="results-section">
        {viewMode === "search" ? (
          <>
            {showAllOnEmpty ? (
              <p className="results-info">
                検索欄にアイテムを入力すると、その材料を含むコンボ武器の候補が表示されます。
                アイテム名をクリックで取得場所を表示。未入力の場合は全
                {COMBO_WEAPONS.length}件を表示しています。
              </p>
            ) : (
              <p className="results-info">
                「{query}」に一致するコンボ武器: {results.length}件
              </p>
            )}

            <ul className="weapon-list">
              {displayResults.map((weapon) => (
                <WeaponCard
                  key={`${weapon.name}-${weapon.games.join("-")}`}
                  weapon={weapon}
                  onSelectIngredient={setSelectedItem}
                  showCombinationLabel
                />
              ))}
            </ul>
          </>
        ) : viewMode === "material" ? (
          <>
            <p className="results-info">
              素材を選ぶと、その素材で作れるコンボ武器の候補が表示されます。組み合わせ（もう1つの素材）も表示しています。
            </p>
            {selectedMaterial ? (
              <>
                <p className="results-info material-result-count">
                  「{selectedMaterial}」で作れるコンボ武器: {materialWeapons.length}件
                </p>
                <ul className="weapon-list">
                  {materialWeapons.map((weapon) => (
                    <WeaponCard
                      key={`${weapon.name}-${weapon.games.join("-")}`}
                      weapon={weapon}
                      onSelectIngredient={setSelectedItem}
                      showCombinationLabel
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p className="no-results-hint">上で素材を選択してください。</p>
            )}
          </>
        ) : (
          <div className="area-section">
            <p className="results-info">
              エリア内で両方の材料が揃うコンボ武器を表示。アイテム名クリックで取得場所を確認。
            </p>
            <div className="area-list">
              {(MAIN_AREAS as readonly string[]).map((area) => {
                const weapons = areaWeapons[area as MainArea];
                return (
                  <details key={area} className="area-details">
                    <summary className="area-summary">
                      {area}
                      <span className="area-count">{weapons.length}件</span>
                    </summary>
                    {weapons.length > 0 ? (
                      <ul className="weapon-list area-weapon-list">
                        {weapons.map((weapon) => (
                          <WeaponCard
                            key={`${weapon.name}-${weapon.games.join("-")}`}
                            weapon={weapon}
                            onSelectIngredient={setSelectedItem}
                            showCombinationLabel
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className="area-empty">このエリアで作成できるコンボ武器はありません。</p>
                    )}
                  </details>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {selectedItem && (
        <ItemLocationModal
          itemName={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <footer className="footer">
        <a
          href="https://deadrising.fandom.com/wiki/Combo_Weapons_(Dead_Rising_2)"
          target="_blank"
          rel="noopener noreferrer"
        >
          参考: Dead Rising Wiki
        </a>
        {" | "}
        <a
          href="https://deadrising.fandom.com/wiki/Maintenance_Room#Dead_Rising_2_2"
          target="_blank"
          rel="noopener noreferrer"
        >
          メンテナンスルーム
        </a>
      </footer>
    </main>
  );
}

export default App;
