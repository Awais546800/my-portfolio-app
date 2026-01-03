# Professional Developer Portfolio

A high-end, professional Developer Portfolio Web App built with Next.js 14+ (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Dynamic Hero Section** - Professional introduction with LinkedIn integration
- **Education Timeline** - Clean display of university milestones
- **Experience Section** - Professional experience with timeline visualization
- **Skill Matrix** - Categorized technical skills (Languages, Frameworks, Tools)
- **Project Gallery** - Modern project cards with GitHub and Live Demo links
- **Networking Hub** - Dedicated section for connecting with developers, including contact form
- **Contact Section** - Professional contact CTA with email and LinkedIn links

## 📁 Project Structure

```
my-portfolio-app/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Textarea.tsx
│   └── sections/            # Page sections
│       ├── Hero.tsx
│       ├── Education.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── NetworkingHub.tsx
│       └── Contact.tsx
├── data/
│   └── profile.ts           # Personal information & data
├── hooks/
│   └── use-scroll.ts       # Custom React hooks
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── public/                 # Static assets
└── assets/                 # Additional assets
```

## 🛠️ Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React 19** - Latest React features

## 📝 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update your personal information:**
   - Edit `data/profile.ts` with your details:
     - Name, tagline, LinkedIn URL
     - Contact email
     - Skills (Languages, Frameworks, Tools)
     - Experience entries
     - Education details
     - Projects with GitHub and Live Demo links

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🎨 Customization

### Updating Personal Information

All personal data is centralized in `data/profile.ts`. Simply update the `profile` object with your information:

```typescript
export const profile = {
  name: "Your Name",
  tagline: "University Student & Aspiring Full Stack Developer",
  linkedin: "https://linkedin.com/in/yourprofile",
  // ... rest of your data
};
```

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline Tailwind classes in components

### Adding New Sections

1. Create a new component in `components/sections/`
2. Import and add it to `app/page.tsx`
3. Follow the existing component patterns for consistency

## 🔗 Integration with LinkedIn

The portfolio is designed to integrate seamlessly with LinkedIn:
- Hero section includes LinkedIn CTA
- Contact section has LinkedIn link
- Networking Hub includes LinkedIn quick connect

## 📄 License

This project is open source and available for personal use.

---

Built with ❤️ using Next.js and Tailwind CSS

