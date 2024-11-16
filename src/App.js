// App component ->  앞 글자가 대문자 (naming convention)
function App() {
  return (
    // html: class -> jsx: className
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>

      <button className="btn btn-large btn-open">Share a fact</button>
    </header>
  );
}
export default App;
