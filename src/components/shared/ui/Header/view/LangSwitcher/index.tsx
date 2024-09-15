"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import { setLanguage } from "@shared/store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@shared/store";
import { Languages } from "@shared/types";

export const LangSwitcher = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);

  const handleLanguageChange = (newLang: Languages) => {
    if (newLang !== currentLanguage) {
      dispatch(setLanguage(newLang));
    }
  };

  const getNewPath = (lang: Languages) => {
    if (!pathname) {
      return `/${lang}`;
    }
    return pathname.replace(/\/(en|ru)(\/|$)/, `/${lang}/`);
  };

  const isActive = (lang: Languages) => {
    return pathname?.startsWith(`/${lang}`);
  };

  return (
    <div className={styles.lang}>
      <NextLink
        href={getNewPath(Languages.EN)}
        className={`${styles.lang} ${isActive(Languages.EN) ? styles.active : ""}`}
        onClick={() => handleLanguageChange(Languages.EN)}
        passHref
      >
        {Languages.EN.toUpperCase()}
      </NextLink>

      <span> | </span>

      <NextLink
        href={getNewPath(Languages.RU)}
        className={`${styles.lang} ${isActive(Languages.RU) ? styles.active : ""}`}
        onClick={() => handleLanguageChange(Languages.RU)}
        passHref
      >
        {Languages.RU.toUpperCase()}
      </NextLink>
    </div>
  );
};
