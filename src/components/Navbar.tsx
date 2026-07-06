"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-ink-navy border-b border-gold/20 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 border-2 border-gold rounded flex items-center justify-center">
            <span className="font-display text-gold text-sm font-bold">E</span>
          </div>
          <span className="font-display text-white text-lg font-semibold tracking-tight">
            Engeecon<span className="text-gold">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-slate-light hover:text-white text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/admission"
            className="text-slate-light hover:text-white text-sm font-medium transition-colors"
          >
            Admission
          </Link>
          <Link
            href="/admin/login"
            className="text-sm font-medium border border-gold/40 text-gold px-4 py-1.5 rounded hover:bg-gold/10 transition-colors"
          >
            Admin
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
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
        <div className="md:hidden bg-ink-navy border-t border-gold/10 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-light hover:text-white text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/admission"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-light hover:text-white text-sm font-medium"
          >
            Admission
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium border border-gold/40 text-gold px-4 py-1.5 rounded text-center hover:bg-gold/10"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
