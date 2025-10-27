import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificatePage() {
  const certRef = useRef();

  const handleDownload = () => {
    const input = certRef.current;

    html2canvas(input, {
      scale: 3, // Higher quality
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("nullclass_certificate.pdf");
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Header with Verified Label + Download Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            margin: 0,
          }}
        >Verified Certificate
        </h2>
        <button
          onClick={handleDownload}
          style={{
            background: "white",
            border: "2px solid #004aad",
            color: "#004aad",
            fontSize: "22px",
            borderRadius: "8px",
            cursor: "pointer",
            padding: "6px 10px",
          }}
          title="Download Certificate"
        >
          🧾
        </button>
      </div>

      {/* Certificate Image */}
      <div
        ref={certRef}
        style={{
          width: "100%",
          maxWidth: "1500px",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <img
          src="/image.png" // Place your certificate in public/image.png
          alt="Certificate"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
