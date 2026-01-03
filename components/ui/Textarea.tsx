"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className, ...props }: TextareaProps) {
  const { themeConfig, mounted } = useTheme();
  
  return (
    <div className="w-full">
      {label && (
        <label 
          className="block text-sm font-medium mb-2"
          style={mounted ? { color: themeConfig.text } : {}}
        >
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none",
          error ? "border-red-300 focus:ring-red-500" : "",
          className
        )}
        style={mounted ? {
          backgroundColor: themeConfig.cardBg,
          borderColor: error ? undefined : themeConfig.borderColor,
          color: themeConfig.text,
        } : {}}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
