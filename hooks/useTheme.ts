"use client";

import { useState, useEffect } from "react";
import { Theme, getCurrentTheme, applyTheme, themes } from "@/lib/themes";

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = getCurrentTheme();
    setCurrentTheme(saved);
    
    // Listen for theme changes from other components
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      if (customEvent.detail) {
        const newTheme = customEvent.detail;
        setCurrentTheme(newTheme);
      }
    };
    
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return {
    theme: currentTheme,
    themeConfig: themes[currentTheme],
    changeTheme,
    mounted,
  };
}

