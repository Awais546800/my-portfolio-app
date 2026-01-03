"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Card from "@/components/ui/Card";
import { useTheme } from "@/hooks/useTheme";

export default function Education() {
  const { themeConfig, mounted } = useTheme();
  
  return (
    <section id="education">
      {/* Section Heading - uses Primary Accent */}
      <h2 
        className="text-3xl font-bold mb-12"
        style={mounted ? { color: themeConfig.headingText } : {}}
      >
        Education
      </h2>
      <div className="space-y-12">
        {profile.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card metallic>
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    {/* University - uses Primary Accent */}
                    <h3 
                      className="text-xl font-bold"
                      style={mounted ? { color: themeConfig.headingText } : {}}
                    >
                      {edu.university}
                    </h3>
                    {/* Degree - uses Secondary Accent */}
                    <p 
                      className="text-lg font-medium"
                      style={mounted ? { color: themeConfig.labelText } : {}}
                    >
                      {edu.degree}
                    </p>
                  </div>
                  <span 
                    className="text-sm font-medium px-4 py-2 rounded-lg mt-4 md:mt-0 inline-block"
                    style={mounted ? { 
                      backgroundColor: themeConfig.sectionBg, 
                      color: themeConfig.bodyText,
                      border: `1px solid ${themeConfig.borderColor}`
                    } : {}}
                  >
                    {edu.years}
                  </span>
                </div>
                {/* Details - uses Body Text */}
                <p 
                  className="leading-relaxed border-t pt-4 mt-4"
                  style={mounted ? { 
                    color: themeConfig.bodyText,
                    borderColor: themeConfig.borderColor 
                  } : {}}
                >
                  {edu.details}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
