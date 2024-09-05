import styles from "./styles.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

export const MethodsBlock = () => {
  return (
    <FormControl sx={{ minWidth: "100px" }}>
      <InputLabel>Method</InputLabel>
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
