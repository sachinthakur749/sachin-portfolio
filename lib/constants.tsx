import { Experience, Project, Skill } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "A TO Z DISPATCH",
    description:
      "A real-time Ride Scheduling System with Stripe integration, multi-language localization, and a comprehensive CMS/Admin dashboard for managing fleet and drivers.",
    tags: ["Next.js", "Stripe", "Real-time", "Admin Panel"],
    imageUrl:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=800&grayscale=true",
  },
  {
    id: "2",
    title: "TUTEELINE",
    description:
      "A student portfolio management and centralized application system for streamlining university admissions and job applications, featuring real-time result publication.",
    tags: ["React", "Zustand", "Messaging", "Education"],
    imageUrl:
      "/images/tuteeline.png",
  },
  {
    id: "3",
    title: "TECHNICAL SEWA",
    description:
      "A high-performance e-commerce platform for appliance repairs and spare parts, optimized for SEO with dynamic blog features and service scheduling.",
    tags: ["Next.js", "SEO", "E-commerce", "Service"],
    imageUrl:
      "/images/technical-sewa.png",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    company: "COREDREAMS INNOVATIONS PVT. LTD",
    role: "Frontend Developer",
    period: "JAN 2024 - PRESENT",
    description: [
      "Spearheading frontend development for enterprise-grade solutions in Lalitpur.",
      "Implementing scalable UI components using React and Next.js.",
      "Collaborating with cross-functional teams to deliver high-quality web experiences.",
    ],
  },
  {
    id: "e2",
    company: "AEON SOFT SOLUTION TECHNOLOGY",
    role: "Frontend Developer",
    period: "JULY 2023 – NOV 2023",
    description: [
      "Focused on developing robust interfaces for local and international clients in Putalisadak.",
      "Optimized application performance and ensured cross-browser compatibility.",
      "Worked extensively with Tailwind CSS and Material UI for rapid UI development.",
    ],
  },
  {
    id: "e3",
    company: "SUPREME IT SOLUTIONS",
    role: "Frontend Developer",
    period: "MARCH 2023 – JUNE 2023",
    description: [
      "Developed and maintained interactive user interfaces for various IT solutions.",
      "Integrated RESTful APIs and managed application state using modern libraries.",
      "Collaborated on UI/UX improvements to enhance user engagement.",
    ],
  },
];

export const SKILLS: Skill[] = [
  {
    category: "Frameworks & Libs",
    items: [
      "ReactJS",
      "NextJS",
      "NodeJs",
      "Redux Toolkit",
      "Zustand",
      "React Query",
    ],
  },
  {
    category: "UI & Styling",
    items: ["Tailwind CSS", "Material UI", "antDesign", "HTML5", "CSS3"],
  },
  {
    category: "Languages & Tools",
    items: [
      "Javascript",
      "Typescript",
      "C",
      "C++",
      "Git",
      "Postman",
      "REST API",
      "GraphQL",
    ],
  },
];
