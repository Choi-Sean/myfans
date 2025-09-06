import styles from "@/styles/static.module.css";

export const metadata = { title: "Terms of Service - MyFans" };

export default function TermsPage() {
    const updated = new Date().toISOString().slice(0, 10);
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Terms of Service</h1>
            <p className={styles.updated}>Last updated: {updated}</p>

            <section className={styles.section}>
                <h2>1. Acceptance</h2>
                <p>본 서비스를 사용함으로써 귀하는 본 약관에 동의합니다.</p>
            </section>

            <section className={styles.section}>
                <h2>2. Accounts</h2>
                <ul>
                    <li>사용자는 정확한 정보를 제공해야 합니다.</li>
                    <li>계정 보안은 사용자 책임입니다.</li>
                    <li>정책 위반 시 서비스 이용이 제한될 수 있습니다.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>3. Subscriptions & Payments</h2>
                <p>구독, 결제, 환불 정책은 결제 파트너 및 지역 규정에 따릅니다.</p>
            </section>

            <section className={styles.section}>
                <h2>4. Content</h2>
                <p>사용자 생성 콘텐츠는 해당 사용자의 책임이며, 불법/침해 콘텐츠는 금지됩니다.</p>
            </section>

            <section className={styles.section}>
                <h2>5. Liability</h2>
                <p>법이 허용하는 범위 내에서 서비스는 “있는 그대로” 제공됩니다.</p>
            </section>

            <section className={styles.section}>
                <h2>6. Changes</h2>
                <p>약관은 변경될 수 있으며, 개정 시 본 페이지에 공지됩니다.</p>
            </section>
        </div>
    );
}
