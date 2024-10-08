"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";
import styles from "./styles.module.css";
import { Menu } from "./view/Menu";
import { LangSwitcher } from "./view/LangSwitcher";
import { Locale } from "@config/i18n-config";
import { UserMenu } from "./view/UserMenu";
import logo from "@public/GQA-logo.png";

interface HeaderProps {
  params: {
    lang: Locale;
  };
  children?: ReactNode;
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
  const headerClass = classNames(styles.header, {
    [styles.sticky]: isSticky,
  });

  return (
    <header className={headerClass} ref={ref} {...rest}>
      {children}
      <Image src={logo} className={styles.logo} priority alt="Logo" width="50" height="50" />
      <Menu lang={lang} />
      <LangSwitcher />
      <section className={styles.userMenu}>
        <UserMenu />
      </section>
    </header>
  );
};
