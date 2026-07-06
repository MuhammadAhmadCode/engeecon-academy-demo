export default function Footer() {
  return (
    <footer className="bg-ink-navy border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 border border-gold/40 rounded flex items-center justify-center">
              <span className="font-display text-gold text-xs font-bold">E</span>
            </div>
            <span className="font-display text-white/80 text-sm font-medium">
              Engeecon Academy
            </span>
          </div>
          <p className="text-slate-light text-xs font-mono">
            &copy; {new Date().getFullYear()} Engeecon Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
