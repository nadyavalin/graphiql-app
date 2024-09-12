"use client";

import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton } from "@mui/material";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./styles.module.css";
import commonStyles from "../commonStyles.module.css";

import { Editor } from "@features/Editor";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { ResponseBlock } from "@features/ResponseBlock";
import { MethodsBlock } from "@features/Methods";

import {
  updateBody,
  updateEndpoint,
  updateHeaders,
  updateMethod,
  updateResponse,
  updateResponseStatus,
  updateVariables,
} from "@shared/store/slices/restClientSlice";
import { Item, Methods, ResponseType } from "@shared/store/model";

import useAppSelector from "@shared/hooks/useAppSelector";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import useSessionCheck from "@shared/hooks/useSessionCheck";

import { useDictionary } from "@shared/providers/DictionaryProvider";
import { serverResponse } from "@shared/actions/restfulAction";

import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { decodeBase64, encodeBase64 } from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";
import arrayToObj from "@shared/utils/arrayToObj";

export const RestClient = () => {
  // Headers
  const headers = useAppSelector((state) => state.restClient.headers);

  const handleHeadersChange = (items: Item[]) => dispatch(updateHeaders(items));

  // Variables
  const variables = useAppSelector((state) => state.restClient.variables);

  const handleVariablesChange = (items: Item[]) => dispatch(updateVariables(items));

  // Body
  const body = useAppSelector((state) => state.restClient.body);

  const handleBodyChange = (newValue: string) => dispatch(updateBody(newValue));

  // Endponts
  const endpoint = useAppSelector((state) => state.restClient.endpoint);

  const onEndpointChange = (newEndpoint: string) => dispatch(updateEndpoint(newEndpoint));

  // Method
  const method = useAppSelector((state) => state.restClient.method);

  const onMethodChange = (newMethod: Methods) => dispatch(updateMethod(newMethod));

  // Response
  const response = useAppSelector((state) => state.restClient.response);

  const responseStatus = useAppSelector((state) => state.restClient.responseStatus);

  // Init
  const currentLanguage = useAppSelector((state) => state.language.lang);

  const dictionary = useDictionary();

  useSessionCheck();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  useEffect(() => {
    const paths = pathname.split("/").filter((value) => value !== "");

    const params = new URLSearchParams(searchParams.toString());

    onMethodChange(paths[1] as Methods);

    if (paths.length > 2) {
      onEndpointChange(decodeBase64(paths[2]));
    }

    if (paths.length > 3) {
      if ((paths[1] as Methods) !== Methods.get) handleBodyChange(decodeBase64(paths[3]));
      else handleBodyChange("");
    }

    if (params.size > 0) {
      const newItems: Item[] = Array.from(params.entries()).map(([key, value]) => ({
        key: key,
        value: value,
      }));

      handleHeadersChange(newItems);
    }
  }, []);

  // Shared
  const onUrlChange = () => {
    const headersObj = arrayToObj(headers);

    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(body);
    const encodedHeaders = encodeQueryParams(headersObj);

    const requestUrl = `${method}/${encodedEndpoint}${encodedBody ? "/" + encodedBody : ""}${encodedHeaders ? "?" + encodedHeaders : ""}`;

    router.push("/" + currentLanguage + "/" + requestUrl);
  };

  const update = serverResponse.bind(null, { endpoint, method, body, headers, variables });

  const onPlay = async () => {
    const { status, data }: ResponseType = await update();
    dispatch(updateResponse(JSON.stringify(data)));
    dispatch(updateResponseStatus(status));
  };

  useEffect(() => {
    if (endpoint || method || body || headers) onUrlChange();
  }, [endpoint, method, body, headers]);

  return (
    <main className={styles.restClientContainer}>
      <section>
        <h2> REST Client</h2>
        <Box className={commonStyles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <form action={onPlay}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <MethodsBlock method={method} onChange={onMethodChange} />
              <Field
                label={dictionary.labels.endpoint}
                onChange={onEndpointChange}
                value={endpoint}
              />
              <IconButton
                title={dictionary.titles.query}
                onClick={() => dispatch(updateBody(formatDataEditor(body)))}
              >
                <PrettifyIcon className={commonStyles.btnPrettify} />
              </IconButton>
              <IconButton title={dictionary.titles.sendRequest} onClick={onPlay}>
                <SendIcon className={commonStyles.btnSend} />
              </IconButton>
            </Box>
            {method !== Methods.get ? (
              <>
                <h3>{dictionary.titles.body}:</h3>
                <Editor value={body} onChange={handleBodyChange} />
                <HeadersVariablesBlock
                  title={dictionary.titles.addVariable}
                  itemType={dictionary.titles.variable}
                  onChange={handleVariablesChange}
                  value={variables}
                />
              </>
            ) : null}
            <HeadersVariablesBlock
              title={dictionary.titles.addHeader}
              itemType={dictionary.titles.header}
              onChange={handleHeadersChange}
              value={headers}
            />
          </form>
        </Box>
      </section>
      <ResponseBlock data={response} status={responseStatus} />
    </main>
  );
};
