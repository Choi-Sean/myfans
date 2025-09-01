"use client";

import { useMemo, useState } from "react";
import styles from "@/styles/dashboard.module.css";

/**
 * props.data: [{ date: "YYYY-MM-DD", newFans: number, churned: number, gross: number }]
 */
export default function EarningsChart({ data = [] }) {
  // 필터 상태
  const [metric, setMetric] = useState("gross"); // 'gross' | 'newFans' | 'churned'
  const [range, setRange] = useState("30d");     // 'today' | 'yesterday' | '7d' | '30d' | '90d' | '180d' | 'ytd'

  // 기간 필터링
  const filtered = useMemo(() => {
    if (!data?.length) return [];
    const today = new Date(); today.setHours(0,0,0,0);

    let from = new Date(today);
    switch (range) {
      case "today":      from = new Date(today); break;
      case "yesterday":  from = new Date(today); from.setDate(from.getDate()-1); break;
      case "7d":         from = new Date(today); from.setDate(from.getDate()-6); break;
      case "30d":        from = new Date(today); from.setDate(from.getDate()-29); break;
      case "90d":        from = new Date(today); from.setDate(from.getDate()-89); break;
      case "180d":       from = new Date(today); from.setDate(from.getDate()-179); break;
      case "ytd":        from = new Date(today.getFullYear(), 0, 1); break;
      default:           from = new Date(today); break;
    }

    // 날짜 문자열 비교
    const fromStr = from.toISOString().slice(0,10);
    const toStr = today.toISOString().slice(0,10);

    // 범위 내 데이터만
    const f = data.filter(d => d.date >= fromStr && d.date <= toStr);

    // 'yesterday'는 하루만
    if (range === "yesterday") {
      return f.filter(d => d.date === fromStr);
    }
    if (range === "today") {
      return f.filter(d => d.date === toStr);
    }
    return f;
  }, [data, range]);

  // 값/스케일 계산
  const values = filtered.map(d => d[metric] ?? 0);
  const max = Math.max(1, ...values);
  const min = 0;

  // 라벨 포맷
  const label = (s) => {
    const dt = new Date(s + "T00:00:00");
    return `${dt.getMonth()+1}/${dt.getDate()}`;
  };

  // 막대/라인 자동 선택 (데이터가 많으면 라인)
  const isBar = filtered.length <= 35;

  // 라인 경로 생성
  const linePath = useMemo(() => {
    if (isBar || filtered.length === 0) return "";
    const W = 600, H = 260, top = 40, bottom = 30; // 내부 패딩
    const h = H - top - bottom;
    const step = W / Math.max(1, filtered.length - 1);
    const yScale = (v) => top + (1 - (v - min) / (max - min)) * h;

    return filtered.reduce((acc, d, i) => {
      const x = i * step;
      const y = yScale(d[metric] ?? 0);
      return acc + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
    }, "");
  }, [filtered, metric, isBar, max, min]);

  const unit = metric === "gross" ? "$" : ""; // 금액/카운트 구분
  const title =
    metric === "gross"   ? "벌은 금액 (Gross)" :
    metric === "newFans" ? "새 팬수" :
                            "탈퇴한 팬";

  // 합계/평균
  const sum = values.reduce((a,b)=>a+b,0);
  const avg = filtered.length ? sum / filtered.length : 0;

  // 렌더
  return (
    <section className={styles.panel} aria-label="Analytics">
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>{title}</h2>
        <div className={styles.toolbar}>
          <div className={styles.segmented}>
            {["gross","newFans","churned"].map(m => (
              <button
                key={m}
                className={`${styles.segBtn} ${metric===m?styles.segActive:""}`}
                onClick={()=>setMetric(m)}
                type="button"
              >
                {m==="gross"?"금액":m==="newFans"?"새 팬":"탈퇴"}
              </button>
            ))}
          </div>
          <div className={styles.segmented}>
            {[
              ["today","하루"],["yesterday","어제"],["7d","1주"],["30d","1달"],
              ["90d","3달"],["180d","6달"],["ytd","YTD"]
            ].map(([k,lab])=>(
              <button
                key={k}
                className={`${styles.segBtn} ${range===k?styles.segActive:""}`}
                onClick={()=>setRange(k)}
                type="button"
              >
                {lab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.note}>
          합계: {unit}{metric==="gross" ? sum.toLocaleString(undefined,{maximumFractionDigits:2}) : Math.round(sum).toLocaleString()}
        </span>
        <span className={styles.note}>
          평균: {unit}{metric==="gross" ? avg.toFixed(2) : Math.round(avg).toLocaleString()}
        </span>
      </div>

      <div className={styles.chartWrap}>
        <svg viewBox="0 0 600 280" className={styles.chart} aria-label="chart">
          {/* baseline */}
          <line x1="0" y1="240" x2="600" y2="240" className={styles.axis} />
          {isBar ? (
            // 막대 차트
            filtered.map((d, i) => {
              const W = 600, H = 240;
              const barGap = 6;
              const bw = W / filtered.length - barGap;
              const x = i * (W / filtered.length) + barGap/2;
              const h = Math.round(((d[metric] ?? 0) / max) * (H - 20));
              const y = 240 - h;
              // x축 간격 라벨 줄이기
              const showTick = filtered.length <= 16 || i % Math.ceil(filtered.length / 12) === 0;
              return (
                <g key={d.date}>
                  <rect x={x} y={y} width={Math.max(1, bw)} height={h} rx="3" className={styles.bar}/>
                  {showTick && (
                    <text x={x + Math.max(1, bw)/2} y="258" textAnchor="middle" className={styles.tick}>
                      {label(d.date)}
                    </text>
                  )}
                </g>
              );
            })
          ) : (
            // 라인 차트
            <>
              <path d={linePath} className={styles.line} fill="none" />
              {/* 라벨 드문드문 */}
              {filtered.map((d, i) => {
                const showTick = i % Math.ceil(filtered.length / 12) === 0 || i === filtered.length - 1;
                if (!showTick) return null;
                const W = 600;
                const step = W / Math.max(1, filtered.length - 1);
                const x = i * step;
                return (
                  <text key={d.date} x={x} y="258" textAnchor="middle" className={styles.tick}>
                    {label(d.date)}
                  </text>
                );
              })}
            </>
          )}
        </svg>
      </div>
    </section>
  );
}
