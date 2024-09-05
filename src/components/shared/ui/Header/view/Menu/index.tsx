import NextLink from "next/link";
import { Link } from "@mui/material";
import styles from "./styles.module.css";
import { getDictionary } from "../../../../../../app/[lang]/dictionaries";
import { Locale } from "../../../../../../../i18n-config";
import { Logout } from "@features/Logout";

interface MenuProps {
  lang: Locale;
}

export const Menu = async ({ lang }: MenuProps) => {
  const dictionary = await getDictionary(lang);

  return (
    <nav className={styles.nav}>
      <Link
        href={`/${lang}/login`}
        className={styles.menuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.login}
      </Link>

      <Link
        href={`/${lang}/registration`}
        className={styles.menuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.registration}
      </Link>
      <Logout />
      <Link href={`/${lang}/`} className={styles.menuLink} underline="none" component={NextLink}>
        {dictionary.buttons.welcome}
      </Link>
    </nav>
  );
};
