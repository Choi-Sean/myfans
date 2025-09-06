// components/Footer.jsx
import styles from "@/styles/footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <nav className={styles.right} aria-label="Footer">
        <a href="/about">About</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a
          href="https://www.linkedin.com/in/sean1991"
          target="_blank"
          rel="noopener noreferrer me"
          aria-label="Sean LinkedIn (새 창)"
        >
          LinkedIn ↗
        </a>
      </nav>
      <p className={styles.copy}>© {new Date().getFullYear()} MyFans, Inc.</p>
    </footer>
  );
}
