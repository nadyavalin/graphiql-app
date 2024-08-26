import NextLink from "next/link";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import styles from "./styles.module.css";
import { RootState } from "@shared/store";

export const Menu = () => {
  const dictionary = useSelector((state: RootState) => state.language.dictionary);

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
