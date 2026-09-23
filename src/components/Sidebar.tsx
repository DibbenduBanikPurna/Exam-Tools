"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  TrendingUp,
  BookmarkCheck,
  Compass,
  FolderGit2,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    id: "nav-dashboard",
    badge: null,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Study Materials",
    href: "/study",
    icon: BookOpen,
    id: "nav-study-materials",
    badge: "28 Guides",
    badgeColor: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Job Tracker",
    href: "/jobs",
    icon: Briefcase,
    id: "nav-job-tracker",
    badge: "12 Active",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Circulars",
    href: "/circulars",
    icon: FolderGit2,
    id: "nav-circulars",
    badge: "5 New",
    badgeColor: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "Upcoming Exams",
    href: "/exams",
    icon: GraduationCap,
    id: "nav-upcoming-exams",
    badge: "3 Soon",
    badgeColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    color: "from-amber-500 to-orange-500",
  },
];

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-950/95 lg:bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/80 transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-72"}
        `}
      >
        {/* Brand / Logo Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group overflow-hidden"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col transition-opacity duration-200">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  NexusTrack
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase">
                  Career & Exam Hub
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            id="mobile-sidebar-close"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            id="desktop-sidebar-collapse-btn"
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors ${
              isCollapsed ? "mx-auto" : ""
            }`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
          <div>
            {(!isCollapsed || isMobileOpen) && (
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Main Menu
              </p>
            )}

            <nav className="space-y-1.5" aria-label="Sidebar Navigation">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    id={item.id}
                    href={item.href}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.name : undefined}
                    className={`relative flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-500/15 via-blue-500/10 to-transparent text-white border-l-2 border-indigo-400 font-semibold shadow-sm"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      }
                      ${isCollapsed && !isMobileOpen ? "justify-center px-0" : ""}
                    `}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-800/60 text-slate-400 group-hover:text-white group-hover:bg-slate-700/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {(!isCollapsed || isMobileOpen) && (
                      <div className="flex items-center justify-between flex-1 truncate">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Collapsed Tooltip on Hover */}
                    {isCollapsed && !isMobileOpen && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-slate-100 text-xs rounded-lg shadow-xl border border-slate-700 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                        {item.name}
                        {item.badge && (
                          <span className="ml-1.5 opacity-80">({item.badge})</span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Metrics Widget in Sidebar */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  Weekly Progress
                </span>
                <span className="text-xs font-bold text-indigo-400">78%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-tight">
                3 interviews scheduled • 1 exam in 3 days
              </p>
            </div>
          )}
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer ${
              isCollapsed && !isMobileOpen ? "justify-center p-1" : ""
            }`}
          >
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center font-bold text-sm text-white shadow-md">
                AM
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-200 truncate">
                  Alex Mercer
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  alex.mercer@cs.edu
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
