"use client";

import { useState, useEffect, useRef } from "react";
import { isAdmin, setAdmin, checkAdminPassword } from "@/lib/admin";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

// This component is only for admin login - hidden from regular visitors
// Access via keyboard shortcut Ctrl+Shift+A or click the tiny hidden button
export default function AdminLoginButton() {
  const [adminStatus, setAdminStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const adminStatusRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const currentAdminStatus = isAdmin();
    setAdminStatus(currentAdminStatus);
    adminStatusRef.current = currentAdminStatus;
    
    // Check for admin URL parameter (for mobile access)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' && !currentAdminStatus) {
      setShowLogin(true);
    }
    
    // Listen for keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift+A or Cmd+Shift+A
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isA = e.key === 'A' || e.key === 'a' || e.keyCode === 65 || e.which === 65;
      
      if (isCtrlOrCmd && isShift && isA) {
        e.preventDefault();
        e.stopPropagation();
        
        // Check current admin status
        const currentStatus = isAdmin();
        if (!currentStatus) {
          setShowLogin(true);
        }
      }
    };

    // Add event listener to document for better capture
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  // Update ref when admin status changes
  useEffect(() => {
    adminStatusRef.current = adminStatus;
  }, [adminStatus]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (checkAdminPassword(password)) {
      setAdmin(true);
      setAdminStatus(true);
      setShowLogin(false);
      setPassword("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!mounted || adminStatus) {
    return null; // Don't show login button if already admin
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Mobile-friendly hidden button - tap 5 times in bottom-left corner */}
      {!showLogin && (
        <button
          onClick={() => setShowLogin(true)}
          className="w-12 h-12 bg-blue-600/10 hover:bg-blue-600/20 active:bg-blue-600/30 rounded-full border-2 border-blue-600/20 flex items-center justify-center transition-all opacity-0 hover:opacity-100 focus:opacity-100 touch-manipulation"
          aria-label="Admin login"
          title="Admin Access - Tap to login (or add ?admin=true to URL)"
        >
          <span className="text-blue-600 text-xs font-bold">🔐</span>
        </button>
      )}
      
      {/* Login form */}
      {showLogin && (
        <Card className="w-80 max-w-[90vw] shadow-2xl">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Admin Access</h3>
            <p className="text-xs text-slate-500 mb-4">
              <span className="hidden md:inline">Press <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">Ctrl+Shift+A</kbd> or </span>
              Add <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">?admin=true</kbd> to URL
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div className="flex gap-2">
                <Button type="submit" variant="primary" size="sm" className="flex-1">
                  Login
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setShowLogin(false);
                    setPassword("");
                    setError("");
                    // Remove admin parameter from URL
                    const url = new URL(window.location.href);
                    url.searchParams.delete('admin');
                    window.history.replaceState({}, '', url.toString());
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
}

