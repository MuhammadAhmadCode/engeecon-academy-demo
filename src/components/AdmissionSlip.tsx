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
    <section className="bg-ink-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 sm:py-28 lg:py-36 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-gold/20 rounded-sm px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-gold/60 text-[10px] tracking-[0.25em] uppercase">
                Admissions Open — July 2026
              </span>
            </div>

            <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Your admission
              <br />
              starts here<span className="text-gold">.</span>
            </h1>

            <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Apply online in 5 minutes. Track your application status in real time.
              No more WhatsApp follow-ups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/admission"
                className="group inline-flex items-center justify-center gap-3 bg-gold text-ink-navy font-mono text-sm font-semibold px-8 py-4 rounded-sm hover:bg-gold-light transition-all"
              >
                Apply Now
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/60 font-mono text-sm px-8 py-4 rounded-sm hover:border-white/30 hover:text-white/80 transition-all"
              >
                Check Application Status
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[400px] shrink-0">
            <div className="border border-gold/30 rounded-sm bg-ink-navy/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
              <div className="border-b border-gold/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 border border-gold/40 rounded-sm flex items-center justify-center">
                    <span className="font-display text-gold text-[10px] font-bold">E</span>
                  </div>
                  <span className="font-mono text-gold/70 text-[9px] tracking-[0.3em] uppercase">
                    Admission Slip
                  </span>
                </div>
                <span className="font-mono text-gold/30 text-[10px]">2026</span>
              </div>

              <div className="px-6 py-5">
                {FIELDS.map((field, i) => (
                  <div
                    key={field.label}
                    className={`flex flex-col gap-1.5 py-3.5 ${
                      i < FIELDS.length - 1 ? "slip-line" : ""
                    }`}
                    style={{
                      opacity: visibleFields > i ? 1 : 0,
                      transform: visibleFields > i ? "translateY(0)" : "translateY(10px)",
                      transition: prefersReduced ? "none" : "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <span className="font-mono text-gold/40 text-[9px] tracking-[0.25em] uppercase">
                      {field.label}
                    </span>
                    {field.isStatus ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gold text-sm font-medium">
                          {field.value}
                        </span>
                        <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse" />
                      </div>
                    ) : (
                      <span className="font-mono text-white text-sm font-medium">
                        {field.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gold/15 px-6 py-3.5 flex items-center justify-between bg-gold/[0.03]">
                <span className="font-mono text-white/25 text-[9px]">
                  This is a demo — yours will look like this
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-gold/30" />
                  <div className="w-1 h-1 rounded-full bg-gold/20" />
                  <div className="w-1 h-1 rounded-full bg-gold/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
