import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import StudyMaterial from "@/models/StudyMaterial";

const fallbackMaterials = [
  {
    _id: "mat-1",
    subjectName: "Mathematics",
    topicTitle: "Linear Algebra: Matrices, Eigenvalues & Vector Spaces",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-20"),
  },
  {
    _id: "mat-2",
    subjectName: "Mathematics",
    topicTitle: "Calculus & Multivariable Optimization Handbook",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-18"),
  },
  {
    _id: "mat-3",
    subjectName: "General Knowledge (GK)",
    topicTitle: "Monthly Current Affairs & Global Summits 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-22"),
  },
  {
    _id: "mat-4",
    subjectName: "English Language",
    topicTitle: "Grammar Rules: Subject-Verb Agreement & Tenses",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-21"),
  },
  {
    _id: "mat-5",
    subjectName: "Computer Science",
    topicTitle: "Operating Systems: Concurrency & Virtual Memory",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    createdAt: new Date("2026-09-23"),
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    const conn = await connectToDatabase();
    if (!conn) {
      const data = subject
        ? fallbackMaterials.filter(
            (m) => m.subjectName.toLowerCase() === subject.toLowerCase()
          )
        : fallbackMaterials;
      return NextResponse.json({ success: true, source: "fallback", data });
    }

    const query = subject ? { subjectName: new RegExp(`^${subject}$`, "i") } : {};
    const materials = await StudyMaterial.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      source: "mongodb",
      data: materials.length > 0 ? materials : fallbackMaterials,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, data: fallbackMaterials },
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

    const newMaterial = await StudyMaterial.create(body);
    return NextResponse.json({ success: true, data: newMaterial }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
