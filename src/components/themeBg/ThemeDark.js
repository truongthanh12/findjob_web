import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const ThemeDark = () => {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('theme')) || false);

  useEffect(() => {
    if (isDark) {
      let darkTheme = document.getElementsByClassName("site-wrap");
      darkTheme[0].classList.add("dark");
      localStorage.setItem("theme", (isDark));
    } else {
      let darkTheme = document.getElementsByClassName("site-wrap");
      darkTheme[0].classList.remove("dark");
      localStorage.setItem("theme", (isDark));
    }
  }, [isDark]);

  return (
    <div className="toggleTheme">
      <Toggle
        className="DarkToggle"
        checked={isDark}
        onChange={(event) => setIsDark(event.target.checked)}
        icons={{ checked: "🌜", unchecked: "🌞" }}
        aria-label="Dark mode"
      />
    </div>
  );
};

export default ThemeDark;
