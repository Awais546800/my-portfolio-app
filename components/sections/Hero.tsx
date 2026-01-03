"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";

export default function Hero() {
  const { themeConfig, mounted } = useTheme();
  
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-start pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* "Hello, I'm" - uses Secondary Accent (labelText) */}
        <h2 
          className="text-lg md:text-xl font-semibold mb-4"
          style={mounted ? { color: themeConfig.labelText } : {}}
        >
          Hello, I'm
        </h2>
        {/* Name - uses Primary Accent (headingText) */}
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          style={mounted ? { color: themeConfig.headingText } : {}}
        >
          {profile.name}
        </h1>
        {/* Tagline - uses Body Text (bodyText) */}
        <h3 
          className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl leading-relaxed font-medium"
          style={mounted ? { color: themeConfig.bodyText } : {}}
        >
          {profile.tagline}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg">
              Connect on LinkedIn
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary" size="lg">
              Contact Me
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
