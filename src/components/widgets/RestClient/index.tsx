"use client";
import styles from "./styles.module.css";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Editor } from "@features/Editor";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { ResponseBlock } from "@features/ResponseBlock";
import { MethodsBlock } from "@features/Methods";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { Item, Methods } from "@shared/store/model";
import useAppSelector from "@shared/hooks/useAppSelector";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import { updateHeaders } from "@shared/store/slices/headersSlice";
import { updateVariables } from "@shared/store/slices/variablesSlice";
import { updateEndpoint } from "@shared/store/slices/endpointSlice";
import { updateBody } from "@shared/store/slices/bodySlice";
import { updateMethod } from "@shared/store/slices/methodSlice";
import isValidJson from "@shared/utils/checkIsValidJson";
import fixInvalidJson from "@shared/utils/formatToValidJson";
import arrayToObj from "@shared/utils/arrayToObj";
import { encodeBase64, decodeBase64 } from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateUser } from "@src/components/shared/actions/restfulAction";
import { useEffect } from "react";

export const RestClient = () => {
  // Headers
  const headers = useAppSelector((state) => state.headers.headers);

  const handleHeadersChange = (items: Item[]) => dispatch(updateHeaders(items));

  // Variables
  const variables = useAppSelector((state) => state.variables.variables);

  const handleVariablesChange = (items: Item[]) => dispatch(updateVariables(items));

  // Body
  const body = useAppSelector((state) => state.body.body);

  const handleBodyChange = (newValue: string) => {
    if (isValidJson(newValue)) {
      dispatch(updateBody(newValue));
    } else {
      const body = fixInvalidJson(newValue);
      dispatch(updateBody(body));
    }
  };

  // Endponts
  const endpoint = useAppSelector((state) => state.endpoint.endpoint);

  const onEndpointChange = (newEndpoint: string) => dispatch(updateEndpoint(newEndpoint));

  // Method
  const method = useAppSelector((state) => state.method.method);

  const onMethodChange = (newMethod: Methods) => {
    dispatch(updateMethod(newMethod));
  };

  // Shared
  const dispatch = useAppDispatch();

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const onUrlChange = () => {
    const headersObj = arrayToObj(headers);

    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(body);
    const encodedHeaders = encodeQueryParams(headersObj);

    const requestUrl = `${method}/${encodedEndpoint}${encodedBody ? "/" + encodedBody : ""}${encodedHeaders ? "?" + encodedHeaders : ""}`;
    const paths = pathname.split("/").filter((value) => value !== "");
    console.log("/" + paths[0] + "/" + requestUrl);
    router.replace("/" + requestUrl);
  };

  const update = updateUser.bind(null);

  useEffect(() => {
    if (endpoint || method || body || headers) onUrlChange();
  }, [endpoint, method, body, headers]);

  useEffect(() => {
    const paths = pathname.split("/").filter((value) => value !== "");

    const params = new URLSearchParams(searchParams.toString());

    console.log(paths);
    onMethodChange(paths[1] as Methods);

    if (paths.length > 2) {
      onEndpointChange(decodeBase64(paths[2]));
    }

    if (paths.length > 3) {
      handleBodyChange(decodeBase64(paths[3]));
    }

    console.log(params);
    if (params.size > 0) {
      const newItems: Item[] = Array.from(params.entries()).map(([key, value]) => ({
        key: key,
        value: value,
      }));

      handleHeadersChange(newItems);
    }
  }, []);

  return (
    <main className={styles["rest-client-container"]}>
      <section>
        <h2> REST Client</h2>
        <Card className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <CardContent>
            <form action={update}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <MethodsBlock method={method} onChange={onMethodChange} />
                <Field label={"Endpoint URL"} onChange={onEndpointChange} value={endpoint} />
                <IconButton
                  title="Prettify query"
                  onClick={() => dispatch(updateBody(formatDataEditor(body)))}
                >
                  <PrettifyIcon className={styles["btn-prettify"]} />
                </IconButton>
                <IconButton title="Send request" onClick={onUrlChange}>
                  <SendIcon className={styles["btn-send"]} />
                </IconButton>
              </Box>
              {method !== Methods.get ? (
                <>
                  <h3>Body:</h3>
                  <Editor value={body} onChange={handleBodyChange} />
                  <HeadersVariablesBlock
                    title="Add Variable"
                    itemType="Variable"
                    onChange={handleVariablesChange}
                    value={variables}
                  />
                </>
              ) : null}
              <HeadersVariablesBlock
                title="Add Header"
                itemType="Header"
                onChange={handleHeadersChange}
                value={headers}
              />
              <button>here</button>
            </form>
          </CardContent>
        </Card>
      </section>
      <ResponseBlock />
    </main>
  );
};
