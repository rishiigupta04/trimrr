import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { UrlState } from "@/context";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/useFetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

export const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();

  const ref = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longlink ? longlink : "",
    customUrl: "",
  });

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Provide a valid URL")
      .required("Long URL is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };
  const {
    data,
    error,
    loading,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {
    ...formValues,
    user_id: user.id,
  });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (error) {
      const newErrors = {};

      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  return (
    <Dialog
      defaultOpen={longlink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:w-full">
        <DialogHeader>
          <DialogTitle className=" font-bold text-2xl">
            Create A New Link
          </DialogTitle>
        </DialogHeader>
        {formValues?.longUrl.length > 10 && (
          <div className="w-full flex items-center justify-center">
            <QRCode value={formValues.longUrl} size={200} ref={ref} />
          </div>
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues?.title}
          onChange={handleChange}
        />
        {errors?.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your Looong URL"
          value={formValues?.longUrl}
          onChange={handleChange}
        />
        {errors?.longUrl && <Error message={errors.longUrl} />}
        <div className="flex items-center gap-2">
          <Card className="p-3">trimrr.in</Card>/
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues?.customUrl}
            onChange={handleChange}
          />
        </div>
        {error && <Error message={error?.message} />}
        <DialogFooter className="sm:justify-end">
          <Button
            disabled={loading}
            onClick={createNewLink}
            variant="destructive"
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
