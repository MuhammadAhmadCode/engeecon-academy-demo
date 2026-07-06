"use client";

import { useState } from "react";
import Link from "next/link";

const SESSION_OPTIONS = [
  "July 2026 — Morning",
  "July 2026 — Evening",
  "October 2026 — Morning",
  "October 2026 — Evening",
];

const PAYMENT_METHODS = ["EasyPaisa", "JazzCash", "Meezan Bank", "HBL"];

interface FormData {
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
  honeypot: string;
}

const INITIAL: FormData = {
  studentName: "", email: "", studentMobile: "", fatherName: "",
  guardianMobile: "", collegeName: "", field: "Pre-Medical", sessionDate: "",
  sscScore: "", fscPart1Score: "", address: "", city: "", paymentMethod: "", honeypot: "",
};

export default function AdmissionPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) { setPaymentFile(file); setFileName(file.name); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.honeypot) return;
    if (!form.studentName || !form.email || !form.studentMobile) { setError("Please fill in all required fields."); return; }
    if (!paymentFile) { setError("Please upload payment proof."); return; }
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("paymentProof", paymentFile);
      const res = await fetch("/api/admissions", { method: "POST", body: fd });
      const text = await res.text();
      let data: Record<string, string>;
      try { data = JSON.parse(text); } catch { throw new Error(`Server error (${res.status})`); }
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccess(true);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setSubmitting(false); }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md animate-fade-up">
          {/* Dark card with solid navy background */}
          <div className="bg-ink-navy rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-gold/15 border border-gold/30 rounded-lg flex items-center justify-center">
                  <span className="font-display text-gold text-[9px] font-bold">E</span>
                </div>
                <span className="text-gold text-[11px] font-semibold tracking-widest uppercase">Application Received</span>
              </div>
              <span className="text-white/25 text-[11px] font-mono">2026</span>
            </div>

            {/* Body */}
            <div className="px-6 py-8 space-y-5">
              <div className="text-center mb-2">
                <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-white text-xl font-bold mb-1">Application Received</h2>
                <p className="text-white/40 text-sm">We&apos;ll review your application within 24 hours.</p>
              </div>

              {[["Applicant", form.studentName], ["Session", form.sessionDate], ["Status", "Pending"]].map(([l, v]) => (
                <div key={l as string} className="border-b border-white/10 py-3.5">
                  <span className="text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1">{l}</span>
                  <span className="text-white text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-3.5 text-center bg-white/[0.03]">
              <p className="text-white/20 text-[10px]">Save this page — your reference for any follow-up</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-ink-navy text-sm font-medium hover:text-gold transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-6 sm:px-10">
        <div className="mb-10">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Apply Online</p>
          <h1 className="font-display text-ink-navy text-3xl sm:text-4xl font-bold mb-2">Admission Form</h1>
          <p className="text-slate-light text-sm">Fill in your details below. All fields are required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <Section title="Personal Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Student Name" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Full name" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
              <Field label="Student Mobile (WhatsApp)" name="studentMobile" value={form.studentMobile} onChange={handleChange} placeholder="03XX XXXXXXX" />
              <Field label="Father Name" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father's name" />
              <Field label="Guardian Mobile" name="guardianMobile" value={form.guardianMobile} onChange={handleChange} placeholder="03XX XXXXXXX" />
            </div>
          </Section>

          <Section title="Academic Details">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="College Name" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="Your college" />
              <Select label="Field" name="field" value={form.field} onChange={handleChange} options={["Pre-Medical"]} />
              <Select label="Session Date" name="sessionDate" value={form.sessionDate} onChange={handleChange} options={SESSION_OPTIONS} placeholder="Select session" />
              <Field label="SSC Score" name="sscScore" value={form.sscScore} onChange={handleChange} placeholder="e.g. 1050/1100" />
              <Field label="FSc Part-1 Score" name="fscPart1Score" value={form.fscPart1Score} onChange={handleChange} placeholder="e.g. 480/550" />
            </div>
          </Section>

          <Section title="Address">
            <div>
              <label className="form-label">Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} required rows={2} placeholder="Street address, area" className="form-input resize-none" />
            </div>
            <Field label="City" name="city" value={form.city} onChange={handleChange} placeholder="Your city" />
          </Section>

          <Section title="Payment">
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Payment Method" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} options={PAYMENT_METHODS} placeholder="Select method" />
              <div>
                <label className="form-label">Payment Proof</label>
                <label className="flex items-center gap-3 w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm text-slate cursor-pointer hover:border-gold/40 hover:bg-gold/[0.02] transition-all duration-200">
                  <svg className="w-5 h-5 text-slate-light/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{fileName || "Upload screenshot"}</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" required />
                </label>
              </div>
            </div>
          </Section>

          <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-fade-in">
              <p className="text-stamp-red text-sm font-medium">{error}</p>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn-primary w-full text-center">
            {submitting ? (
              <>
                <span className="spinner" />
                Processing...
              </>
            ) : (
              "Apply Now"
            )}
          </button>

          <p className="text-center text-slate-light/60 text-xs">
            By applying you agree to our admission terms.
          </p>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-navy/[0.06] p-5 sm:p-6 space-y-4">
      <h2 className="text-ink-navy text-sm font-bold border-b border-ink-navy/[0.06] pb-3">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder }: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required placeholder={placeholder} className="form-input" />
    </div>
  );
}

function Select({ label, name, value, onChange, options, placeholder }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; placeholder?: string;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select name={name} value={value} onChange={onChange} required className="form-input appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
