// components/Footer.jsx
import styles from "@/styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label="Footer">
        <a href="/about">About</a>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/help">Help</a>
      </nav>
      <p className={styles.copy}>© {new Date().getFullYear()} MyFans, Inc.</p>
    </footer>
  );
}
