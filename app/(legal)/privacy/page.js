import styles from "@/styles/static.module.css";

export const metadata = { title: "Privacy Policy - MyFans" };

export default function PrivacyPage() {
    const updated = new Date().toISOString().slice(0, 10);
    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.updated}>Last updated: {updated}</p>

            <section className={styles.section}>
                <h2>1. Data we collect</h2>
                <ul>
                    <li>계정 정보(이메일, 사용자명 등)</li>
                    <li>결제 관련 메타데이터(실 결제 정보는 결제대행사에 저장)</li>
                    <li>로그/분석 데이터(기기/브라우저, 접속 시간 등)</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>2. How we use data</h2>
                <ul>
                    <li>서비스 제공 및 운영</li>
                    <li>보안, 사기 방지, 고객 지원</li>
                    <li>법적 의무 준수</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>3. Sharing</h2>
                <p>법적 요구 또는 서비스 제공에 필요한 범위를 제외하고 개인 정보를 판매하지 않습니다.</p>
            </section>

            <section className={styles.section}>
                <h2>4. Your rights</h2>
                <p>데이터 열람/정정/삭제 요청은
                    <a className="inline" href="mailto:privacy@myfans.example"> privacy@myfans.example</a> 로 연락주세요.
                </p>
            </section>

            <section className={styles.section}>
                <h2>5. Retention & Security</h2>
                <p>데이터는 필요한 기간 동안만 보관하며, 합리적인 보안 조치를 적용합니다.</p>
            </section>
        </div>
    );
}
