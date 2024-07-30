import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      <footer>
        <div className="text-center p-6 bg-gray-900  mt-10 font-thin tracking-widest flex items-center justify-center gap-6">
          Made with ❤️ by Rishi
          <a href="https://github.com/rishiigupta04" target="_blank">
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
