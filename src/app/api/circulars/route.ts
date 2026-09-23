import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Circular from "@/models/Circular";

const fallbackCirculars = [
  {
    _id: "circ-1",
    organization: "Office of University Career Services",
    position: "Tier-1 Tech Campus Recruitment Drive 2026-2027",
    applicationDeadline: new Date("2026-10-15"),
    circularFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-21"),
  },
  {
    _id: "circ-2",
    organization: "Controller of Examinations",
    position: "Fall Semester Midterm Examination Notice & Hall List",
    applicationDeadline: new Date("2026-10-10"),
    circularFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-18"),
  },
  {
    _id: "circ-3",
    organization: "Dean of Academic Affairs",
    position: "Course Add/Drop Period Final Extension for Semester IV",
    applicationDeadline: new Date("2026-09-30"),
    circularFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-15"),
  },
];

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: true,
        source: "fallback",
        data: fallbackCirculars,
      });
    }

    const circulars = await Circular.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      source: "mongodb",
      data: circulars.length > 0 ? circulars : fallbackCirculars,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, data: fallbackCirculars },
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

    const newCircular = await Circular.create(body);
    return NextResponse.json({ success: true, data: newCircular }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
