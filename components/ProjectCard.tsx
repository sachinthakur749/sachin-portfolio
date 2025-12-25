import React from "react";
import { Project } from "../types";

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div
      className="group relative border-b border-white/5 py-12 md:py-20 reveal"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">
              <span>Nº 0{project.id}</span>
              <span className="w-12 h-[1px] bg-white/10"></span>
            </div>

            <h3 className="text-4xl md:text-6xl font-bold font-display tracking-tighter group-hover:italic transition-all duration-500">
              {project.title}
            </h3>

            <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-md">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-8">
              <button className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] group/btn">
                <span className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                  →
                </span>
                Case details
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 order-1 md:order-2 overflow-hidden bg-white/5 border border-white/5 aspect-[16/10]">
          <img
            data-cursor="project"
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
