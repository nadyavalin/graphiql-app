"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const HeaderClient = ({
  children,
  sticky,
}: {
  children: React.ReactNode;
  sticky: boolean;
}) => {
  const [isSticky, setIsSticky] = useState(sticky);

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
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>{children}</header>
  );
};
