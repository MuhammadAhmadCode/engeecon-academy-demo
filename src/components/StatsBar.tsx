"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const STATS = [
  { value: 7867, suffix: "", label: "Students — Offline Events" },
  { value: 13894, suffix: "", label: "Students — Online Events" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1400;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span ref={ref} className="font-display text-gold text-4xl sm:text-5xl font-bold tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useScrollReveal();

  return (
    <section className="bg-white border-b border-ink-navy/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div ref={ref} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-10">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i === 0 ? "sm:border-r sm:border-ink-navy/[0.06]" : ""}`}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-ink-navy/50 text-xs font-semibold tracking-wider uppercase mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
