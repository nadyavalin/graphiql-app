"use client";

import NextLink from "next/link";
import { Link } from "@mui/material";
import styles from "../../styles.module.css";
import { Locale } from "@config/i18n-config";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebaseConfig";
import { Logout } from "@features/Logout";

interface MenuProps {
  lang: Locale;
}

export const UserMenu = ({ lang }: MenuProps) => {
  const dictionary = useDictionary();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={styles.userNav}>
      {user ? (
        <Logout />
      ) : (
        <>
          <Link
            href={`/${lang}/login`}
            className={styles.userMenuLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary.buttons.login}
          </Link>

          <Link
            href={`/${lang}/registration`}
            className={styles.userMenuLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary.buttons.registration}
          </Link>
        </>
      )}
    </nav>
  );
};
