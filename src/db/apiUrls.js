import { toast } from "react-toastify";
import supabase from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("Error fetching URLs");
  }
  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Error deleting URLs");
  }
  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrCode
) {
  const shortUrl = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${shortUrl}`;
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrCode);

  if (storageError) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Error creating URL");
  }

  const qr = `https://wingshucgaospprtixjt.supabase.co/storage/v1/object/public/qrs/${fileName}`;

  //making the api call to create the url
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        short_url: shortUrl,
        custom_url: customUrl ? customUrl : null,
        user_id,
        qr,
      },
    ])
    .select();

  if (error) {
    console.log(error.message);
    toast.error(error.message);
    throw new Error("Error creating short URL");
  }
  return data;
}
