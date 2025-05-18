import { useState } from "react";
import Image from "next/image";

export default function ImageUpload({
  onImageUpload,
}: {
  onImageUpload: (filename: string) => void;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("📤 Uploading file:", file.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.filename && typeof data.filename === "string") {
        const cleanFilename = `/uploads/${data.filename}`;
        setPreviewImage(cleanFilename);
        onImageUpload(cleanFilename);
        console.log("✅ Image uploaded successfully:", data.filename);
      } else {
        console.error("❌ Invalid or missing filename from server:", data);
      }
    } catch (error) {
      console.error("❌ Image upload failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageUpload}
        className="w-full p-2 border rounded"
      />

      {previewImage && (
        <div className="mt-2 w-48 h-32 relative rounded-lg overflow-hidden shadow-md">
          <Image
            src={previewImage}
            alt="Uploaded Preview"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
