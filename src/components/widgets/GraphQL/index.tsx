"use client";
import styles from "./styles.module.css";
import { Box, IconButton } from "@mui/material";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Editor } from "@features/Editor";
import { useState } from "react";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { ResponseBlock } from "@features/ResponseBlock";

export const GraphQL = () => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (newValue: string) => {
    setQuery(newValue);
  };

  return (
    <main className={styles["graphQL-container"]}>
      <section>
        <h2> Graph QL</h2>
        <div className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Field label={"Endpoint URL"} />
            <IconButton title="Prettify query" onClick={() => setQuery(formatDataEditor(query))}>
              <PrettifyIcon className={styles["btn-prettify"]} />
            </IconButton>
            <IconButton title="Send request">
              <SendIcon className={styles["btn-send"]} />
            </IconButton>
          </Box>
          <Field label={"SDL URL"} />
          <h3>Query:</h3>
          <Editor value={query} onChange={handleQueryChange} />
          <HeadersVariablesBlock title="Add Header" itemType="Header" />
          <HeadersVariablesBlock title="Add Variable" itemType="Variable" />
        </div>
      </section>
      <ResponseBlock />
    </main>
  );
};
