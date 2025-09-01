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

// 대시보드 초기 데이터 (KPI/차트/플랜)
export async function getCreatorDashboard(creatorId, { revalidate = 30 } = {}) {
    if (!API_BASE) {
        // ★ 더미 데이터
        return {
            kpis: { gross: 3280.75, net: 2811.42, subscribers: 124, mrr: 1998.00 },
            earnings: [
                { period: "2025-03", gross: 820, net: 700 },
                { period: "2025-04", gross: 910, net: 770 },
                { period: "2025-05", gross: 1020, net: 860 },
                { period: "2025-06", gross: 980, net: 820 },
                { period: "2025-07", gross: 1120, net: 940 },
                { period: "2025-08", gross: 1240, net: 1020 },
            ],
            plans: [
                { id: "p_mo", name: "Monthly", interval: "Monthly", price: 9.99, currency: "USD", active: true },
                { id: "p_yr", name: "Yearly", interval: "Yearly", price: 99.00, currency: "USD", active: true },
            ],
        };
    }

    // ★ .NET Core 예시 (준비되면 주석 해제)
    // const res = await fetch(`${API_BASE}/creators/${creatorId}/dashboard`, {
    //   next: { revalidate },
    //   headers: { Accept: "application/json" }
    // });
    // if (!res.ok) throw new Error("Failed to load dashboard");
    // return await res.json();
}

// 플랜 생성 (UI 데모용 더미)
export async function createPlan(creatorId, body, token) {
    if (!API_BASE) {
        return { ok: true, plan: { id: `p_${Date.now()}`, active: true, currency: "USD", ...body } };
    }
    // const res = await fetch(`${API_BASE}/creators/${creatorId}/plans`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    //   body: JSON.stringify(body)
    // });
    // return await res.json();
}

// 플랜 업데이트 (가격/활성화)
export async function updatePlan(planId, body, token) {
    if (!API_BASE) {
        return { ok: true, plan: { id: planId, ...body } };
    }
    // const res = await fetch(`${API_BASE}/plans/${planId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    //   body: JSON.stringify(body)
    // });
    // return await res.json();
}

// (추가) 크리에이터 일별 분석 데이터
export async function getCreatorAnalytics(creatorId, { days = 365, revalidate = 0 } = {}) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  
    if (!API_BASE) {
      // 더미: 최근 N일 일별 데이터 생성
      const today = new Date();
      const arr = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
  
        // 간단한 패턴 + 랜덤
        const base = 50 + Math.sin(i / 15) * 20;
        const newFans = Math.max(0, Math.round(base / 10 + (Math.random() * 3 - 1.5)));
        const churned = Math.max(0, Math.round(base / 12 + (Math.random() * 2 - 1)));
        const gross = Math.max(0, Math.round((base * 3 + Math.random() * 40) * 100) / 100);
  
        arr.push({ date: d.toISOString().slice(0, 10), newFans, churned, gross });
      }
      return arr;
    }
  
    // .NET API 준비되면 주석 해제:
    // const res = await fetch(`${API_BASE}/api/creators/${creatorId}/analytics?days=${days}`, {
    //   next: { revalidate },
    //   headers: { Accept: "application/json" },
    // });
    // if (!res.ok) throw new Error("Failed to load analytics");
    // return res.json();
  }