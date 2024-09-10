import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TextField } from "@mui/material";

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const Field = ({ label, value, onChange }: FieldProps) => {
  const [item, setItems] = useState<string>(value);

  const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
      onMouseOutCapture={() => onChange(item)}
      onChange={fieldChange}
    />
  );
};
