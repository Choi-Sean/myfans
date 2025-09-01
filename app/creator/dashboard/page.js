// app/creator/dashboard/page.js (Server Component)
import styles from "@/styles/dashboard.module.css";
import KpiCards from "../../../components/dashboard/KpiCards";
import EarningsChart from "@/components/dashboard/EarningsChart";
import PlanManager from "@/components/dashboard/PlanManager";
import { getCreatorDashboard, getCreatorAnalytics } from "@/lib/api"

export const metadata = { title: "Creator Dashboard - MyFans" };

export default async function CreatorDashboardPage() {
    // TODO: 실제에선 세션에서 creatorId를 읽어오세요.
    const creatorId = "demo-creator-id";
    const { kpis, earnings, plans } = await getCreatorDashboard(creatorId, { revalidate: 30 });
    const analytics = await getCreatorAnalytics(creatorId, { days: 365 });

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Dashboard</h1>
            <KpiCards kpis={kpis} />
            <div className={styles.grid2}>
                <EarningsChart data={analytics} /> {/* 일별 시계열로 교체 */}
                <PlanManager creatorId={creatorId} initialPlans={plans} />
            </div>
        </div>
    );
}
