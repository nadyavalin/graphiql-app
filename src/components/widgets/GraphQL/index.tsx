"use client";

import commonStyles from "../commonStyles.module.css";
import { ResponseBlock } from "@features/ResponseBlock";
import useSessionCheck from "@shared/hooks/useSessionCheck";
import useAppSelector from "@shared/hooks/useAppSelector";

import {
  updateBody,
  updateEndpoint,
  updateHeaders,
  updateResponse,
  updateResponseStatus,
} from "@shared/store/slices/graphiqlSlice";
import { IServerGraphiqlResponse, serverGraphiqlResponse } from "@shared/actions/graphiqlAction";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import { Item, Methods, ResponseType } from "@shared/store/model";
import { useEffect, useState } from "react";
import arrayToObj from "@shared/utils/arrayToObj";
import { decodeBase64, encodeBase64 } from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DocsComponent } from "@widgets/DocsComponent";
import { addRequestGraphQL } from "@shared/store/slices/historySlice";
import { GHRequestSection } from "@widgets/GraphQLRequestSection";

export const GraphQL = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const response = useAppSelector((state) => state.graphiql.response);
  const responseStatus = useAppSelector((state) => state.graphiql.responseStatus);
  const currentLanguage = useAppSelector((state) => state.language.lang);

  useSessionCheck();
  const [encodeURL, setEncodeURL] = useState("");

  useEffect(() => {
    const paths = pathname.split("/").filter((value) => value !== "");

    const params = new URLSearchParams(searchParams.toString());

    if (paths.length > 2) {
      dispatch(updateEndpoint(decodeBase64(paths[2])));
    }

    if (paths.length > 3) {
      if ((paths[1] as Methods) !== Methods.get) dispatch(updateBody(decodeBase64(paths[3])));
      else dispatch(updateBody(""));
    }

    if (params.size > 0) {
      const newItems: Item[] = Array.from(params.entries()).map(([key, value]) => ({
        key: key,
        value: value,
      }));

      dispatch(updateHeaders(newItems));
    }
  }, []);

  const onUrlChange = (headers: Item[], endpoint: string, body: string) => {
    const headersObj = arrayToObj(headers);

    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(body);
    const encodedHeaders = encodeQueryParams(headersObj);

    let requestUrl = "";

    if (encodedEndpoint !== "") {
      requestUrl = `${encodedEndpoint}${encodedBody ? "/" + encodedBody : ""}${encodedHeaders ? "?" + encodedHeaders : ""}`;
    }

    router.push("/" + currentLanguage + "/" + "GRAPHQL" + "/" + requestUrl);
    setEncodeURL(requestUrl);
  };

  const onPlay = async ({ endpoint, body, headers, variables }: IServerGraphiqlResponse) => {
    const { status, data }: ResponseType = await serverGraphiqlResponse({
      endpoint,
      body,
      headers,
      variables,
    });
    dispatch(updateResponse(JSON.stringify(data)));
    dispatch(updateResponseStatus(status));
    dispatch(
      addRequestGraphQL({
        date: new Date().toISOString(),
        url: endpoint,
        encodeUrl: `GRAPHQL/${encodeURL}`,
      }),
    );
  };

  return (
    <main className={commonStyles.container}>
      <DocsComponent />
      <GHRequestSection onPlay={onPlay} onUrlChange={onUrlChange} />
      <ResponseBlock data={response} status={responseStatus} />
    </main>
  );
};
