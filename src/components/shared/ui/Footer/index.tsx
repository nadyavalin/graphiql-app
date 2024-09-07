import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import logo from "@public/rss-logo.svg";

export const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <div>
        <div>2024</div>
      </div>
      <div className={styles.developers}>
        <Link
          href="https://github.com/ifbfirst"
          target="_blank"
          rel="noreferrer"
          className={styles.devLink}
        >
          katika
        </Link>
        <Link
          href="https://github.com/LarryDavidd"
          target="_blank"
          rel="noreferrer"
          className={styles.devLink}
        >
          LarryDavidd
        </Link>
        <Link
          href="https://github.com/nadyavalin"
          target="_blank"
          rel="noreferrer"
          className={styles.devLink}
        >
          nadyavalin
        </Link>
      </div>
      <Link href="https://rs.school" target="_blank" rel="noreferrer">
        <Image src={logo} alt="RSSchool Logo" width="50" height="50" className={styles.logo} />
      </Link>
    </footer>
  );
};
