import styles from "./styles.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const methods = ["GET", "POST", "PUT", "DELETE"];

export const Methods = () => {
  return (
    <FormControl sx={{ minWidth: "100px" }}>
      <InputLabel>Method</InputLabel>
      <Select className={styles.input}>
        {methods.map((method) => {
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
