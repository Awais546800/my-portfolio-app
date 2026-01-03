"use client";

import { useEffect } from "react";
import { getCurrentTheme, applyTheme } from "@/lib/themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply saved theme on mount
    const theme = getCurrentTheme();
    applyTheme(theme);
    
    // Listen for theme changes from CustomEvent
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<typeof theme>;
      if (customEvent.detail) {
        applyTheme(customEvent.detail);
      } else {
        const currentTheme = getCurrentTheme();
        applyTheme(currentTheme);
      }
    };
    
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  return <>{children}</>;
}

