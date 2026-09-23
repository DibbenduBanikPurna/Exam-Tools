"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Search,
  Filter,
  Download,
  Calendar,
  Building,
  AlertCircle,
  FileText,
  ExternalLink,
  Plus,
  X,
  CheckCircle2,
  Megaphone,
  Bell,
  Clock,
} from "lucide-react";

interface CircularItem {
  id: string;
  refNo: string;
  title: string;
  category: "Recruitment" | "Academic" | "Exam Notice" | "Administrative";
  issuer: string;
  publishDate: string;
  deadline?: string;
  status: "Active" | "Urgent" | "Archived";
  audience: string;
  summary: string;
  attachmentSize: string;
}

const initialCirculars: CircularItem[] = [
  {
    id: "circ-1",
    refNo: "CIR/2026/CS-104",
    title: "Campus Recruitment Drive 2026-2027: Tier-1 Tech Registration",
    category: "Recruitment",
    issuer: "Office of University Career Services",
    publishDate: "Sep 21, 2026",
    deadline: "Oct 15, 2026",
    status: "Urgent",
    audience: "Graduating Seniors & Master's Students",
    summary: "Mandatory profile registration and resume verification for upcoming on-campus recruitment cycles by Microsoft, Google, and Bloomberg.",
    attachmentSize: "1.4 MB PDF",
  },
  {
    id: "circ-2",
    refNo: "CIR/2026/EXAM-088",
    title: "Fall Semester Midterm Examination Schedule & Hall Allocations",
    category: "Exam Notice",
    issuer: "Controller of Examinations",
    publishDate: "Sep 18, 2026",
    status: "Active",
    audience: "All Undergraduate CS & Engineering Students",
    summary: "Official schedule for midterm assessments, seating arrangements, and approved scientific calculator and formula sheet guidelines.",
    attachmentSize: "840 KB PDF",
  },
  {
    id: "circ-3",
    refNo: "CIR/2026/ACAD-312",
    title: "Course Add/Drop Period Final Extension for Semester IV",
    category: "Academic",
    issuer: "Dean of Academic Affairs",
    publishDate: "Sep 15, 2026",
    deadline: "Sep 30, 2026",
    status: "Active",
    audience: "All Enrolled Students",
    summary: "Final opportunity to adjust elective courses and lab sections without academic penalty via the central student portal.",
    attachmentSize: "420 KB PDF",
  },
  {
    id: "circ-4",
    refNo: "CIR/2026/ADMIN-045",
    title: "Annual Hackathon & Innovation Fellowship Grants Announcement",
    category: "Academic",
    issuer: "Student Research & Innovation Cell",
    publishDate: "Sep 10, 2026",
    deadline: "Nov 01, 2026",
    status: "Active",
    audience: "Teams of 2-4 Students",
    summary: "Accepting proposals for the 2026 Student Venture Grants. Up to $10,000 equity-free funding for top AI, Systems, and Climate Tech projects.",
    attachmentSize: "2.1 MB PDF",
  },
  {
    id: "circ-5",
    refNo: "CIR/2026/LIB-019",
    title: "Extended Library & 24/7 Computer Lab Hours for Midterm Preparation",
    category: "Administrative",
    issuer: "University Libraries Administration",
    publishDate: "Sep 05, 2026",
    status: "Active",
    audience: "All Campus Cardholders",
    summary: "The Central Engineering Library and Turing High-Performance Computing cluster will remain accessible 24/7 with active student ID.",
    attachmentSize: "290 KB PDF",
  },
];

