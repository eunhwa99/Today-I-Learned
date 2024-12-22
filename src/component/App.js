import { useState, useEffect, useRef } from "react";
import "../css/style.css";
import { CategoriesProvider, useCategories } from "./CategoriesContext";
import { SAVEDATA, FETCHDATA } from "./Router.js";
import FactList from "./ItemList.js";
import Pagination from "./Pagination.js";

var pageSize = 5;
// App component ->  앞 글자가 대문자 (naming convention)
function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalElements = useRef(0);
  const [currentCategory, setCurrentCategory] = useState("all");

  const loadFacts = async () => {
    const data = await FETCHDATA(currentPage, pageSize, currentCategory);
    setFacts(data.items);
    totalElements.current = data.totalCount;
  };

  useEffect(() => {
    totalElements.current = 0;
    if (currentPage !== 0) setCurrentPage(0);
    else loadFacts();
  }, [currentCategory]);

  useEffect(() => {
    loadFacts();
  }, [currentPage]);
  console.log(facts);

  return (
    <CategoriesProvider>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          facts={facts}
          currentPage={currentPage}
          setFacts={setFacts}
          setShowForm={setShowForm}
          setCurrentPage={setCurrentPage}
          setCurrentCategory={setCurrentCategory}
          totalElements={totalElements}
        />
      ) : null}

      <main className="main">
        <div className="content">
          <CategoryFilter
            setCurrentCategory={setCurrentCategory}
            setFacts={setFacts}
          />
          <FactList
            facts={facts}
            setFacts={setFacts}
            currentPage={currentPage}
            currentCategory={currentCategory}
            totalElements={totalElements}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalElements={totalElements.current}
          pageSize={pageSize}
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

function NewFactForm({
  setFacts,
  setShowForm,
  currentPage,
  setCurrentPage,
  setCurrentCategory,
  totalElements,
}) {
  const CATEGORIES = useCategories();
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  const textLength = text.length;

  const saveFacts = async (newFact) => {
    const data = await SAVEDATA(newFact);
    totalElements.current += 1;
    if (currentPage == 0) {
      // DB에서 꺼내오는 게 아니라 메모리에서 수동 조작
      setFacts((prevFacts) => {
        // 새로운 데이터를 추가하고, pageSize개 이상이면 가장 오래된 아이템을 삭제
        const updatedFacts = [data.item, ...prevFacts];

        if (updatedFacts.length > pageSize) {
          updatedFacts.pop(); // 배열의 마지막 요소(가장 오래된 아이템) 삭제
        }

        return updatedFacts;
      });
    }
    setCurrentPage(0); // DB에서 로드 후 페이지 0으로 설정
  };

  function handleSubmit(e) {
    e.preventDefault(); // once form submitted, the page will reload everything, so prevent this!

    if (text && isValidUrl(source) && category && textLength <= 200) {
      const today = new Date();

      const newFact = {
        id: "",
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindBlowing: 0,
        createdIn: "",
      };

      saveFacts(newFact);
      setCurrentCategory(category);
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
