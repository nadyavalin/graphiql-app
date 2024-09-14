"use client";

import commonStyles from "../commonStyles.module.css";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton } from "@mui/material";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { ResponseBlock } from "@features/ResponseBlock";
import { Editor } from "@features/Editor";
import { Field } from "@features/Field";
import { useDictionary } from "@shared/providers/DictionaryProvider";
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
  updateVariables,
} from "@shared/store/slices/graphiqlSlice";
import { serverGraphiqlResponse } from "@shared/actions/graphiqlAction";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import { Item, Methods, ResponseType } from "@shared/store/model";
import { useEffect } from "react";
import arrayToObj from "@shared/utils/arrayToObj";
import { decodeBase64, encodeBase64 } from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { serverGraphiqlShemaResponse } from "@shared/actions/graphqlShemaAction";
import { DocsComponent } from "@widgets/DocsComponent";

export const GraphQL = () => {
  const headers = useAppSelector((state) => state.graphiql.headers);
  const handleHeadersChange = (items: Item[]) => dispatch(updateHeaders(items));

  const variables = useAppSelector((state) => state.graphiql.variables);
  const handleVariablesChange = (items: Item[]) => dispatch(updateVariables(items));

  const body = useAppSelector((state) => state.graphiql.body);
  const handleBodyChange = (newValue: string) => dispatch(updateBody(newValue));

  const endpoint = useAppSelector((state) => state.graphiql.endpoint);
  const onEndpointChange = (newEndpoint: string) => dispatch(updateEndpoint(newEndpoint));

  const response = useAppSelector((state) => state.graphiql.response);
  const responseStatus = useAppSelector((state) => state.graphiql.responseStatus);

  const onSdlExistsChange = (existing: boolean) => dispatch(updateIsSdlExists(existing));

  const sdlUrl = useAppSelector((state) => state.graphiql.sdlUrl);
  const onSdlUrlChange = (newEndpoint: string) => dispatch(updateSdlUrl(newEndpoint));

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

    if (paths.length > 2) {
      onEndpointChange(decodeBase64(paths[2]));
      if (sdlUrl === "") {
        onSdlUrlChange(decodeBase64(paths[2]) + "?sdl");
      }
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
  };

  useEffect(() => {
    if (endpoint || body || headers) onUrlChange();
  }, [endpoint, body, headers]);

  const update = serverGraphiqlResponse.bind(null, { endpoint, body, headers, variables });

  const onPlay = async () => {
    const { status, data }: ResponseType = await update();
    dispatch(updateResponse(JSON.stringify(data)));
    dispatch(updateResponseStatus(status));
  };

  const getIsShema = serverGraphiqlShemaResponse.bind(null, sdlUrl);

  const onShemaResponse = async () => {
    onSdlExistsChange(false);
    onSdlExistsChange(await getIsShema());
  };

  useEffect(() => {
    onShemaResponse();
  }, [sdlUrl]);

  return (
    <main className={commonStyles.container}>
      <DocsComponent />
      <section>
        <h2>Graph QL</h2>
        <div className={commonStyles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
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
          <Field label={"SDL URL"} onChange={onSdlUrlChange} value={sdlUrl} />
          <h3>Query:</h3>
          <Editor value={body} onChange={handleBodyChange} />
          <HeadersVariablesBlock
            title={dictionary.titles.addHeader}
            itemType={dictionary.titles.header}
            onChange={handleHeadersChange}
            value={headers}
          />
          <HeadersVariablesBlock
            title={dictionary.titles.addVariable}
            itemType={dictionary.titles.variable}
            onChange={handleVariablesChange}
            value={variables}
          />
        </div>
      </section>
      <ResponseBlock data={response} status={responseStatus} />
    </main>
  );
};
