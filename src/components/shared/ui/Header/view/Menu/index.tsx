"use client";

import NextLink from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebaseConfig";
import styles from "./styles.module.css";
import { Link } from "@mui/material";
import { Locale } from "@config/i18n-config";
import { useDictionary } from "@shared/providers/DictionaryProvider";

export const Menu = ({ lang }: { lang: Locale }) => {
  const dictionary = useDictionary();
  const [user] = useAuthState(auth);

  return (
    <nav className={styles.nav}>
      {user ? (
        <>
          <Link
            href={`/${lang}/rest-client`}
            className={styles.navLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.buttons.restClient}
          </Link>

          <Link
            href={`/${lang}/graph-ql`}
            className={styles.navLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.buttons.graphQL}
          </Link>
        </>
      ) : null}

      <Link
        href={`/${lang}/`}
        className={styles.navLink}
        underline="none"
        component={NextLink}
        sx={{ color: "var(--text-color)" }}
      >
        {dictionary?.buttons.welcome}
      </Link>
    </nav>
  );
};
