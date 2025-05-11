import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename } = req.query;

  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ error: "Invalid filename" });
  }

  const filePath = path.join(process.cwd(), "public/uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const fileBuffer = fs.readFileSync(filePath);

  // Dynamically infer MIME type
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };

  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  res.status(200).end(fileBuffer);
}
