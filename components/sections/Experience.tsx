"use client";

import { motion } from "framer-motion";
import { profile, type ExperienceItem } from "@/data/profile";
import { useTheme } from "@/hooks/useTheme";
import Card from "@/components/ui/Card";

export default function Experience() {
  const { themeConfig, mounted } = useTheme();
  
  return (
    <section id="experience">
      {/* Section Heading - uses Primary Accent */}
      <h2 
        className="text-3xl font-bold mb-12"
        style={mounted ? { color: themeConfig.headingText } : {}}
      >
        Experience
      </h2>
      {profile.experience.length > 0 ? (
        <div 
          className="space-y-8 border-l-2 ml-3 pl-8 py-2"
          style={mounted ? { borderColor: themeConfig.borderColor } : {}}
        >
          {profile.experience.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <span 
                className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 shadow-sm"
                style={mounted ? { 
                  backgroundColor: themeConfig.primary,
                  borderColor: themeConfig.cardBg 
                } : {}}
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                {/* Title - uses Primary Accent */}
                <h3 
                  className="text-xl font-bold"
                  style={mounted ? { color: themeConfig.headingText } : {}}
                >
                  {role.title}
                </h3>
                <span 
                  className="text-sm font-medium px-3 py-1 rounded-full w-fit mt-2 sm:mt-0"
                  style={mounted ? { 
                    backgroundColor: themeConfig.sectionBg, 
                    color: themeConfig.bodyText,
                    border: `1px solid ${themeConfig.borderColor}`
                  } : {}}
                >
                  {role.years}
                </span>
              </div>
              {/* Company - uses Secondary Accent */}
              <p 
                className="text-lg font-medium mb-3"
                style={mounted ? { color: themeConfig.labelText } : {}}
              >
                {role.company}
              </p>
              {/* Details - uses Body Text */}
              <p 
                className="leading-relaxed"
                style={mounted ? { color: themeConfig.bodyText } : {}}
              >
                {role.details}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card metallic>
            <div className="p-8 text-center">
              <p 
                className="text-lg"
                style={mounted ? { color: themeConfig.bodyText } : {}}
              >
                Currently building experience through projects and coursework. 
                Open to internships and opportunities to grow as a developer.
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </section>
  );
}
