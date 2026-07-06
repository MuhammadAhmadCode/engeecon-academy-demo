"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

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
          <p className="font-mono text-white/40 text-xs tracking-wide">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-mono text-white/50 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@engeecon.com"
              className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-4 py-3 text-sm text-white font-body placeholder:text-white/20 transition-all duration-200 hover:border-white/15 focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.08)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-mono text-white/50 text-[11px] font-semibold tracking-[0.12em] uppercase mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-white/[0.06] border-[1.5px] border-white/10 rounded-xl px-4 py-3 text-sm text-white font-body placeholder:text-white/20 transition-all duration-200 hover:border-white/15 focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(201,162,39,0.08)]"
            />
          </div>

          {error && (
            <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-xl px-4 py-3 animate-fade-in">
              <p className="text-stamp-red text-sm font-medium font-body">{error}</p>
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full mt-2">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
