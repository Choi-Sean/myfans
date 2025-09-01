import styles from "@/styles/dashboard.module.css";

export default function KpiCards({ kpis }) {
  const fmt = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return (
    <section className={styles.kpis} aria-label="Key metrics">
      <div className={styles.card}>
        <p className={styles.kpiLabel}>Gross</p>
        <p className={styles.kpiValue}>${fmt(kpis.gross)}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.kpiLabel}>Net</p>
        <p className={styles.kpiValue}>${fmt(kpis.net)}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.kpiLabel}>Subscribers</p>
        <p className={styles.kpiValue}>{fmt(kpis.subscribers)}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.kpiLabel}>MRR</p>
        <p className={styles.kpiValue}>${fmt(kpis.mrr)}</p>
      </div>
    </section>
  );
}
