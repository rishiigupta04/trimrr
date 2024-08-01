import React from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

const Auth = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="flex flex-col items-center justify-center mt-16 sm:mt-2 gap-10 ">
      {searchParams.get("createNew") ? (
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
