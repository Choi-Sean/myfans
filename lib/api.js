// lib/api.js
import { CREATORS } from "./creators";

// ★ 나중에 .NET Core로 교체할 베이스 URL
// 예: NEXT_PUBLIC_API_BASE="https://api.myfans.example.com"
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/**
 * 서버 컴포넌트에서 호출 안전.
 * 나중에 API가 준비되면 아래 fetch 로직의 주석을 해제하고 교체하면 됨.
 */
export async function fetchCreatorByHandle(handle, { revalidate = 60 } = {}) {
    if (!API_BASE) {
        // (현재) 더미: lib/creators에서 조회
        const h = handle.startsWith("@") ? handle : `@${handle}`;
        return CREATORS.find((c) => c.handle.toLowerCase() === h.toLowerCase()) || null;
    }

    // (미래) .NET Core API 예시
    // const res = await fetch(`${API_BASE}/creators/${encodeURIComponent(handle)}`, {
    //   next: { revalidate }, // ISR 캐시
    //   headers: { "Accept": "application/json" }
    // });
    // if (!res.ok) return null;
    // return await res.json();

    return null;
}

export async function fetchCreatorPosts(handle, { revalidate = 60 } = {}) {
    if (!API_BASE) {
        // (현재) 잠금된 더미 포스트
        return [
            { id: "p1", title: "Behind the scenes #1", locked: true, preview: "Teaser of exclusive content…" },
            { id: "p2", title: "Workout tips (Premium)", locked: true, preview: "3 moves to improve core…" },
            { id: "p3", title: "Live stream recap", locked: true, preview: "Highlights from last night…" },
        ];
    }

    // (미래) .NET Core API 예시
    // const res = await fetch(`${API_BASE}/creators/${encodeURIComponent(handle)}/posts`, {
    //   next: { revalidate },
    //   headers: { "Accept": "application/json" }
    // });
    // if (!res.ok) return [];
    // return await res.json();

    return [];
}
