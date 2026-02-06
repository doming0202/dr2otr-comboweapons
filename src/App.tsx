import { useState, useMemo } from "react";
import {
  COMBO_WEAPONS,
  searchComboWeapons,
  type Game,
} from "./comboWeapons";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [gameFilter, setGameFilter] = useState<Game | "">("");

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
            未入力の場合は全{COMBO_WEAPONS.length}件を表示しています。
          </p>
        ) : (
          <p className="results-info">
            「{query}」に一致するコンボ武器: {results.length}件
          </p>
        )}

        <ul className="weapon-list">
          {displayResults.map((weapon) => (
            <li key={`${weapon.name}-${weapon.games.join("-")}`} className="weapon-card">
              <div className="weapon-name">{weapon.name}</div>
              <div className="weapon-recipe">
                {weapon.ingredient1} + {weapon.ingredient2}
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
