"use client";

import React, { useState } from "react";
import {
  Folder,
  FolderOpen,
  FileText,
  Download,
  Eye,
  ArrowLeft,
  Search,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  Calculator,
  Globe,
  Languages,
  Binary,
  BrainCircuit,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface PDFTopic {
  id: string;
  subjectName: string;
  topicTitle: string;
  pdfUrl: string;
  fileSize: string;
  pageCount: number;
  createdAt: string;
  downloads: number;
  description: string;
}

interface SubjectFolder {
  id: string;
  name: string;
  code: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  borderColor: string;
  description: string;
  topicsCount: number;
  lastUpdated: string;
}

const initialFolders: SubjectFolder[] = [
  {
    id: "math",
    name: "Mathematics",
    code: "MATH",
    icon: Calculator,
    color: "text-blue-400",
    bgGradient: "from-blue-600/20 via-indigo-600/10 to-slate-900/60",
    borderColor: "border-blue-500/30 hover:border-blue-400/60",
    description: "Calculus, Linear Algebra, Probability, Statistics, and Quantitative Aptitude formulas.",
    topicsCount: 5,
    lastUpdated: "Yesterday",
  },
  {
    id: "gk",
    name: "General Knowledge (GK)",
    code: "GK",
    icon: Globe,
    color: "text-amber-400",
    bgGradient: "from-amber-600/20 via-orange-600/10 to-slate-900/60",
    borderColor: "border-amber-500/30 hover:border-amber-400/60",
    description: "Current affairs, World Geography, Constitution, International organizations & history.",
    topicsCount: 4,
    lastUpdated: "2 days ago",
  },
  {
    id: "english",
    name: "English Language",
    code: "ENG",
    icon: Languages,
    color: "text-emerald-400",
    bgGradient: "from-emerald-600/20 via-teal-600/10 to-slate-900/60",
    borderColor: "border-emerald-500/30 hover:border-emerald-400/60",
    description: "Advanced grammar rules, reading comprehension strategies, vocabulary lists & idioms.",
    topicsCount: 4,
    lastUpdated: "3 days ago",
  },
  {
    id: "cs",
    name: "Computer Science",
    code: "CS",
    icon: Binary,
    color: "text-purple-400",
    bgGradient: "from-purple-600/20 via-indigo-600/10 to-slate-900/60",
    borderColor: "border-purple-500/30 hover:border-purple-400/60",
    description: "Operating Systems, DBMS, Computer Networks, and System Architecture deep dives.",
    topicsCount: 5,
    lastUpdated: "Just now",
  },
  {
    id: "reasoning",
    name: "Logical Reasoning",
    code: "LR",
    icon: BrainCircuit,
    color: "text-pink-400",
    bgGradient: "from-pink-600/20 via-rose-600/10 to-slate-900/60",
    borderColor: "border-pink-500/30 hover:border-pink-400/60",
    description: "Syllogisms, blood relations, seating arrangements, coding-decoding, and puzzle sets.",
    topicsCount: 3,
    lastUpdated: "1 week ago",
  },
];

const initialTopics: PDFTopic[] = [
  // Mathematics
  {
    id: "top-1",
    subjectName: "Mathematics",
    topicTitle: "Linear Algebra: Matrices, Eigenvalues & Vector Spaces",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "2.4 MB",
    pageCount: 42,
    createdAt: "Sep 20, 2026",
    downloads: 412,
    description: "Comprehensive theorems, Gaussian elimination step-by-step, and practice problem sets with solutions.",
  },
  {
    id: "top-2",
    subjectName: "Mathematics",
    topicTitle: "Calculus & Multivariable Optimization Handbook",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "3.1 MB",
    pageCount: 58,
    createdAt: "Sep 18, 2026",
    downloads: 380,
    description: "Partial derivatives, Lagrange multipliers, double integrals, and gradient descent mathematical foundations.",
  },
  {
    id: "top-3",
    subjectName: "Mathematics",
    topicTitle: "Probability & Combinatorics Formula Sheet",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.2 MB",
    pageCount: 18,
    createdAt: "Sep 15, 2026",
    downloads: 720,
    description: "Quick revision cheat sheet covering Bayes' Theorem, Poisson distributions, and permutation formulas.",
  },
  {
    id: "top-4",
    subjectName: "Mathematics",
    topicTitle: "Differential Equations: First & Second Order Solutions",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.8 MB",
    pageCount: 32,
    createdAt: "Sep 10, 2026",
    downloads: 295,
    description: "Homogeneous and non-homogeneous ODEs, Laplace transform pairs, and boundary value problems.",
  },
  {
    id: "top-5",
    subjectName: "Mathematics",
    topicTitle: "Quantitative Aptitude: Speed Math & Shortcuts",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "950 KB",
    pageCount: 24,
    createdAt: "Sep 05, 2026",
    downloads: 850,
    description: "Vedic math multiplication tricks, percentage ratios, and time & work shortcut methods.",
  },

  // General Knowledge (GK)
  {
    id: "top-6",
    subjectName: "General Knowledge (GK)",
    topicTitle: "Monthly Current Affairs & Global Summits 2026",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "4.2 MB",
    pageCount: 65,
    createdAt: "Sep 22, 2026",
    downloads: 1200,
    description: "Comprehensive digest of international treaties, bilateral summits, sports trophies, and geopolitical updates.",
  },
  {
    id: "top-7",
    subjectName: "General Knowledge (GK)",
    topicTitle: "Constitutional Law & Fundamental Rights Summary",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "2.1 MB",
    pageCount: 36,
    createdAt: "Sep 17, 2026",
    downloads: 640,
    description: "Articles 12-35 breakdown, landmark Supreme Court constitutional judgements, and writ jurisdictions.",
  },
  {
    id: "top-8",
    subjectName: "General Knowledge (GK)",
    topicTitle: "World Geography: River Basins, Climate Zones & Straits",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "3.5 MB",
    pageCount: 48,
    createdAt: "Sep 12, 2026",
    downloads: 510,
    description: "Detailed color maps of international choke points, mountain ranges, tectonic plates, and ocean currents.",
  },
  {
    id: "top-9",
    subjectName: "General Knowledge (GK)",
    topicTitle: "Science & Technology: Space Missions & AI Milestones",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.9 MB",
    pageCount: 28,
    createdAt: "Sep 08, 2026",
    downloads: 730,
    description: "Recent lunar exploration missions, quantum computing breakthroughs, and nuclear energy treaties.",
  },

  // English Language
  {
    id: "top-10",
    subjectName: "English Language",
    topicTitle: "Grammar Rules: Subject-Verb Agreement & Tenses",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.5 MB",
    pageCount: 26,
    createdAt: "Sep 21, 2026",
    downloads: 980,
    description: "100 golden rules of grammar with error-spotting exercises and commonly tested exceptions.",
  },
  {
    id: "top-11",
    subjectName: "English Language",
    topicTitle: "High-Frequency Vocabulary: 1000 Words with Roots & Synonyms",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "2.8 MB",
    pageCount: 52,
    createdAt: "Sep 16, 2026",
    downloads: 1450,
    description: "Etymology-based vocabulary builder, prefix/suffix guide, and context usage mnemonics.",
  },
  {
    id: "top-12",
    subjectName: "English Language",
    topicTitle: "Reading Comprehension: Speed Reading & Inference Techniques",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.7 MB",
    pageCount: 30,
    createdAt: "Sep 11, 2026",
    downloads: 620,
    description: "Skimming vs scanning strategies, identifying central thesis, and answering tone-based questions.",
  },
  {
    id: "top-13",
    subjectName: "English Language",
    topicTitle: "Idioms, Phrases & Phrasal Verbs Compilation",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.3 MB",
    pageCount: 22,
    createdAt: "Sep 07, 2026",
    downloads: 810,
    description: "Alphabetized dictionary of 500 idioms with situational sentence examples.",
  },

  // Computer Science
  {
    id: "top-14",
    subjectName: "Computer Science",
    topicTitle: "Operating Systems: Concurrency, Virtual Memory & Kernel Architecture",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "4.8 MB",
    pageCount: 76,
    createdAt: "Sep 23, 2026",
    downloads: 1100,
    description: "Semaphores, condition variables, page replacement algorithms, and file system inodes.",
  },
  {
    id: "top-15",
    subjectName: "Computer Science",
    topicTitle: "Database Management Systems: SQL Indexing & B-Trees",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "3.2 MB",
    pageCount: 45,
    createdAt: "Sep 19, 2026",
    downloads: 890,
    description: "ACID properties, isolation levels, query planner optimization, and normalization up to BCNF.",
  },
  {
    id: "top-16",
    subjectName: "Computer Science",
    topicTitle: "Computer Networks: TCP/IP Stack, Subnetting & TLS 1.3",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "3.6 MB",
    pageCount: 54,
    createdAt: "Sep 14, 2026",
    downloads: 740,
    description: "Three-way handshake, congestion control, CIDR notation, and cryptographic key exchange.",
  },

  // Logical Reasoning
  {
    id: "top-17",
    subjectName: "Logical Reasoning",
    topicTitle: "Seating Arrangements & Complex Linear Puzzles",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.6 MB",
    pageCount: 28,
    createdAt: "Sep 16, 2026",
    downloads: 670,
    description: "Circular and bidirectional row arrangements, blood relation combinations, and step-by-step grid deductions.",
  },
  {
    id: "top-18",
    subjectName: "Logical Reasoning",
    topicTitle: "Syllogism: Venn Diagram & 100/50 Rules",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileSize: "1.1 MB",
    pageCount: 20,
    createdAt: "Sep 12, 2026",
    downloads: 820,
    description: "Definite vs possibility conclusions, 'Only a few' cases, and reverse syllogism shortcuts.",
  },
];

export default function StudyMaterialsPage() {
  const [folders, setFolders] = useState<SubjectFolder[]>(initialFolders);
  const [topics, setTopics] = useState<PDFTopic[]>(initialTopics);
  const [selectedFolder, setSelectedFolder] = useState<SubjectFolder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New PDF Topic Form
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newPdfUrl, setNewPdfUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFileSize, setNewFileSize] = useState("2.1 MB");

  const handleSelectFolder = (folder: SubjectFolder) => {
    setSelectedFolder(folder);
    setSearchQuery("");
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setSearchQuery("");
  };

  const handleViewDownloadPDF = (topic: PDFTopic) => {
    // Open the PDF URL in a new browser tab
    window.open(topic.pdfUrl, "_blank", "noopener,noreferrer");

    // Show toast feedback
    setToastMessage(`Opening "${topic.topicTitle}" (${topic.fileSize})`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newPdfUrl.trim() || !selectedFolder) return;

    const newTopic: PDFTopic = {
      id: `top-${Date.now()}`,
      subjectName: selectedFolder.name,
      topicTitle: newTopicTitle,
      pdfUrl: newPdfUrl,
      fileSize: newFileSize || "1.8 MB",
      pageCount: 25,
      createdAt: "Just now",
      downloads: 1,
      description: newDescription || "Uploaded study material for " + selectedFolder.name,
    };

    setTopics([newTopic, ...topics]);

    // Update topicsCount in folders
    setFolders((prev) =>
      prev.map((f) =>
        f.id === selectedFolder.id ? { ...f, topicsCount: f.topicsCount + 1 } : f
      )
    );

    setIsAddModalOpen(false);
    setNewTopicTitle("");
    setNewPdfUrl("");
    setNewDescription("");
  };

  // Filtered topics for the selected subject
  const currentTopics = topics.filter((t) => {
    if (!selectedFolder) return false;
    const matchesSubject = t.subjectName.toLowerCase() === selectedFolder.name.toLowerCase();
    const matchesSearch =
      t.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Filtered folders for search in the main folders grid
  const filteredFolders = folders.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl text-white text-xs flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 1: SUBJECT FOLDERS GRID (When no folder is selected) */}
      {/* ========================================================= */}
      {!selectedFolder ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Study Materials
                </h1>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Select a subject folder below to explore curated PDF notes, chapter guides, and question banks.
              </p>
            </div>

            {/* Folder Search */}
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                id="search-folders-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject folders..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/90 text-slate-200 placeholder-slate-400 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Subjects Grid */}
          <div
            id="subject-folders-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredFolders.map((folder) => {
              const Icon = folder.icon;
              return (
                <div
                  key={folder.id}
                  id={`folder-card-${folder.id}`}
                  onClick={() => handleSelectFolder(folder)}
                  className={`group relative p-6 rounded-3xl bg-gradient-to-b ${folder.bgGradient} border ${folder.borderColor} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between`}
                >
                  {/* Top Bar with Icon and Code Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Folder className={`w-6 h-6 ${folder.color} group-hover:hidden transition-all`} />
                        <FolderOpen className={`w-6 h-6 ${folder.color} hidden group-hover:block transition-all`} />
                      </div>

                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-white/10">
                        {folder.code}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {folder.name}
                    </h2>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {folder.description}
                    </p>
                  </div>

                  {/* Card Footer with Topic count & arrow */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>{folder.topicsCount} PDF Topics</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                      <span>Open folder</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* VIEW 2: TOPICS LIST UNDER CLICKED SUBJECT FOLDER          */
        /* ========================================================= */
        <div className="space-y-6">
          {/* Breadcrumb & Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="back-to-folders-btn"
                onClick={handleBackToFolders}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Subject Folders</span>
              </button>

              <span className="text-slate-600">/</span>

              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold text-white`}>
                  {selectedFolder.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {currentTopics.length} PDFs Available
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Topics in current subject */}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  id="search-topics-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedFolder.name} topics...`}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900 text-slate-200 placeholder-slate-400 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Upload PDF to this Subject */}
              <button
                type="button"
                id="add-topic-pdf-btn"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all active:scale-95 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Topic PDF</span>
              </button>
            </div>
          </div>

          {/* Subject Banner */}
          <div
            id="subject-folder-banner"
            className={`p-6 rounded-3xl bg-gradient-to-r ${selectedFolder.bgGradient} border border-purple-500/20 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center shadow-lg shrink-0">
                <FolderOpen className={`w-7 h-7 ${selectedFolder.color}`} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-white">
                  {selectedFolder.name} Study Materials
                </h1>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {selectedFolder.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Curriculum
              </span>
            </div>
          </div>

          {/* Topics PDF List */}
          <div className="space-y-3.5" id="pdf-topics-list">
            {currentTopics.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-dashed border-slate-800">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-300">
                  No PDF topics found in {selectedFolder.name}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your search query or upload a new PDF topic.
                </p>
              </div>
            ) : (
              currentTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 backdrop-blur-xl transition-all shadow-md group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-950/60 to-slate-900 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6 text-rose-400" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm md:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          {topic.topicTitle}
                        </h2>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          PDF
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {topic.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                        <span className="text-slate-300 font-medium">
                          {topic.fileSize}
                        </span>
                        <span>•</span>
                        <span>{topic.pageCount} Pages</span>
                        <span>•</span>
                        <span>Uploaded: {topic.createdAt}</span>
                        <span>•</span>
                        <span className="text-indigo-400">
                          {topic.downloads} views/downloads
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Primary View/Download PDF Button */}
                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <button
                      type="button"
                      id={`view-download-pdf-${topic.id}`}
                      onClick={() => handleViewDownloadPDF(topic)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>View/Download PDF</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD PDF TOPIC UNDER CURRENT SUBJECT               */}
      {/* ========================================================= */}
      {isAddModalOpen && selectedFolder && (
        <div
          id="add-topic-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            id="add-topic-modal-container"
            className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 relative"
          >
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              Add PDF Topic in {selectedFolder.name}
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Enter the topic title and PDF URL (or Cloudinary secure_url) to make it available to students.
            </p>

            <form onSubmit={handleAddTopic} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  disabled
                  value={selectedFolder.name}
                  className="w-full px-3 py-2 text-xs bg-slate-800/50 rounded-xl border border-slate-700 text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  id="input-topic-title"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="e.g. Integral Calculus Theorems & Examples"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  PDF File URL (or Cloudinary URL) *
                </label>
                <input
                  type="url"
                  required
                  id="input-pdf-url"
                  value={newPdfUrl}
                  onChange={(e) => setNewPdfUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/.../document.pdf"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Estimated File Size
                </label>
                <input
                  type="text"
                  value={newFileSize}
                  onChange={(e) => setNewFileSize(e.target.value)}
                  placeholder="e.g. 2.4 MB"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Brief Description
                </label>
                <textarea
                  rows={2}
                  id="input-topic-description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Key topics, chapters, or syllabus references covered..."
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-topic-pdf-btn"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/30 transition-colors"
                >
                  Save PDF Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
