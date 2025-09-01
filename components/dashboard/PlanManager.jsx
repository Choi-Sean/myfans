"use client";
import { useState } from "react";
import styles from "@/styles/dashboard.module.css";
import { createPlan, updatePlan } from "@/lib/api";

export default function PlanManager({ creatorId, initialPlans = [] }) {
  const [plans, setPlans] = useState(initialPlans);
  const [form, setForm] = useState({ name: "Monthly", interval: "Monthly", price: 9.99, currency: "USD" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const onCreate = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg("");
    try {
      const res = await createPlan(creatorId, { ...form, price: Number(form.price) });
      if (res?.plan) setPlans((prev) => [...prev, res.plan]);
      setMsg("Plan created.");
    } catch {
      setMsg("Failed to create plan.");
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async (p) => {
    setBusy(true); setMsg("");
    try {
      const res = await updatePlan(p.id, { active: !p.active });
      setPlans((prev) => prev.map(x => x.id === p.id ? { ...x, active: !p.active } : x));
      setMsg("Plan updated.");
    } catch {
      setMsg("Failed to update plan.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.panel} aria-label="Plans">
      <div className={styles.panelHead}>
        <h2 className={styles.panelTitle}>Pricing Plans</h2>
        {msg && <span className={styles.note}>{msg}</span>}
      </div>

      {/* 목록 */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th><th>Interval</th><th>Price</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.interval}</td>
                <td>{p.currency} {p.price}</td>
                <td>{p.active ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className={styles.btn}
                    disabled={busy}
                    onClick={() => toggleActive(p)}
                  >
                    {p.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr><td colSpan={5} className={styles.empty}>No plans yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 생성 폼 */}
      <form className={styles.formRow} onSubmit={onCreate}>
        <label>
          <span>Name</span>
          <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
        </label>
        <label>
          <span>Interval</span>
          <select value={form.interval} onChange={e=>setForm(f=>({...f, interval:e.target.value}))}>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </label>
        <label>
          <span>Price</span>
          <input type="number" step="0.01" value={form.price} onChange={e=>setForm(f=>({...f, price:e.target.value}))}/>
        </label>
        <label>
          <span>Currency</span>
          <select value={form.currency} onChange={e=>setForm(f=>({...f, currency:e.target.value}))}>
            <option>USD</option>
            <option>KRW</option>
          </select>
        </label>
        <button className={styles.primary} disabled={busy} type="submit">Add plan</button>
      </form>
    </section>
  );
}
