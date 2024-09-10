"use client";

import { useState } from "react";
import styles from "./styles.module.css";
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

export const GraphQL = () => {
  const [query, setQuery] = useState("");
  const dictionary = useDictionary();
  useSessionCheck();
  const handleQueryChange = (newValue: string) => {
    setQuery(newValue);
  };

  return (
    <main className={styles.graphQLContainer}>
      <section>
        <h2>Graph QL</h2>
        <div className={commonStyles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Field label={dictionary.labels.endpoint} />
            <IconButton
              title={dictionary.titles.query}
              onClick={() => setQuery(formatDataEditor(query))}
            >
              <PrettifyIcon className={commonStyles.btnPrettify} />
            </IconButton>
            <IconButton title={dictionary.titles.sendRequest}>
              <SendIcon className={commonStyles.btnSend} />
            </IconButton>
          </Box>
          <Field label={"SDL URL"} />
          <h3>Query:</h3>
          <Editor value={query} onChange={handleQueryChange} />
          <HeadersVariablesBlock
            title={dictionary.titles.addHeader}
            itemType={dictionary.titles.header}
          />
          <HeadersVariablesBlock
            title={dictionary.titles.addVariable}
            itemType={dictionary.titles.variable}
          />
        </div>
      </section>
      <ResponseBlock />
    </main>
  );
};
