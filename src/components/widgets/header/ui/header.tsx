"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { SimpleButton } from "@shared/ui-kit/buttons";

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
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
