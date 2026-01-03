"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import Card from "@/components/ui/Card";

export default function Contact() {
  const { themeConfig, mounted } = useTheme();
  
  return (
    <section id="contact" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card metallic>
          <div className="p-8 md:p-16 text-center">
            {/* Heading - uses Primary Accent */}
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={mounted ? { color: themeConfig.headingText } : {}}
            >
              Let's Build Something Together
            </h2>
            {/* Body Text */}
            <p 
              className="mb-8 max-w-xl mx-auto text-lg"
              style={mounted ? { color: themeConfig.bodyText } : {}}
            >
              I'm currently looking for internships and new opportunities. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={`mailto:${profile.contact.email}`}>
                <Button variant="secondary" size="lg">
                  Say Hello
                </Button>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  LinkedIn
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
