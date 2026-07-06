"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data: Record<string, string>;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server error (${res.status}): ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-ink-navy">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 border-2 border-gold rounded-sm mx-auto flex items-center justify-center mb-4">
            <span className="font-display text-gold text-lg font-bold">E</span>
          </div>
          <h1 className="font-display text-white text-xl font-bold">Admin Login</h1>
          <p className="text-slate-light text-sm mt-1 font-mono">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-gold/60 text-[10px] tracking-[0.2em] uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@engeecon.com"
              className="w-full bg-ink-navy/50 border border-gold/20 rounded-sm px-3 py-2.5 text-sm text-white font-body focus:outline-none focus:border-gold transition-colors placeholder:text-slate-light/40"
            />
          </div>
          <div>
            <label className="block font-mono text-gold/60 text-[10px] tracking-[0.2em] uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-ink-navy/50 border border-gold/20 rounded-sm px-3 py-2.5 text-sm text-white font-body focus:outline-none focus:border-gold transition-colors placeholder:text-slate-light/40"
            />
          </div>

          {error && (
            <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-sm px-3 py-2">
              <p className="text-stamp-red text-xs font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-ink-navy font-mono text-sm font-semibold py-3 rounded hover:bg-gold-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
