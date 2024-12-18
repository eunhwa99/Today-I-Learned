import { useState, useEffect } from "react";
import "../css/style.css";
import Modal from "./Modal";
import { FETCHDATA, SAVEDATA, UPDATEDATA, DELETEDATA } from "./Router.js";

const CATEGORIES = [
  { name: "technology", color: "#3b82ff" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#197316" },
  { name: "news", color: "#8b5cf6" },
];

// App component ->  앞 글자가 대문자 (naming convention)
function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  // 컴포넌트가 마운트될 때 아이템 리스트를 가져옴
  useEffect(() => {
    FETCHDATA(setFacts);
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 호출되도록 함

  return (
    <>
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
        />
      </main>
    </>
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
  try {
    new URL(url); // URL 객체로 변환
    return true; // 유효한 URL
  } catch (e) {
    return false; // 유효하지 않은 URL
  }
}

function NewFactForm({ setFacts, setShowForm }) {
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

function CategoryFilter({ setCurrentCategory, setFacts }) {
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

function FactList({ facts, currentCategory, setFacts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts
          .filter(
            (f) =>
              currentCategory == "all" ||
              currentCategory.toLowerCase() === f.category
          )
          .map((f) => (
            <Fact setFacts={setFacts} fact={f} />
          ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [intertesting, setInteresting] = useState(
    parseInt(fact.votesInteresting, 10)
  );
  const [mindBlowing, setMindBlowing] = useState(
    parseInt(fact.votesMindBlowing, 10)
  );
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈 상태 관리
  const [userNote, setUserNote] = useState(""); // 사용자가 추가하는 노트

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleNoteChange = (e) => setUserNote(e.target.value);

  const handleRightClick = (event, id) => {
    event.preventDefault();
    const confirmDelete = window.confirm("Delete?");
    if (confirmDelete) {
      DELETEDATA(id, setFacts);
    }
  };

  // 상태 업데이트와 서버 요청을 순차적으로 처리하는 방식

  const handleInterestingClick = (factId) => {
    // 상태 업데이트
    setInteresting((prev) => {
      const newCount = prev + 1; // 이전 값에 1을 더한 새로운 값
      UPDATEDATA(factId, "votesInteresting", newCount); // 상태가 업데이트된 후에 서버에 보내기
      return newCount; // 새 상태 값 반환
    });
  };

  const hanndleMindBlowingClick = (factId) => {
    // 상태 업데이트
    setInteresting((prev) => {
      const newCount = prev + 1; // 이전 값에 1을 더한 새로운 값
      UPDATEDATA(factId, "votesMindBlowing", newCount); // 상태가 업데이트된 후에 서버에 보내기
      return newCount; // 새 상태 값 반환
    });
  };

  return (
    <>
      <li
        className="fact"
        onContextMenu={(event) => handleRightClick(event, fact.id)}
      >
        <p onClick={openModal}>
          {fact.text}
          <a
            className="source"
            href={fact.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            (Source)
          </a>
        </p>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === fact.category
            ).color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button onClick={() => handleInterestingClick(fact.id)}>
            👍 {intertesting}
          </button>
          <button onClick={() => hanndleMindBlowingClick(fact.id)}>
            ❤️ {mindBlowing}
          </button>
        </div>
      </li>

      {/* 모달 */}
      {modalOpen && (
        <Modal
          fact={fact}
          userNote={userNote}
          onNoteChange={handleNoteChange}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default App;
