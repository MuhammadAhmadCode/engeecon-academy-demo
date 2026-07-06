export default function StatsBar() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { value: "340+", label: "Students Enrolled" },
            { value: "94%", label: "Success Rate" },
            { value: "12+", label: "Years Running" },
            { value: "5", label: "Test Sessions" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-gold text-2xl sm:text-3xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="font-mono text-slate-light text-[10px] tracking-[0.15em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
