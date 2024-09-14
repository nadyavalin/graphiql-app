"use client";

import commonStyles from "../commonStyles.module.css";
import { ResponseBlock } from "@features/ResponseBlock";
import useSessionCheck from "@shared/hooks/useSessionCheck";
import useAppSelector from "@shared/hooks/useAppSelector";

import {
  updateBody,
  updateEndpoint,
  updateHeaders,
  updateIsSdlExists,
  updateResponse,
  updateResponseStatus,
  updateSdlUrl,
} from "@shared/store/slices/graphiqlSlice";
import { serverGraphiqlResponse } from "@shared/actions/graphiqlAction";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import { Item, Methods, ResponseType } from "@shared/store/model";
import { useEffect, useState } from "react";
import arrayToObj from "@shared/utils/arrayToObj";
import { decodeBase64, encodeBase64 } from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { serverGraphiqlShemaResponse } from "@shared/actions/graphqlShemaAction";
import { DocsComponent } from "@widgets/DocsComponent";
import { addRequestGraphQL } from "@shared/store/slices/historySlice";
import { GHRequestSection } from "@widgets/GraphQLRequestSection";

export const GraphQL = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const endpoint = useAppSelector((state) => state.graphiql.endpoint);
  const body = useAppSelector((state) => state.graphiql.body);
  const headers = useAppSelector((state) => state.graphiql.headers);
  const variables = useAppSelector((state) => state.graphiql.variables);
  const response = useAppSelector((state) => state.graphiql.response);
  const responseStatus = useAppSelector((state) => state.graphiql.responseStatus);
  const sdlUrl = useAppSelector((state) => state.graphiql.sdlUrl);
  const currentLanguage = useAppSelector((state) => state.language.lang);

  useSessionCheck();
  const [encodeURL, setEncodeURL] = useState("");

  useEffect(() => {
    const paths = pathname.split("/").filter((value) => value !== "");

    const params = new URLSearchParams(searchParams.toString());

    if (paths.length > 2) {
      dispatch(updateEndpoint(decodeBase64(paths[2])));
      if (sdlUrl === "") {
        dispatch(updateSdlUrl(decodeBase64(paths[2]) + "?sdl"));
      }
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

  const onUrlChange = () => {
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

  useEffect(() => {
    if (endpoint || body || headers) onUrlChange();
  }, [endpoint, body, headers]);

  const update = serverGraphiqlResponse.bind(null, { endpoint, body, headers, variables });

  const onPlay = async () => {
    const { status, data }: ResponseType = await update();
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

  const getIsShema = serverGraphiqlShemaResponse.bind(null, sdlUrl);

  const onShemaResponse = async () => {
    dispatch(updateIsSdlExists(await getIsShema()));
  };

  useEffect(() => {
    onShemaResponse();
  }, [sdlUrl]);

  return (
    <main className={commonStyles.container}>
      <DocsComponent />
      <GHRequestSection onSend={onPlay} />
      <ResponseBlock data={response} status={responseStatus} />
    </main>
  );
};
