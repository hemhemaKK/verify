import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificatePage() {
  const certRef = useRef();

  const handleDownload = () => {
    const input = certRef.current;

    html2canvas(input, {
      scale: 3, // higher scale = sharper PDF
      useCORS: true, // allows external images
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create PDF same ratio as the image
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height], // use image’s exact size
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("nullclass_certificate.pdf");
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      {/* Download Button */}
   

      {/* Verified Label */}
      <h2
        style={{
          marginBottom: "20px",
          zIndex:1000,
        }}
      > Verified Certificate   <button
        onClick={handleDownload}
        style={{
          marginBottom: "25px",
          color: "white",
          border: "none",
          fontSize: "26px",
          borderRadius: "6px",
          cursor: "pointer",
          background:"white",
        }}
      >
       🧾 
      </button>
      </h2>

      {/* Certificate Image */}
      <div
        ref={certRef}
        style={{
          width: "auto",
          height: "auto",
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          marginTop:"-300px",
          marginLeft:"200px",
        }}
      >
        <img
          src="/image.png" // 👈 Replace with your actual image (put in /public)
          alt="Certificate"
          style={{
            width: "80%",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
