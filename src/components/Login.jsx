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
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [searchParams] = useSearchParams();
  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleLogin() {
    setErrors([]);
    //Validating form using Yup and setting errors if any
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long"),
      });
      await schema.validate(formData, { abortEarly: false });
      //api call
      await fnLogin();
      // If successful, clear form and redirect to dashboard
      setFormData({ email: "", password: "" });
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
            Login
          </CardTitle>
          <CardDescription className="text-center">
            If you already have an account, you can login here.
          </CardDescription>
          {error && <Error message={error.message} />}
          <div className=""></div>
        </CardHeader>

        <CardContent className="space-y-4">
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
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              handleLogin().then(() =>
                toast.success("Login Successful", {
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                })
              )
            }
          >
            {loading ? <BeatLoader size={10} color="#dadada" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
