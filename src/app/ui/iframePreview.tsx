import React, { useState } from "react";

const IFramePreview: React.FC = () => {
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setScale(1);

  return (
    <div className="p-4">
      <div className="mb-2 space-x-2">
        <button onClick={zoomOut} className="px-4 py-2 bg-gray-300 rounded">-</button>
        <button onClick={resetZoom} className="px-4 py-2 bg-gray-300 rounded">Reset</button>
        <button onClick={zoomIn} className="px-4 py-2 bg-gray-300 rounded">+</button>
      </div>
      <div className="border rounded overflow-hidden" style={{ width: "800px", height: "600px" }}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
          }}
        >
          <iframe
            src="/preview?dh=true&df=true"
            title="Preview"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default IFramePreview;