export default function CircularsPage() {
  const [circulars, setCirculars] = useState<CircularItem[]>(initialCirculars);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal form state
  const [newTitle, setNewTitle] = useState("");
  const [newRefNo, setNewRefNo] = useState("");
  const [newCategory, setNewCategory] = useState<CircularItem["category"]>("Academic");
  const [newIssuer, setNewIssuer] = useState("");
  const [newAudience, setNewAudience] = useState("");
  const [newSummary, setNewSummary] = useState("");

  // Fetch circulars from MongoDB via API
  useEffect(() => {
    async function loadCirculars() {
      try {
        const res = await fetch("/api/circulars");
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: CircularItem[] = json.data.map((item: any, idx: number) => ({
            id: item._id || `circ-${idx}`,
            refNo: `CIR/2026/${item.organization ? item.organization.substring(0, 3).toUpperCase() : "GEN"}-${100 + idx}`,
            title: item.position || item.title || "Official Announcement",
            category: "Recruitment",
            issuer: item.organization || "Department Administration",
            publishDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent",
            deadline: item.applicationDeadline ? new Date(item.applicationDeadline).toLocaleDateString() : undefined,
            status: "Active",
            audience: "All Students",
            summary: `Recruitment and examination notice for ${item.position || "target roles"}.`,
            attachmentSize: "1.2 MB PDF",
          }));
          setCirculars(mapped);
        }
      } catch (err) {
        console.error("Error loading circulars from MongoDB:", err);
      }
    }
    loadCirculars();
  }, []);

  const handleDownload = (refNo: string, title: string) => {
    setToastMessage(`Downloading official circular: [${refNo}] ${title}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddCircular = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRefNo.trim()) return;

    const payload = {
      organization: newIssuer || "University Career Services",
      position: newTitle,
      applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      circularFileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    };

    try {
      const res = await fetch("/api/circulars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      const newCirc: CircularItem = {
        id: json.data?._id || `circ-${Date.now()}`,
        refNo: newRefNo,
        title: newTitle,
        category: newCategory,
        issuer: newIssuer || "Department Administration",
        publishDate: "Today",
        status: "Active",
        audience: newAudience || "All Students",
        summary: newSummary || "Newly published circular notice.",
        attachmentSize: "500 KB PDF",
      };

      setCirculars([newCirc, ...circulars]);
      setToastMessage(`Saved circular to MongoDB!`);
    } catch {
      const newCirc: CircularItem = {
        id: `circ-${Date.now()}`,
        refNo: newRefNo,
        title: newTitle,
        category: newCategory,
        issuer: newIssuer || "Department Administration",
        publishDate: "Today",
        status: "Active",
        audience: newAudience || "All Students",
        summary: newSummary || "Newly published circular notice.",
        attachmentSize: "500 KB PDF",
      };

      setCirculars([newCirc, ...circulars]);
      setToastMessage(`Saved circular locally.`);
    }

    setIsModalOpen(false);
    setNewTitle("");
    setNewRefNo("");
    setNewIssuer("");
    setNewAudience("");
    setNewSummary("");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const categories = ["All", "Recruitment", "Exam Notice", "Academic", "Administrative"];

  const filteredCirculars = circulars.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl text-white text-xs flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Megaphone className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Circulars & Official Notices
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Official department notices, recruitment circulars, and institutional announcements.
          </p>
        </div>

        <button
          type="button"
          id="publish-circular-btn"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Post Circular</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0" id="circular-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            id="circular-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circular title, ref no..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-800/80 text-slate-200 placeholder-slate-400 rounded-xl border border-slate-700/80 focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-4" id="circulars-list">
        {filteredCirculars.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800">
            <Megaphone className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">
              No circulars found
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        ) : (
          filteredCirculars.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/90 hover:bg-slate-900/90 backdrop-blur-xl transition-all shadow-md group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-rose-300 border border-slate-700">
                      {item.refNo}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      {item.category}
                    </span>
                    {item.status === "Urgent" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                        Urgent Deadline
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {item.issuer}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Published: {item.publishDate}
                    </span>
                    {item.deadline && (
                      <>
                        <span>•</span>
                        <span className="text-rose-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Deadline: {item.deadline}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDownload(item.refNo, item.title)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-400" />
                    <span>Download ({item.attachmentSize})</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Circular Modal */}
      {isModalOpen && (
        <div
          id="post-circular-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            id="post-circular-modal-container"
            className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 relative"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-rose-400" />
              Publish Official Circular
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Issue an academic, recruitment, or administrative circular to students.
            </p>

            <form onSubmit={handleAddCircular} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ref No *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRefNo}
                    onChange={(e) => setNewRefNo(e.target.value)}
                    placeholder="CIR/2026/099"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Circular Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Campus Recruitment Registration"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as CircularItem["category"])
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Recruitment">Recruitment</option>
                    <option value="Exam Notice">Exam Notice</option>
                    <option value="Academic">Academic</option>
                    <option value="Administrative">Administrative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Issuing Authority
                  </label>
                  <input
                    type="text"
                    value={newIssuer}
                    onChange={(e) => setNewIssuer(e.target.value)}
                    placeholder="e.g. Dean of Academics"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value)}
                  placeholder="e.g. All Students, Final Year CS"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Summary & Details
                </label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Outline key dates, guidelines, or instructions..."
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-circular-btn"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white shadow-lg shadow-rose-600/30 transition-colors"
                >
                  Publish Circular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
