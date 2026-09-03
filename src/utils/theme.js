export function getInitialTheme() {
  return localStorage.getItem("theme") || "light";
}

export function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}
