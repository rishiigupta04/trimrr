import Header from "@/components/Header";
import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";

const AppLayout = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="bg-slate-800 min-h-screen overflow-hidden antialiased">
      <div className="relative min-h-screen w-full ">
        <BackgroundBeams className="absolute inset-0 w-full h-full scale-150 sm:scale-100  pointer-events-none overflow-hidden" />
        <div className="relative z-10 flex flex-col items-center antialiased px-4 sm:px-0 min-h-screen">
          <main className="min-h-screen container">
            <Header />
            <Outlet />
          </main>
        </div>
      </div>

      <footer className="bg-slate-800 relative inset-x-0 bottom-0">
        <div className="bg-slate-900 text-center py-3  mt-10 font-thin tracking-widest flex items-center justify-center gap-6 text-sm sm:text-lg ">
          Made with ❤️ by Rishi
          <a href="https://github.com/rishiigupta04/trimrr" target="_blank">
            <Button variant="outline" className="backdrop-invert-0">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Button>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
