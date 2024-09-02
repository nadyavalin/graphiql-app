import { useState } from "react";
import styles from "./styles.module.css";
import { Box, IconButton } from "@mui/material";
import { Field } from "@features/Field";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface HeadersVariablesBlockProp {
  title: string;
  itemType: string;
}

export const HeadersVariablesBlock = ({ title, itemType }: HeadersVariablesBlockProp) => {
  const [items, setItems] = useState([{ key: "", value: "" }]);

  const handleChange = (index: number, field: "key" | "value", value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    const newItems = [...items, { key: "", value: "" }];
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
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
      {items.map((item, index) => (
        <Box mb={1} display="flex" alignItems="center" key={index}>
          <Field
            label={`${itemType} Key`}
            value={item.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
          />
          <Field
            label={`${itemType} Value`}
            value={item.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
          />
          <IconButton onClick={() => removeItem(index)}>
            <RemoveIcon className={styles.icon} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};
