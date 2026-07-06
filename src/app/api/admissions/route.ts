import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admission from "@/lib/models/Admission";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const honeypot = formData.get("honeypot");
    if (honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    const requiredFields = [
      "studentName", "email", "studentMobile", "fatherName", "guardianMobile",
      "collegeName", "field", "sessionDate", "sscScore", "fscPart1Score",
      "address", "city", "paymentMethod",
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const paymentProof = formData.get("paymentProof") as File | null;
    if (!paymentProof) {
      return NextResponse.json({ error: "Payment proof is required" }, { status: 400 });
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.error("DB connection error:", dbError);
      return NextResponse.json({ error: "Database connection failed" }, { status: 503 });
    }

    const bytes = await paymentProof.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let paymentProofUrl: string;
    try {
      paymentProofUrl = await uploadImage(buffer, "engeecon/payments");
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload payment proof" }, { status: 500 });
    }

    const admission = await Admission.create({
      studentName: formData.get("studentName"),
      email: formData.get("email"),
      studentMobile: formData.get("studentMobile"),
      fatherName: formData.get("fatherName"),
      guardianMobile: formData.get("guardianMobile"),
      collegeName: formData.get("collegeName"),
      field: formData.get("field"),
      sessionDate: formData.get("sessionDate"),
      sscScore: formData.get("sscScore"),
      fscPart1Score: formData.get("fscPart1Score"),
      address: formData.get("address"),
      city: formData.get("city"),
      paymentMethod: formData.get("paymentMethod"),
      paymentProofUrl,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Application received", id: admission._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Admission POST error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
