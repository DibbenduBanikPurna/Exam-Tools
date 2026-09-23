import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardShell from "@/components/DashboardShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexusTrack — Student & Career Hub",
  description:
    "A responsive Next.js dashboard featuring a persistent sidebar with Job Tracker, Upcoming Exams, and Study Materials styled with Tailwind CSS.",
  keywords: [
    "Next.js",
    "Tailwind CSS",
    "Job Tracker",
    "Upcoming Exams",
    "Study Materials",
    "Responsive Dashboard",
  ],
  authors: [{ name: "NexusTrack Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#070b14] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
