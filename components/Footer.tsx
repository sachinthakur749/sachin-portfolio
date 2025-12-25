import React from "react";

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase">
          © {new Date().getFullYear()} SACHIN KUMAR THAKUR / BHAKTAPUR.
        </div>
        <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          <a
            target="_blank"
            href="https://github.com/sachinthakur749"
            className="hover:text-white transition-colors"
          >
            Github
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/sachin-thakur-061a1b223/" className="hover:text-white transition-colors">
            LinkedIn
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
