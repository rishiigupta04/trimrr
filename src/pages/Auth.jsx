import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { UrlState } from "@/context";
import { BeatLoader } from "react-spinners";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longlink ? `createNew=${longlink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  if (isAuthenticated || loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <BeatLoader size={30} color="#dadada" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-16 sm:mt-2 gap-10 ">
      {longlink ? (
        <h1 className="text-4xl font-extrabold">
          Hold up! Let's login first...
        </h1>
      ) : (
        <h1 className="text-4xl font-extrabold ">Login/ Signup</h1>
      )}
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className=" px-4 w-full  flex items-center justify-between">
          <TabsTrigger className="w-1/2 sm:w-full" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="w-1/2 sm:w-full" value="signup">
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
