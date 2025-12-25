import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden grid-lines bg-black">
      <div className="relative z-10 text-center px-6">
        <div className="reveal inline-block mb-10 overflow-hidden">
          <span className="text-[11px] md:text-xs font-bold tracking-[0.6em] text-white/80 uppercase block animate-[slide-up_1s_cubic-bezier(0.2,1,0.3,1)]">
            Frontend Developer
          </span>
        </div>

        <h1 className="text-[10vw] md:text-[8vw] font-black font-display tracking-tightest text-white mb-10 leading-[0.8] reveal scale-110">
          SACHIN <br />
          <span className="opacity-10">THAKUR</span>
        </h1>

        <div
          className="max-w-xl mx-auto reveal"
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed mb-16 tracking-tight">
            Building enterprise-grade web applications with React and Next.js.
            Focused on scalable frontend architectures and seamless user
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <a
              href="#work"
              data-cursor="cta"
              className="group relative text-xs font-bold uppercase tracking-[0.4em] py-4 px-8 border border-white/20 hover:border-white transition-all duration-300"
            >
              <span className="relative z-10">View Projects</span>
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              className="group text-white/70 hover:text-white relative text-xs font-bold uppercase tracking-[0.4em] py-4 px-8  transition-all duration-300"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-white/20 reveal"
        style={{ transitionDelay: "0.8s" }}
      >
        <div className="w-[1px] h-20 bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 animate-[scroll-line_3s_infinite]"></div>
        </div>
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold">
          Scroll Down
        </span>
      </div> */}

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
