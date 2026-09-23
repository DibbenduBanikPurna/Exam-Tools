"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  Plus,
  Sparkles,
  CheckCircle2,
  Calendar,
  Briefcase,
  BookOpen,
  ChevronDown,
} from "lucide-react";

interface TopNavbarProps {
  onOpenMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function TopNavbar({
  onOpenMobile,
  isCollapsed,
  onToggleCollapse,
}: TopNavbarProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getPageInfo = () => {
    switch (pathname) {
      case "/jobs":
        return {
          title: "Job Tracker",
          description: "Manage applications, interview rounds, and offers",
        };
      case "/exams":
        return {
          title: "Upcoming Exams",
          description: "Track schedules, countdowns, and revision plans",
        };
      case "/study":
        return {
          title: "Study Materials",
          description: "Curated guides, cheat sheets, and technical papers",
        };
      case "/circulars":
        return {
          title: "Circulars & Notices",
          description: "Official notifications, recruitment circulars, and departmental updates",
        };
      default:
        return {
          title: "Dashboard Overview",
          description: "Welcome back, here is your academic and career pulse",
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all"
    >
      {/* Left: Mobile hamburger & breadcrumb */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          id="mobile-menu-btn"
          onClick={onOpenMobile}
          className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 hidden sm:inline">
              NexusTrack /
            </span>
            <span className="text-sm md:text-base font-bold text-white tracking-tight">
              {pageInfo.title}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            id="global-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs, exams, materials..."
            className="w-full pl-10 pr-12 py-2 text-xs bg-slate-900/90 text-slate-200 placeholder-slate-400 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right: Quick actions & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            type="button"
            id="quick-add-btn"
            onClick={() => {
              setShowQuickAdd(!showQuickAdd);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
            aria-label="Create new entry"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add New</span>
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>

          {showQuickAdd && (
            <div
              id="quick-add-dropdown"
              className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <Link
                href="/jobs"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add Job Application</span>
              </Link>
              <Link
                href="/exams"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Schedule New Exam</span>
              </Link>
              <Link
                href="/study"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Add Study Resource</span>
              </Link>
              <Link
                href="/circulars"
                onClick={() => setShowQuickAdd(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Publish Circular</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            id="notifications-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowQuickAdd(false);
            }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
          </button>

          {showNotifications && (
            <div
              id="notifications-dropdown"
              className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200">
                  Recent Alerts
                </span>
                <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors text-xs">
                  <div className="flex items-center justify-between text-slate-200 font-medium">
                    <span>Google Technical Screen</span>
                    <span className="text-[10px] text-slate-400">Tomorrow</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Stage 2 Interview at 2:00 PM EST
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors text-xs">
                  <div className="flex items-center justify-between text-slate-200 font-medium">
                    <span>Operating Systems Final</span>
                    <span className="text-[10px] text-amber-400">In 3 days</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Review Ch 6-9 Concurrency & Virtual Memory
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 transition-colors text-xs">
                  <div className="flex items-center justify-between text-slate-200 font-medium">
                    <span>New Study Material</span>
                    <span className="text-[10px] text-purple-400">1h ago</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Distributed Systems Cheat Sheet was added
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar */}
        <div
          id="user-profile-btn"
          className="flex items-center gap-2 pl-2 border-l border-slate-800"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-white/10">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
