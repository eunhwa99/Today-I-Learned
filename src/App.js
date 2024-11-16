import { Fragment } from "react";
import "./style.css";

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
  return <section>Facts list</section>;
}
export default App;
