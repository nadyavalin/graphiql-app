"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Menu } from "./view/Menu";
import { LangSwitcher } from "./view/LangSwitcher";

export const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      console.log(entry);

      entry.target.classList.toggle(styles.sticky, entry.intersectionRatio < 1);
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <Menu />
      <LangSwitcher />
    </header>
  );
};
