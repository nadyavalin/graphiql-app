"use client";

import NextLink from "next/link";
import { Link } from "@mui/material";
import styles from "../../styles.module.css";
import { Locale } from "@config/i18n-config";
import { useDictionary } from "@shared/providers/DictionaryProvider";

interface MenuProps {
  lang: Locale;
}

export const UserMenu = ({ lang }: MenuProps) => {
  const dictionary = useDictionary();

  return (
    <nav className={styles.userNav}>
      <Link
        href={`/${lang}/login`}
        className={styles.userMenuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.login}
      </Link>

      <Link
        href={`/${lang}/registration`}
        className={styles.userMenuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.registration}
      </Link>

      <Link
        href={`/${lang}/`}
        className={styles.userMenuLink}
        underline="none"
        component={NextLink}
      >
        {dictionary.buttons.logout}
      </Link>
    </nav>
  );
};
