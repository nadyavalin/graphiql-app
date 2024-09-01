"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Menu } from "./view/Menu";
import { LangSwitcher } from "./view/LangSwitcher";
import { Locale } from "../../../../../i18n-config";

interface HeaderProps {
  params: {
    lang: Locale;
  };
}

export const Header = ({ params: { lang } }: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <Menu lang={lang} />
      <LangSwitcher />
    </header>
  );
};
