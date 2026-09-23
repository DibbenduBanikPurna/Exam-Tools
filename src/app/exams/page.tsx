"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Plus,
  BookOpen,
  Sparkles,
  X,
  Target,
  FileText,
  ChevronRight,
} from "lucide-react";

interface ExamItem {
  id: string;
  courseCode: string;
  title: string;
  date: string;
  time: string;
  room: string;
  weight: string;
  progress: number;
  urgency: "high" | "medium" | "low";
  topics: string[];
  notes: string;
}

const initialExams: ExamItem[] = [
  {
    id: "exam-1",
    courseCode: "CS 410",
    title: "Operating Systems Final Examination",
    date: "2026-10-12",
    time: "09:00 AM - 12:00 PM",
    room: "Engineering Hall 3B",
    weight: "35% of Course",
    progress: 85,
    urgency: "high",
    topics: ["Concurrency & Semaphores", "Virtual Memory & Paging", "File Systems", "Deadlock Avoidance"],
    notes: "Formula cheat sheet permitted (1 page, double-sided).",
  },
  {
    id: "exam-2",
    courseCode: "CS 420",
    title: "Algorithms & Complexity Midterm",
    date: "2026-10-18",
    time: "02:00 PM - 04:30 PM",
    room: "West Auditorium Room 102",
    weight: "25% of Course",
    progress: 60,
    urgency: "medium",
    topics: ["Dynamic Programming", "Dijkstra & Bellman-Ford", "NP-Completeness", "Amortized Analysis"],
    notes: "Focus on proof by induction for recurrence relations.",
  },
  {
    id: "exam-3",
    courseCode: "CS 480",
    title: "Distributed Systems & Cloud Computing",
    date: "2026-10-25",
    time: "10:30 AM - 01:00 PM",
    room: "Online Proctored Portal",
    weight: "30% of Course",
    progress: 40,
    urgency: "low",
    topics: ["Raft Consensus", "CAP Theorem", "Consistent Hashing", "Vector Clocks"],
    notes: "Requires secure browser lockdown client installed.",
  },
  {
    id: "exam-4",
    courseCode: "MATH 330",
    title: "Linear Algebra & Vector Spaces",
    date: "2026-11-04",
    time: "01:00 PM - 03:00 PM",
    room: "Science Complex Rm 204",
    weight: "20% of Course",
    progress: 30,
    urgency: "low",
    topics: ["Eigenvalues & Eigenvectors", "SVD Decomposition", "Orthogonal Projections"],
    notes: "Review past 3 years' midterm exams from course archive.",
  },
];

export default function UpcomingExamsPage() {
  const [exams, setExams] = useState<ExamItem[]>(initialExams);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newWeight, setNewWeight] = useState("25%");
  const [newTopics, setNewTopics] = useState("");

  const handleAddExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCourseCode.trim()) return;

    const newExam: ExamItem = {
      id: `exam-${Date.now()}`,
      courseCode: newCourseCode,
      title: newTitle,
      date: newDate || "2026-11-15",
      time: newTime || "10:00 AM - 12:00 PM",
      room: newRoom || "Main Hall",
      weight: newWeight,
      progress: 20,
      urgency: "low",
      topics: newTopics ? newTopics.split(",").map((t) => t.trim()) : ["Core Curriculum"],
      notes: "Newly scheduled exam session.",
    };

    setExams([newExam, ...exams]);
    setIsModalOpen(false);

    // Reset
    setNewTitle("");
    setNewCourseCode("");
    setNewDate("");
    setNewTime("");
    setNewRoom("");
    setNewTopics("");
  };

  const updateProgress = (id: string, delta: number) => {
    setExams((prev) =>
      prev.map((exam) => {
        if (exam.id === id) {
          const nextVal = Math.min(100, Math.max(0, exam.progress + delta));
          return { ...exam, progress: nextVal };
        }
        return exam;
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Upcoming Exams
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Exam calendar, syllabus preparation coverage, and schedule alarms.
          </p>
        </div>

        <button
          type="button"
          id="add-exam-btn"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-600/30 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Exam</span>
        </button>
      </div>

      {/* Featured Nearest Exam Countdown Spotlight */}
      <div
        id="nearest-exam-spotlight"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-slate-900/70 p-6 md:p-8 border border-amber-500/30 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Next Exam • 3 Days Remaining</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white">
              CS 410: Operating Systems Final
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Oct 12, 2026 (09:00 AM)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Engineering Hall 3B
              </span>
              <span>•</span>
              <span className="text-amber-300 font-semibold">
                Weight: 35% of Total Grade
              </span>
            </div>
          </div>

          {/* Countdown Clock Displays */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 shrink-0">
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 min-w-[64px] sm:min-w-[76px]">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400">
                03
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
                Days
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 min-w-[64px] sm:min-w-[76px]">
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                14
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
                Hours
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 min-w-[64px] sm:min-w-[76px]">
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                42
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
                Mins
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 min-w-[64px] sm:min-w-[76px]">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400 animate-pulse">
                58
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
                Secs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="exams-list">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 backdrop-blur-xl transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {exam.courseCode}
                </span>

                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    exam.urgency === "high"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : exam.urgency === "medium"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {exam.urgency === "high"
                    ? "High Priority"
                    : exam.urgency === "medium"
                    ? "Medium Priority"
                    : "Scheduled"}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {exam.title}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {exam.date} • {exam.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exam.room}</span>
                </div>
              </div>

              {/* Topics Pills */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Core Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exam.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Preparation Progress Bar */}
            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">Preparation Progress</span>
                <span className="font-bold text-slate-200">{exam.progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    exam.progress >= 80
                      ? "bg-emerald-500"
                      : exam.progress >= 50
                      ? "bg-amber-500"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${exam.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => updateProgress(exam.id, 10)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                >
                  +10% Study Done
                </button>
                <span className="text-[11px] text-slate-400 italic truncate">
                  {exam.notes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exam Modal */}
      {isModalOpen && (
        <div
          id="add-exam-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            id="add-exam-modal-container"
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
              <GraduationCap className="w-5 h-5 text-amber-400" />
              Schedule New Exam
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Add upcoming midterms or finals to keep track of revision milestones.
            </p>

            <form onSubmit={handleAddExam} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    placeholder="e.g. CS 350"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Exam Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Database Systems Midterm"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 10:00 AM - 12:30 PM"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Room / Link
                  </label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="e.g. Rm 401 / Online"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Grade Weight
                  </label>
                  <input
                    type="text"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="e.g. 30%"
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topics (comma separated)
                </label>
                <input
                  type="text"
                  value={newTopics}
                  onChange={(e) => setNewTopics(e.target.value)}
                  placeholder="e.g. SQL Indexing, B-Trees, Transactions"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
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
                  id="submit-exam-btn"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white shadow-lg shadow-amber-600/30 transition-colors"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
