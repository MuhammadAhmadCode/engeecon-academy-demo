"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Select, Card, CardHeader, CardBody } from "@/components/ui";

const SESSION_OPTIONS = [
  "July 2026 — Morning",
  "July 2026 — Evening",
  "October 2026 — Morning",
  "October 2026 — Evening",
];

const PAYMENT_METHODS = ["EasyPaisa", "JazzCash", "HBL"];

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
          <Card variant="dark" className="overflow-hidden">
            <CardHeader className="border-b-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 bg-gold/15 border border-gold/30 rounded-lg flex items-center justify-center">
                  <span className="font-display text-gold text-[9px] font-bold">E</span>
                </div>
                <span className="font-mono text-gold text-[11px] font-semibold tracking-widest uppercase">Application Received</span>
              </div>
              <span className="font-mono text-white/25 text-[11px]">2026</span>
            </CardHeader>
            <CardBody className="py-8 space-y-5">
              <div className="text-center mb-2">
                <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-white text-xl font-bold mb-1">Application Received</h2>
                <p className="text-white/40 text-sm font-body">We&apos;ll review your application within 24 hours.</p>
              </div>
              {[["Applicant", form.studentName], ["Session", form.sessionDate], ["Status", "Pending"]].map(([l, v]) => (
                <div key={l as string} className="slip-line py-3.5">
                  <span className="font-mono text-white/30 text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1">{l}</span>
                  <span className="text-white text-sm font-medium font-body">{v}</span>
                </div>
              ))}
            </CardBody>
            <div className="border-t border-white/10 px-6 py-3.5 text-center bg-white/[0.03]">
              <p className="font-mono text-white/20 text-[10px]">Save this page — your reference for any follow-up</p>
            </div>
          </Card>
          <div className="mt-8 text-center">
            <Link href="/" className="font-mono text-ink-navy text-sm font-medium hover:text-gold transition-colors">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-6 sm:px-10">
        <div className="mb-10">
          <p className="font-mono text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Apply Online</p>
          <h1 className="font-display text-ink-navy text-3xl sm:text-4xl font-bold mb-2">Admission Form</h1>
          <p className="font-body text-slate-light text-sm mb-5">Fill in your details below. All fields are required.</p>

          {/* Fee badge */}
          <div className="inline-flex items-center gap-3 bg-ink-navy rounded-xl px-5 py-3">
            <div className="text-right">
              <span className="text-white/30 text-xs font-mono line-through block">Rs. 36,000</span>
              <span className="font-display text-gold text-xl font-bold">Rs. 18,000</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <span className="bg-stamp-red/15 border border-stamp-red/30 text-stamp-red text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md font-mono">
              Limited Time Offer
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <Card>
            <CardHeader>
              <h2 className="font-display text-ink-navy text-sm font-bold">Personal Information</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Student Name" name="studentName" value={form.studentName} onChange={handleChange} placeholder="Full name" />
                <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
                <Input label="Student Mobile (WhatsApp)" name="studentMobile" value={form.studentMobile} onChange={handleChange} placeholder="03XX XXXXXXX" mono />
                <Input label="Father Name" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Father's name" />
                <Input label="Guardian Mobile" name="guardianMobile" value={form.guardianMobile} onChange={handleChange} placeholder="03XX XXXXXXX" mono />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-display text-ink-navy text-sm font-bold">Academic Details</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="College Name" name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="Your college" />
                <Select label="Field" name="field" value={form.field} onChange={handleChange} options={["Pre-Medical"]} />
                <Select label="Session Date" name="sessionDate" value={form.sessionDate} onChange={handleChange} options={SESSION_OPTIONS} placeholder="Select session" />
                <Input label="SSC Score" name="sscScore" value={form.sscScore} onChange={handleChange} placeholder="e.g. 1050/1100" mono />
                <Input label="FSc Part-1 Score" name="fscPart1Score" value={form.fscPart1Score} onChange={handleChange} placeholder="e.g. 480/550" mono />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-display text-ink-navy text-sm font-bold">Address</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-light mb-1.5">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="Street address, area"
                  className="w-full bg-white border-[1.5px] border-ink-navy/10 rounded-xl px-3.5 py-2.5 text-sm text-slate font-body placeholder:text-slate-light/40 transition-all duration-200 hover:border-ink-navy/20 focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.1)] focus:bg-[#fffdf8] resize-none"
                />
              </div>
              <Input label="City" name="city" value={form.city} onChange={handleChange} placeholder="Your city" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="font-display text-ink-navy text-sm font-bold">Payment</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="Payment Method" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} options={PAYMENT_METHODS} placeholder="Select method" />
                <div>
                  <label className="block font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-light mb-1.5">Payment Proof</label>
                  <label className="flex items-center gap-3 w-full border-[1.5px] border-ink-navy/10 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate font-body cursor-pointer hover:border-ink-navy/20 hover:bg-[#fffdf8] transition-all duration-200">
                    <svg className="w-5 h-5 text-slate-light/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">{fileName || "Upload screenshot"}</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" required />
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>

          <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {error && (
            <div className="bg-stamp-red/10 border border-stamp-red/20 rounded-xl px-4 py-3 animate-fade-in">
              <p className="text-stamp-red text-sm font-medium font-body">{error}</p>
            </div>
          )}

          <Button type="submit" loading={submitting} className="w-full">
            Apply Now
          </Button>

          <p className="text-center text-slate-light/50 text-xs font-mono">
            By applying you agree to our admission terms.
          </p>
        </form>
      </div>
    </div>
  );
}
