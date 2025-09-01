// app/explore/page.js (Server Component)
import { CREATORS, CATEGORIES } from "@/lib/creators";
import CreatorGrid from "../../components/CreatorGrid";
import styles from "@/styles/explore.module.css";

export const metadata = { title: "Explore - MyFans" };

export default function ExplorePage({ searchParams }) {
    const q = (searchParams?.q || "").toString().trim().toLowerCase();
    const category = (searchParams?.category || "All").toString();

    const filtered = CREATORS.filter((c) => {
        const hitQ = !q || [c.name, c.handle, c.tag].some((v) => v.toLowerCase().includes(q));
        const hitCat = category === "All" || c.tag === category;
        return hitQ && hitCat;
    });

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Explore</h1>

            {/* 카테고리 탭 */}
            <nav className={styles.tabs} aria-label="Categories">
                {CATEGORIES.map((cat) => {
                    const url = new URLSearchParams({ ...(q && { q }), category: cat }).toString();
                    const active = cat === category;
                    return (
                        <a
                            key={cat}
                            className={`${styles.tab} ${active ? styles.active : ""}`}
                            href={`/explore?${url}`}
                        >
                            {cat}
                        </a>
                    );
                })}
            </nav>

            {/* 검색 바 (Explore 내부용) */}
            <form className={styles.search} method="get" action="/explore" role="search" aria-label="Search creators">
                <input name="q" defaultValue={q} placeholder="Search creators, tags..." />
                <input type="hidden" name="category" value={category} />
                <button type="submit">Search</button>
            </form>

            {/* 결과 */}
            {filtered.length === 0 ? (
                <p className={styles.empty}>No results. Try another keyword or category.</p>
            ) : (
                <CreatorGrid creators={filtered} />
            )}
        </div>
    );
}
