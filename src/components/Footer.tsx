export default function Footer() {
  return (
    <footer className="bg-ink-navy border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gold/10 border border-gold/20 rounded flex items-center justify-center">
              <span className="font-display text-gold text-[10px] font-bold">E</span>
            </div>
            <span className="text-white/40 text-sm font-medium">
              Engeecon Academy
            </span>
          </div>
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Engeecon Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
