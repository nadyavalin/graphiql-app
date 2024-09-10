import { Editor } from "@features/Editor";
import styles from "./styles.module.css";
import { Card, CardContent } from "@mui/material";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import useAppSelector from "@shared/hooks/useAppSelector";

export const ResponseBlock = () => {
  const response = useAppSelector((state) => state.response.response);

  return (
    <section>
      <h2>Response</h2>
      <Card className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
        <CardContent>
          <h3>Status: </h3>
          <Editor isEditable={false} value={formatDataEditor(response)} />
        </CardContent>
      </Card>
    </section>
  );
};
