import { UrlState } from "@/context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color={"#0F172A"} />;
  if (isAuthenticated) return children;
};
export default RequireAuth;
