# Favicon Instructions

## ⚠️ Important: Favicons Are Public
All visitors to your website will see the favicon in their browser tab. Favicons cannot be made private - this is how web browsers work.

## How to Add Your Favicon

1. **Copy your favicon file** from your laptop
2. **Paste it here** in the `/public` folder
3. **Name it** `favicon.ico` (or `favicon.png` if it's a PNG file)

## File Requirements
- **Format**: `.ico`, `.png`, or `.svg`
- **Size**: 16x16, 32x32, or 48x48 pixels (for .ico or .png)
- **Name**: `favicon.ico` or `favicon.png`

## After Adding
1. Save the file in this `/public` folder
2. Restart your dev server: `npm run dev`
3. The favicon will appear in browser tabs
4. If it doesn't show, clear browser cache (Ctrl+Shift+R)

## Alternative Location
You can also place the favicon in the `/app` folder as:
- `/app/icon.ico`
- `/app/favicon.ico`

Next.js will automatically detect and use it.

