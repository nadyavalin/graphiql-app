"use client";
import styles from "./styles.module.css";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Editor } from "@features/Editor";
import { useState } from "react";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { ResponseBlock } from "@features/ResponseBlock";
import { MethodsBlock } from "@features/Methods";
import { Item } from "@shared/store/model";
import useAppSelector from "@shared/hooks/useAppSelector";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import { updateHeaders } from "@shared/store/slices/headersSlice";
import { updateVariables } from "@shared/store/slices/variablesSlice";
import { updateEndpoint } from "@shared/store/slices/endpointSlice";

export const RestClient = () => {
  const [body, setBody] = useState("");

  const dispatch = useAppDispatch();

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
  const handleBodyChange = (newValue: string) => {
    console.log(newValue);
    setBody(newValue);
  };

  // Endponts
  const endpoint = useAppSelector((state) => state.endpoint.endpoint);

  const onEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endpont = e.target.value;
    dispatch(updateEndpoint(endpont));
  };

  return (
    <main className={styles["rest-client-container"]}>
      <section>
        <h2> REST Client</h2>
        <Card className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 1 }}>
              <MethodsBlock />
              <Field label={"Endpoint URL"} onChange={onEndpointChange} value={endpoint} />
              <IconButton title="Prettify query" onClick={() => setBody(formatDataEditor(body))}>
                <PrettifyIcon className={styles["btn-prettify"]} />
              </IconButton>
              <IconButton title="Send request">
                <SendIcon className={styles["btn-send"]} />
              </IconButton>
            </Box>
            <h3>Body:</h3>
            <Editor value={body} onChange={handleBodyChange} />
            <HeadersVariablesBlock
              title="Add Header"
              itemType="Header"
              onChange={handleHeadersChange}
              value={headers}
            />
            <HeadersVariablesBlock
              title="Add Variable"
              itemType="Variable"
              onChange={handleVariablesChange}
              value={variables}
            />
          </CardContent>
        </Card>
      </section>
      <ResponseBlock />
    </main>
  );
};
