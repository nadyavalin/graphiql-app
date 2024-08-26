import { Link } from "@mui/material";
import { useDictionary } from "@shared/providers/DictionaryContext";
import NextLink from "next/link";
import styles from "./styles.module.css";

export const Menu = () => {
  const { dictionary } = useDictionary();

  return (
    <>
      <Link href="/login" className={styles.menuLink} underline="none" component={NextLink}>
        {dictionary.buttons.login}
      </Link>

      <Link href="/registration" className={styles.menuLink} underline="none" component={NextLink}>
        {dictionary.buttons.registration}
      </Link>

      <Link href="/" className={styles.menuLink} underline="none" component={NextLink}>
        {dictionary.buttons.logout}
      </Link>

      <Link href="/" className={styles.menuLink} underline="none" component={NextLink}>
        {dictionary.buttons.welcome}
      </Link>
    </>
  );
};
