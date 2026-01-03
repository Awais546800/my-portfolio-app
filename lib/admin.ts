// Admin access control
// This uses localStorage to remember admin status
// Note: This is client-side only and can be bypassed by tech-savvy users
// For production, use proper authentication

const ADMIN_KEY = "portfolio_admin";
const DEVTOOLS_HIDDEN_KEY = "portfolio_devtools_hidden";
const ADMIN_PASSWORD = "awais_dev_2024"; // Change this to your preferred password

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_KEY) === "true";
}

export function setAdmin(isAdmin: boolean): void {
  if (typeof window === "undefined") return;
  if (isAdmin) {
    localStorage.setItem(ADMIN_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_KEY);
  }
}

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function logoutAdmin(): void {
  setAdmin(false);
}

// Dev Tools visibility control
export function isDevToolsHidden(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DEVTOOLS_HIDDEN_KEY) === "true";
}

export function setDevToolsHidden(hidden: boolean): void {
  if (typeof window === "undefined") return;
  if (hidden) {
    localStorage.setItem(DEVTOOLS_HIDDEN_KEY, "true");
  } else {
    localStorage.removeItem(DEVTOOLS_HIDDEN_KEY);
  }
  // Dispatch event to update components
  window.dispatchEvent(new CustomEvent('devtools-visibility-changed', { detail: hidden }));
}

