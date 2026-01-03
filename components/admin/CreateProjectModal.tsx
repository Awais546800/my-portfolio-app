"use client";

import { useState } from "react";
import { useProjects } from "@/contexts/ProjectsContext";
import { useTheme } from "@/hooks/useTheme";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { addProject } = useProjects();
  const { themeConfig, mounted } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }
    if (!formData.link.trim()) {
      newErrors.link = "Project link is required";
    } else {
      // Basic URL validation
      try {
        new URL(formData.link);
      } catch {
        newErrors.link = "Please enter a valid URL";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add project
    addProject({
      name: formData.name.trim(),
      description: formData.description.trim(),
      link: formData.link.trim(),
    });

    // Reset form and close
    setFormData({ name: "", description: "", link: "" });
    setErrors({});
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className="relative rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={mounted ? {
          backgroundColor: themeConfig.cardBg,
          border: `1px solid ${themeConfig.borderColor}`,
        } : {
          backgroundColor: '#ffffff',
        }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-xl font-bold"
              style={mounted ? { color: themeConfig.text } : {}}
            >
              Create New Project
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 text-2xl leading-none"
              style={mounted ? { color: themeConfig.textSecondary } : {}}
            >
              ×
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Project Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Awesome Project"
              required
              error={errors.name}
            />
            
            <Textarea
              label="Project Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your project..."
              required
              error={errors.description}
            />
            
            <Input
              label="Project Link (URL)"
              name="link"
              type="url"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
              required
              error={errors.link}
            />

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Create Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

