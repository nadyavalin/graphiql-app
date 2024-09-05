import { Editor } from "@features/Editor";
import styles from "./styles.module.css";
import { useState } from "react";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { Box } from "@mui/material";

export const ResponseBlock = () => {
  const [response] = useState("");

  return (
    <section>
      <h2>Response</h2>
      <Box className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
        <h3>Status: </h3>
        <Editor isEditable={false} value={formatDataEditor(response)} />
      </Box>
    </section>
  );
};
