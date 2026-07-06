"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const STEPS = [
  { number: "01", title: "Fill the form", description: "Enter your details and upload payment proof. Takes under 5 minutes." },
  { number: "02", title: "We verify", description: "Our team reviews your application and payment within 24 hours." },
  { number: "03", title: "Get your slip", description: "Your official admission slip with roll number is ready instantly." },
];

export default function StepsSection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section className="bg-ink-navy relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div ref={headerRef} className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-gold/50 text-xs font-semibold tracking-[0.2em] uppercase mb-2">How it works</p>
            <h2 className="font-display text-white text-3xl sm:text-4xl font-bold">
              Three steps to your seat<span className="text-gold">.</span>
            </h2>
          </div>
          <Link href="/admission" className="inline-flex items-center gap-2 text-gold/60 text-sm font-medium hover:text-gold transition-colors shrink-0">
            Start application
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div ref={gridRef} className="reveal-stagger grid sm:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.number} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-300 group">
              <span className="text-gold/25 text-5xl font-bold font-display block mb-6 group-hover:text-gold/40 transition-colors">{s.number}</span>
              <h3 className="text-white text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
