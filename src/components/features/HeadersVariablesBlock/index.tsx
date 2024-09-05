import { useState } from "react";
import styles from "./styles.module.css";
import { Box, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Field from "@features/Field";

interface Item {
  key: string;
  value: string;
}

interface HeadersVariablesBlockProp {
  title: string;
  itemType: string;
}

export const HeadersVariablesBlock = ({ title, itemType }: HeadersVariablesBlockProp) => {
  const [items, setItems] = useState<Item[]>([{ key: "", value: "" }]);

  const handleChange = (key: string, field: "key" | "value", value: string) => {
    const newItems = items.map((item) => (item.key === key ? { ...item, [field]: value } : item));
    setItems(newItems);
  };

  const addItem = () => {
    const newItems = [...items, { key: "", value: "" }];
    setItems(newItems);
  };

  const removeItem = (key: string) => {
    const newItems = items.filter((item) => item.key !== key);
    setItems(newItems);
  };

  return (
    <Box>
      <h3>
        {title}
        <IconButton onClick={addItem}>
          <AddIcon className={styles.icon} />
        </IconButton>
      </h3>
      {items.map((item) => (
        <Box mb={1} display="flex" alignItems="center" key={item.key}>
          <Field
            label={`${itemType} Key`}
            value={item.key}
            onChange={(e) => handleChange(item.key, "key", e.target.value)}
          />
          <Field
            label={`${itemType} Value`}
            value={item.value}
            onChange={(e) => handleChange(item.key, "value", e.target.value)}
          />
          <IconButton onClick={() => removeItem(item.key)}>
            <RemoveIcon className={styles.icon} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};
