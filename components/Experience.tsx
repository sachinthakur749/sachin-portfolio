import React from "react";
import { Experience } from "../types";

interface Props {
  experience: Experience;
}

const ExperienceItem: React.FC<Props> = ({ experience }) => {
  return (
    <div className="relative pl-10 pb-12 last:pb-0 border-l border-white/10 ml-4 group">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-[#0a0a0a] group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300"></div>

      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {experience.role}
        </h3>
        <span className="text-gray-500 font-mono text-sm">
          {experience.period}
        </span>
      </div>

      <div className="text-blue-500 font-medium mb-4">{experience.company}</div>

      <ul className="space-y-2">
        {experience.description.map((item, idx) => (
          <li key={idx} className="text-gray-400 font-light flex gap-2">
            <span className="text-blue-500 mt-1.5 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceItem;
