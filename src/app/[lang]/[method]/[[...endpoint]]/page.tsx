// import ProtectedRoute from "@shared/protected";
import { Methods } from "@shared/store/model";
import { RestClient } from "@widgets/RestClient";
import { notFound } from "next/navigation";

type SearchParams = {
  lang: string;
  method: Methods;
};

export default function RestClientPage({
  params,
  searchParams,
}: {
  params: SearchParams;
  searchParams: SearchParams;
}) {
  if (searchParams) console.log(params, searchParams, "on page");

  if (
    params.method === Methods.get ||
    params.method === Methods.post ||
    params.method === Methods.delete ||
    params.method === Methods.put ||
    params.method === "rest-client"
  ) {
    return <RestClient />;
  } else {
    notFound();
  }
}
