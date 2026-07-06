"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const TOPPERS = [
  { rank: 1, name: "Hassan Ali", score: 198, total: 200, session: "Spring 2026", status: "approved" },
  { rank: 2, name: "Fatima Noor", score: 196, total: 200, session: "Spring 2026", status: "approved" },
  { rank: 3, name: "Ahmed Raza", score: 194, total: 200, session: "Spring 2026", status: "approved" },
  { rank: 4, name: "Sana Malik", score: 192, total: 200, session: "Spring 2026", status: "approved" },
  { rank: 5, name: "Bilal Shah", score: 190, total: 200, session: "Spring 2026", status: "approved" },
];

function Row({ t, index }: { t: typeof TOPPERS[number]; index: number }) {
  const ref = useScrollReveal<HTMLTableRowElement>(0.1);
  return (
    <tr
      ref={ref}
      className={`reveal table-row ${t.rank === 1 ? "bg-gold/[0.03]" : ""}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <td className="px-6 py-4">
        <span className={`text-sm font-bold ${t.rank === 1 ? "text-gold" : "text-ink-navy"}`}>
          {String(t.rank).padStart(2, "0")}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-slate font-medium text-sm">{t.name}</span>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-gold text-base">{t.score}</span>
        <span className="text-slate-light/40 text-xs ml-0.5">/{t.total}</span>
      </td>
      <td className="px-6 py-4 hidden sm:table-cell">
        <span className="text-slate-light text-sm">{t.session}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`status-badge status-${t.status}`}>
          <span className="status-dot" />
          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
        </span>
      </td>
    </tr>
  );
}

export default function MarkSheet() {
  const headerRef = useScrollReveal();

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div ref={headerRef} className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Results</p>
            <h2 className="font-display text-ink-navy text-3xl sm:text-4xl font-bold">
              Top scorers<span className="text-gold">.</span>
            </h2>
          </div>
          <p className="text-slate-light text-sm">Spring 2026 &middot; 340+ students</p>
        </div>

        <div className="bg-white rounded-2xl border border-ink-navy/[0.06] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-ink-navy">
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-20">Rank</th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4">Student</th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-32">Score</th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-36 hidden sm:table-cell">Session</th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-28">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-navy/[0.04]">
                {TOPPERS.map((t, i) => (
                  <Row key={t.rank} t={t} index={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
