// Professional theme system with exact color specifications and metallic effects

export type Theme = "default" | "neural-midnight" | "emerald-matrix" | "sunset-cyber" | "deep-space" | "titanium-chrome";

export interface ThemeConfig {
  name: string;
  description: string;
  // Background colors
  bg: string; // Main background
  bgGradient: string; // For gradient backgrounds
  // Text colors
  headingText: string; // Section headings and name (Primary Accent/Brightest)
  labelText: string; // Labels like "Hello, I'm", "Languages" (Secondary Accent)
  bodyText: string; // Body text and descriptions (High-Contrast Off-White)
  // Accent colors
  primary: string; // Primary accent (headings, name)
  primaryHover: string; // Primary hover state
  secondary: string; // Secondary accent (labels, tags)
  // Card/Component colors
  cardBg: string; // Card background (can be gradient)
  cardBgGradient?: string; // Optional gradient for cards
  cardBorder: string; // Card border
  cardShadow: string; // Card shadow/glow
  sectionBg: string; // Section backgrounds
  // Button colors
  buttonPrimary: string; // Primary button background
  buttonPrimaryText: string; // Primary button text
  buttonSecondary: string; // Secondary button background
  buttonSecondaryText: string; // Secondary button text
  buttonSecondaryBorder: string; // Secondary button border
  // Other
  borderColor: string; // General borders
  shadow: string; // Shadow color
  // Legacy support
  text: string; // Alias for headingText
  textSecondary: string; // Alias for bodyText
}

export const themes: Record<Theme, ThemeConfig> = {
  default: {
    name: "Default",
    description: "Clean and professional light theme",
    bg: "#f8fafc",
    bgGradient: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    headingText: "#0f172a",
    labelText: "#64748b",
    bodyText: "#475569",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    secondary: "#64748b",
    cardBg: "#ffffff",
    cardBorder: "#e2e8f0",
    cardShadow: "rgba(0, 0, 0, 0.1)",
    sectionBg: "#ffffff",
    buttonPrimary: "#2563eb",
    buttonPrimaryText: "#ffffff",
    buttonSecondary: "#ffffff",
    buttonSecondaryText: "#0f172a",
    buttonSecondaryBorder: "#e2e8f0",
    borderColor: "#e2e8f0",
    shadow: "rgba(0, 0, 0, 0.1)",
    text: "#0f172a",
    textSecondary: "#475569",
  },
  "neural-midnight": {
    name: "Neural Midnight",
    description: "Optimized for Readability - AI/ML theme with electric accents",
    bg: "#0B0E14",
    bgGradient: "linear-gradient(135deg, #0B0E14 0%, #1a1f2e 100%)",
    headingText: "#00F5FF", // Neon Cyan - for headings and name
    labelText: "#7000FF", // Electric Purple - for labels
    bodyText: "#CBD5E1", // Cool Silver-Gray - high contrast
    primary: "#00F5FF", // Neon Cyan
    primaryHover: "#00d4e6",
    secondary: "#7000FF", // Electric Purple
    cardBg: "#161B22", // Slightly lighter than background
    cardBgGradient: "linear-gradient(145deg, #161B22 0%, #0B0E14 100%)", // Metallic gradient
    cardBorder: "#1e2530",
    cardShadow: "0 0 20px rgba(0, 245, 255, 0.2)", // Cyan outer glow
    sectionBg: "#161B22",
    buttonPrimary: "#00F5FF",
    buttonPrimaryText: "#0B0E14",
    buttonSecondary: "#1e2530",
    buttonSecondaryText: "#CBD5E1",
    buttonSecondaryBorder: "#00F5FF",
    borderColor: "#1e2530",
    shadow: "rgba(0, 245, 255, 0.2)",
    text: "#00F5FF",
    textSecondary: "#CBD5E1",
  },
  "emerald-matrix": {
    name: "Emerald Matrix",
    description: "High-Contrast Engineering - Professional slate with emerald",
    bg: "#0F172A",
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #1e293b 100%)",
    headingText: "#34D399", // Bright Emerald - changed for better visibility
    labelText: "#38BDF8", // Sky Blue for tags like "Python"
    bodyText: "#F1F5F9", // Ghost White
    primary: "#34D399", // Bright Emerald
    primaryHover: "#10B981",
    secondary: "#38BDF8", // Sky Blue
    cardBg: "#1E293B", // Lighter slate
    cardBgGradient: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", // Slate-to-navy gradient
    cardBorder: "#334155", // 1px solid border
    cardShadow: "rgba(52, 211, 153, 0.15)",
    sectionBg: "#1E293B",
    buttonPrimary: "#34D399",
    buttonPrimaryText: "#0F172A",
    buttonSecondary: "#334155",
    buttonSecondaryText: "#F1F5F9",
    buttonSecondaryBorder: "#475569",
    borderColor: "#334155",
    shadow: "rgba(52, 211, 153, 0.2)",
    text: "#34D399",
    textSecondary: "#F1F5F9",
  },
  "sunset-cyber": {
    name: "Sunset Cyber",
    description: "Energetic & Bold - Amber and red accents",
    bg: "#121212",
    bgGradient: "linear-gradient(135deg, #121212 0%, #1a1a1a 100%)",
    headingText: "#F59E0B", // Amber Gold
    labelText: "#EF4444", // Soft Red
    bodyText: "#D1D5DB", // Light Gray
    primary: "#F59E0B", // Amber Gold
    primaryHover: "#d97706",
    secondary: "#EF4444", // Soft Red
    cardBg: "#1a1a1a",
    cardBorder: "#2a2a2a",
    cardShadow: "rgba(245, 158, 11, 0.2)",
    sectionBg: "#1a1a1a",
    buttonPrimary: "#F59E0B",
    buttonPrimaryText: "#121212",
    buttonSecondary: "#2a2a2a",
    buttonSecondaryText: "#D1D5DB",
    buttonSecondaryBorder: "#F59E0B",
    borderColor: "#2a2a2a",
    shadow: "rgba(245, 158, 11, 0.3)",
    text: "#F59E0B",
    textSecondary: "#D1D5DB",
  },
  "deep-space": {
    name: "Deep Space",
    description: "Minimalist Junior Dev - Calm and industrial",
    bg: "#18181B",
    bgGradient: "linear-gradient(135deg, #18181B 0%, #27272a 100%)",
    headingText: "#3B82F6", // Royal Blue
    labelText: "#A1A1AA", // Cool Gray
    bodyText: "#FFFFFF", // Bright White
    primary: "#3B82F6", // Royal Blue
    primaryHover: "#2563eb",
    secondary: "#A1A1AA", // Cool Gray
    cardBg: "#27272a",
    cardBorder: "#3f3f46",
    cardShadow: "rgba(59, 130, 246, 0.2)",
    sectionBg: "#27272a",
    buttonPrimary: "#3B82F6",
    buttonPrimaryText: "#ffffff",
    buttonSecondary: "#3f3f46",
    buttonSecondaryText: "#FFFFFF",
    buttonSecondaryBorder: "#52525b",
    borderColor: "#3f3f46",
    shadow: "rgba(59, 130, 246, 0.2)",
    text: "#3B82F6",
    textSecondary: "#FFFFFF",
  },
  "titanium-chrome": {
    name: "Titanium Chrome",
    description: "Metallic Theme - Brushed metal aesthetic for Engineering",
    bg: "#111111",
    bgGradient: "linear-gradient(135deg, #111111 0%, #1a1a1a 100%)",
    headingText: "#F8FAFC", // Pure Titanium White
    labelText: "#64748B", // Cool Chrome
    bodyText: "#94A3B8", // Steel Gray
    primary: "#F8FAFC", // Pure Titanium White
    primaryHover: "#e2e8f0",
    secondary: "#64748B", // Cool Chrome
    cardBg: "#1E1E1E",
    cardBgGradient: "linear-gradient(145deg, #1E1E1E, #252525)", // Metallic beveled look
    cardBorder: "#3f3f46", // Silver border
    cardShadow: "0 0 10px rgba(255, 255, 255, 0.1)", // Metallic shadow
    sectionBg: "#1E1E1E",
    buttonPrimary: "#3B82F6", // Electric Blue for links
    buttonPrimaryText: "#ffffff",
    buttonSecondary: "#252525",
    buttonSecondaryText: "#F8FAFC",
    buttonSecondaryBorder: "#64748B",
    borderColor: "#3f3f46",
    shadow: "rgba(255, 255, 255, 0.1)",
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
  },
};

