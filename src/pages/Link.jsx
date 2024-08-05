import ShowQR from "@/components/ShowQR";
import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }
  const openImageInNewTab = () => {
    const imageUrl = url?.qr;
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    } else {
      console.error("Image URL is not available");
    }
  };

  function handleDelete() {
    navigate("/dashboard");
    fetchUrls();
    toast.success("Link deleted successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: <Trash className="text-red-500" />,
    });
  }

  return (
    <>
      {(loading || loadingStats || loadingDelete) && (
        <BarLoader className="w-full mb-4" width={"100%"} color={"#dadada"} />
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-6 justify-between">
        <div className="flex flex-col sm:w-2/5 items-start gap-6 rounded-lg ">
          <span className="text-4xl sm:text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://trimrr.in/${link}`}
            target="_blank"
            className="flex items-center text-2xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {/* <StarIcon className="h-4 w-4 sm:h-6 sm:w-6 mr-2 text-white" /> */}
            {`https://trimrr.in/${link}`}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer text-gray-400 text-sm sm:text-lg"
          >
            {/* <LinkIcon className="h-10 w-10 mr-2 text-white" /> */}
            {url?.original_url}
          </a>
          <div>
            <ShowQR url={url} loading={loading} />
          </div>

          <div className="flex">
            <Button
              variant="ghost"
              className="hover: text-slate-400"
              onClick={openImageInNewTab}
            >
              <Download className="text-blue-500 hover:text-blue-300" />
            </Button>

            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard
                  .writeText(`https://trimrr.in/${url?.short_url}`)
                  .then(() => {
                    toast.success("Copied to clipboard", {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      icon: <Copy className="text-blue-500" />,
                    });
                  })
              }
            >
              <Copy className="text-white hover:text-gray-400" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => fnDelete().then(() => handleDelete())}
            >
              {loadingDelete ? (
                <BeatLoader size={10} color="white" />
              ) : (
                <Trash className="text-red-500 hover:text-red-400" />
              )}
            </Button>
          </div>
          <span className="flex items-end text-gray-400 text-sm font-extralight">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-extrabold">
              Stats
            </CardTitle>
          </CardHeader>

          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-extrabold text-2xl ">{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle className="text-xl sm:text-2xl font-extrabold">
                Location Data
              </CardTitle>
              {/* <Location stats={stats} /> */}
              <CardTitle className="text-xl sm:text-2xl font-extrabold">
                Device Info
              </CardTitle>
              {/* <DeviceStats stats={stats} /> */}
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false ? (
                "No stats available yet"
              ) : (
                <>
                  Loading statistics
                  <BarLoader width={"100%"} color={"#dadada"} />
                </>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
