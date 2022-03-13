import { useState } from "react";
export function DarkModeBtn() {
  const sun =
    "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
  const moon =
    "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg";
  const [icon, setIcon] = useState<string>(sun);
  const [changeClass, setChangeClass] = useState<string>("change");

  const setLight = () => {
    document.documentElement.classList.remove("dark");
    setTimeout(() => {
      setChangeClass("");
    });
    setChangeClass("change");
    setIcon(sun);
    localStorage.theme = "dark";
  };

  const setDark = () => {
    document.documentElement.classList.add("dark");
    setTimeout(() => {
      setChangeClass("");
    });
    setChangeClass("change");
    setIcon(moon);
    localStorage.theme = "light";
  };

  const darkMode = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDark();
    } else {
      setLight();
    }
  };
  return (
    <div
      className="w-20 h-20 rounded-[50%] fixed bottom-5 right-5 
      flex justify-center items-center transition-all duration-500 hover:opacity-80
      dark-mode-button"
      onClick={darkMode}
    >
      <img id="theme-icon" className={changeClass} src={icon} alt="ERR" />
    </div>
  );
}
