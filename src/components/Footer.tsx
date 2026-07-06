export default function Footer() {
  return (
    <footer className="bg-ink-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/30 rounded-sm flex items-center justify-center">
              <span className="font-display text-gold text-xs font-bold">E</span>
            </div>
            <div>
              <span className="font-display text-white/70 text-sm font-medium">
                Engeecon Academy
              </span>
              <p className="font-mono text-white/20 text-[10px] mt-0.5">
                MDCAT & FSC Entry Test Prep
              </p>
            </div>
          </div>
          <p className="font-mono text-white/20 text-[10px]">
            &copy; {new Date().getFullYear()} Engeecon Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
