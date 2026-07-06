"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FIELDS = [
  { label: "APPLICANT NAME", value: "Ayesha Khan", delay: 0 },
  { label: "ROLL NO", value: "ENG-2026-0471", delay: 400 },
  { label: "SESSION", value: "July 2026 — Morning", delay: 800 },
  { label: "FIELD", value: "Pre-Medical", delay: 1100 },
  { label: "STATUS", value: "Pending", delay: 1500, isStatus: true },
];

export default function AdmissionSlip() {
  const [visible, setVisible] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) { setVisible(FIELDS.length); return; }
    const t = FIELDS.map((f, i) =>
      setTimeout(() => setVisible(i + 1), f.delay + 200)
    );
    return () => t.forEach(clearTimeout);
  }, [reduced]);

  return (
    <section className="hero-bg relative overflow-hidden min-h-[85vh] flex items-center">
      {/* subtle grid pattern on top of gradient */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 w-full py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Left */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: reduced ? 'none' : 'pulse-dot 2s ease-in-out infinite' }} />
              <span className="text-white/70 text-xs font-medium tracking-wide">
                Admissions Open — July 2026
              </span>
            </div>

            <h1
              className="font-display text-white text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] mb-6 tracking-tight animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Your admission
              <br />
              starts here<span className="text-gold">.</span>
            </h1>

            <p
              className="text-white/40 text-lg sm:text-xl leading-relaxed mb-10 max-w-md mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: '0.35s' }}
            >
              Apply online in 5 minutes. Track your application status in real time.
              No more WhatsApp follow-ups.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: '0.5s' }}
            >
              <Link href="/admission" className="btn-primary">
                Apply Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/admission" className="btn-secondary">
                Check Application Status
              </Link>
            </div>
          </div>

          {/* Right: Slip Card */}
          <div
            className="w-full max-w-[380px] lg:max-w-none lg:w-[400px] shrink-0 animate-fade-up relative"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Gold radial glow behind card */}
            <div
              className="absolute inset-0 -inset-x-12 -inset-y-12 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.06) 0%, transparent 70%)',
              }}
            />
            <div className="slip-card rounded-2xl overflow-hidden backdrop-blur-md relative">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-gold/15 border border-gold/30 rounded-lg flex items-center justify-center">
                    <span className="font-display text-gold text-[10px] font-bold">E</span>
                  </div>
                  <div>
                    <span className="text-white/60 text-[11px] font-semibold tracking-widest uppercase block">
                      Admission Slip
                    </span>
                  </div>
                </div>
                <span className="text-white/20 text-[11px] font-mono font-medium">2026</span>
              </div>

              {/* Fields */}
              <div className="px-6 py-1">
                {FIELDS.map((field, i) => (
                  <div
                    key={field.label}
                    className={`py-4 ${i < FIELDS.length - 1 ? "slip-line" : ""}`}
                    style={{
                      opacity: visible > i ? 1 : 0,
                      transform: visible > i ? "translateY(0)" : "translateY(8px)",
                      transition: reduced ? "none" : "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <span className="text-white/25 text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1.5">
                      {field.label}
                    </span>
                    {field.isStatus ? (
                      <div className="flex items-center gap-2.5">
                        <span className="text-gold text-sm font-semibold">{field.value}</span>
                        <span className="w-2 h-2 rounded-full bg-gold" style={{ animation: reduced ? 'none' : 'pulse-dot 2s ease-in-out infinite' }} />
                      </div>
                    ) : (
                      <span className="text-white text-sm font-medium">{field.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-3.5 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-white/15 text-[10px]">
                  This is a demo — yours will look like this
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
