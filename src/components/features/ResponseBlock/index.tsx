import { Editor } from "@features/Editor";
import styles from "./styles.module.css";
import { Card, CardContent } from "@mui/material";
import { useState } from "react";
import { formatDataEditor } from "@shared/utils/formatDataEditor";

export const ResponseBlock = () => {
  const [response, setResponse] = useState("");

  return (
    <section>
      <h2>Response</h2>
      <Card className={styles.card}>
        <CardContent>
          <h3>Status: </h3>
          <Editor isEditable={false} value={formatDataEditor(response)} />
        </CardContent>
      </Card>
    </section>
  );
};
