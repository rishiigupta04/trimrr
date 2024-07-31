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
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center antialiased">
          <h2 className="my-8 sm:my-12 text-3xl sm:text-5xl lg:text-6xl text-white text-center font-extrabold leading-tight">
            The only URL Shortener <br className="hidden sm:inline" />{" "}
            you&rsquo;ll ever need! 👇
          </h2>
          <form
            onSubmit={handleShorten}
            className="w-full max-w-2xl mb-8 sm:mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter your loooong URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="h-12 sm:h-14 flex-grow"
              />
              <Button
                type="submit"
                className="h-12 sm:h-14 px-6 sm:px-8"
                variant="destructive"
              >
                Shorten!
              </Button>
            </div>
          </form>
          <div className="w-full max-w-4xl">
            <img
              src="/banner1.jpg"
              alt="banner for larger devices"
              className="hidden w-full my-6 sm:block sm:my-11 rounded-lg shadow-lg"
            />
            <img
              src="/banner2.jpg"
              alt="banner for small devices"
              className="w-full my-6 sm:hidden rounded-lg shadow-lg"
            />
          </div>
          <Accordion
            type="multiple"
            collapsible
            className="w-full max-w-4xl mt-8 sm:mt-12"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How does the Trimrr URL shortener work?
              </AccordionTrigger>
              <AccordionContent>
                When you enter a long URL, our system generates a shorter
                version of that URL. This shortened URL redirects to the
                original long URL when accessed.
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
                You can view the number of clicks, geolocation data of the
                clicks and device types (mobile/desktop) for each of your
                shortened URLs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
