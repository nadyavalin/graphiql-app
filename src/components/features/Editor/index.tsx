import CodeMirror from "@uiw/react-codemirror";
import styles from "./styles.module.css";

interface EditorProps {
  value: string;
  isEditable?: boolean;
  onChange?: (newValue: string) => void;
}

export const Editor = ({ isEditable, value, onChange }: EditorProps) => {
  return (
    <CodeMirror
      minHeight="230px"
      editable={isEditable}
      value={value}
      className={styles.editor}
      onChange={onChange}
    />
  );
};
