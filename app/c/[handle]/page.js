// app/c/[handle]/page.js
import { notFound } from "next/navigation";
import { fetchCreatorByHandle, fetchCreatorPosts } from "@/lib/api";
import CreatorHeader from "../../../components/CreatorHeader";
import LockedFeed from "../../../components//LockedFeed";
import styles from "@/styles/creator.module.css";

export async function generateMetadata({ params }) {
    const handle = params.handle;
    const creator = await fetchCreatorByHandle(handle, { revalidate: 60 });
    if (!creator) return { title: "Creator Not Found - MyFans" };
    return {
        title: `${creator.name} (${creator.handle}) - MyFans`,
        description: creator.bio || `Exclusive content by ${creator.name}`,
        openGraph: {
            title: `${creator.name} on MyFans`,
            images: [{ url: creator.cover, width: 1200, height: 600 }],
        },
    };
}

export default async function CreatorPage({ params }) {
    const handle = params.handle.startsWith("@") ? params.handle.slice(1) : params.handle;

    const creator = await fetchCreatorByHandle(handle, { revalidate: 60 });
    if (!creator) return notFound();

    const posts = await fetchCreatorPosts(handle, { revalidate: 60 });

    return (
        <div className={styles.wrap}>
            <CreatorHeader creator={creator} />
            <LockedFeed posts={posts} price={creator.price} handle={creator.handle} />
        </div>
    );
}
