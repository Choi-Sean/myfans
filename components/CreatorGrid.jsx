// app/components/CreatorGrid.jsx
import Image from "next/image";
import styles from "@/styles/main.module.css";

export default function CreatorGrid({ creators = [] }) {
  return (
    <section className={styles.grid}>
      {creators.map((c) => (
        <article className={styles.card} key={c.id}>
          <a className={styles.cover} href={`/c/${c.handle.slice(1)}`} aria-label={`${c.name} profile`}>
            <Image
              src={c.cover}
              alt={`${c.name} cover`}
              width={800}
              height={600}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzE1MTYxYSIvPjwvc3ZnPg=="
            />
            <div className={styles.lock}><span>Exclusive</span></div>
          </a>

          <div className={styles.body}>
            <Image
              className={styles.avatar}
              src={c.avatar}
              alt={`${c.name} avatar`}
              width={44}
              height={44}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiBmaWxsPSIjMDAwIi8+PC9zdmc+"
            />
            {/* ...나머지 동일 */}
          </div>
        </article>
      ))}
    </section>
  );
}
