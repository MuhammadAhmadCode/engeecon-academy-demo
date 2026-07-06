"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-ink-navy sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 border-2 border-gold/70 rounded-sm flex items-center justify-center group-hover:border-gold transition-colors">
            <span className="font-display text-gold text-sm font-bold">E</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-lg font-semibold tracking-tight">
              Engeecon
            </span>
            <span className="font-mono text-gold/50 text-[8px] tracking-[0.3em] uppercase mt-0.5 hidden sm:block">
              Academy
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/admission"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Admission
          </Link>
          <Link
            href="/admin/login"
            className="text-sm font-medium border border-gold/30 text-gold/80 px-5 py-1.5 rounded-sm hover:bg-gold/10 hover:border-gold/50 hover:text-gold transition-all"
          >
            Admin
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 -mr-2"
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

      {mobileOpen && (
        <div className="md:hidden bg-ink-navy-light border-t border-white/5 px-6 py-5 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-white/70 hover:text-white text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/admission"
            onClick={() => setMobileOpen(false)}
            className="block text-white/70 hover:text-white text-sm font-medium"
          >
            Admission
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium border border-gold/30 text-gold/80 px-5 py-2 rounded-sm text-center hover:bg-gold/10"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
