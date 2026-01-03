"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useTheme } from "@/hooks/useTheme";

export default function NetworkingHub() {
  const { themeConfig, mounted } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitStatus("success");
    const originalFormData = { ...formData };
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(true);

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: originalFormData.name,
        email: originalFormData.email,
        message: originalFormData.message,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) {
          setFormData(originalFormData);
          setSubmitStatus("error");
          setTimeout(() => setSubmitStatus("idle"), 3000);
        } else {
          setTimeout(() => setSubmitStatus("idle"), 3000);
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        setFormData(originalFormData);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="networking" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Section Heading - uses Primary Accent */}
        <h2 
          className="text-3xl font-bold mb-4 text-center"
          style={mounted ? { color: themeConfig.headingText } : {}}
        >
          Let's Connect & Build Together
        </h2>
        {/* Body Text */}
        <p 
          className="mb-12 text-center max-w-2xl mx-auto"
          style={mounted ? { color: themeConfig.bodyText } : {}}
        >
          I'm always excited to meet fellow developers, collaborate on projects, and learn from the community. 
          Whether you're a student, professional, or just passionate about coding, let's connect!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card metallic>
            <div className="p-8">
              {/* Form Heading - uses Primary Accent */}
              <h3 
                className="text-2xl font-bold mb-6"
                style={mounted ? { color: themeConfig.headingText } : {}}
              >
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Your Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hey! I'd love to connect and discuss..."
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {submitStatus === "success" && (
                  <p className="text-sm text-green-600 text-center">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-sm text-red-600 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </Card>

          {/* Quick Links & Info */}
          <div className="space-y-6">
            <Card metallic>
              <div className="p-8">
                {/* Heading - uses Primary Accent */}
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={mounted ? { color: themeConfig.headingText } : {}}
                >
                  Quick Connect
                </h3>
                {/* Body Text */}
                <p 
                  className="mb-6"
                  style={mounted ? { color: themeConfig.bodyText } : {}}
                >
                  Prefer a direct approach? Reach out through these channels:
                </p>
                <div className="space-y-4">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border transition-colors group w-full"
                    style={mounted ? { 
                      borderColor: themeConfig.borderColor 
                    } : {}}
                    onMouseEnter={(e) => {
                      if (mounted) {
                        e.currentTarget.style.borderColor = themeConfig.primary;
                        e.currentTarget.style.backgroundColor = themeConfig.sectionBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (mounted) {
                        e.currentTarget.style.borderColor = themeConfig.borderColor;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold transition-colors flex-shrink-0"
                      style={mounted ? { backgroundColor: themeConfig.primary } : {}}
                    >
                      in
                    </div>
                    <div className="min-w-0 flex-1">
                      <p 
                        className="font-semibold"
                        style={mounted ? { color: themeConfig.headingText } : {}}
                      >
                        LinkedIn
                      </p>
                      <p 
                        className="text-sm"
                        style={mounted ? { color: themeConfig.bodyText } : {}}
                      >
                        Connect professionally
                      </p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center gap-4 p-4 rounded-lg border transition-colors group w-full"
                    style={mounted ? { 
                      borderColor: themeConfig.borderColor 
                    } : {}}
                    onMouseEnter={(e) => {
                      if (mounted) {
                        e.currentTarget.style.borderColor = themeConfig.primary;
                        e.currentTarget.style.backgroundColor = themeConfig.sectionBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (mounted) {
                        e.currentTarget.style.borderColor = themeConfig.borderColor;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold transition-colors flex-shrink-0"
                      style={mounted ? { backgroundColor: themeConfig.headingText } : {}}
                    >
                      @
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p 
                        className="font-semibold truncate"
                        style={mounted ? { color: themeConfig.headingText } : {}}
                      >
                        Email
                      </p>
                      <p 
                        className="text-sm break-all"
                        style={mounted ? { color: themeConfig.bodyText } : {}}
                      >
                        {profile.contact.email}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </Card>

            <Card metallic>
              <div 
                className="p-8"
                style={mounted ? { backgroundColor: themeConfig.sectionBg } : {}}
              >
                {/* Heading - uses Primary Accent */}
                <h3 
                  className="text-xl font-bold mb-2"
                  style={mounted ? { color: themeConfig.headingText } : {}}
                >
                  Looking to Collaborate?
                </h3>
                {/* Body Text */}
                <p 
                  className="text-sm"
                  style={mounted ? { color: themeConfig.bodyText } : {}}
                >
                  I'm open to working on open-source projects, hackathons, and side projects. 
                  If you have an idea or need a collaborator, let's talk!
                </p>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
