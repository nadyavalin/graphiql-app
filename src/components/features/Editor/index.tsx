import CodeMirror from "@uiw/react-codemirror";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

interface EditorProps {
  value: string;
  isEditable?: boolean;
  onChange?: (newValue: string) => void;
}

export const Editor = ({ isEditable, value, onChange }: EditorProps) => {
  const [item, setItems] = useState<string>(value);

  const onFocusOut = () => {
    if (onChange) onChange(item);
  };

  useEffect(() => setItems(value), [value]);

  return (
    <CodeMirror
      minHeight="230px"
      editable={isEditable}
      value={item}
      className={styles.editor}
      onChange={setItems}
      onBlur={onFocusOut}
    />
  );
};
