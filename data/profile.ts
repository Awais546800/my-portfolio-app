export interface ExperienceItem {
  title: string;
  company: string;
  years: string;
  details: string;
}

export const profile = {
  name: "M. Awais Iqbal",
  tagline: "Junior Full-Stack Developer | Machine Learning & AI Track | Python, JavaScript, & SQL | UET Lahore '27",
  linkedin: "https://www.linkedin.com/in/awaisiqbal786",
  contact: {
    email: "awais.iqbal.developer@gmail.com",
  },
  skills: {
    languages: ["Python", "JavaScript", "C++", "SQL"],
    frameworks: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "MySQL"],
  },
  experience: [] as ExperienceItem[],
  education: [
    {
      university: "University of Engineering & Technology (UET) Lahore",
      degree: "BS Computer Science",
      years: "2023 - 2027",
      details: "Currently pursuing Bachelor's degree in Computer Science. Focused on software development, algorithms, data structures, and web technologies. Actively learning modern frameworks and building projects to enhance practical skills.",
    },
  ],
  projects: [], // Projects will be added soon
};
