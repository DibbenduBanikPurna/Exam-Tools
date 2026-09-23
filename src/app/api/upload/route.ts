import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Multer with memory storage and PDF validation
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file format. Only PDF files are allowed."));
    }
  },
});

// 3. Adapter helper: runs Multer middleware on Next.js App Router Web Request
function runMulterMiddleware(
  req: NextRequest,
  middleware: (req: any, res: any, next: (err?: any) => void) => void
): Promise<Express.Multer.File> {
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = Buffer.from(await req.arrayBuffer());

      // Create a readable stream from the request buffer
      const readable = new Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);

      // Attach HTTP headers required by Multer for parsing multipart/form-data boundary
      const mockReq: any = readable;
      mockReq.headers = Object.fromEntries(req.headers.entries());
      mockReq.method = req.method;

      const mockRes: any = {};

      middleware(mockReq, mockRes, (err: any) => {
        if (err) {
          return reject(err);
        }
        if (!mockReq.file) {
          return reject(new Error("No PDF file provided under field 'file'."));
        }
        resolve(mockReq.file);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// 4. Cloudinary upload stream helper
function uploadToCloudinary(
  fileBuffer: Buffer,
  originalFilename: string
): Promise<{ secure_url: string; public_id: string; bytes: number }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "study_materials_pdfs",
        resource_type: "raw", // 'raw' or 'auto' is required for PDF documents in Cloudinary
        format: "pdf",
        public_id: `${Date.now()}-${originalFilename.replace(/\.[^/.]+$/, "")}`,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

// 5. POST handler for App Router: /api/upload
export async function POST(req: NextRequest) {
  try {
    // Execute Multer upload.single("file")
    const multerSingle = upload.single("file");
    const file = await runMulterMiddleware(req, multerSingle);

    // Stream the parsed file buffer directly to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(
      file.buffer,
      file.originalname
    );

    // Return the secure_url for saving into MongoDB
    return NextResponse.json(
      {
        success: true,
        message: "PDF uploaded successfully to Cloudinary",
        secure_url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
        bytes: cloudinaryResponse.bytes,
        originalName: file.originalname,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred during upload.",
      },
      { status: 400 }
    );
  }
}
