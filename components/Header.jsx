"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "@/styles/header.module.css";

export default function Header() {
  // 테마 & 역할
  const [theme, setTheme] = useState("light");
  const [audience, setAudience] = useState("user"); // "user" | "creator"

  // 모바일 메뉴
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // theme init
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    // audience init
    const savedAudience = localStorage.getItem("audience") || "user";
    setAudience(savedAudience);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const switchAudience = (next) => {
    setAudience(next);
    localStorage.setItem("audience", next);
  };

  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setMenuOpen(false);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, onKeyDown]);

  const loginHref = audience === "creator" ? "/creator/login" : "/user/login";
  const signupHref = audience === "creator" ? "/creator/signup" : "/user/signup";
  const dashboardHref = audience === "creator" ? "/creator/dashboard" : "/user/dashboard";

  return (
    <>
      <header className={styles.nav}>
        <a className={styles.logo} href="/">MyFans</a>

        {/* 데스크톱: 중앙 네비 */}
        <nav className={styles.centerNav} aria-label="Main">
          <a href="/explore">Explore</a>
        </nav>

        {/* 데스크톱: 검색 */}
        <form className={styles.search} method="get" action="/explore" role="search" aria-label="Search creators">
          <input type="search" name="q" placeholder="Search creators, tags..." />
          <button type="submit" aria-label="Search">🔍</button>
        </form>

        {/* 데스크톱: 전체 액션 */}
        <div className={styles.actions}>
          <div className={styles.roleSwitch} role="tablist" aria-label="Audience">
            <button
              type="button"
              role="tab"
              aria-selected={audience === "user"}
              className={`${styles.roleBtn} ${audience === "user" ? styles.roleActive : ""}`}
              onClick={() => switchAudience("user")}
            >
              User
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={audience === "creator"}
              className={`${styles.roleBtn} ${audience === "creator" ? styles.roleActive : ""}`}
              onClick={() => switchAudience("creator")}
            >
              Creator
            </button>
          </div>

          <a className={styles.link} href={loginHref}>Log in</a>
          <a className={styles.btnPrimary} href={signupHref}>Sign up</a>
          <a className={styles.link} href={dashboardHref}>Dashboard</a>

          <button type="button" onClick={toggleTheme} className={styles.themeBtn} aria-label="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* 모바일: 오른쪽 로그인 + 버거 토글 */}
        <div className={styles.mobileGroup}>
          <a className={styles.loginMobile} href={loginHref}>Log in</a>
          <button
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* 모바일 드로어 & 백드롭 */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.show : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <aside
        id="mobile-menu"
        className={`${styles.drawer} ${menuOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className={styles.drawerTop}>
          <span className={styles.drawerTitle}>Menu</span>
          <button className={styles.close} aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>

        <div className={styles.drawerSection}>
          <div className={styles.roleSwitch} role="tablist" aria-label="Audience">
            <button
              type="button"
              role="tab"
              aria-selected={audience === "user"}
              className={`${styles.roleBtn} ${audience === "user" ? styles.roleActive : ""}`}
              onClick={() => switchAudience("user")}
            >
              User
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={audience === "creator"}
              className={`${styles.roleBtn} ${audience === "creator" ? styles.roleActive : ""}`}
              onClick={() => switchAudience("creator")}
            >
              Creator
            </button>
          </div>
        </div>

        <nav className={styles.drawerNav}>
          <a href="/explore" onClick={() => setMenuOpen(false)}>Explore</a>
          <a href={dashboardHref} onClick={() => setMenuOpen(false)}>Dashboard</a>
          <a className={styles.primaryLink} href={signupHref} onClick={() => setMenuOpen(false)}>Sign up</a>
          <button type="button" className={styles.themeBtn} onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>

        <form
          className={styles.searchMobile}
          method="get"
          action="/explore"
          role="search"
          aria-label="Search creators"
          onSubmit={() => setMenuOpen(false)}
        >
          <input name="q" placeholder="Search creators, tags..." />
          <button type="submit">Search</button>
        </form>
      </aside>
    </>
  );
}
