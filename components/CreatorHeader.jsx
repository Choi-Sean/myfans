// components/CreatorHeader.jsx
import Image from "next/image";
import styles from "@/styles/creator.module.css";

export default function CreatorHeader({ creator }) {
  const coverW = 1200,
    coverH = 600; // 대략 비율 고정
  const avatarW = 84,
    avatarH = 84;

  return (
    <section className={styles.header}>
      <div className={styles.coverWrap}>
        <Image
          className={styles.cover}
          src={creator.cover}
          alt={`${creator.name} cover`}
          width={coverW}
          height={coverH}
          priority // 프로필 상단: 초기 로딩 우선
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      <div className={styles.profileRow}>
        <Image
          className={styles.avatar}
          src={creator.avatar}
          alt={`${creator.name} avatar`}
          width={avatarW}
          height={avatarH}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODQiIGhlaWdodD0iODQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9Ijg0IiBoZWlnaHQ9Ijg0IiBmaWxsPSIjMjAyMDI0Ii8+PC9zdmc+"
        />

        <div className={styles.meta}>
          <h1 className={styles.name}>{creator.name}</h1>
          <p className={styles.handle}>{creator.handle}</p>
          {creator.tag && <span className={styles.tag}>{creator.tag}</span>}
        </div>

        <div className={styles.actions}>
          <a
            className={styles.primary}
            href={`/subscribe/${creator.handle.slice(1)}`}
          >
            Subscribe {creator.price}
          </a>
          <a
            className={styles.ghost}
            href={`/message/${creator.handle.slice(1)}`}
          >
            Message
          </a>
        </div>
      </div>

      {creator.bio && <p className={styles.bio}>{creator.bio}</p>}
    </section>
  );
}
