import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Shop from "./pages/Shop";
import { getInitialTheme, setTheme } from "./utils/theme";

function App() {
  const [darkMode, setDarkMode] = useState(getInitialTheme() === "dark");

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Navigate to="/works" replace />} />
        <Route path="/works" element={<Works />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
