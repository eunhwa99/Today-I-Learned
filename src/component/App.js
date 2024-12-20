import { useState, useEffect } from "react";
import "../css/style.css";
import { CategoriesProvider, useCategories } from "./CategoriesContext";
import { FETCHDATA, SAVEDATA } from "./Router.js";
import FactList from "./ItemList.js";

// App component ->  앞 글자가 대문자 (naming convention)
function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentCategory, setCurrentCategory] = useState("all");

  // 컴포넌트가 마운트될 때 아이템 리스트를 가져옴
  useEffect(() => {
    FETCHDATA(setFacts, currentPage, 10, currentCategory);
  }, [currentPage, currentCategory]); // 페이지나 카테고리가 변경될 때마다 데이터를 다시 가져옴

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // 페이지 변경
  };

  return (
    <CategoriesProvider>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          facts={facts}
          setFacts={setFacts}
          setShowForm={setShowForm}
        />
      ) : null}

      <main className="main">
        <CategoryFilter
          setCurrentCategory={setCurrentCategory}
          setFacts={setFacts}
        />
        <FactList
          facts={facts}
          currentCategory={currentCategory}
          setFacts={setFacts}
          pageSize={5}
        />
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
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function isValidUrl(url) {
  if (url.length == 0) return true;
  try {
    new URL(url); // URL 객체로 변환
    return true; // 유효한 URL
  } catch (e) {
    return false; // 유효하지 않은 URL
  }
}

function NewFactForm({ setFacts, setShowForm }) {
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
        createdIn: new Date().getFullYear(),
      };

      // POST 요청을 처리하는 함수
      SAVEDATA(newFact, setFacts);
    } else {
      if (text.length === 0) {
        alert("Please write a fact!");
        return;
      }
      if (source.length != 0 && !isValidUrl(source)) {
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

function CategoryFilter({ setCurrentCategory }) {
  const CATEGORIES = useCategories();
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
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
              onClick={() => setCurrentCategory(cat.name)}
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
