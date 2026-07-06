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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-gold text-[11px] tracking-[0.25em] uppercase mb-3 font-medium">
              Results
            </p>
            <h2 className="font-display text-ink-navy text-3xl sm:text-4xl font-bold leading-tight">
              Top scorers
              <span className="text-gold">.</span>
            </h2>
          </div>
          <p className="font-mono text-slate-light text-xs">
            Spring 2026 — 340+ students
          </p>
        </div>

        <div className="bg-white rounded-sm border border-ink-navy/5 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-navy">
                  <th className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/60 px-6 py-4 text-left font-medium w-20">
                    Rank
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/60 px-6 py-4 text-left font-medium">
                    Student
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/60 px-6 py-4 text-left font-medium w-32">
                    Score
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/60 px-6 py-4 text-left font-medium w-36">
                    Session
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold/60 px-6 py-4 text-left font-medium w-32">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {TOPPERS.map((topper, i) => (
                  <tr
                    key={topper.rank}
                    className={`border-t border-ink-navy/5 transition-colors ${
                      i === 0 ? "bg-gold/[0.04]" : "hover:bg-paper"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`font-mono font-semibold text-sm ${i === 0 ? "text-gold" : "text-ink-navy"}`}>
                        {String(topper.rank).padStart(2, "0")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate font-medium">{topper.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-gold font-bold text-base">
                        {topper.score}
                      </span>
                      <span className="text-slate-light/50 font-mono text-xs ml-0.5">
                        /{topper.total}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-slate-light text-xs">
                        {topper.session}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {topper.status}
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
