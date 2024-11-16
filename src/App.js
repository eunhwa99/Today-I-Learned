import { Fragment } from "react";
import "./style.css";
const CATEGORIES = [
  { name: "technology", color: "#3b82ff" },
  { name: "science", color: "##16a34a" },
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
  const appTitle = "Today I Learned";
  return (
    <>
      {/* html: class -> jsx: className */}
      <header className="header">
        <div className="logo">
          <img
            src="logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
          <h1>{appTitle}</h1>
        </div>

        <button className="btn btn-large btn-open">Share a fact</button>
      </header>

      <NewFactForm />

      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

function NewFactForm() {
  return <form className="fact-form">Fact form</form>;
}

function CategoryFilter() {
  return <aside>Category filter</aside>;
}

function FactList() {
  const facts = initialFacts;

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
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
                backgroundColor: CATEGORIES.find(
                  (cat) => cat.name === fact.category
                ).color,
              }}
            >
              {fact.category}
            </span>
            <div className="vote-buttons">
              <button>👍 {fact.votesInteresting}</button>
              <button>❤️ {fact.votesMindBlowing}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default App;
