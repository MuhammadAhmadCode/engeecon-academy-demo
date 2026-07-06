"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FIELDS = [
  { label: "APPLICANT NAME", value: "Ayesha Khan", delay: 0 },
  { label: "ROLL NO", value: "ENG-2026-0471", delay: 500 },
  { label: "SESSION", value: "July 2026 — Morning", delay: 1000 },
  { label: "FIELD", value: "Pre-Medical", delay: 1400 },
  { label: "STATUS", value: "Pending", delay: 1900, isStatus: true },
];

export default function AdmissionSlip() {
  const [visibleFields, setVisibleFields] = useState<number>(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setVisibleFields(FIELDS.length);
      return;
    }
    const timers = FIELDS.map((field, i) =>
      setTimeout(() => setVisibleFields(i + 1), field.delay + 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [prefersReduced]);

  return (
    <section className="relative bg-ink-navy overflow-hidden">
      <div className="hero-gradient absolute inset-0" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Left: Copy */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-xs font-medium tracking-wide">
                Admissions Open — July 2026
              </span>
            </div>

            <h1 className="font-display text-white text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] mb-6 tracking-tight">
              Your admission
              <br />
              starts here<span className="text-gold">.</span>
            </h1>

            <p className="text-white/45 text-lg sm:text-xl leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
              Apply online in 5 minutes. Track your application status in real time.
              No more WhatsApp follow-ups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/admission"
                className="group inline-flex items-center justify-center gap-3 bg-gold text-ink-navy font-semibold text-sm px-8 py-3.5 rounded hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
              >
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/60 text-sm px-8 py-3.5 rounded hover:border-white/25 hover:text-white/80 transition-all"
              >
                Check Application Status
              </Link>
            </div>
          </div>

          {/* Right: Admission Slip Card */}
          <div className="w-full max-w-[380px] lg:max-w-none lg:w-[380px] shrink-0">
            <div className="bg-white/[0.04] backdrop-blur-md card-glow rounded-lg overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 bg-gold/15 border border-gold/30 rounded flex items-center justify-center">
                    <span className="font-display text-gold text-[9px] font-bold">E</span>
                  </div>
                  <span className="text-white/50 text-[11px] font-semibold tracking-widest uppercase">
                    Admission Slip
                  </span>
                </div>
                <span className="text-white/25 text-[11px] font-medium">2026</span>
              </div>

              {/* Card Fields */}
              <div className="px-6 py-2">
                {FIELDS.map((field, i) => (
                  <div
                    key={field.label}
                    className={`py-3.5 ${i < FIELDS.length - 1 ? "slip-line" : ""}`}
                    style={{
                      opacity: visibleFields > i ? 1 : 0,
                      transform: visibleFields > i ? "translateY(0)" : "translateY(8px)",
                      transition: prefersReduced ? "none" : "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <span className="text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1">
                      {field.label}
                    </span>
                    {field.isStatus ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gold text-sm font-semibold">{field.value}</span>
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      </div>
                    ) : (
                      <span className="text-white text-sm font-medium">{field.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                <span className="text-white/20 text-[10px]">
                  This is a demo — yours will look like this
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
