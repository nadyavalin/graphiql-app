import { RestClient } from "@widgets/RestClient";

export default function RestClientPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { value?: string; page?: string };
}) {
  if (searchParams) console.log(params, searchParams, "on page");

  return <RestClient />;
}
