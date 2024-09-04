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

export const RestClient = () => {
  const [body, setBody] = useState("");

  const handleBodyChange = (newValue: string) => {
    setBody(newValue);
  };

  return (
    <main className={styles["rest-client-container"]}>
      <section>
        <h2> REST Client</h2>
        <Card className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 1 }}>
              <MethodsBlock />
              <Field label={"Endpoint URL"} />
              <IconButton title="Prettify query" onClick={() => setBody(formatDataEditor(body))}>
                <PrettifyIcon className={styles["btn-prettify"]} />
              </IconButton>
              <IconButton title="Send request">
                <SendIcon className={styles["btn-send"]} />
              </IconButton>
            </Box>
            <h3>Body:</h3>
            <Editor value={body} onChange={handleBodyChange} />
            <HeadersVariablesBlock title="Add Header" itemType="Header" />
            <HeadersVariablesBlock title="Add Variable" itemType="Variable" />
          </CardContent>
        </Card>
      </section>
      <ResponseBlock />
    </main>
  );
};
