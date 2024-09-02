"use client";
import styles from "./styles.module.css";
import { Box, Card, CardContent, IconButton } from "@mui/material";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Editor } from "@features/Editor";
import { useState } from "react";
import { Methods } from "@features/Methods";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { ResponseBlock } from "@features/ResponseBlock";

export const RestClient = () => {
  const [body, setBody] = useState("");

  const handleBodyChange = (newValue: string) => {
    setBody(newValue);
  };

  return (
    <main className={styles["rest-client-container"]}>
      <section>
        <h2> REST Client</h2>
        <Card className={styles.card}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Methods />
              <Field label={"Endpoint URL"} />
              <IconButton title="Prettify query" onClick={() => setBody(formatDataEditor(body))}>
                <PrettifyIcon />
              </IconButton>
              <IconButton className={styles["send-btn"]} title="Send request">
                <SendIcon />
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
