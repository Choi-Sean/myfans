// components/Main.jsx
import styles from "@/styles/main.module.css";

const creators = [
  {
    id: 1,
    name: "Ariana Kim",
    handle: "@arianak",
    price: "$9.99/mo",
    cover: "https://picsum.photos/id/1011/800/600",
    avatar: "https://picsum.photos/id/1005/96/96",
    tag: "Fitness",
  },
  {
    id: 2,
    name: "Jay Park",
    handle: "@jaypark",
    price: "$14.99/mo",
    cover: "https://picsum.photos/id/1012/800/600",
    avatar: "https://picsum.photos/id/1001/96/96",
    tag: "Music",
  },
  {
    id: 3,
    name: "Mina Lee",
    handle: "@minalee",
    price: "$7.99/mo",
    cover: "https://picsum.photos/id/1015/800/600",
    avatar: "https://picsum.photos/id/1012/96/96",
    tag: "Lifestyle",
  },
  {
    id: 4,
    name: "Leo Choi",
    handle: "@leoch",
    price: "$5.99/mo",
    cover: "https://picsum.photos/id/1003/800/600",
    avatar: "https://picsum.photos/id/1027/96/96",
    tag: "Gaming",
  },
  {
    id: 5,
    name: "Sora Han",
    handle: "@sorahan",
    price: "$12.99/mo",
    cover: "https://picsum.photos/id/1025/800/600",
    avatar: "https://picsum.photos/id/1021/96/96",
    tag: "Beauty",
  },
  {
    id: 6,
    name: "Daniel Yoo",
    handle: "@dnyoo",
    price: "$8.99/mo",
    cover: "https://picsum.photos/id/1020/800/600",
    avatar: "https://picsum.photos/id/1011/96/96",
    tag: "Cooking",
  },
];

export default function Main() {
  return (
    <main>
      <section className={styles.hero}>
        <h1>
          Connect with your favorite creators on <span>MyFans</span>
        </h1>
        <p>
          Subscribe for exclusive posts, livestreams, and behind-the-scenes
          content.
        </p>
        <div className={styles.heroActions}>
          <a className={styles.btnPrimary} href="/signup">
            Create free account
          </a>
          <a className={styles.btnGhost} href="/create">
            Become a creator
          </a>
        </div>
      </section>

      <section className={styles.grid}>
        {creators.map((c) => (
          <article className={styles.card} key={c.id}>
            <a
              className={styles.cover}
              href={`/c/${c.handle.slice(1)}`}
              aria-label={`${c.name} profile`}
            >
              <img src={c.cover} alt={`${c.name} cover`} />
              <div className={styles.lock}>
                <span>Exclusive</span>
              </div>
            </a>
            <div className={styles.body}>
              <img
                className={styles.avatar}
                src={c.avatar}
                alt={`${c.name} avatar`}
              />
              <div className={styles.meta}>
                <h3 className={styles.name}>{c.name}</h3>
                <p className={styles.handle}>{c.handle}</p>
              </div>
              <span className={styles.tag}>{c.tag}</span>
              <div className={styles.cta}>
                <span className={styles.price}>{c.price}</span>
                <a
                  className={styles.btnSmall}
                  href={`/subscribe/${c.handle.slice(1)}`}
                >
                  Subscribe
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
