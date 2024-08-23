"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { SimpleButton } from "@shared/ui-kit/buttons";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <SimpleButton buttonDetails={{ name: "Login" }} onClick={() => router.push("login")} />
      <SimpleButton
        buttonDetails={{ name: "Registration" }}
        onClick={() => router.push("registration")}
      />
      <SimpleButton buttonDetails={{ name: "Welcome" }} onClick={() => router.push("/")} />
    </header>
  );
};

export default Header;
