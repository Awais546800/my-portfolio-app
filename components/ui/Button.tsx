"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const { themeConfig, mounted } = useTheme();
  
  const baseStyles = "font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center";
  
  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3",
    lg: "px-8 py-4 text-lg",
  };

  let buttonStyle: React.CSSProperties = {};
  let buttonClasses = baseStyles + " " + sizes[size];

  if (mounted) {
    if (variant === "primary") {
      buttonStyle = {
        backgroundColor: themeConfig.buttonPrimary,
        color: themeConfig.buttonPrimaryText,
        boxShadow: `0 4px 6px ${themeConfig.shadow}`,
      };
      buttonClasses += " hover:opacity-90";
    } else if (variant === "secondary") {
      buttonStyle = {
        backgroundColor: themeConfig.buttonSecondary,
        color: themeConfig.buttonSecondaryText,
        borderColor: themeConfig.buttonSecondaryBorder,
        borderWidth: "1px",
        borderStyle: "solid",
      };
      buttonClasses += " hover:opacity-90";
    } else if (variant === "outline") {
      buttonStyle = {
        backgroundColor: "transparent",
        color: themeConfig.text,
        borderColor: themeConfig.borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
      };
      buttonClasses += " hover:opacity-80";
    }
  } else {
    // Fallback for SSR
    if (variant === "primary") {
      buttonClasses += " bg-blue-600 text-white hover:bg-blue-700 shadow-lg";
    } else if (variant === "secondary") {
      buttonClasses += " bg-white text-slate-900 border border-slate-200 hover:bg-slate-50";
    } else {
      buttonClasses += " bg-transparent border border-slate-700 text-white hover:bg-slate-800";
    }
  }

  return (
    <button
      className={cn(buttonClasses, className)}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (mounted && variant === "primary") {
          e.currentTarget.style.backgroundColor = themeConfig.primaryHover;
        }
      }}
      onMouseLeave={(e) => {
        if (mounted && variant === "primary") {
          e.currentTarget.style.backgroundColor = themeConfig.buttonPrimary;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
