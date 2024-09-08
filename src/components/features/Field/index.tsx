import { TextField } from "@mui/material";
import styles from "./styles.module.css";

interface FieldProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Field = ({ label, value, onChange }: FieldProps) => {
  return (
    <TextField
      fullWidth
      label={label}
      sx={{
        marginRight: "8px",
        "& .MuiInputBase-root": {
          height: "40px",
        },
      }}
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
};
