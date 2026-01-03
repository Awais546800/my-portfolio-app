"use client";

import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/admin";

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const [admin, setAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAdmin(isAdmin());
    
    // Check admin status periodically
    const interval = setInterval(() => {
      setAdmin(isAdmin());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return admin ? <>{children}</> : <>{fallback}</>;
}

