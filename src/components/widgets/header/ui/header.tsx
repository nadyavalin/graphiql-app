"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { SimpleButton } from "@shared/ui-kit/buttons";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { useDictionary } from "@app/providers/DictionaryContext";

const Header = () => {
  // const { dictionary } = useDictionary();
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
      <SimpleButton
        // buttonDetails={{ name: dictionary?.buttons.login }}
        buttonDetails={{ name: "Login" }}
        onClick={() => router.push("login")}
      />
      <SimpleButton
        // buttonDetails={{ name: dictionary?.buttons.registration }}
        buttonDetails={{ name: "Registration" }}
        onClick={() => router.push("registration")}
      />
      <SimpleButton
        // buttonDetails={{ name: dictionary?.buttons.welcome }}
        buttonDetails={{ name: "Welcome" }}
        onClick={() => router.push("/")}
      />

      <div className={styles.lang}>
        <Link href="/en">EN</Link>
        <span>|</span>
        <Link href="/ru">RU</Link>
      </div>
    </header>
  );
};

export default Header;
