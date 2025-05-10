import { IncomingForm, File } from "formidable";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// ✅ Disable Next.js default body parsing (Required for file uploads)
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Allowed file types
const allowedExtensions = [".jpg", ".jpeg", ".png"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload error" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // ✅ Validate file type
    const fileExt = path.extname(file.originalFilename || "").toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      return res
        .status(400)
        .json({ error: "Invalid file type. Upload a .jpg or .png file." });
    }

    // ✅ Define Upload Directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // ✅ Ensure the directory exists
    }

    // ✅ Rename file for uniqueness
    const newFilename = `${Date.now()}_${file.originalFilename}`;
    const newPath = path.join(uploadDir, newFilename);

    try {
      // ✅ Move file to permanent directory
      fs.copyFileSync(file.filepath, newPath); // ✅ Copy file instead of renaming
      fs.unlinkSync(file.filepath); // ✅ Delete the temp file after copying

      console.log(`✅ File uploaded: ${newFilename}`);

      // ✅ Send back the API path for accessing the image
      res.status(200).json({ filename: newFilename });
    } catch (error) {
      console.error("❌ File move error:", error);
      res.status(500).json({ error: "File save error" });
    }
  });
}
// ✅ Disable Next.js default body parsing (Required for file uploads)
