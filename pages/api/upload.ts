import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// ✅ Disable Next.js default body parsing (Required for file uploads)
export const config = {
  api: {
    bodyParser: false,
  },
};

const allowedExtensions = [".jpg", ".jpeg", ".png"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload error" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileExt = path.extname(file.originalFilename || "").toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      return res.status(400).json({
        error: "Invalid file type. Upload a .jpg or .png file.",
      });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalName = path
      .basename(file.originalFilename || "")
      .replace(/[^a-z0-9.\-_]/gi, "_");
    const newFilename = `${Date.now()}_${originalName}`;
    const newPath = path.join(uploadDir, newFilename);

    try {
      fs.copyFileSync(file.filepath, newPath);
      fs.unlinkSync(file.filepath);

      console.log(`✅ File uploaded: ${newFilename}`);
      res.status(200).json({ filename: newFilename });
    } catch (error) {
      console.error("❌ File move error:", error);
      res.status(500).json({ error: "File save error" });
    }
  });
}
