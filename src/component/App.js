import { useState, useEffect, useReducer } from "react";
import "../css/style.css";
import { CategoriesProvider, useCategories } from "./CategoriesContext";
import { SAVEDATA, FETCHDATA } from "./Router.js";
import FactList from "./FactList.js";
import Pagination from "./Pagination.js";
import { factsReducer, initialState } from "./Reducer.js";
import { loadFacts, saveFacts } from "./FactService.js"; // 서비스에서 loadFacts 가져오기

var pageSize = 5;
// App component ->  앞 글자가 대문자 (naming convention)
function App() {
  const [showForm, setShowForm] = useState(false);
  // const [facts, setFacts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);
  // const totalElements = useRef(0);
  // const [currentCategory, setCurrentCategory] = useState("all");
  const [state, dispatch] = useReducer(factsReducer, initialState);
  const {
    facts,
    isLoading,
    error,
    currentPage,
    currentCategory,
    totalElements,
  } = state;

  // const loadFacts = async () => {
  //   dispatch({ type: "FETCH_REQUEST" });
  //   const data = await FETCHDATA(currentPage, pageSize, currentCategory);
  //   dispatch({ type: "FETCH_SUCCESS", payload: data });
  //   // setFacts(data.items);
  //   // totalElements.current = data.totalCount;
  // };

  useEffect(() => {
    console.log("currentCategory", currentCategory);
    if (currentPage !== 0) dispatch({ type: "SET_PAGE", page: 0 });
    else loadFacts(state, dispatch);
  }, [currentCategory]);

  useEffect(() => {
    console.log("currentPage", currentPage);
    loadFacts(state, dispatch);
  }, [currentPage]);

  return (
    <CategoriesProvider>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          state={state}
          dispatch={dispatch}
          setShowForm={setShowForm}
        />
      ) : null}

      <main className="main">
        <div className="content">
          <CategoryFilter state={state} dispatch={dispatch} />
          <FactList state={state} dispatch={dispatch} />
        </div>
        <Pagination state={state} dispatch={dispatch} />
      </main>
    </CategoriesProvider>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Create"}
      </button>
    </header>
  );
}

function isValidUrl(url) {
  if (url.length === 0) return true;
  try {
    new URL(url); // URL 객체로 변환
    return true; // 유효한 URL
  } catch (e) {
    return false; // 유효하지 않은 URL
  }
}

function NewFactForm({ state, dispatch, setShowForm }) {
  const CATEGORIES = useCategories();
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  const textLength = text.length;

  function handleSubmit(e) {
    e.preventDefault(); // once form submitted, the page will reload everything, so prevent this!

    if (text && isValidUrl(source) && category && textLength <= 200) {
      const newFact = {
        id: "",
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindBlowing: 0,
        createdIn: "",
      };

      // saveFacts(newFact);
      // setCurrentCategory(category);
      dispatch({ type: "SET_CATEGORY", category: "all" });
      dispatch({ type: "SET_PAGE", page: 0 });
      saveFacts(newFact, state, dispatch);
    } else {
      if (text.length === 0) {
        alert("Please write a fact!");
        return;
      }
      if (source.length !== 0 && !isValidUrl(source)) {
        alert("Please give a valid url!");
        return;
      }
    }
    // init fields
    setText("");
    setSource("");
    setCategory("");

    setShowForm(false);
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What's new?"
        maxLength="200"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ state, dispatch }) {
  const CATEGORIES = useCategories();
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => dispatch({ type: "SET_CATEGORY", category: "all" })}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{
                backgroundColor: cat.color,
              }}
              onClick={() =>
                dispatch({ type: "SET_CATEGORY", category: cat.name })
              }
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default App;
