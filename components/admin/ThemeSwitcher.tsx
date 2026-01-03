"use client";

import { useTheme } from "@/hooks/useTheme";
import { Theme, themes } from "@/lib/themes";

export default function ThemeSwitcher() {
  const { theme, changeTheme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(themes).map(([key, themeConfig]) => (
          <button
            key={key}
            onClick={() => changeTheme(key as Theme)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              theme === key
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-4 h-4 rounded border-2 border-slate-300"
                    style={{ backgroundColor: themeConfig.primary }}
                  />
                  <p className="text-sm font-semibold text-slate-900">{themeConfig.name}</p>
                  {key === "default" && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Default</span>
                  )}
                </div>
                <p className="text-xs text-slate-600">{themeConfig.description}</p>
              </div>
              {theme === key && (
                <div className="text-blue-600 font-bold">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="pt-2 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Current: <span className="font-semibold text-slate-700">{themes[theme].name}</span>
        </p>
      </div>
    </div>
  );
}
