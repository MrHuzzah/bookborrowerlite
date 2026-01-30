import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import BookLibrary from "./BookLibrary/BookLibrary";
import BookAdd from "./BookAdd/BookAdd";
import BookRate from "./BookRate/BookRate";

function App() {
  const [monoMode, setMonoMode] = useState(
    localStorage.getItem("monoMode") === "true",
  );

  useEffect(() => {
    localStorage.setItem("monoMode", monoMode);
  }, [monoMode]);

  return (
    <Router>
      <div className={`container ${monoMode ? "mono" : ""}`}>
        {/* Global toggle (header / navbar later) */}
        <button
          onClick={() => setMonoMode(!monoMode)}
          style={{ marginBottom: "1rem" }}
        >
          {monoMode ? "Disable Monochrome" : "Enable Monochrome"}
        </button>

        <Routes>
          <Route path="/" element={<BookLibrary />} />
          <Route path="/add" element={<BookAdd />} />
          <Route path="/rate/:id" element={<BookRate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
