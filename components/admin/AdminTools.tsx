"use client";

import { useState, useEffect } from "react";
import { isAdmin, isDevToolsHidden } from "@/lib/admin";
import DevToolsPanel from "./DevToolsPanel";

export default function AdminTools() {
  const [adminStatus, setAdminStatus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [devToolsHidden, setDevToolsHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkAdmin = () => {
      setAdminStatus(isAdmin());
    };
    
    const checkVisibility = () => {
      setDevToolsHidden(isDevToolsHidden());
    };
    
    checkAdmin();
    checkVisibility();
    
    // Check more frequently to catch logout events
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

  // CRITICAL: Return null completely if not admin or if hidden - no DOM element at all
  if (!mounted) {
    return null;
  }

  if (!adminStatus || devToolsHidden) {
    return null; // Completely hidden from non-admin users or when hidden
  }

  return <DevToolsPanel />;
}
