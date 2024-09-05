"use client";

import NextLink from "next/link";
import styles from "./styles.module.css";
import { setLanguage } from "@shared/store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@shared/store";
import { Languages } from "@shared/types/types";
import { usePathname } from "next/navigation";

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
    return pathname.replace(/\/(en|ru)(\/|$)/, `/${lang}/`);
  };

  return (
    <div className={styles.lang}>
      <NextLink
        href={getNewPath(Languages.EN)}
        className={styles.lang}
        onClick={() => handleLanguageChange(Languages.EN)}
        passHref
      >
        {Languages.EN.toUpperCase()}
      </NextLink>

      <span> | </span>

      <NextLink
        href={getNewPath(Languages.RU)}
        className={styles.lang}
        onClick={() => handleLanguageChange(Languages.RU)}
        passHref
      >
        {Languages.RU.toUpperCase()}
      </NextLink>
    </div>
  );
};
