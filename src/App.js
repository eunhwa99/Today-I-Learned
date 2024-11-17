import { Fragment } from "react";
import { useState } from "react";
import "./style.css";
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

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 8,
    votesMindBlowing: 3,
    votesFalse: 1,
    createdIn: 2024,
  },
  {
    id: 2,
    text: " Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 23,
    votesMindBlowing: 3,
    votesFalse: 1,
    createdIn: 2022,
  },
];

// App component ->  앞 글자가 대문자 (naming convention)
function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm /> : null}

      <main className="main">
        <CategoryFilter />
        <FactList />
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
function NewFactForm() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  return (
    <form className="fact-form">
      <input
        type="text"
        placeholder="What's new?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>200</span>
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
      <button class="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li class="category">
          <button class="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{
                backgroundColor: cat.color,
              }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList() {
  const facts = initialFacts;

  return (
    <section>
      <ul className="facts-list">
        {facts.map((f) => (
          <Fact key={f.id} fact={f} />
        ))}
      </ul>
    </section>
  );
}

function Fact(props) {
  console.log("props", props);
  const { fact } = props; // unpack!
  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>❤️ {fact.votesMindBlowing}</button>
      </div>
    </li>
  );
}
export default App;
