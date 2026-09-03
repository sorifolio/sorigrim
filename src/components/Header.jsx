import Links from "./Links";

function Header({ darkMode, setDarkMode }) {
  return (
    <header>
      <h1>소리그림</h1>
      <p>자연과 동물을 그리는 일러스트레이터</p>
      <Links />
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="테마 변경"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}

export default Header;
