import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, DeleteIcon, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl, getUrls } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

const LinkCard = ({ url, fetchUrls }) => {
  const openImageInNewTab = () => {
    const imageUrl = url?.qr;
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    } else {
      console.error("Image URL is not available");
    }
  };

  const { loading } = useFetch(getUrls, url?.id);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  function handleDelete() {
    fetchUrls();
    toast.success("Link deleted successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: <Trash className="text-blue-500" />,
    });
  }
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-slate-900 rounded-lg">
      {loading ? (
        <BeatLoader size={30} color="#dadada" />
      ) : (
        <img
          className="h-32 object-contain ring ring-blue-700 self-center sm:self-start"
          src={url?.qr}
          alt="qr code"
        />
      )}

      <Link
        className="flex flex-col flex-1 cursor-default"
        to={`/link/${url?.id}`}
      >
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://trimrr.in/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer text-gray-400 line-clamp-2">
          {url?.original_url}
        </span>
        <span className="text-sm flex items-end font-extralight flex-1 mt-4 opacity-40">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={openImageInNewTab}>
          <Download className="text-blue-500" />
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
                  hideProgressBar: false,
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
          <Copy />
        </Button>

        <Button
          variant="ghost"
          onClick={() => fnDelete().then(() => handleDelete())}
        >
          {loadingDelete ? (
            <BeatLoader size={10} color="white" />
          ) : (
            <Trash className="text-red-500" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
