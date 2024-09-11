"use client";

import { useState } from "react";
import commonStyles from "../commonStyles.module.css";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton } from "@mui/material";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { ResponseBlock } from "@features/ResponseBlock";
import { MethodsBlock } from "@features/Methods";
import { Editor } from "@features/Editor";
import { Field } from "@features/Field";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import useSessionCheck from "@shared/hooks/useSessionCheck";

export const RestClient = () => {
  const dictionary = useDictionary();
  const [body, setBody] = useState("");
  useSessionCheck();
  const handleBodyChange = (newValue: string) => {
    setBody(newValue);
  };

  return (
    <main className={commonStyles.container}>
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
