import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Works from "./pages/Works";
import { getInitialTheme, setTheme } from "./utils/theme";

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme() === "dark");

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <BrowserRouter>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
