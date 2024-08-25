import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import logo from "@public/rss-logo.svg";

export const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <div>
        <Image src={logo} alt="RSSchool Logo" width="50" height="50" className={styles.logo} />
      </div>
      <div className={styles.developers}>
        <Link href="https://github.com/nadyavalin" target="_blank" rel="noreferrer">
          nadyavalin
        </Link>
        <Link href="https://github.com/ifbfirst" target="_blank" rel="noreferrer">
          katika
        </Link>
        <Link href="https://github.com/LarryDavidd" target="_blank" rel="noreferrer">
          LarryDavidd
        </Link>
      </div>
      <div>2024</div>
    </footer>
  );
};
