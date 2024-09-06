import { Methods } from "@shared/store/model";
import styles from "./styles.module.css";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface MethodsProps {
  method: string;
  onChange: (newValue: Methods) => void;
}

export const MethodsBlock = ({ method, onChange }: MethodsProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const method = event.target.value as Methods;
    onChange(method);
  };

  return (
    <FormControl sx={{ minWidth: "100px" }}>
      <InputLabel>Method</InputLabel>
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
