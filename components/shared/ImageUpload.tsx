import { useState } from "react";

export default function ImageUpload({
  onImageUpload,
}: {
  onImageUpload: (filename: string) => void;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // ✅ Handles image upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ✅ Show temporary preview instantly
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

      if (data.filename) {
        console.log("✅ Image uploaded successfully:", data.filename);

        if (!data.filename || typeof data.filename !== "string") {
          console.error("❌ Invalid or missing filename from server:", data);
          return;
        }

        const cleanFilename = `/uploads/${data.filename}`;

        // ✅ Replace temporary preview with the final uploaded image
        setPreviewImage(cleanFilename);
        onImageUpload(cleanFilename); // ✅ Notify parent with final image path
      } else {
        console.error("❌ Image upload failed:", data.error);
      }
    } catch (error) {
      console.error("❌ Image upload failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* 🖼️ Image Upload Input */}
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageUpload}
        className="w-full p-2 border rounded"
      />

      {/* ✅ Only show final image preview */}
      {previewImage && (
        <img
          src={previewImage}
          alt="Uploaded Preview"
          className="mt-2 w-48 h-32 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
}
