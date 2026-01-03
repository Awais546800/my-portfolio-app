"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ThemedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThemedSection({ children, className }: ThemedSectionProps) {
  const { themeConfig, mounted } = useTheme();
  
  if (!mounted) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section className={cn(themeConfig.text, className)}>
      {children}
    </section>
  );
}

