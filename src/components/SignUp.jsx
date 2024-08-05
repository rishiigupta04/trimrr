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
import { toast } from "react-toastify";

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

  async function handleSignUp() {
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
      toast.success("Account created successfully", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  }

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
            <label
              htmlFor="profile_pic"
              className="flex justify-center items-center px-4 py-2 bg-slate-800 text-white rounded-lg cursor-pointer hover:bg-slate-700 transition-colors tracking-tight"
            >
              Add Profile Picture
            </label>
            <span className=" text-sm text-gray-400 font-extralight">
              {formData.profile_pic?.name}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              name="profile_pic"
              id="profile_pic"
              className="hidden"
            />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleSignUp()}
            className="w-full"
            variant="default"
          >
            {loading ? (
              <BeatLoader size={10} color="#dadada" />
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
