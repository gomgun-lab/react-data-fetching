import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import { useDataApi } from "../hook/useDataApi";

const initUrl = "http://hn.algolia.com/api/v1/search?query=redux";
const initData = { hits: [] };

function App() {
  const [query, setQuery] = useState("redux");
  const [news, setNews] = useDataApi(initUrl, initData);

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNews(`https:/hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {news.isError && <div>Something went wrong ...</div>}
      {news.isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {news.data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
