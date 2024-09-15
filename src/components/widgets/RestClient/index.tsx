"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import commonStyles from "../commonStyles.module.css";
import { ResponseBlock } from "@features/ResponseBlock";
import { RestFullRequestSection } from "@widgets/RestClientRequestSection";
import {
  updateBody,
  updateEndpoint,
  updateHeaders,
  updateMethod,
  updateResponse,
  updateResponseStatus,
} from "@shared/store/slices/restClientSlice";
import { Item, Methods, ResponseType } from "@shared/store/model";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import useSessionCheck from "@shared/hooks/useSessionCheck";
import { IServerResponse, serverResponse } from "@shared/actions/restfulAction";
import { decodeBase64, encodeBase64 } from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";
import arrayToObj from "@shared/utils/arrayToObj";
import { addRequestRestClient } from "@shared/store/slices/historySlice";
import useAppSelector from "@shared/hooks/useAppSelector";
import { useFirebaseAuth } from "@shared/hooks/useFirebaseAuth";
import { Loader } from "@features/Loader";

export const RestClient = () => {
  const response = useAppSelector((state) => state.restClient.response);
  const responseStatus = useAppSelector((state) => state.restClient.responseStatus);
  const currentLanguage = useAppSelector((state) => state.language.lang);

  useSessionCheck();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [encodeURL, setEncodeURL] = useState("");

  useEffect(() => {
    const paths = pathname.split("/").filter((value) => value !== "");
    const params = new URLSearchParams(searchParams.toString());
    dispatch(updateMethod(paths[1] as Methods));

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

  const onUrlChange = (headers: Item[], endpoint: string, body: string, method: Methods) => {
    const headersObj = arrayToObj(headers);
    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(body);
    const encodedHeaders = encodeQueryParams(headersObj);

    let requestUrl = "";

    if (encodedEndpoint === "") {
      requestUrl = method;
    } else {
      requestUrl = `${method}/${encodedEndpoint}${encodedBody !== "" ? "/" + encodedBody : ""}${encodedHeaders !== "" ? "?" + encodedHeaders : ""}`;
    }

    router.push("/" + currentLanguage + "/" + requestUrl);
    setEncodeURL(requestUrl);
  };

  const onPlay = async ({ endpoint, method, body, headers, variables }: IServerResponse) => {
    const { status, data }: ResponseType = await serverResponse({
      endpoint,
      method,
      body,
      headers,
      variables,
    });
    dispatch(dispatch(updateResponse(JSON.stringify(data))));
    dispatch(dispatch(updateResponseStatus(status)));
    dispatch(
      addRequestRestClient({
        date: new Date().toISOString(),
        url: `${method} ${endpoint}`,
        encodeUrl: encodeURL,
      }),
    );
  };

  const { loading } = useFirebaseAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={commonStyles.container}>
      <RestFullRequestSection onPlay={onPlay} onUrlChange={onUrlChange} />
      <ResponseBlock data={response} status={responseStatus} />
    </main>
  );
};
