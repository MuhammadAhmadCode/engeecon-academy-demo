"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FIELDS = [
  { label: "APPLICANT NAME", value: "Ayesha Khan", delay: 0 },
  { label: "ROLL NO", value: "ENG-2026-0471", delay: 600 },
  { label: "SESSION", value: "July 2026 — Morning", delay: 1200 },
  { label: "FIELD", value: "Pre-Medical", delay: 1600 },
  { label: "STATUS", value: "Pending", delay: 2200, isStatus: true },
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
      setTimeout(() => setVisibleFields(i + 1), field.delay + 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [prefersReduced]);

  return (
    <section className="bg-ink-navy py-20 sm:py-28 lg:py-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-xl">
            <p className="font-mono text-gold/70 text-xs tracking-[0.2em] uppercase mb-4">
              Engeecon Academy — MDCAT 2026
            </p>
            <h1 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Your admission
              <br />
              starts here<span className="text-gold">.</span>
            </h1>
            <p className="text-slate-light text-base sm:text-lg leading-relaxed mb-8">
              Apply online in 5 minutes. Track your application status in real time.
              No more WhatsApp follow-ups.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold font-mono text-sm font-medium px-6 py-3 rounded hover:bg-gold hover:text-ink-navy transition-colors"
              >
                Apply Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/admission"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/70 font-mono text-sm px-6 py-3 rounded hover:border-white/40 hover:text-white transition-colors"
              >
                Check Application Status
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="border-2 border-gold/60 rounded-sm bg-ink-navy/80 p-0 overflow-hidden">
                <div className="border-b border-gold/30 px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">
                    Admission Slip
                  </span>
                  <span className="font-mono text-gold/50 text-[10px]">
                    2026
                  </span>
                </div>

                <div className="px-5 py-5 space-y-0">
                  {FIELDS.map((field, i) => (
                    <div
                      key={field.label}
                      className={`flex flex-col gap-1 py-3 ${
                        i < FIELDS.length - 1 ? "slip-line" : ""
                      }`}
                      style={{
                        opacity: visibleFields > i ? 1 : 0,
                        transform: visibleFields > i ? "translateY(0)" : "translateY(8px)",
                        transition: prefersReduced ? "none" : "all 0.5s ease-out",
                      }}
                    >
                      <span className="font-mono text-gold/50 text-[10px] tracking-[0.2em] uppercase">
                        {field.label}
                      </span>
                      {field.isStatus ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gold text-sm font-medium">
                            {field.value}
                          </span>
                          <span
                            className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse"
                            aria-label="Status pending"
                          />
                        </div>
                      ) : (
                        <span className="font-mono text-white text-sm font-medium">
                          {field.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold/30 px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-slate-light text-[10px]">
                    This is a demo — yours will look like this
                  </span>
                  <div className="w-8 h-8 border border-gold/30 rounded-sm flex items-center justify-center">
                    <span className="font-display text-gold text-xs font-bold">E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
