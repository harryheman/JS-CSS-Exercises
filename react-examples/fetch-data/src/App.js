import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, load: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, load: false, error: false, data: action.payload };
    case "FETCH_FAIL":
      return { ...state, load: false, error: true };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    load: false,
    error: false,
    data: initialData,
  });

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);

        if (!cancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (e) {
        if (!cancel) {
          dispatch({ type: "FETCH_FAIL" });
        }
        console.error(e);
      }
    };
    fetchData();

    return () => cancel = true
  }, [url]);

  return [state, setUrl];
};

function App() {
  const [query, setQuery] = useState("redux");
  const [{ data, load, error }, doFetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    {
      hits: [],
    }
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <div>Something went wrong...</div>}
      {load ? (
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
    </>
  );
}

export default App;
