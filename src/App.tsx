import { useState, useMemo } from "react";
import {
  COMBO_WEAPONS,
  searchComboWeapons,
  type Game,
} from "./comboWeapons";
import {
  getItemLocations,
  getItemWikiUrl,
} from "./itemLocations";
import "./App.css";

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
              {locations.map((loc, i) => (
                <li key={i}>{loc}</li>
              ))}
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
        </div>
      </div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [gameFilter, setGameFilter] = useState<Game | "">("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const results = useMemo(() => {
    const filter: Game | undefined = gameFilter || undefined;
    return searchComboWeapons(query, filter);
  }, [query, gameFilter]);

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

      <section className="search-section">
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
      </section>

      <section className="results-section">
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
            <li
              key={`${weapon.name}-${weapon.games.join("-")}`}
              className="weapon-card"
            >
              <div className="weapon-name">{weapon.name}</div>
              <div className="weapon-recipe">
                <ClickableIngredient
                  name={weapon.ingredient1}
                  onClick={() => setSelectedItem(weapon.ingredient1)}
                />
                {" + "}
                <ClickableIngredient
                  name={weapon.ingredient2}
                  onClick={() => setSelectedItem(weapon.ingredient2)}
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
          ))}
        </ul>
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
      </footer>
    </main>
  );
}

export default App;
