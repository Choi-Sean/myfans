// components/Header.jsx
"use client"; // 테마 토글은 클라이언트에서 동작해야 함

import { useEffect, useState } from "react";
import styles from "@/styles/header.module.css";

export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // 초기값: 시스템 설정 or localStorage
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header className={styles.nav}>
      <a className={styles.logo} href="/">
        MyFans
      </a>

      <form
        className={styles.search}
        method="get"
        action="/explore"
        role="search"
        aria-label="Search creators"
      >
        <input type="search" name="q" placeholder="Search creators, tags..." />
        <button type="submit" aria-label="Search">
          🔍
        </button>
      </form>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeBtn}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <a className={styles.link} href="/login">
          Log in
        </a>
        <a className={styles.btnPrimary} href="/signup">
          Sign up
        </a>
      </div>
    </header>
  );
}
