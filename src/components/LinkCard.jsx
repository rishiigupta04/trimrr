import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, DeleteIcon, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { deleteUrl } from "@/db/apiUrls";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-slate-900 rounded-lg">
      <img
        className="h-32 object-contain ring ring-blue-500 self-start"
        src={url?.qr}
        alt="qr code"
      />
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
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="text-sm flex items-end font-extralight flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={downloadImage}>
          <Download className="text-blue-500" />
        </Button>

        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(`https://trimrr.in/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>

        <Button
          variant="ghost"
          onClick={() => fnDelete().then(() => fetchUrls())}
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
