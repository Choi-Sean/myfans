import styles from "@/styles/static.module.css";

export const metadata = { title: "About - MyFans" };

export default function AboutPage() {
    const updated = new Date().toISOString().slice(0, 10);
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>About MyFans</h1>
            <p className={styles.updated}>Last updated: {updated}</p>

            <section className={styles.section}>
                <h2>Our mission</h2>
                <p>
                    MyFans는 크리에이터가 자신의 팬과 직접 연결되고, 안정적으로 수익을 창출하도록 돕는
                    구독형 플랫폼 데모입니다.
                </p>
            </section>

            <section className={styles.section}>
                <h2>What we&apos;re building</h2>
                <ul>
                    <li>구독 기반 콘텐츠 제공</li>
                    <li>크리에이터 수익 대시보드</li>
                    <li>안전한 결제 및 정산 플로우</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>Contact</h2>
                <p>
                    문의: <a className="inline" href="mailto:support@myfans.example">support@myfans.example</a>
                </p>
            </section>
        </div>
    );
}
