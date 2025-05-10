import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gold text-sm">Processing Transaction...</p>
    </div>
  );
}
