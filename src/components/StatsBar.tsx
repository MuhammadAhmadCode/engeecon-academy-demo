export default function StatsBar() {
  return (
    <section className="bg-white border-b border-ink-navy/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-ink-navy/5">
          {[
            { value: "340+", label: "Students Enrolled", sub: "since 2013" },
            { value: "94%", label: "Success Rate", sub: "avg. MDCAT" },
            { value: "12+", label: "Years Running", sub: "trusted" },
            { value: "5", label: "Test Sessions", sub: "per year" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <p className="font-mono text-gold text-3xl sm:text-4xl font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="font-mono text-ink-navy text-[11px] tracking-[0.12em] uppercase mt-2 font-medium">
                {stat.label}
              </p>
              <p className="font-mono text-slate-light/60 text-[10px] mt-1">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
