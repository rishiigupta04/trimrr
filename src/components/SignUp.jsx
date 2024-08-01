import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Error from "./Error";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [searchParams] = useSearchParams();
  const { data, error, loading, fn: fnSignUp } = useFetch(signup, formData);
  const { fetchUser } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [loading, error]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignUp = async () => {
    setErrors([]);
    //Validating form using Yup and setting errors if any
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Name is required")
          .max(30, "Name must be less than 30 characters")
          .min(3, "Name must be at least 3 characters long"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      //api call
      await fnSignUp();
      // If successful, clear form and redirect to dashboard
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-4 flex items-center justify-center px-4 ">
      <Card className="bg-slate-900 w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Signup
          </CardTitle>
          <CardDescription className="text-center">
            Create a new account if you haven't already
          </CardDescription>
          <div className="flex items-center justify-center pt-2">
            {error && <Error message={error.message} />}
          </div>
          <div className=""></div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-200">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Enter your name"
              className="w-full"
              onChange={handleInputChange}
              name="name"
            />
          </div>
          {errors.name && <Error message={errors.name} />}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-200"
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-200"
            >
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
          <div className="space-y-2">
            <Label
              htmlFor="profile_pic"
              className="text-sm font-medium text-gray-200"
            >
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/*"
              className="w-full cursor-pointer"
              onChange={handleInputChange}
              name="profile_pic"
            />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUp} className="w-full" variant="default">
            {loading ? (
              <BeatLoader size={10} color="#0F172A" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
