import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  const {
    data: urls,
    loading,
    error,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length > 0) {
      fnClicks();
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" mt-6 flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color={"#fafafa"} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-extrabold text-xl">{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-extrabold text-xl">{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Link..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Filter className="absolute top-1/2 right-2 -translate-y-1/2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {urls?.length === 0 && (
        <p className="text-lg text-center text-gray-400">No links created</p>
      )}
      {(filteredUrls || []).map((url, id) => {
        return <LinkCard key={id} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default DashBoard;
