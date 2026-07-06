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
    <section className="py-16 sm:py-20 bg-white border-y border-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-2">
            How it works
          </p>
          <h2 className="font-display text-ink-navy text-2xl sm:text-3xl font-bold">
            Three steps to your seat
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.number} className="group">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-gold text-2xl font-bold">{step.number}</span>
                <div className="h-px flex-1 bg-gold/20" />
              </div>
              <h3 className="font-display text-ink-navy text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-slate-light text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 bg-ink-navy text-white font-mono text-sm font-medium px-8 py-3 rounded hover:bg-ink-navy/90 transition-colors"
          >
            Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
