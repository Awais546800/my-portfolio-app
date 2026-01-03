"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Card from "@/components/ui/Card";
import { useTheme } from "@/hooks/useTheme";

export default function Skills() {
  const { themeConfig, mounted } = useTheme();
  const categories = [
    { title: "Languages", items: profile.skills.languages },
    { title: "Frameworks", items: profile.skills.frameworks },
    { title: "Tools", items: profile.skills.tools },
  ];

  return (
    <section id="skills">
      {/* Section Heading - uses Primary Accent */}
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12"
        style={mounted ? { color: themeConfig.headingText } : {}}
      >
        Technical Skills
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card metallic hover>
              <div className="p-6">
                {/* Category Title - uses Secondary Accent (labelText) */}
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={mounted ? { color: themeConfig.labelText } : {}}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={mounted ? { 
                        backgroundColor: themeConfig.sectionBg, 
                        color: themeConfig.bodyText,
                        border: `1px solid ${themeConfig.borderColor}`
                      } : {}}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
