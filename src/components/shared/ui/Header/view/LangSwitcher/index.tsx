"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Link } from "@mui/material";
import styles from "./styles.module.css";

enum Languages {
  EN = "en",
  RU = "ru",
}

export const LangSwitcher = () => {
  const [currentLang, setCurrentLang] = useState<Languages>(Languages.EN);

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    setCurrentLang(pathname[1] as Languages);
  }, []);

  const getNewPath = (lang: Languages) => {
    const pathname = window.location.pathname.split("/");
    if (currentLang === lang) return;
    pathname[1] = lang;
    return pathname.join("/");
  };

  return (
    <div className={styles.lang}>
      <Link
        href={getNewPath(Languages.EN) || "/"}
        className={styles.lang}
        underline="none"
        component={NextLink}
        onClick={() => setCurrentLang(Languages.EN)}
      >
        EN
      </Link>
      <span> | </span>
      <Link
        href={getNewPath(Languages.RU) || "/"}
        className={styles.lang}
        underline="none"
        component={NextLink}
        onClick={() => setCurrentLang(Languages.RU)}
      >
        RU
      </Link>
    </div>
  );
};
