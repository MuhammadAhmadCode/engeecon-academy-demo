"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const RESULTS = [
  {
    year: "2025",
    headline: "1st Position",
    tagline: "Alhamdulillah",
    stat: "304+",
    statLabel: "students scored above 170/180",
    details: [],
  },
  {
    year: "2024",
    headline: "Top-20 Dominance",
    tagline: "",
    stat: "16",
    statLabel: "students in Top-20",
    details: [],
  },
  {
    year: "2023",
    headline: "Clean Sweep",
    tagline: "",
    stat: "10",
    statLabel: "students in Top-10",
    details: ["1st Position", "2nd Position", "3rd Position"],
  },
];

function YearCard({ result, index }: { result: typeof RESULTS[number]; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className="reveal relative"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Timeline connector */}
      {index < RESULTS.length - 1 && (
        <div className="absolute left-8 top-full w-px h-6 bg-ink-navy/10 hidden sm:block" />
      )}

      <div className="flex gap-5 sm:gap-8">
        {/* Year column */}
        <div className="shrink-0 w-16 sm:w-20 text-center pt-1">
          <span className="font-display text-ink-navy text-2xl sm:text-3xl font-bold">{result.year}</span>
        </div>

        {/* Content card */}
        <div className="flex-1 bg-white rounded-2xl border border-ink-navy/[0.06] p-6 sm:p-8 hover:border-gold/20 hover:shadow-[0_8px_30px_-8px_rgba(201,162,39,0.1)] transition-all duration-300 group">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="font-display text-gold text-lg sm:text-xl font-bold mb-1">
                {result.headline}
              </p>
              {result.tagline && (
                <p className="text-slate-light/60 text-sm font-body italic">{result.tagline}</p>
              )}
              {result.details.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {result.details.map((d) => (
                    <span key={d} className="font-mono text-[11px] font-semibold tracking-wide uppercase bg-gold/10 text-gold px-2.5 py-1 rounded-md">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="sm:text-right shrink-0">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-ink-navy group-hover:text-gold transition-colors">{result.stat}</span>
              <p className="text-slate-light text-xs font-medium mt-1 max-w-[160px]">{result.statLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarkSheet() {
  const headerRef = useScrollReveal();

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div ref={headerRef} className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Results</p>
            <h2 className="font-display text-ink-navy text-3xl sm:text-4xl font-bold">
              Year-by-year<span className="text-gold">.</span>
            </h2>
          </div>
          <p className="text-slate-light text-sm">MDCAT 2023 – 2025</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {RESULTS.map((r, i) => (
            <YearCard key={r.year} result={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
