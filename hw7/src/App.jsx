import RandomVerse from "./components/RandomVerse";
import SpecificVerse from "./components/SpecificVerse";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Bible Verse Finder</h1>
      <div className="content">
        <RandomVerse />
        <SpecificVerse />
      </div>
    </div>
  );
}

export default App;