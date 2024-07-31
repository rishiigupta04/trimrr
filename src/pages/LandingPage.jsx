import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="relative z-10 flex flex-col items-center antialiased px-4 sm:px-0">
        <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
          The only URL Shortener <br /> you&rsquo;ll ever need! 👇
        </h2>
        <form
          onSubmit={handleShorten}
          className="relative flex flex-col sm:flex-row w-full max-w-2xl gap-4"
        >
          <Input
            type="url"
            placeholder="Enter your loooong URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-12 sm:h-14 sm:flex-1 py-2 px-4"
          />
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="h-12 sm:h-14 w-1/2 sm:w-full"
              variant="destructive"
            >
              Shorten!
            </Button>
          </div>
        </form>
        <img
          src="/banner1.jpg"
          alt="banner for larger devices"
          className="hidden w-full max-w-4xl my-6 sm:block sm:my-11"
        />
        <img
          src="/banner2.jpg"
          alt="banner for small devices"
          className="w-full max-w-full my-6 sm:hidden"
        />
        <Accordion type="multiple" collapsible className="w-full max-w-4xl">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How does the Trimrr URL shortener work?
            </AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version
              of that URL. This shortened URL redirects to the original long URL
              when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URLs, view
              analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks
              and device types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