export function applyTheme(theme: Theme) {
  const themeConfig = themes[theme];
  if (!themeConfig) return;
  
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  
  // Set background color as fallback (CSS will handle background-image)
  const bgElement = document.getElementById("theme-background") as HTMLElement;
  if (bgElement) {
    // Only set backgroundColor, let CSS handle background-image
    bgElement.style.backgroundColor = themeConfig.bg;
    // Clear any inline background-image to let CSS take over
    bgElement.style.backgroundImage = '';
    bgElement.style.background = '';
  }
  
  // Apply CSS variables for all theme colors
  root.style.setProperty('--theme-bg', themeConfig.bg);
  root.style.setProperty('--theme-bg-gradient', themeConfig.bgGradient);
  root.style.setProperty('--theme-heading-text', themeConfig.headingText);
  root.style.setProperty('--theme-label-text', themeConfig.labelText);
  root.style.setProperty('--theme-body-text', themeConfig.bodyText);
  root.style.setProperty('--theme-primary', themeConfig.primary);
  root.style.setProperty('--theme-primary-hover', themeConfig.primaryHover);
  root.style.setProperty('--theme-secondary', themeConfig.secondary);
  root.style.setProperty('--theme-card-bg', themeConfig.cardBg);
  root.style.setProperty('--theme-card-bg-gradient', themeConfig.cardBgGradient || themeConfig.cardBg);
  root.style.setProperty('--theme-card-border', themeConfig.cardBorder);
  root.style.setProperty('--theme-card-shadow', themeConfig.cardShadow);
  root.style.setProperty('--theme-section-bg', themeConfig.sectionBg);
  root.style.setProperty('--theme-button-primary', themeConfig.buttonPrimary);
  root.style.setProperty('--theme-button-primary-text', themeConfig.buttonPrimaryText);
  root.style.setProperty('--theme-button-secondary', themeConfig.buttonSecondary);
  root.style.setProperty('--theme-button-secondary-text', themeConfig.buttonSecondaryText);
  root.style.setProperty('--theme-button-secondary-border', themeConfig.buttonSecondaryBorder);
  root.style.setProperty('--theme-border', themeConfig.borderColor);
  root.style.setProperty('--theme-shadow', themeConfig.shadow);
  
  // Apply theme class to body
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
  document.body.classList.add(`theme-${theme}`);
  
  // Save to localStorage
  localStorage.setItem("portfolio_theme", theme);
  
  // Dispatch event for components to react
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function getCurrentTheme(): Theme {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("portfolio_theme") as Theme;
  return saved && themes[saved] ? saved : "default";
}
