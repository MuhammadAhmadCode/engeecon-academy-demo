"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Admission {
  _id: string;
  studentName: string;
  email: string;
  studentMobile: string;
  fatherName: string;
  guardianMobile: string;
  collegeName: string;
  field: string;
  sessionDate: string;
  sscScore: string;
  fscPart1Score: string;
  address: string;
  city: string;
  paymentMethod: string;
  paymentProofUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [selected, setSelected] = useState<Admission | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchAdmissions = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (paymentFilter) params.set("paymentMethod", paymentFilter);
      const res = await fetch(`/api/admin/admissions?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.removeItem("admin_token"); router.push("/admin/login"); return; }
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setAdmissions(data.admissions || []);
      } catch { console.error("Non-JSON:", text.slice(0, 100)); }
    } catch { console.error("Failed to fetch"); }
    finally { setLoading(false); }
  }, [statusFilter, paymentFilter, router]);

  useEffect(() => { fetchAdmissions(); }, [fetchAdmissions]);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    const token = localStorage.getItem("admin_token");
    if (!token) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAdmissions((p) => p.map((a) => (a._id === id ? { ...a, status } : a)));
        if (selected?._id === id) setSelected((p) => p ? { ...p, status } : null);
      }
    } finally { setUpdating(false); }
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
  }

  function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { bg: string; text: string; border: string; dot: string }> = {
      pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
      approved: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
      rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
    };
    const s = map[status] || map.pending;
    return (
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${s.text} ${s.bg} px-2.5 py-1 rounded-full border ${s.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  return (
    <div className="min-h-[80vh] bg-paper">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-ink-navy text-2xl sm:text-3xl font-bold">Applications</h1>
            <p className="text-slate-light text-sm mt-1">
              {admissions.length} total submission{admissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}
            className="text-slate-light text-sm font-medium border border-ink-navy/10 bg-white px-4 py-2 rounded-xl hover:border-ink-navy/20 hover:bg-ink-navy/[0.02] transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-input sm:w-48">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="form-input sm:w-48">
            <option value="">All Payment Methods</option>
            <option value="EasyPaisa">EasyPaisa</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Meezan Bank">Meezan Bank</option>
            <option value="HBL">HBL</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-ink-navy/[0.06] p-12 text-center">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-light text-sm mt-3">Loading applications...</p>
          </div>
        ) : admissions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-ink-navy/[0.06] p-12 text-center">
            <div className="w-20 h-20 bg-paper rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-ink-navy/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-display text-ink-navy text-lg font-semibold mb-1">No applications yet</h3>
            <p className="text-slate-light text-sm max-w-xs mx-auto">Applications will appear here once students submit the admission form.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-ink-navy/[0.06] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink-navy">
                    <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4">Name</th>
                    <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 hidden sm:table-cell">City</th>
                    <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 hidden md:table-cell">Payment</th>
                    <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4">Status</th>
                    <th className="text-left text-[11px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-navy/[0.04]">
                  {admissions.map((a) => (
                    <tr key={a._id} onClick={() => setSelected(a)} className="table-row cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="text-slate font-medium">{a.studentName}</span>
                        <span className="block text-slate-light text-xs sm:hidden mt-0.5">{a.city}</span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-slate-light text-sm">{a.city}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-slate text-sm">{a.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-slate-light text-sm">{formatDate(a.createdAt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-ink-navy/[0.06] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h2 className="font-display text-ink-navy text-lg font-bold">Application Details</h2>
                <button onClick={() => setSelected(null)} className="text-slate-light hover:text-slate p-1 rounded-lg hover:bg-paper transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-5 space-y-4">
                {[
                  ["Student Name", selected.studentName],
                  ["Email", selected.email],
                  ["Student Mobile", selected.studentMobile],
                  ["Father Name", selected.fatherName],
                  ["Guardian Mobile", selected.guardianMobile],
                  ["College", selected.collegeName],
                  ["Field", selected.field],
                  ["Session", selected.sessionDate],
                  ["SSC Score", selected.sscScore],
                  ["FSc Part-1 Score", selected.fscPart1Score],
                  ["Address", selected.address],
                  ["City", selected.city],
                  ["Payment Method", selected.paymentMethod],
                  ["Status", selected.status, true],
                  ["Applied On", formatDate(selected.createdAt)],
                ].map(([label, value, isStatus]) => (
                  <div key={label as string} className="flex flex-col gap-1">
                    <span className="text-slate-light/60 text-[10px] font-semibold tracking-wider uppercase">{label as string}</span>
                    {isStatus ? <StatusBadge status={value as string} /> : <span className="text-sm text-slate">{value as string}</span>}
                  </div>
                ))}

                <div className="pt-2">
                  <span className="text-slate-light/60 text-[10px] font-semibold tracking-wider uppercase block mb-2">Payment Proof</span>
                  <a href={selected.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={selected.paymentProofUrl} alt="Payment proof" className="w-full max-w-xs rounded-xl border border-ink-navy/[0.06] hover:border-gold/30 transition-colors" />
                  </a>
                </div>
              </div>

              <div className="border-t border-ink-navy/[0.06] px-6 py-4 flex gap-3">
                <button onClick={() => updateStatus(selected._id, "approved")} disabled={updating || selected.status === "approved"}
                  className="flex-1 bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {updating ? "Updating..." : "Approve"}
                </button>
                <button onClick={() => updateStatus(selected._id, "rejected")} disabled={updating || selected.status === "rejected"}
                  className="flex-1 bg-stamp-red text-white text-sm font-semibold py-3 rounded-xl hover:bg-stamp-red/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  {updating ? "Updating..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
