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
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${res.status}): ${text.slice(0, 100)}`); }
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-6 hero-bg">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gold/10 border border-gold/25 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <span className="font-display text-gold text-xl font-bold">E</span>
          </div>
          <h1 className="font-display text-white text-2xl font-bold mb-1">Admin Login</h1>
          <p className="text-white/40 text-sm">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@engeecon.com"
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.08] transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-white/50 text-xs font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.08] transition-all duration-200"
            />
          </div>

          {error && (
            <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-xl px-4 py-3 animate-fade-in">
              <p className="text-stamp-red text-sm font-medium">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full text-center">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
