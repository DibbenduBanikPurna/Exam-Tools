"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  Download,
  ExternalLink,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  X,
  FileText,
  Filter,
} from "lucide-react";

export type JobStatus = "Applied" | "Admit Published" | "Exam Done";

export interface IJobRecord {
  _id: string;
  jobTitle: string;
  organization: string;
  examDate?: string | Date | null;
  status: JobStatus;
  admitCardPdfUrl?: string | null;
  createdAt?: string | Date;
}

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<IJobRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Job Form State
  const [newTitle, setNewTitle] = useState("");
  const [newOrganization, setNewOrganization] = useState("");
  const [newExamDate, setNewExamDate] = useState("");
  const [newStatus, setNewStatus] = useState<JobStatus>("Applied");
  const [newAdmitCardUrl, setNewAdmitCardUrl] = useState("");

  // Fetch jobs from MongoDB collection via API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (data.data) {
        setJobs(data.data);
      }
    } catch (err) {
      console.error("Error fetching jobs from MongoDB:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrganization.trim()) return;

    const newPayload = {
      jobTitle: newTitle,
      organization: newOrganization,
      examDate: newExamDate ? new Date(newExamDate) : undefined,
      status: newStatus,
      admitCardPdfUrl: newAdmitCardUrl.trim() || undefined,
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayload),
      });

      if (res.ok) {
        const saved = await res.json();
        setJobs([saved.data, ...jobs]);
        setToastMessage(`Job "${newTitle}" created successfully!`);
      } else {
        // Fallback for local state
        const localJob: IJobRecord = {
          _id: `job-${Date.now()}`,
          ...newPayload,
          createdAt: new Date(),
        };
        setJobs([localJob, ...jobs]);
        setToastMessage(`Job "${newTitle}" saved locally.`);
      }
    } catch (err) {
      const localJob: IJobRecord = {
        _id: `job-${Date.now()}`,
        ...newPayload,
        createdAt: new Date(),
      };
      setJobs([localJob, ...jobs]);
      setToastMessage(`Job "${newTitle}" saved locally.`);
    }

    setIsModalOpen(false);
    setNewTitle("");
    setNewOrganization("");
    setNewExamDate("");
    setNewAdmitCardUrl("");
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Color-coded badge helper
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "Admit Published":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Admit Published
          </span>
        );
      case "Exam Done":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Exam Done
          </span>
        );
      case "Applied":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            Applied
          </span>
        );
    }
  };

  const formatDate = (dateVal?: string | Date | null) => {
    if (!dateVal) return "To be announced";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return "To be announced";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filtering
  const filteredJobs = jobs.filter((job) => {
    const matchesFilter =
      statusFilter === "All" || job.status === statusFilter;
    const matchesSearch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl text-white text-xs flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Job Tracker
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Track recruitment progress, upcoming exam dates, and download admit cards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchJobs}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh jobs from MongoDB"
            aria-label="Refresh jobs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            id="add-job-record-btn"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job Record</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-xs text-slate-400 font-medium">Total Applied</span>
          <p className="text-2xl font-bold text-white mt-1">{jobs.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 backdrop-blur-md">
          <span className="text-xs text-blue-300 font-medium">Pending Exam</span>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {jobs.filter((j) => j.status === "Applied").length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 backdrop-blur-md">
          <span className="text-xs text-amber-300 font-medium">Admit Published</span>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {jobs.filter((j) => j.status === "Admit Published").length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 backdrop-blur-md">
          <span className="text-xs text-emerald-300 font-medium">Exam Done</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {jobs.filter((j) => j.status === "Exam Done").length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" id="job-status-filter-tabs">
          {["All", "Applied", "Admit Published", "Exam Done"].map((tab) => (
            <button
              key={tab}
              id={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            id="search-job-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title or organization..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-800/80 text-slate-200 placeholder-slate-400 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* RESPONSIVE TAILWIND CSS JOBS TABLE                         */}
      {/* ========================================================= */}
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="jobs-data-table">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Job Title</th>
                <th className="py-4 px-6">Organization</th>
                <th className="py-4 px-6">Exam Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Admit Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-400" />
                    <span>Loading jobs from MongoDB collection...</span>
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Briefcase className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="font-semibold text-slate-300">No job records found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try adjusting your search or add a new job record.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Job Title */}
                    <td className="py-4 px-6 font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0 group-hover:border-indigo-500/40">
                          <Briefcase className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className="line-clamp-1">{job.jobTitle}</span>
                      </div>
                    </td>

                    {/* Organization */}
                    <td className="py-4 px-6 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{job.organization}</span>
                      </div>
                    </td>

                    {/* Exam Date */}
                    <td className="py-4 px-6 text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{formatDate(job.examDate)}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(job.status)}
                    </td>

                    {/* Download Admit Card Button (Conditional Rendering) */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      {job.admitCardPdfUrl ? (
                        <a
                          href={job.admitCardPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`download-admit-btn-${job._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-400/60 text-xs font-semibold shadow-sm transition-all active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-400" />
                          <span>Download Admit Card</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-500 italic flex items-center justify-end gap-1.5">
                          <Clock className="w-3 h-3 text-slate-600" />
                          <span>Not Available</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Job Modal Dialog */}
      {isModalOpen && (
        <div
          id="add-job-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            id="add-job-modal-container"
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
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Add Job to Tracker
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Record new recruitment application and upload/link your exam admit card.
            </p>

            <form onSubmit={handleAddJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  id="input-new-job-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Organization *
                </label>
                <input
                  type="text"
                  required
                  id="input-new-organization"
                  value={newOrganization}
                  onChange={(e) => setNewOrganization(e.target.value)}
                  placeholder="e.g. Sonali Bank PLC / Ministry of ICT"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    id="input-new-exam-date"
                    value={newExamDate}
                    onChange={(e) => setNewExamDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    id="select-new-job-status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as JobStatus)}
                    className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Admit Published">Admit Published</option>
                    <option value="Exam Done">Exam Done</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admit Card PDF URL (optional)
                </label>
                <input
                  type="url"
                  id="input-new-admit-card-url"
                  value={newAdmitCardUrl}
                  onChange={(e) => setNewAdmitCardUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/.../admit_card.pdf"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-xl border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Leave blank if admit card has not been released yet.
                </p>
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
                  id="submit-new-job-btn"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors"
                >
                  Save Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
