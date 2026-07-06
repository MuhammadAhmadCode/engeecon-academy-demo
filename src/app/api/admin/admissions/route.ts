import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admission from "@/lib/models/Admission";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.error("DB connection error:", dbError);
      return NextResponse.json({ error: "Database connection failed" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const paymentMethod = searchParams.get("paymentMethod");

    const filter: Record<string, string> = {};
    if (status) filter.status = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;

    const admissions = await Admission.find(filter)
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();

    return NextResponse.json({ admissions });
  } catch (error: unknown) {
    console.error("Admissions GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
