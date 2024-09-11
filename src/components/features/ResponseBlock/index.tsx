import styles from "./styles.module.css";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { Editor } from "@features/Editor";
import { Box } from "@mui/material";

interface ResponseBlockProps {
  status: number | null;
  data: string;
}

export const ResponseBlock = ({ status, data }: ResponseBlockProps) => {
  const dictionary = useDictionary();

  return (
    <section>
      <h2>{dictionary.titles.response}</h2>
      <Box className={styles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
        <h3>
          {dictionary.titles.status} {status !== null ? status : ""}
        </h3>
        <Editor isEditable={false} value={formatDataEditor(data)} />
      </Box>
    </section>
  );
};
