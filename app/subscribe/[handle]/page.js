// app/subscribe/[handle]/page.js
import { fetchCreatorByHandle } from "@/lib/api";
import styles from "@/styles/subscribe.module.css";
import Link from "next/link";

export const metadata = { title: "Subscribe - MyFans" };

export default async function SubscribePage({ params, searchParams }) {
    const handle = params.handle.startsWith("@") ? params.handle.slice(1) : params.handle;
    const creator = await fetchCreatorByHandle(handle, { revalidate: 60 });

    if (!creator) {
        return (
            <div className={styles.wrap}>
                <h1>Creator not found</h1>
                <p>Go back to <Link href="/explore">Explore</Link>.</p>
            </div>
        );
    }

    const plan = (searchParams?.plan || "monthly").toString(); // 기본 monthly

    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <img className={styles.avatar} src={creator.avatar} alt={`${creator.name} avatar`} />
                <div className={styles.meta}>
                    <h1 className={styles.title}>Subscribe to {creator.name}</h1>
                    <p className={styles.handle}>{creator.handle}</p>
                </div>
            </header>

            <section className={styles.cards}>
                <a className={`${styles.card} ${plan === "monthly" ? styles.active : ""}`} href={`?plan=monthly`}>
                    <h3>Monthly</h3>
                    <p className={styles.price}>{creator.price}</p>
                    <p className={styles.note}>Cancel anytime</p>
                </a>
                <a className={`${styles.card} ${plan === "yearly" ? styles.active : ""}`} href={`?plan=yearly`}>
                    <h3>Yearly</h3>
                    <p className={styles.price}>
                        {/** 단순 표시용 – 나중에 .NET에서 실제 가격 계산 */}
                        {creator.price.replace("/mo", "")} × 12 → <strong>2달 할인</strong>
                    </p>
                    <p className={styles.note}>Best value</p>
                </a>
            </section>

            <form className={styles.form} method="post" action={`/api/subscribe`}>
                <input type="hidden" name="plan" value={plan} />
                <label className={styles.field}>
                    <span>Display name</span>
                    <input required name="displayName" placeholder="e.g. Sean" />
                </label>
                <label className={styles.field}>
                    <span>Email</span>
                    <input required type="email" name="email" placeholder="you@example.com" />
                </label>

                {/** 초기에는 더미 결제 – 카드 필드는 UI만 */}
                <div className={styles.payBox}>
                    <div className={styles.row}>
                        <label>
                            <span>Card number</span>
                            <input required name="card" placeholder="4242 4242 4242 4242" />
                        </label>
                    </div>
                    <div className={styles.row2}>
                        <label>
                            <span>Expiry</span>
                            <input required name="exp" placeholder="MM/YY" />
                        </label>
                        <label>
                            <span>CVC</span>
                            <input required name="cvc" placeholder="123" />
                        </label>
                        <label>
                            <span>ZIP</span>
                            <input required name="zip" placeholder="00000" />
                        </label>
                    </div>
                </div>

                <button className={styles.primary} type="submit">
                    Start subscription
                </button>
                <p className={styles.small}>
                    By subscribing, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
                </p>
            </form>

            <p className={styles.back}>
                <Link href={`/c/${handle}`}>← Back to profile</Link>
            </p>
        </div>
    );
}
