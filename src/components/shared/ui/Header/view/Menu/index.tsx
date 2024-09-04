"use client";

import NextLink from "next/link";
import { Link } from "@mui/material";
import styles from "../../styles.module.css";
import { Locale } from "@config/i18n-config";
import { useDictionary } from "@shared/providers/DictionaryProvider";

interface MenuProps {
  lang: Locale;
}

export const Menu = ({ lang }: MenuProps) => {
  const dictionary = useDictionary();

  return (
    <nav className={styles.nav}>
      <Link
        href={`/${lang}/rest-client`}
        className={styles.menuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.restClient}
      </Link>

      <Link
        href={`/${lang}/graph-ql`}
        className={styles.menuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.graphQL}
      </Link>

      <Link href={`/${lang}/`} className={styles.menuLink} underline="none" component={NextLink}>
        {dictionary.buttons.welcome}
      </Link>
    </nav>
  );
};
