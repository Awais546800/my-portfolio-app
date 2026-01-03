import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminPanel from "@/components/admin/AdminPanel";
import AdminLoginButton from "@/components/admin/AdminLoginButton";
import AdminTools from "@/components/admin/AdminTools";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "M. Awais Iqbal | Junior Web Developer & CS Student",
  description: "Portfolio of M. Awais Iqbal - Junior Web Developer and Computer Science student at UET Lahore. Showcasing skills in Python, JavaScript, C++, and SQL. Looking for internships and opportunities in software development.",
  icons: {
    icon: "/favicon.ico.png",
    shortcut: "/favicon.ico.png",
    apple: "/favicon.ico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider>
          <ProjectsProvider>
            <div 
              id="theme-background"
              className="fixed inset-0 -z-10 transition-all duration-500"
            />
            <main className="flex flex-col items-center justify-center min-h-screen py-12 relative">
              {children}
            </main>
            <AdminPanel />
            <AdminLoginButton />
            <AdminTools />
          </ProjectsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
