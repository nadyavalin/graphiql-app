import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import styles from "./styles.module.css";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Methods } from "@shared/store/model";

interface MethodsProps {
  method: string;
  onChange: (newValue: Methods) => void;
}

export const MethodsBlock = ({ method, onChange }: MethodsProps) => {
  const dictionary = useDictionary();

  const handleChange = (event: SelectChangeEvent) => {
    const method = event.target.value as Methods;
    onChange(method);
  };

  return (
    <FormControl sx={{ minWidth: "100px" }}>
      <InputLabel>{dictionary.labels.method}</InputLabel>
      <Select className={styles.input} onChange={handleChange} value={method}>
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
