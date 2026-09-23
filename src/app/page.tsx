"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  Building2,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Megaphone,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([1, 3]);

  const toggleBookmark = (id: number) => {
    setBookmarkedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const statCards = [
    {
      id: "stat-jobs",
      title: "Job Applications",
      value: "12",
      change: "+3 this week",
      trend: "up",
      link: "/jobs",
      icon: Briefcase,
      color: "from-blue-600/20 to-indigo-600/20 border-indigo-500/30 text-indigo-400",
      iconBg: "bg-indigo-500/20 text-indigo-400",
      description: "4 in technical rounds, 2 offers received",
    },
    {
      id: "stat-exams",
      title: "Upcoming Exams",
      value: "3",
      change: "Next in 3 days",
      trend: "alert",
      link: "/exams",
      icon: GraduationCap,
      color: "from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-400",
      iconBg: "bg-amber-500/20 text-amber-400",
      description: "OS Final & Algorithms Midterm due",
    },
    {
      id: "stat-materials",
      title: "Study Materials",
      value: "28",
      change: "+5 newly added",
      trend: "up",
      link: "/study",
      icon: BookOpen,
      color: "from-purple-600/20 to-pink-600/20 border-purple-500/30 text-purple-400",
      iconBg: "bg-purple-500/20 text-purple-400",
      description: "18 completed guides, 6 bookmarked",
    },
    {
      id: "stat-study-time",
      title: "Study Hours Logged",
      value: "34.5h",
      change: "85% of monthly goal",
      trend: "up",
      link: "/study",
      icon: TrendingUp,
      color: "from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400",
      iconBg: "bg-emerald-500/20 text-emerald-400",
      description: "On track for Dean's Honors List",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      role: "Frontend Engineer (Next.js / React)",
      company: "Vercel",
      logo: "V",
      location: "Remote • US",
      status: "Interviewing",
      statusColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      salary: "$120k - $145k",
      stage: "System Design Round (Friday, 2 PM)",
    },
    {
      id: 2,
      role: "Full Stack Software Engineer",
      company: "Stripe",
      logo: "S",
      location: "San Francisco, CA",
      status: "Offer",
      statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      salary: "$165k + Equity",
      stage: "Offer review deadline in 5 days",
    },
    {
      id: 3,
      role: "Software Development Engineer I",
      company: "Amazon Web Services",
      logo: "A",
      location: "Seattle, WA / Hybrid",
      status: "Applied",
      statusColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      salary: "$135k - $155k",
      stage: "Application received • Under review",
    },
  ];

  const upcomingExamsList = [
    {
      id: 1,
      name: "Operating Systems (CS 410)",
      date: "Oct 12, 2026",
      daysLeft: "3 days left",
      urgency: "urgent",
      progress: 85,
      room: "Hall 3B / In-Person",
    },
    {
      id: 2,
      name: "Design & Analysis of Algorithms (CS 420)",
      date: "Oct 18, 2026",
      daysLeft: "9 days left",
      urgency: "moderate",
      progress: 60,
      room: "Auditorium West",
    },
    {
      id: 3,
      name: "Cloud Computing & Distributed Systems",
      date: "Oct 25, 2026",
      daysLeft: "16 days left",
      urgency: "normal",
      progress: 40,
      room: "Online Exam Portal",
    },
  ];

  const topMaterials = [
    {
      id: 1,
      title: "System Design Interview Handbook",
      category: "Architecture",
      readTime: "45 min read",
      rating: "4.9",
      downloads: "1.2k",
    },
    {
      id: 2,
      title: "Dynamic Programming Patterns & Solutions",
      category: "Algorithms",
      readTime: "30 min read",
      rating: "4.8",
      downloads: "890",
    },
    {
      id: 3,
      title: "Next.js 15 & React 19 Architecture Guide",
      category: "Frontend",
      readTime: "25 min read",
      rating: "5.0",
      downloads: "2.4k",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <section
        id="hero-banner"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/70 via-slate-900/80 to-slate-900/60 p-6 md:p-8 border border-indigo-500/20 backdrop-blur-xl shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fall Semester 2026 • Career Accelerate Track</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">Alex</span>!
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              You have <strong className="text-white">1 interview scheduled</strong> for Friday and your <strong className="text-white">Operating Systems Final</strong> in 3 days. Your study plan is on track.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/jobs"
              id="hero-jobs-cta"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/exams"
              id="hero-exams-cta"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Upcoming Exams</span>
            </Link>
            <Link
              href="/study"
              id="hero-study-cta"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Study Materials</span>
            </Link>
            <Link
              href="/circulars"
              id="hero-circulars-cta"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 text-xs font-semibold transition-all active:scale-95"
            >
              <Megaphone className="w-4 h-4 text-rose-400" />
              <span>Circulars</span>
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Stats Grid */}
      <section
        id="kpi-stats-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        aria-label="Key Performance Indicators"
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.link}
              id={card.id}
              className={`group relative p-5 rounded-2xl bg-gradient-to-b ${card.color} backdrop-blur-md border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-300">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl ${card.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {card.value}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                    card.trend === "alert"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}
                >
                  {card.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-400 line-clamp-1">
                {card.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-300 group-hover:text-white font-medium">
                <span>View details</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* Main Content Split: Job Pipeline & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Job Tracker Highlights */}
        <section
          id="jobs-spotlight-section"
          className="lg:col-span-7 flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 md:p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  Active Job Applications
                </h2>
                <p className="text-xs text-slate-400">
                  Track recent application status and interviews
                </p>
              </div>
            </div>

            <Link
              href="/jobs"
              id="view-all-jobs-link"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>Manage all 12</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5 flex-1">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 transition-all duration-150 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {job.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="font-medium text-slate-300">
                          {job.company}
                        </span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="text-slate-300">{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${job.statusColor}`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.stage}
                  </span>
                  <Link
                    href="/jobs"
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column (5 cols): Upcoming Exams Countdown */}
        <section
          id="exams-spotlight-section"
          className="lg:col-span-5 flex flex-col rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 md:p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Upcoming Exams</h2>
                <p className="text-xs text-slate-400">
                  Target dates & preparation progress
                </p>
              </div>
            </div>

            <Link
              href="/exams"
              id="view-all-exams-link"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {upcomingExamsList.map((exam) => (
              <div
                key={exam.id}
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-white">
                    {exam.name}
                  </h3>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      exam.urgency === "urgent"
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : exam.urgency === "moderate"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {exam.daysLeft}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{exam.date}</span>
                  <span>•</span>
                  <span>{exam.room}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Preparation syllabus</span>
                    <span className="font-semibold text-slate-200">
                      {exam.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        exam.progress >= 75
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                          : exam.progress >= 50
                          ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                          : "bg-gradient-to-r from-indigo-500 to-blue-400"
                      }`}
                      style={{ width: `${exam.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <Link
              href="/exams"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors border border-slate-700/60"
            >
              <span>Open Complete Exam Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Recommended Study Materials Section */}
      <section
        id="materials-spotlight-section"
        className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 md:p-6 backdrop-blur-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Featured Study Materials
              </h2>
              <p className="text-xs text-slate-400">
                Hand-picked revision notes, cheatsheets, and interview prep guides
              </p>
            </div>
          </div>

          <Link
            href="/study"
            id="view-all-materials-link"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Browse Library (28 files)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topMaterials.map((item) => {
            const isBookmarked = bookmarkedItems.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/70 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(item.id)}
                      className="p-1 text-slate-400 hover:text-purple-400 transition-colors"
                      title={isBookmarked ? "Remove bookmark" : "Bookmark guide"}
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark guide"}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked
                            ? "fill-purple-500 text-purple-400"
                            : "text-slate-400"
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>{item.readTime}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <span>★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
