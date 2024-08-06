serve(async (req) => {
  const url = new URL(req.url);
  const shortCode = url.pathname.slice(1); // Remove the leading slash

  if (!shortCode) {
    return new Response("Short code is required", { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("urls")
      .select("original_url")
      .eq("short_url", shortCode)
      .single();

    if (error) throw error;

    if (data && data.original_url) {
      return new Response(null, {
        status: 301,
        headers: { Location: data.original_url },
      });
    } else {
      return new Response("Short URL not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error during redirection:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});
