import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import { Item } from "@shared/store/model";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Field } from "@features/Field";

interface HeadersVariablesBlockProp {
  title: string;
  itemType: string;
  value: Item[];
  onChange: (value: Item[]) => void;
}

export const HeadersVariablesBlock = ({
  title,
  itemType,
  onChange,
  value,
}: HeadersVariablesBlockProp) => {
  const [items, setItems] = useState<Item[]>(value);

  const handleChange = (key: string, field: "key" | "value", value: string) => {
    const newItems = items.map((item) => (item.key === key ? { ...item, [field]: value } : item));
    setItems(newItems);
    onChange(newItems);
  };

  const addItem = () => {
    const newItems = [...items, { key: "", value: "" }];
    setItems(newItems);
  };

  const removeItem = (key: string) => {
    const newItems = items.filter((item) => item.key !== key);
    setItems(newItems);
    onChange(newItems);
  };

  useEffect(() => setItems(value), [value]);

  return (
    <Box>
      <h3>
        {title}
        <IconButton onClick={addItem}>
          <AddIcon className={styles.icon} />
        </IconButton>
      </h3>
      {(items ?? []).map((item, i) => (
        <Box mb={1} display="flex" alignItems="center" key={i}>
          <Field
            label={`${itemType} Key`}
            value={item.key}
            onChange={(value) => handleChange(item.key, "key", value)}
          />
          <Field
            label={`${itemType} Value`}
            value={item.value}
            onChange={(value) => handleChange(item.key, "value", value)}
          />
          <IconButton onClick={() => removeItem(item.key)}>
            <RemoveIcon className={styles.icon} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};
