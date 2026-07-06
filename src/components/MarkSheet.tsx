const TOPPERS = [
  { rank: 1, name: "Hassan Ali", score: 198, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 2, name: "Fatima Noor", score: 196, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 3, name: "Ahmed Raza", score: 194, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 4, name: "Sana Malik", score: 192, total: 200, session: "Spring 2026", status: "Approved" },
  { rank: 5, name: "Bilal Shah", score: 190, total: 200, session: "Spring 2026", status: "Approved" },
];

export default function MarkSheet() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-2">
            Results
          </p>
          <h2 className="font-display text-ink-navy text-2xl sm:text-3xl font-bold">
            Top scorers — Spring 2026
          </h2>
        </div>

        <div className="bg-white border border-paper rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-navy">
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                    Rank
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                    Name
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                    Score
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                    Session
                  </th>
                  <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {TOPPERS.map((topper, i) => (
                  <tr
                    key={topper.rank}
                    className={`border-t border-paper ${
                      i === 0 ? "bg-gold/5" : "hover:bg-paper/50"
                    } transition-colors`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-ink-navy font-semibold text-sm">
                        {topper.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate font-medium">{topper.name}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-gold font-semibold">
                        {topper.score}
                      </span>
                      <span className="text-slate-light font-mono text-xs">
                        /{topper.total}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-slate-light text-xs">
                        {topper.session}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-sm border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {topper.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <div className="h-px flex-1 bg-ink-navy/10" />
          <p className="font-mono text-slate-light text-xs">
            Showing top 5 of 340+ students
          </p>
          <div className="h-px flex-1 bg-ink-navy/10" />
        </div>
      </div>
    </section>
  );
}
