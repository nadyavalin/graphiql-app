import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./styles.module.css";
import { useDictionary } from "@shared/providers/DictionaryProvider";

enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export const MethodsBlock = () => {
  const dictionary = useDictionary();

  return (
    <FormControl sx={{ minWidth: "100px" }}>
      <InputLabel>{dictionary.labels.method}</InputLabel>
      <Select className={styles.input}>
        {Object.values(Methods).map((method) => {
          return (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
