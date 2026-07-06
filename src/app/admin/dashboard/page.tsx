"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Select, StatusBadge, Card, CardHeader, CardBody } from "@/components/ui";

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

  return (
    <div className="min-h-[80vh] bg-paper">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-ink-navy text-2xl sm:text-3xl font-bold">Applications</h1>
            <p className="font-mono text-slate-light text-sm mt-1">
              {admissions.length} total submission{admissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { localStorage.removeItem("admin_token"); router.push("/admin/login"); }}>
            Sign Out
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="w-full sm:w-48">
            <Select
              label=""
              name="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={["Pending", "Approved", "Rejected"]}
              placeholder="All Statuses"
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              label=""
              name="paymentFilter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              options={["EasyPaisa", "JazzCash", "Meezan Bank", "HBL"]}
              placeholder="All Payment Methods"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <Card className="p-12 text-center">
            <div className="spinner mx-auto" />
            <p className="font-mono text-slate-light text-sm mt-3">Loading applications...</p>
          </Card>
        ) : admissions.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-paper rounded-2xl mx-auto flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-ink-navy/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-display text-ink-navy text-lg font-semibold mb-1">No applications yet</h3>
            <p className="font-body text-slate-light text-sm max-w-xs mx-auto">Applications will appear here once students submit the admission form.</p>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink-navy">
                    <th className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 text-left">Name</th>
                    <th className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 text-left hidden sm:table-cell">City</th>
                    <th className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 text-left hidden md:table-cell">Payment</th>
                    <th className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 text-left">Status</th>
                    <th className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white/40 px-6 py-4 text-left hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-navy/[0.04]">
                  {admissions.map((a) => (
                    <tr key={a._id} onClick={() => setSelected(a)} className="table-row cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="text-slate font-medium font-body">{a.studentName}</span>
                        <span className="block text-slate-light text-xs sm:hidden mt-0.5 font-body">{a.city}</span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-slate-light text-sm font-body">{a.city}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="font-mono text-slate text-sm">{a.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="font-mono text-slate-light text-xs">{formatDate(a.createdAt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <Card variant="dark" className="w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="sticky top-0 bg-ink-navy z-10 flex items-center justify-between">
                <h2 className="font-display text-white text-lg font-bold">Application Details</h2>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </CardHeader>
              <CardBody className="space-y-4">
                {[
                  ["Student Name", selected.studentName, false],
                  ["Email", selected.email, false],
                  ["Student Mobile", selected.studentMobile, false],
                  ["Father Name", selected.fatherName, false],
                  ["Guardian Mobile", selected.guardianMobile, false],
                  ["College", selected.collegeName, false],
                  ["Field", selected.field, false],
                  ["Session", selected.sessionDate, false],
                  ["SSC Score", selected.sscScore, false],
                  ["FSc Part-1 Score", selected.fscPart1Score, false],
                  ["Address", selected.address, false],
                  ["City", selected.city, false],
                  ["Payment Method", selected.paymentMethod, false],
                  ["Status", selected.status, true],
                  ["Applied On", formatDate(selected.createdAt), false],
                ].map(([label, value, isStatus]) => (
                  <div key={label as string} className="flex flex-col gap-1">
                    <span className="font-mono text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase">{label as string}</span>
                    {isStatus ? <StatusBadge status={value as string} /> : <span className="text-sm text-white font-body">{value as string}</span>}
                  </div>
                ))}

                <div className="pt-2">
                  <span className="font-mono text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase block mb-2">Payment Proof</span>
                  <a href={selected.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={selected.paymentProofUrl} alt="Payment proof" className="w-full max-w-xs rounded-xl border border-white/10 hover:border-gold/30 transition-colors" />
                  </a>
                </div>
              </CardBody>

              <div className="border-t border-white/10 px-6 py-4 flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1 !bg-emerald-600 !text-white hover:!bg-emerald-700 !shadow-none"
                  loading={updating}
                  disabled={selected.status === "approved"}
                  onClick={() => updateStatus(selected._id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  loading={updating}
                  disabled={selected.status === "rejected"}
                  onClick={() => updateStatus(selected._id, "rejected")}
                >
                  Reject
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
