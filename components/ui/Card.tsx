"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  metallic?: boolean; // For metallic/glass effect
}

export default function Card({ children, className, hover = false, metallic = false }: CardProps) {
  const { themeConfig, theme, mounted } = useTheme();
  
  if (!mounted) {
    return (
      <div className={cn("bg-white rounded-2xl border border-slate-100 shadow-sm", className)}>
        {children}
      </div>
    );
  }

  // Determine card background style
  let cardStyle: React.CSSProperties = {
    borderColor: themeConfig.cardBorder,
    borderWidth: "1px",
    borderStyle: "solid",
  };

  // Apply metallic/glass effects
  if (metallic || theme !== "default") {
    if (themeConfig.cardBgGradient) {
      cardStyle.background = themeConfig.cardBgGradient;
    } else {
      cardStyle.backgroundColor = themeConfig.cardBg;
    }
    
    // Add backdrop blur for glassmorphism effect
    cardStyle.backdropFilter = "blur(12px)";
    cardStyle.WebkitBackdropFilter = "blur(12px)";
    
    // Add theme-specific shadows
    if (theme === "neural-midnight") {
      cardStyle.boxShadow = themeConfig.cardShadow;
    } else if (theme === "titanium-chrome") {
      cardStyle.boxShadow = themeConfig.cardShadow;
    } else {
      cardStyle.boxShadow = `0 4px 6px ${themeConfig.shadow}`;
    }
  } else {
    cardStyle.backgroundColor = themeConfig.cardBg;
    cardStyle.boxShadow = `0 1px 3px ${themeConfig.shadow}`;
  }

  return (
    <div
      className={cn("rounded-2xl transition-all duration-300", className)}
      style={cardStyle}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = themeConfig.primary;
          if (theme === "neural-midnight") {
            e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 245, 255, 0.3)";
          } else if (theme === "titanium-chrome") {
            e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.15)";
          } else {
            e.currentTarget.style.boxShadow = `0 10px 25px ${themeConfig.shadow}`;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.borderColor = themeConfig.cardBorder;
          if (theme === "neural-midnight") {
            e.currentTarget.style.boxShadow = themeConfig.cardShadow;
          } else if (theme === "titanium-chrome") {
            e.currentTarget.style.boxShadow = themeConfig.cardShadow;
          } else {
            e.currentTarget.style.boxShadow = `0 4px 6px ${themeConfig.shadow}`;
          }
        }
      }}
    >
      {children}
    </div>
  );
}
