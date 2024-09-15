import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import styles from "./styles.module.css";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const Field = ({ label, value, onChange }: FieldProps) => {
  const [item, setItems] = useState<string>(value);

  const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[\u0400-\u04FF]/g, "");
    setItems(value);
  };

  useEffect(() => setItems(value), [value]);

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
      value={item}
      onBlur={() => onChange(item)}
      onChange={fieldChange}
    />
  );
};
