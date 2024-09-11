import styles from "./styles.module.css";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { Editor } from "@features/Editor";
import { Box } from "@mui/material";
import useAppSelector from "@shared/hooks/useAppSelector";

export const ResponseBlock = () => {
  const dictionary = useDictionary();

  const response = useAppSelector((state) => state.restClient.response);

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
