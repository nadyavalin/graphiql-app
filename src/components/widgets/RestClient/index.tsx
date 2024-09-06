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
import encodeBase64 from "@shared/utils/encodeBase64";
import encodeQueryParams from "@shared/utils/encodeQueryParams";

export const RestClient = () => {
  // Shared
  const dispatch = useAppDispatch();

  const onPlay = () => {
    if (!endpoint.trim()) return;

    const headersObj = arrayToObj(headers);

    const encodedEndpoint = encodeBase64(endpoint);
    const encodedBody = encodeBase64(body);
    const encodedHeaders = encodeQueryParams(headersObj);

    const requestUrl = `${method}/${encodedEndpoint}${encodedBody ? "/" + encodedBody : ""}${encodedHeaders ? "?" + encodedHeaders : ""}`;

    fetch(`/api?request=${encodeURIComponent(requestUrl)}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  // Headers
  const headers = useAppSelector((state) => state.headers.headers);

  const handleHeadersChange = (items: Item[]) => {
    console.log(headers);
    dispatch(updateHeaders(items));
  };

  // Variables
  const variables = useAppSelector((state) => state.variables.variables);

  const handleVariablesChange = (items: Item[]) => {
    console.log(variables);
    dispatch(updateVariables(items));
  };

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

  const onEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endpont = e.target.value;
    dispatch(updateEndpoint(endpont));
  };

  // Method
  const method = useAppSelector((state) => state.method.method);

  const onMethodChange = (newMethod: Methods) => {
    dispatch(updateMethod(newMethod));
  };

  return (
    <main className={styles["rest-client-container"]}>
      <section>
        <h2> REST Client</h2>
        <Card className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 1 }}>
              <MethodsBlock method={method} onChange={onMethodChange} />
              <Field label={"Endpoint URL"} onChange={onEndpointChange} value={endpoint} />
              <IconButton
                title="Prettify query"
                onClick={() => dispatch(updateBody(formatDataEditor(body)))}
              >
                <PrettifyIcon className={styles["btn-prettify"]} />
              </IconButton>
              <IconButton title="Send request" onClick={onPlay}>
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
          </CardContent>
        </Card>
      </section>
      <ResponseBlock />
    </main>
  );
};
