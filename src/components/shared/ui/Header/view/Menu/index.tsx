"use client";

import NextLink from "next/link";
import { Link } from "@mui/material";
import styles from "../../styles.module.css";
import { Locale } from "@config/i18n-config";
import { useDictionary } from "@shared/providers/DictionaryProvider";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebaseConfig";

interface MenuProps {
  lang: Locale;
}

export const Menu = ({ lang }: MenuProps) => {
  const dictionary = useDictionary();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <nav className={styles.nav}>
      {user ? (
        <>
          <Link
            href={`/${lang}/rest-client`}
            className={styles.menuLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary.buttons.restClient}
          </Link>

          <Link
            href={`/${lang}/graph-ql`}
            className={styles.menuLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary.buttons.graphQL}
          </Link>
        </>
      ) : null}

      <Link
        href={`/${lang}/`}
        className={styles.menuLink}
        underline="none"
        component={NextLink}
        sx={{ color: "var(--text-color)" }}
      >
        {dictionary.buttons.welcome}
      </Link>
    </nav>
  );
};
