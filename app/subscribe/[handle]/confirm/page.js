// app/subscribe/[handle]/confirm/page.js
import { fetchCreatorByHandle } from "@/lib/api";
import styles from "@/styles/confirm.module.css";
import Link from "next/link";

export const metadata = { title: "Subscription Confirmed - MyFans" };

export default async function ConfirmPage({ params, searchParams }) {
    const handle = params.handle.startsWith("@") ? params.handle.slice(1) : params.handle;
    const creator = await fetchCreatorByHandle(handle, { revalidate: 60 });

    const displayName = (searchParams?.displayName || "").toString();
    const plan = (searchParams?.plan || "monthly").toString();

    if (!creator) {
        return (
            <div className={styles.wrap}>
                <h1>Creator not found</h1>
                <p><Link href="/explore">Go to Explore</Link></p>
            </div>
        );
    }

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Welcome, {displayName || "subscriber"}! 🎉</h1>
            <p className={styles.lead}>
                You&apos;re now subscribed to <strong>{creator.name}</strong> ({creator.handle}) on the <strong>{plan}</strong> plan.
            </p>
            <div className={styles.box}>
                <img className={styles.avatar} src={creator.avatar} alt={`${creator.name} avatar`} />
                <dl className={styles.details}>
                    <div><dt>Creator</dt><dd>{creator.name}</dd></div>
                    <div><dt>Handle</dt><dd>{creator.handle}</dd></div>
                    <div><dt>Plan</dt><dd>{plan}</dd></div>
                </dl>
            </div>

            <p className={styles.actions}>
                <Link className={styles.primary} href={`/c/${handle}`}>Go to creator page</Link>
            </p>
        </div>
    );
}
