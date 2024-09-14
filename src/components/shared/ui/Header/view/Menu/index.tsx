"use client";

import NextLink from "next/link";
import styles from "./styles.module.css";
import { Link } from "@mui/material";
import { Locale } from "@config/i18n-config";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { useFirebaseAuth } from "@shared/hooks/useFirebaseAuth";
import { usePathname } from "next/navigation";

export const Menu = ({ lang }: { lang: Locale }) => {
  const dictionary = useDictionary();
  const { user, loading } = useFirebaseAuth();
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/${lang}/`) && /\/(GET|POST|PUT|DELETE)(\/.*)?$/;

  if (loading) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {user ? (
        <>
          <Link
            href={`/${lang}/rest-client`}
            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.buttons.restClient}
          </Link>

          <Link
            href={`/${lang}/graph-ql`}
            className={`${styles.navLink} ${pathname === `/${lang}/graph-ql` ? styles.active : ""}`}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.buttons.graphQL}
          </Link>

          <Link
            href={`/${lang}/history`}
            className={`${styles.navLink} ${pathname === `/${lang}/history` ? styles.active : ""}`}
            underline="none"
            component={NextLink}
            sx={{ color: "var(--text-color)" }}
          >
            {dictionary?.titles.history}
          </Link>
        </>
      ) : null}

      <Link
        href={`/${lang}`}
        className={`${styles.navLink} ${pathname === `/${lang}` ? styles.active : ""}`}
        underline="none"
        component={NextLink}
        sx={{ color: "var(--text-color)" }}
      >
        {dictionary?.buttons.welcome}
      </Link>
    </nav>
  );
};
