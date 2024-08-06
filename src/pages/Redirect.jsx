import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirect = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, data, fn } = useFetch(getLongUrl, id);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
      if (data.original_url) {
        // Check if the URL starts with http:// or https://
        const urlToRedirect =
          data.original_url.startsWith("http://") ||
          data.original_url.startsWith("https://")
            ? data.original_url
            : `https://${data.original_url}`;

        // Redirect to the original URL
        window.location.href = urlToRedirect;
      } else {
        // If no original URL found, redirect to the home page or show an error
        navigate("/");
      }
    }
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          height: "100vh",
        }}
      >
        <p style={{ marginTop: "20px" }}>Redirecting...</p>
        <br />
        <BarLoader width={"100%"} height={10} color="#36d7b7" />
      </div>
    );
  }

  return null;
};

export default Redirect;
