"use client";

import { useState, useEffect } from "react";
import { isAdmin, isDevToolsHidden, setDevToolsHidden } from "@/lib/admin";
import ThemeSwitcher from "./ThemeSwitcher";
import CreateProjectModal from "./CreateProjectModal";
import Button from "@/components/ui/Button";
import { useProjects } from "@/contexts/ProjectsContext";

export default function DevToolsPanel() {
  const [adminStatus, setAdminStatus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { projects, removeProject } = useProjects();

  useEffect(() => {
    setMounted(true);
    const checkAdmin = () => {
      const admin = isAdmin();
      setAdminStatus(admin);
      if (!admin) {
        setIsOpen(false); // Close panel if admin logs out
      }
    };
    
    const checkVisibility = () => {
      setIsHidden(isDevToolsHidden());
    };
    
    checkAdmin();
    checkVisibility();
    const interval = setInterval(() => {
      checkAdmin();
      checkVisibility();
    }, 500);

    // Listen for visibility changes
    const handleVisibilityChange = () => {
      checkVisibility();
    };
    window.addEventListener('devtools-visibility-changed', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('devtools-visibility-changed', handleVisibilityChange);
    };
  }, []);

  // CRITICAL: Don't render ANYTHING if not admin or if hidden
  if (!mounted) {
    return null;
  }

  if (!adminStatus || isHidden) {
    return null; // Return null completely - no DOM element at all
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Dev Tools Panel - Next.js Style */}
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div 
          className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">Route</span>
            <span className="text-xs text-slate-400">Static</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Bundler</span>
            <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Route Info</span>
            <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer flex items-center gap-1">
              Preferences
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Content Panel */}
        {isOpen && (
          <div className="p-4 bg-slate-50 min-w-[400px] max-w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Route Info */}
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">Route</div>
                <div className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Static</span>
                    <span className="text-green-600">○</span>
                  </div>
                </div>
              </div>

              {/* Bundler Info */}
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">Bundler</div>
                <div className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                  <a href="#" className="text-blue-600 hover:text-blue-700">Webpack</a>
                </div>
              </div>

              {/* Hide Dev Tools Option */}
              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  Visibility Control
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (confirm("Hide Dev Tools? It will remain hidden until approved in Admin Panel.")) {
                      setDevToolsHidden(true);
                      setIsHidden(true);
                    }
                  }}
                  className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  Hide Dev Tools
                </Button>
              </div>

              {/* Project Management Section */}
              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Project Management
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCreateProject(true)}
                  className="w-full mb-3"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Project
                </Button>
                
                {/* Projects List with Delete */}
                {projects.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-700 mb-2">Manage Projects</div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-2 bg-white rounded border border-slate-200"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-900 truncate">{project.name}</p>
                            <p className="text-xs text-slate-500 truncate">{project.link}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${project.name}"?`)) {
                                removeProject(project.id);
                              }
                            }}
                            className="ml-2 p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete project"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Switcher Section */}
              <div className="border-t border-slate-200 pt-4">
                <div className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  Theme Preferences
                </div>
                <div className="mt-3">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Icon - Next.js Style - ONLY VISIBLE WHEN ADMIN */}
        {adminStatus && (
          <div className="absolute bottom-2 left-2">
            <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
      />
    </div>
  );
}
