export default function StatsBar() {
  return (
    <section className="bg-white border-b border-ink-navy/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {[
            { value: "340+", label: "Students Enrolled" },
            { value: "94%", label: "Success Rate" },
            { value: "12+", label: "Years Running" },
            { value: "5", label: "Sessions Yearly" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < 3 ? "lg:border-r lg:border-ink-navy/[0.06]" : ""} ${i > 0 ? "lg:border-l lg:border-ink-navy/[0.06]" : ""} lg:px-6`}
            >
              <p className="font-display text-gold text-4xl sm:text-5xl font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="text-ink-navy/60 text-xs font-semibold tracking-wider uppercase mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
