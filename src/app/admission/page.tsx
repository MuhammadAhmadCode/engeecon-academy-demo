"use client";

import { useState } from "react";

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
  studentName: "",
  email: "",
  studentMobile: "",
  fatherName: "",
  guardianMobile: "",
  collegeName: "",
  field: "Pre-Medical",
  sessionDate: "",
  sscScore: "",
  fscPart1Score: "",
  address: "",
  city: "",
  paymentMethod: "",
  honeypot: "",
};

export default function AdmissionPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentFile(file);
      setFileName(file.name);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.honeypot) return;

    if (!form.studentName || !form.email || !form.studentMobile) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!paymentFile) {
      setError("Please upload payment proof.");
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        fd.append(key, val);
      });
      fd.append("paymentProof", paymentFile);

      const res = await fetch("/api/admissions", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="border-2 border-gold/60 rounded-sm bg-white p-0 overflow-hidden">
            <div className="border-b border-gold/30 px-5 py-3 flex items-center justify-between">
              <span className="font-mono text-gold text-[10px] tracking-[0.25em] uppercase">
                Application Slip Generated
              </span>
              <span className="font-mono text-gold/50 text-[10px]">2026</span>
            </div>

            <div className="px-5 py-6 space-y-4">
              <div className="text-center mb-4">
                <div className="w-14 h-14 border-2 border-gold rounded-sm mx-auto flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-ink-navy text-xl font-bold mb-1">Application Received</h2>
                <p className="text-slate-light text-sm">
                  We&apos;ll review your application within 24 hours.
                </p>
              </div>

              <div className="slip-line py-2">
                <span className="font-mono text-gold/50 text-[10px] tracking-[0.2em] uppercase block">
                  Applicant
                </span>
                <span className="font-mono text-ink-navy text-sm font-medium">{form.studentName}</span>
              </div>
              <div className="slip-line py-2">
                <span className="font-mono text-gold/50 text-[10px] tracking-[0.2em] uppercase block">
                  Session
                </span>
                <span className="font-mono text-ink-navy text-sm font-medium">{form.sessionDate}</span>
              </div>
              <div className="slip-line py-2">
                <span className="font-mono text-gold/50 text-[10px] tracking-[0.2em] uppercase block">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gold text-sm font-medium">Pending</span>
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                </div>
              </div>
            </div>

            <div className="border-t border-gold/30 px-5 py-3 text-center">
              <p className="font-mono text-slate-light text-[10px]">
                Save this page — your reference for any follow-up
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="font-mono text-gold text-sm hover:underline"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="font-mono text-gold text-xs tracking-[0.2em] uppercase mb-2">
            Apply Online
          </p>
          <h1 className="font-display text-ink-navy text-2xl sm:text-3xl font-bold mb-2">
            Admission Form
          </h1>
          <p className="text-slate-light text-sm">
            Fill in your details below. All fields are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="bg-white border border-paper rounded-sm p-5 sm:p-6 space-y-5">
            <h2 className="font-mono text-gold text-[11px] tracking-[0.2em] uppercase border-b border-paper pb-3">
              Personal Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Student Name" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Full name" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
              <Field label="Student Mobile (WhatsApp)" name="studentMobile" value={form.studentMobile} onChange={handleChange} placeholder="03XX XXXXXXX" />
              <Field label="Father Name" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father&apos;s name" />
              <Field label="Guardian Mobile" name="guardianMobile" value={form.guardianMobile} onChange={handleChange} placeholder="03XX XXXXXXX" />
            </div>
          </div>

          <div className="bg-white border border-paper rounded-sm p-5 sm:p-6 space-y-5">
            <h2 className="font-mono text-gold text-[11px] tracking-[0.2em] uppercase border-b border-paper pb-3">
              Academic Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="College Name" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="Your college" />
              <div>
                <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-slate-light mb-1.5">
                  Field
                </label>
                <select
                  name="field"
                  value={form.field}
                  onChange={handleChange}
                  className="w-full border border-paper bg-white rounded-sm px-3 py-2.5 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="Pre-Medical">Pre-Medical</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-slate-light mb-1.5">
                  Session Date
                </label>
                <select
                  name="sessionDate"
                  value={form.sessionDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-paper bg-white rounded-sm px-3 py-2.5 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select session</option>
                  {SESSION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <Field label="SSC Score" name="sscScore" value={form.sscScore} onChange={handleChange} placeholder="e.g. 1050/1100" />
              <Field label="FSc Part-1 Score" name="fscPart1Score" value={form.fscPart1Score} onChange={handleChange} placeholder="e.g. 480/550" />
            </div>
          </div>

          <div className="bg-white border border-paper rounded-sm p-5 sm:p-6 space-y-5">
            <h2 className="font-mono text-gold text-[11px] tracking-[0.2em] uppercase border-b border-paper pb-3">
              Address
            </h2>

            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-slate-light mb-1.5">
                Address
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={2}
                placeholder="Street address, area"
                className="w-full border border-paper bg-white rounded-sm px-3 py-2.5 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
            <Field label="City" name="city" value={form.city} onChange={handleChange} placeholder="Your city" />
          </div>

          <div className="bg-white border border-paper rounded-sm p-5 sm:p-6 space-y-5">
            <h2 className="font-mono text-gold text-[11px] tracking-[0.2em] uppercase border-b border-paper pb-3">
              Payment
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-slate-light mb-1.5">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  required
                  className="w-full border border-paper bg-white rounded-sm px-3 py-2.5 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select method</option>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-slate-light mb-1.5">
                  Payment Proof
                </label>
                <label className="flex items-center gap-2 w-full border border-paper bg-white rounded-sm px-3 py-2.5 text-sm text-slate cursor-pointer hover:border-gold/50 transition-colors">
                  <svg className="w-4 h-4 text-slate-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{fileName || "Upload screenshot"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {error && (
            <div className="bg-stamp-red/10 border border-stamp-red/30 rounded-sm px-4 py-3">
              <p className="text-stamp-red text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ink-navy text-white font-mono text-sm font-medium py-3 rounded border-2 border-gold hover:bg-gold hover:text-ink-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Processing..." : "Apply Now"}
          </button>

          <p className="text-center text-slate-light text-xs font-mono">
            By applying you agree to our admission terms. We review applications within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-slate-light mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full border border-paper bg-white rounded-sm px-3 py-2.5 text-sm text-slate font-body focus:outline-none focus:border-gold transition-colors placeholder:text-slate-light/60"
      />
    </div>
  );
}
