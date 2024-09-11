"use client";

import NextLink from "next/link";
import styles from "./styles.module.css";
import { Link } from "@mui/material";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Logout } from "@features/Logout";
import { Languages } from "@shared/types";
import { useSelector } from "react-redux";
import { RootState } from "@shared/store";
import useFirebaseAuth from "@shared/hooks/useFirebaseAuth";

export const UserMenu = () => {
  const dictionary = useDictionary();
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  const { user, loading } = useFirebaseAuth();
  if (loading) {
    return;
  }

  return (
    <nav className={styles.userNav}>
      {user ? (
        <Logout />
      ) : (
        <>
          <Link
            href={`/${currentLanguage}/login`}
            className={styles.userNavLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.buttons.login}
          </Link>

          <Link
            href={`/${currentLanguage}/registration`}
            className={styles.userNavLink}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.buttons.registration}
          </Link>
        </>
      )}
    </nav>
  );
};
