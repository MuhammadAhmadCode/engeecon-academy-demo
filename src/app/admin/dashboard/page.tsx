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
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (paymentFilter) params.set("paymentMethod", paymentFilter);

      const res = await fetch(`/api/admin/admissions?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      setAdmissions(data.admissions || []);
    } catch {
      console.error("Failed to fetch admissions");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, paymentFilter, router]);

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/admissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setAdmissions((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status } : a))
        );
        if (selected?._id === id) {
          setSelected((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdating(false);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function statusBadge(status: string) {
    const styles = {
      pending: "bg-gold/10 text-gold border-gold/30",
      approved: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-stamp-red/10 text-stamp-red border-stamp-red/30",
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-mono text-xs font-medium px-2 py-0.5 rounded-sm border ${
          styles[status as keyof typeof styles] || styles.pending
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            status === "approved"
              ? "bg-green-500"
              : status === "rejected"
              ? "bg-stamp-red"
              : "bg-gold"
          }`}
        />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  return (
    <div className="min-h-[80vh] bg-paper py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-ink-navy text-2xl font-bold">
              Applications
            </h1>
            <p className="text-slate-light text-sm font-mono mt-1">
              {admissions.length} total submission{admissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.push("/admin/login");
            }}
            className="text-slate-light text-xs font-mono border border-paper bg-white px-3 py-1.5 rounded hover:border-gold/30 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-paper bg-white rounded-sm px-3 py-2 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border border-paper bg-white rounded-sm px-3 py-2 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors"
          >
            <option value="">All Payment Methods</option>
            <option value="EasyPaisa">EasyPaisa</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Meezan Bank">Meezan Bank</option>
            <option value="HBL">HBL</option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white border border-paper rounded-sm p-12 text-center">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-light text-sm font-mono mt-3">Loading...</p>
          </div>
        ) : admissions.length === 0 ? (
          <div className="bg-white border border-paper rounded-sm p-12 text-center">
            <div className="w-16 h-16 border border-paper rounded-sm mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-light/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-display text-ink-navy text-lg font-semibold mb-1">No applications yet</h3>
            <p className="text-slate-light text-sm">
              Applications will appear here once students submit the admission form.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-paper rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink-navy">
                    <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                      Name
                    </th>
                    <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                      City
                    </th>
                    <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                      Payment
                    </th>
                    <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                      Status
                    </th>
                    <th className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/70 px-4 py-3 text-left font-medium">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((a, i) => (
                    <tr
                      key={a._id}
                      onClick={() => setSelected(a)}
                      className={`border-t border-paper cursor-pointer transition-colors ${
                        i % 2 === 0 ? "hover:bg-gold/5" : "hover:bg-gold/5"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="text-slate font-medium">{a.studentName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-slate-light text-sm">{a.city}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-slate">{a.paymentMethod}</span>
                      </td>
                      <td className="px-4 py-3">{statusBadge(a.status)}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-slate-light">
                          {formatDate(a.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selected && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div
              className="bg-white rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto border border-paper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-paper px-5 py-4 flex items-center justify-between">
                <h2 className="font-display text-ink-navy text-lg font-bold">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-slate-light hover:text-slate p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-5 py-5 space-y-4">
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
                  ["Status", selected.status],
                  ["Applied On", formatDate(selected.createdAt)],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/60">
                      {label}
                    </span>
                    <span className="text-sm text-slate font-body">
                      {label === "Status" ? statusBadge(value as string) : (value as string)}
                    </span>
                  </div>
                ))}

                <div className="pt-2">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold/60 block mb-2">
                    Payment Proof
                  </span>
                  <a href={selected.paymentProofUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={selected.paymentProofUrl}
                      alt="Payment proof"
                      className="w-full max-w-xs border border-paper rounded-sm"
                    />
                  </a>
                </div>
              </div>

              <div className="border-t border-paper px-5 py-4 flex gap-3">
                <button
                  onClick={() => updateStatus(selected._id, "approved")}
                  disabled={updating || selected.status === "approved"}
                  className="flex-1 bg-green-600 text-white font-mono text-xs font-medium py-2.5 rounded-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selected._id, "rejected")}
                  disabled={updating || selected.status === "rejected"}
                  className="flex-1 bg-stamp-red text-white font-mono text-xs font-medium py-2.5 rounded-sm hover:bg-stamp-red/90 transition-colors disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
