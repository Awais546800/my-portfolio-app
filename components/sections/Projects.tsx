"use client";

import { motion } from "framer-motion";
import { useProjects } from "@/contexts/ProjectsContext";
import Card from "@/components/ui/Card";
import { useTheme } from "@/hooks/useTheme";
import Button from "@/components/ui/Button";

export default function Projects() {
  const { themeConfig, mounted } = useTheme();
  const { projects } = useProjects();
  
  return (
    <section id="projects">
      {/* Section Heading - uses Primary Accent */}
      <h2 
        className="text-3xl font-bold mb-12"
        style={mounted ? { color: themeConfig.headingText } : {}}
      >
        My Projects
      </h2>
      
      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card metallic>
            <div className="p-12 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={mounted ? { color: themeConfig.bodyText } : {}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 
                className="text-xl font-semibold mb-2"
                style={mounted ? { color: themeConfig.headingText } : {}}
              >
                New Projects Coming Soon
              </h3>
              <p style={mounted ? { color: themeConfig.bodyText } : {}}>
                I'm currently working on exciting projects. Check back soon to see my latest work!
              </p>
            </div>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card metallic hover>
                <div className="p-8">
                  {/* Project Name - uses Primary Accent */}
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={mounted ? { color: themeConfig.headingText } : {}}
                  >
                    {project.name}
                  </h3>
                  {/* Project Description - uses Body Text */}
                  <p 
                    className="mb-6 leading-relaxed"
                    style={mounted ? { color: themeConfig.bodyText } : {}}
                  >
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="sm">
                      View Project
                      <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Button>
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
