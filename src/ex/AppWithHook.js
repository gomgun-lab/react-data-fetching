import logo from "./logo.svg";
import "./App.css";
import { useHackerNewsApi } from "../hook/useHackerNewsApi";
import { useState } from "react";

const initUrl = "http://hn.algolia.com/api/v1/search?query=redux";
const initData = { hits: [] };

function App() {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi(
    initUrl,
    initData
  );

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doFetch(`https:/hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
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
