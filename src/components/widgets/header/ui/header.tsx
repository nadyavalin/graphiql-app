"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { SimpleButton } from "@shared/ui-kit/buttons";
import { useDictionary } from "@app/providers/DictionaryContext";

const Header = () => {
  const { dictionary } = useDictionary();
  const router = useRouter();
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
      <SimpleButton
        buttonDetails={{ name: dictionary.buttons.login }}
        onClick={() => router.push("/login")}
      />
      <SimpleButton
        buttonDetails={{ name: dictionary.buttons.registration }}
        onClick={() => router.push("/registration")}
      />
      <SimpleButton
        buttonDetails={{ name: dictionary.buttons.logout }}
        onClick={() => router.push("/")}
      />
      <SimpleButton
        buttonDetails={{ name: dictionary.buttons.welcome }}
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
