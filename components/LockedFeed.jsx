// app/components/LockedFeed.jsx
import styles from "@/styles/feed.module.css";

export default function LockedFeed({ posts = [], price, handle }) {
  return (
    <section className={styles.feed}>
      <h2 className={styles.title}>Posts</h2>
      <ul className={styles.list}>
        {posts.map((p) => (
          <li key={p.id} className={styles.card}>
            <div className={styles.lockRow}>
              <span className={styles.lockBadge}>Locked</span>
              <a
                className={styles.subscribe}
                href={`/subscribe/${handle.slice(1)}`}
              >
                Subscribe {price}
              </a>
            </div>
            <h3 className={styles.postTitle}>{p.title}</h3>
            <p className={styles.preview}>{p.preview}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
