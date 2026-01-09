import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApplicationByIdAction } from "../../features/application/applicationaction";

const ApplicationView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pdfurl, setPdfurl] = useState(null);

  const { application } = useSelector((state) => state.applicationInfo);

  const buildPDF = () => {
    const doc = new jsPDF();
    const genDate = new Date().toLocaleString();

    // Header
    doc.setFontSize(18);
    doc.text("Application Details", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated: ${genDate}`, 150, 18);

    // Basic info
    const name =
      `${application?.profileId?.fName ?? ""} ${
        application?.profileId?.lName ?? ""
      }`.trim() || "-";
    doc.setFontSize(14);
    doc.text(name, 14, 30);
    doc.setFontSize(11);
    doc.text(
      `Application ID: ${application?._id ?? application?.id ?? "-"}`,
      14,
      38
    );
    doc.text(`Status: ${application?.status ?? "-"}`, 110, 38);
    doc.text(`Internship: ${application?.internshipId?.title ?? "-"}`, 14, 46);

    const submitted =
      application?.submittedAt ?? application?.createdAt ?? null;
    const submittedText = submitted
      ? new Date(submitted).toLocaleString()
      : "-";
    doc.text(`Submitted: ${submittedText}`, 14, 54);

    // Contact & quick profile
    let y = 62;
    const email =
      application?.profileId?.authId?.email ??
      application?.profileId?.email ??
      "-";
    doc.setFontSize(10);
    doc.text(`Email: ${email}`, 14, y);
    y += 7;
    const phone =
      application?.profileId?.phone ??
      application?.profileId?.authId?.phone ??
      null;
    if (phone) {
      doc.text(`Phone: ${phone}`, 14, y);
      y += 7;
    }

    const skillsArr =
      application?.profileId?.technologies || application?.technologies || [];
    const skills = Array.isArray(skillsArr)
      ? skillsArr.join(", ")
      : skillsArr || "-";
    doc.text(`Skills: ${skills}`, 14, y);
    y += 9;

    // Preferences summary (start, duration, mode, expected stipend)
    const prefs = application?.preferences || {};
    const startText = prefs.startDate
      ? new Date(prefs.startDate).toLocaleDateString()
      : "-";
    const duration = prefs.duration ?? "-";
    const mode = prefs.workMode ?? "-";
    const stipend = prefs.expectedStipend ?? "-";
    doc.text(
      `Start: ${startText}   Duration: ${duration}   Mode: ${mode}   Stipend: ${stipend}`,
      14,
      y
    );
    y += 9;

    // Documents (resume, portfolio) as links when available
    const resumeUrl =
      application?.documents?.resumeUrl ||
      application?.profileId?.resumeUrl ||
      application?.resumeUrl;
    if (resumeUrl) {
      doc.setTextColor(0, 0, 255);
      try {
        doc.textWithLink("Resume", 14, y, { url: resumeUrl });
      } catch (e) {
        doc.setTextColor(0, 0, 0);
        doc.text(`Resume: ${resumeUrl}`, 14, y);
      }
      doc.setTextColor(0, 0, 0);
      y += 7;
    }
    const portfolioUrl =
      application?.documents?.portfolioUrl ||
      application?.documents?.portfolioUrl;
    if (portfolioUrl) {
      doc.setTextColor(0, 0, 255);
      try {
        doc.textWithLink("Portfolio", 40, y - 7, { url: portfolioUrl });
      } catch (e) {
        doc.setTextColor(0, 0, 0);
        doc.text(`Portfolio: ${portfolioUrl}`, 40, y - 7);
      }
      doc.setTextColor(0, 0, 0);
      y += 7;
    }

    // Priority and review metadata
    if (application?.priority) {
      doc.text(`Priority: ${application.priority}`, 14, y);
      y += 7;
    }
    if (application?.reviewedAt) {
      const reviewedText = new Date(application.reviewedAt).toLocaleString();
      doc.text(`Reviewed: ${reviewedText}`, 14, y);
      y += 7;
    }

    // Short review notes (if any)
    if (application?.reviewNotes) {
      doc.text("Review Notes:", 14, y);
      y += 5;
      const notesLines = doc.splitTextToSize(application.reviewNotes, 180);
      doc.text(notesLines, 14, y);
      y += notesLines.length * 6;
    }

    // Cover letter and "why" text: put excerpt on first page and full text on second if long
    const cover = prefs.coverLetter ?? "";
    const why = prefs.whyThisInternship ?? "";
    const combined =
      `Cover Letter:\n${cover}\n\nWhy This Internship:\n${why}`.trim();
    if (combined) {
      const excerptLimit = 400;
      if (combined.length > excerptLimit) {
        const excerpt = combined.substring(0, excerptLimit) + "...";
        const excerptLines = doc.splitTextToSize(excerpt, 180);
        // keep within page bounds; if not enough space, start new page first
        const pageHeight = doc.internal.pageSize.getHeight();
        if (y + excerptLines.length * 6 > pageHeight - 40) {
          doc.addPage();
          y = 20;
        }
        doc.text(excerptLines, 14, y);
        // full content on next page
        doc.addPage();
        doc.setFontSize(12);
        doc.text("Full Cover Letter & Explanation", 14, 18);
        const fullLines = doc.splitTextToSize(combined, 180);
        doc.text(fullLines, 14, 28);
      } else {
        const lines = doc.splitTextToSize(combined, 180);
        doc.text(lines, 14, y);
        y += lines.length * 6;
      }
    }

    // Footer: generation date & page numbers
    const pageCount = doc.getNumberOfPages();
    const pageH = doc.internal.pageSize.getHeight();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.text(
        `Generated: ${genDate} | Page ${i} of ${pageCount}`,
        14,
        pageH - 10
      );
    }

    return doc;
  };

  // Fetch application when component mounts
  useEffect(() => {
    dispatch(getApplicationByIdAction(id));
  }, [dispatch, id]);

  // Rebuild PDF when application data changes
  useEffect(() => {
    if (!application || Object.keys(application).length === 0) return;
    console.log("Application fetched:", application);
    const doc = buildPDF();
    const blobUrl = doc.output("bloburl");
    setPdfurl(blobUrl);
  }, [application]);

  const handleDownload = () => {
    const doc = buildPDF();
    doc.save(`application-${id}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Application PDF Preview</h1>

      {!application || Object.keys(application).length === 0 ? (
        <p>Loading application...</p>
      ) : (
        pdfurl && (
          <iframe
            src={pdfurl}
            title="Application PDF"
            className="w-full h-[80vh] border rounded"
          />
        )
      )}

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-black text-white rounded mt-4"
      >
        Download PDF
      </button>
    </div>
  );
};
export default ApplicationView;
