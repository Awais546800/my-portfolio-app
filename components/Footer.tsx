"use client";

import { profile } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";

export default function Footer() {
  const { themeConfig, mounted } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t py-8 mt-24 backdrop-blur-md"
      style={mounted ? {
        backgroundColor: `${themeConfig.cardBg}80`, // 50% opacity
        borderColor: themeConfig.borderColor,
      } : {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      <div className="w-full max-w-5xl px-6 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-center md:text-left">
            <p
              style={mounted ? { color: themeConfig.bodyText } : {}}
            >
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <p
              className="text-xs mt-1"
              style={mounted ? { color: themeConfig.bodyText, opacity: 0.7 } : {}}
            >
              Protected by security measures. Unauthorized access prohibited.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-80"
              style={mounted ? { color: themeConfig.primary } : {}}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="transition-colors hover:opacity-80"
              style={mounted ? { color: themeConfig.primary } : {}}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
