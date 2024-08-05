import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { QrCode, ScanQrCode } from "lucide-react";

import { BarLoader, BeatLoader } from "react-spinners";

const ShowQR = ({ url, loading }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-slate-800 text-slate-200 hover:bg-slate-700 gap-2 ring-1 ring-slate-600">
            <QrCode size={20} />
            Show QR
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[80%] sm:w-full">
          <DialogHeader>
            <DialogTitle className=" px-4 sm:px-6 flex items-center justify-between gap-2 font-bold text-2xl sm:text-3xl">
              <span className="text-slate-200 line-clamp-1">
                Scan the QR code
              </span>
              <ScanQrCode size={30} />
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex items-center justify-center">
            {loading ? (
              <BeatLoader width={"100%"} color={"#dadada"} className="mt-8" />
            ) : (
              <img
                className="mt-4 h-50 object-contain  self-center sm:self-start"
                src={url?.qr}
                alt="qr code"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowQR;
