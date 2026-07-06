"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-navy/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-ink-navy"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gold/10 border border-gold/25 rounded-lg flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-200">
            <span className="font-display text-gold text-xs font-bold">E</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-base font-semibold tracking-tight">
              Engeecon
            </span>
            <span className="text-white/30 text-[9px] font-semibold tracking-[0.25em] uppercase mt-0.5 hidden sm:block">
              Academy
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="text-white/50 hover:text-white hover:bg-white/[0.06] text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
            Home
          </Link>
          <Link href="/admission" className="text-white/50 hover:text-white hover:bg-white/[0.06] text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
            Admission
          </Link>
          <Link
            href="/admin/login"
            className="ml-2 text-sm font-medium border border-gold/25 text-gold/70 px-5 py-2 rounded-lg hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-all duration-200"
          >
            Admin
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 space-y-1 bg-ink-navy-light/50 border-t border-white/[0.06]">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block text-white/60 hover:text-white hover:bg-white/[0.06] text-sm font-medium px-4 py-2.5 rounded-lg transition-all">
            Home
          </Link>
          <Link href="/admission" onClick={() => setMobileOpen(false)} className="block text-white/60 hover:text-white hover:bg-white/[0.06] text-sm font-medium px-4 py-2.5 rounded-lg transition-all">
            Admission
          </Link>
          <Link href="/admin/login" onClick={() => setMobileOpen(false)} className="block text-sm font-medium border border-gold/25 text-gold/70 px-4 py-2.5 rounded-lg text-center hover:bg-gold/10 transition-all mt-2">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
