"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 340, suffix: "+", label: "Students Enrolled" },
  { value: 94, suffix: "%", label: "Success Rate" },
  { value: 12, suffix: "+", label: "Years Running" },
  { value: 5, suffix: "", label: "Sessions Yearly" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref} className="font-display text-gold text-4xl sm:text-5xl font-bold tracking-tight">{count}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="bg-white border-b border-ink-navy/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < 3 ? "lg:border-r lg:border-ink-navy/[0.06]" : ""} ${i > 0 ? "lg:border-l lg:border-ink-navy/[0.06]" : ""} lg:px-6`}
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
