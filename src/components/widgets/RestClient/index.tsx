"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../commonStyles.module.css";
import { Box, IconButton } from "@mui/material";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Editor } from "@features/Editor";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { ResponseBlock } from "@features/ResponseBlock";
import { MethodsBlock } from "@features/Methods";
import { useDictionary } from "@src/components/shared/providers/DictionaryProvider";

export const RestClient = () => {
  const dictionary = useDictionary();
  const [body, setBody] = useState("");

  const handleBodyChange = (newValue: string) => {
    setBody(newValue);
  };

  return (
    <main className={styles.restClientContainer}>
      <section>
        <h2>REST Client</h2>
        <Box className={commonStyles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <MethodsBlock />
            <Field label={dictionary.labels.endpoint} />
            <IconButton
              title={dictionary.titles.query}
              onClick={() => setBody(formatDataEditor(body))}
            >
              <PrettifyIcon className={commonStyles.btnPrettify} />
            </IconButton>
            <IconButton title={dictionary.titles.sendRequest}>
              <SendIcon className={commonStyles.btnSend} />
            </IconButton>
          </Box>
          <h3>{dictionary.titles.body}:</h3>
          <Editor value={body} onChange={handleBodyChange} />
          <HeadersVariablesBlock
            title={dictionary.titles.addHeader}
            itemType={dictionary.titles.header}
          />
          <HeadersVariablesBlock
            title={dictionary.titles.addVariable}
            itemType={dictionary.titles.variable}
          />
        </Box>
      </section>
      <ResponseBlock />
    </main>
  );
};
