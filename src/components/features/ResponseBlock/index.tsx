import { useState } from "react";
import styles from "./styles.module.css";
import { useDictionary } from "@src/components/shared/providers/DictionaryProvider";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { Editor } from "@features/Editor";
import { Box } from "@mui/material";

export const ResponseBlock = () => {
  const [response] = useState("");
  const dictionary = useDictionary();

  return (
    <section>
      <h2>{dictionary.titles.response}</h2>
      <Box className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
        <h3>{dictionary.titles.status}</h3>
        <Editor isEditable={false} value={formatDataEditor(response)} />
      </Box>
    </section>
  );
};
