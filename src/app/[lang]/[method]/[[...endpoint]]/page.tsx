import { notFound, redirect } from "next/navigation";
import ProtectedRoute from "@shared/protected";
import { Methods } from "@shared/store/model";
import { RestClient } from "@widgets/RestClient";

type SearchParams = {
  lang: string;
  method: Methods | "rest-client";
};

export default function RestClientPage({
  params,
}: {
  params: SearchParams;
  searchParams: SearchParams;
}) {
  if (params.method === "rest-client") {
    redirect("/" + params.lang + "/" + Methods.get);
  }

  if (
    params.method === Methods.get ||
    params.method === Methods.post ||
    params.method === Methods.delete ||
    params.method === Methods.put
  ) {
    return (
      <ProtectedRoute>
        <RestClient />
      </ProtectedRoute>
    );
  } else {
    notFound();
  }
}
