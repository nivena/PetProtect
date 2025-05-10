import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query; // Get the filename from the request URL

  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ error: "Invalid filename" });
  }

  const filePath = path.join(process.cwd(), "public/uploads", filename);

  // ✅ Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  // ✅ Read and serve the file
  const fileBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpeg"); // Change based on file type
  res.status(200).end(fileBuffer);
}
