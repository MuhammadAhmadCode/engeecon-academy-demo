import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Fill the form",
    description: "Enter your details and upload payment proof — takes under 5 minutes.",
  },
  {
    number: "02",
    title: "We verify",
    description: "Our team reviews your application and payment within 24 hours.",
  },
  {
    number: "03",
    title: "Get your slip",
    description: "Your official admission slip with roll number is generated instantly.",
  },
];

export default function StepsSection() {
  return (
    <section className="bg-ink-navy py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="font-mono text-gold/60 text-[11px] tracking-[0.25em] uppercase mb-3 font-medium">
              How it works
            </p>
            <h2 className="font-display text-white text-3xl sm:text-4xl font-bold leading-tight">
              Three steps to your seat<span className="text-gold">.</span>
            </h2>
          </div>
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 font-mono text-gold/70 text-sm hover:text-gold transition-colors shrink-0"
          >
            Start application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-0 sm:gap-px bg-white/5 rounded-sm overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.number} className="bg-ink-navy-light/50 p-8 sm:p-10 group hover:bg-white/[0.04] transition-colors">
              <span className="font-mono text-gold/40 text-4xl font-bold block mb-6 group-hover:text-gold/60 transition-colors">
                {step.number}
              </span>
              <h3 className="font-display text-white text-xl font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
