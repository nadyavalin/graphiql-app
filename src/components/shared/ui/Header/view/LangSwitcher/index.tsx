import { Link } from "@mui/material";
import styles from "./styles.module.css";
import NextLink from "next/link";
export const LangSwitcher = () => {
  return (
    <div className={styles.lang}>
      <Link href="/en" underline="none" component={NextLink}>
        EN
      </Link>
      <span> | </span>
      <Link href="/ru" underline="none" component={NextLink}>
        RU
      </Link>
    </div>
  );
};
