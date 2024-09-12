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

  const onValueChange = (value: string) => {
    setItems(value.replace(/[\u0400-\u04FF]/g, ""));
  };

  useEffect(() => {
    setItems(value);
  }, [value]);

  return (
    <CodeMirror
      minHeight="230px"
      editable={isEditable}
      value={item}
      className={styles.editor}
      lang="en"
      onChange={onValueChange}
      onBlur={onFocusOut}
    />
  );
};
