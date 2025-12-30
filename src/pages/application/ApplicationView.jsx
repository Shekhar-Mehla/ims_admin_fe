import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const ApplicationView = () => {
  const { id } = useParams();
  const [pdfurl, setPdfurl] = useState(null);

  const { application } = useSelector((state) => state.applicationInfo);
  console.log(application);
  const buildPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Application Details", 80, 20);

    doc.setFontSize(12);
    console.log(application?.id);
    doc.text(`Application ID: ${application?.id}`, 20, 40);
    doc.text(`Name: ${application?.name}`, 20, 50);
    doc.text(`Email: ${application?.email}`, 20, 60);
    doc.text(`Status: ${application?.status}`, 20, 70);
    doc.text(`Internship: ${application?.internshipTitle}`, 20, 80);
    doc.text(`Application Date: ${application.applicationDate}`, 20, 90);

    doc.text("Resume:", 20, 100);
    doc.setTextColor(0, 0, 255);

    // doc.link(20, 65, 160, 8, {
    //   url: application.resumeUrl,
    // });
    // doc.textWithLink(application?.resumeUrl, 20, 110, {
    //   url: application?.resumeUrl,
    // });
    return doc;
    // doc.save(`application-${application.id}.pdf`);
  };

  useEffect(() => {
    const doc = buildPDF();
    const blobUrl = doc.output("bloburl");
    setPdfurl(blobUrl);
  }, []);
  const handleDownload = () => {
    const doc = buildPDF();
    doc.save(`application-${id}.pdf`);
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Application PDF Preview</h1>
      {pdfurl && (
        <iframe
          src={pdfurl}
          title="Application PDF"
          className="w-full h-[80vh] border rounded"
        />
      )}

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};
export default ApplicationView;
