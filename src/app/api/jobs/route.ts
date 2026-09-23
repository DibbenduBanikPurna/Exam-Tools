import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import JobTracker from "@/models/JobTracker";

// Fallback seed jobs if MongoDB connection is not yet configured in .env.local
const fallbackJobs = [
  {
    _id: "demo-1",
    jobTitle: "Assistant Director (Systems & IT)",
    organization: "Bangladesh Bank / Central Bank",
    examDate: new Date("2026-10-15T09:30:00Z"),
    status: "Admit Published",
    admitCardPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-01"),
  },
  {
    _id: "demo-2",
    jobTitle: "Senior Software Engineer (Backend)",
    organization: "Stripe",
    examDate: new Date("2026-10-22T14:00:00Z"),
    status: "Applied",
    admitCardPdfUrl: null,
    createdAt: new Date("2026-09-10"),
  },
  {
    _id: "demo-3",
    jobTitle: "Scientific Officer (Computer Science)",
    organization: "Atomic Energy Commission",
    examDate: new Date("2026-09-12T10:00:00Z"),
    status: "Exam Done",
    admitCardPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-08-20"),
  },
  {
    _id: "demo-4",
    jobTitle: "Network Security Specialist",
    organization: "National Cyber Security Agency",
    examDate: new Date("2026-11-05T10:00:00Z"),
    status: "Admit Published",
    admitCardPdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-15"),
  },
  {
    _id: "demo-5",
    jobTitle: "Junior Executive (Software Development)",
    organization: "Sonali Bank PLC",
    examDate: null,
    status: "Applied",
    admitCardPdfUrl: null,
    createdAt: new Date("2026-09-20"),
  },
];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: true,
        source: "fallback",
        data: fallbackJobs,
      });
    }

    const jobs = await JobTracker.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      source: "mongodb",
      data: jobs.length > 0 ? jobs : fallbackJobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch jobs",
        data: fallbackJobs,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          error: "MongoDB not connected. Please define MONGODB_URI in .env.local",
        },
        { status: 503 }
      );
    }

    const newJob = await JobTracker.create(body);
    return NextResponse.json(
      { success: true, data: newJob },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
