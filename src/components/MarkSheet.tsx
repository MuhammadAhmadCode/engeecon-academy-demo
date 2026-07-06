const TOPPERS = [
  { rank: 1, name: "Hassan Ali", score: 198, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 2, name: "Fatima Noor", score: 196, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 3, name: "Ahmed Raza", score: 194, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 4, name: "Sana Malik", score: 192, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 5, name: "Bilal Shah", score: 190, total: 200, session: "Spring 2026", status: "Approved" },
];

export default function MarkSheet() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Results
            </p>
            <h2 className="font-display text-ink-navy text-3xl sm:text-4xl font-bold">
              Top scorers<span className="text-gold">.</span>
            </h2>
          </div>
          <p className="text-slate-light text-sm">
            Spring 2026 &middot; 340+ students
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-ink-navy/[0.06] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-ink-navy">
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-20">
                    Rank
                  </th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4">
                    Student
                  </th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-32">
                    Score
                  </th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-36 hidden sm:table-cell">
                    Session
                  </th>
                  <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 w-28">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-navy/[0.04]">
                {TOPPERS.map((t) => (
                  <tr key={t.rank} className={`table-row ${t.rank === 1 ? "bg-gold/[0.03]" : ""}`}>
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
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
