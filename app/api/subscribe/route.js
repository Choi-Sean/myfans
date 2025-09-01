// app/api/subscribe/route.js
import { NextResponse } from "next/server";

// (미래) .NET Core API 주소
const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // 예: https://api.myfans.example.com/api

export async function POST(req) {
    const form = await req.formData();
    const payload = {
        handle: form.get("handle"),
        plan: form.get("plan") || "monthly",
        displayName: form.get("displayName"),
        email: form.get("email"),
        card: form.get("card"),
        exp: form.get("exp"),
        cvc: form.get("cvc"),
        zip: form.get("zip"),
    };

    // 간단 검증
    if (!payload.handle || !payload.email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // (현재) 더미 처리: 성공 가정 후 프론트 확인 페이지로 리다이렉트
    // (미래) .NET Core 결제/구독 API 호출로 교체
    if (!API_BASE) {
        const qs = new URLSearchParams({
            plan: payload.plan,
            displayName: payload.displayName || "",
        }).toString();
        return NextResponse.redirect(new URL(`/subscribe/${payload.handle}/confirm?${qs}`, req.url));
    }

    // (미래) .NET Core API 호출 예시
    // const res = await fetch(`${API_BASE}/subscribe`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", Accept: "application/json" },
    //   body: JSON.stringify(payload),
    //   cache: "no-store",
    // });
    // if (!res.ok) {
    //   const err = await res.json().catch(() => ({}));
    //   return NextResponse.json(err || { error: "Subscription failed" }, { status: 400 });
    // }
    // const data = await res.json();
    // return NextResponse.redirect(new URL(`/subscribe/${payload.handle}/confirm?plan=${payload.plan}`, req.url));
}
