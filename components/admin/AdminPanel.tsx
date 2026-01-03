"use client";

import { useState, useEffect } from "react";
import { isAdmin, isDevToolsHidden, setDevToolsHidden, logoutAdmin } from "@/lib/admin";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AdminPanel() {
  const [adminStatus, setAdminStatus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [devToolsHidden, setDevToolsHiddenState] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAdminStatus(isAdmin());
    
    const checkVisibility = () => {
      setDevToolsHiddenState(isDevToolsHidden());
    };
    
    checkVisibility();
    
    // Listen for visibility changes
    const handleVisibilityChange = () => {
      checkVisibility();
    };
    window.addEventListener('devtools-visibility-changed', handleVisibilityChange);

    return () => {
      window.removeEventListener('devtools-visibility-changed', handleVisibilityChange);
    };
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    setAdminStatus(false);
  };

  const handleShowDevTools = () => {
    setDevToolsHidden(false);
    setDevToolsHiddenState(false);
  };

  // Don't render anything until mounted (prevents hydration issues)
  if (!mounted) {
    return null;
  }

  // Only show admin panel if user is logged in as admin
  // Hide completely from visitors
  if (!adminStatus) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="bg-green-50 border-green-200">
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-green-800">🔐 Admin Mode</p>
                <p className="text-xs text-green-600">You have admin access</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
              >
                Logout
              </Button>
            </div>
            
            {/* Show Dev Tools Approval Button */}
            {devToolsHidden && (
              <div className="pt-3 border-t border-green-200">
                <p className="text-xs text-green-700 mb-2">Dev Tools is currently hidden</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleShowDevTools}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Show Dev Tools
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
