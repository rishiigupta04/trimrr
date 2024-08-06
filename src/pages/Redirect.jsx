import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, data, error, fn } = useFetch(getLongUrl, id);

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
        window.location.href = data.original_url;
      }
    }
  }, [loading, data]);

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  } else {
    return (
      <h1 className="mt-12 text-xl sm:text-2xl text-center font-extralight text-gray-400">
        Error fetching URL or it may not exist. <br /> Please login and try
        again.
      </h1>
    );
  }

  return null;
};

export default RedirectLink;
