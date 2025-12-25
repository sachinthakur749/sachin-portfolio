"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SideNav from "@/components/SideNav";
import { EXPERIENCES, PROJECTS, SKILLS } from "@/lib/constants";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const navItems = [
    { label: "Start", href: "#" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Lab", href: "#experience" },
    { label: "Talk", href: "#contact" },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <SideNav />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-110 bg-black transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-between items-center mb-20">
            <span className="font-black text-2xl tracking-tighter italic">
              S. THAKUR
            </span>
            <button
              onClick={toggleMobileMenu}
              className="p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-10">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={toggleMobileMenu}
                className="text-5xl font-display font-black tracking-tighter hover:italic transition-all opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-20 border-t border-white/10">
            <p className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase mb-4">
              Contact Info
            </p>
            <div className="flex flex-col gap-2 text-xs font-bold tracking-widest text-gray-400">
              <p>sachinthakur9983@gmail.com</p>
              <p>+977 9818741749</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="lg:hidden fixed top-0 w-full p-6 flex justify-between items-center z-[100] bg-black/90 backdrop-blur-xl border-b border-white/5">
        <span className="font-black text-xl tracking-tighter italic">
          S. THAKUR
        </span>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </button>
      </nav>

      <div
        className={`lg:pl-24 transition-all duration-500 ${isMobileMenuOpen ? "opacity-20 blur-sm" : "opacity-100 blur-0"
          }`}
      >
        <Hero />

        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <section id="about" className="py-24 md:py-48 reveal">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white/20"></span>
                  <h2 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">
                    Background
                  </h2>
                </div>
                <h3 className="text-4xl md:text-7xl font-bold font-display leading-[1.05] tracking-tighter">
                  ENGINEERING <br /> MODERN <br /> INTERFACES.
                </h3>
                <p data-cursor="cta" className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-md">
                  Based in Bhaktapur, I graduated with a Bachelor&apos;s in IT
                  from Texas College (2023). My journey is defined by
                  transforming complex requirements into elegant,
                  high-performance web solutions.
                </p>
                <div className="pt-6">
                  <a
                    href="mailto:sachinthakur9983@gmail.com"
                    className="text-xs font-bold uppercase tracking-[0.3em] border-b border-white pb-2 hover:text-gray-400 hover:border-gray-400 transition-all"
                  >
                    Request Resume
                  </a>
                </div>
              </div>

              <div data-cursor="project" className="relative group overflow-hidden border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000&grayscale=true"
                  alt="Sachin's Coding Environment"
                  className="w-full aspect-[4/5] object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </section>

          <section id="work" className="py-24">
            <div className="mb-24 flex flex-col md:flex-row items-baseline justify-between gap-4 reveal">
              <div className="flex items-center gap-4">
                <span className="w-8 h-[1px] bg-white/20"></span>
                <h2 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">
                  Selected Projects
                </h2>
              </div>
              <div className="text-left md:text-right">
                <h3 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
                  FEATURED WORK
                </h3>
                <p className="text-[10px] tracking-[0.4em] text-white/20 mt-2 uppercase font-mono">
                  Archive / 2019 — 2024
                </p>
              </div>
            </div>

            <div className="space-y-4 md:space-y-8">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section
            id="experience"
            className="py-24 md:py-48 border-t border-white/5 reveal"
          >
            <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
              <div className="lg:col-span-4 space-y-16">
                <div>
                  <h2 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase mb-12 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    Stack
                  </h2>
                  <div className="space-y-12">
                    {SKILLS.map((skill) => (
                      <div key={skill.category}>
                        <h4 className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20 mb-6">
                          {skill.category}
                        </h4>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                          {skill.items.map((item) => (
                            <span
                              key={item}
                              className="text-lg md:text-xl font-light text-gray-600 hover:text-white transition-colors cursor-default"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <h2 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase mb-12 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white/20"></span>
                  Professional Timeline
                </h2>
                <div className="space-y-1">
                  {EXPERIENCES.map((exp) => (
                    <div
                      key={exp.id}
                      className="group border-b border-white/5 py-10 hover:bg-white/[0.01] transition-colors px-4 -mx-4 first:pt-0"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <h4 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {exp.role}
                          </h4>
                          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                            {exp.company}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-white/20 bg-white/5 px-3 py-1 border border-white/5">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-500 font-light text-sm italic max-w-2xl leading-relaxed">
                        {exp.description.join(" ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-48 text-center reveal">
            <div className="inline-block p-4 border border-white/5 mb-12">
              <h2 className="text-[10px] font-bold tracking-[0.5em] text-white/40 uppercase">
                Inquiry
              </h2>
            </div>
            <h3 className="text-6xl md:text-[10rem] font-black font-display mb-16 tracking-tighter leading-[0.8] outline-text">
              LET&apos;S <br /> BUILD.
            </h3>
            <a
              href="mailto:sachinthakur9983@gmail.com"
              className="group relative inline-block text-2xl md:text-5xl font-light hover:text-white transition-all py-4"
            >
              <span className="relative z-10 font-display italic">
                sachinthakur9983@gmail.com
              </span>
              <div className="absolute bottom-4 left-0 w-full h-[1px] bg-white scale-x-100 opacity-20 group-hover:opacity-100 group-hover:scale-x-110 transition-all duration-500"></div>
            </a>
          </section>
        </div>
      </div>

      {/* <AIChatAssistant /> */}

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
          transition: -webkit-text-stroke 0.5s ease;
        }
        .reveal.active .outline-text {
          color: white;
          -webkit-text-stroke: 1px transparent;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
