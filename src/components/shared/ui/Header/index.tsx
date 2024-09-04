"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import styles from "./styles.module.css";
import { Menu } from "./view/Menu";
import { LangSwitcher } from "./view/LangSwitcher";
import { Locale } from "@config/i18n-config";
import { UserMenu } from "./view/UserMenu";

interface HeaderProps {
  params: {
    lang: Locale;
  };
  children: ReactNode;
  [key: string]: unknown;
}

function useDetectSticky() {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: [1.0] },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { isSticky, ref };
}

export const Header = ({ params: { lang }, children, ...rest }: HeaderProps) => {
  const { isSticky, ref } = useDetectSticky();

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`} ref={ref} {...rest}>
      {children}
      <Menu lang={lang} />
      <LangSwitcher />
      <section className={styles.userMenu}>
        <UserMenu lang={lang} />
      </section>
    </header>
  );
};
