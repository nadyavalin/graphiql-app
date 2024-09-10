"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Link } from "@mui/material";
import nadyavalin from "@public/nadyavalin.jpg";
import katika from "@public/ifbfirst.jpg";
import larry from "@public/LarryDavidd.jpg";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Languages } from "@shared/types";
import { RootState } from "@shared/store";
import useSessionCheck from "@shared/hooks/useSessionCheck";

export const WelcomePage = () => {
  const dictionary = useDictionary();
  const user = useSelector((state: RootState) => state.user);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);
  useSessionCheck();
  return (
    <>
      <main>
        {user ? (
          <h3>
            {dictionary.titles.welcomeUser}, {user.userName}!
          </h3>
        ) : (
          <nav className={styles.userNav}>
            <Link
              href={`/${currentLanguage}/login`}
              className={styles.userNavLink}
              underline="none"
              component={NextLink}
              sx={{ color: "var(--text-color)" }}
            >
              {dictionary.buttons.login}
            </Link>

            <Link
              href={`/${currentLanguage}/registration`}
              className={styles.userNavLink}
              underline="none"
              component={NextLink}
              sx={{ color: "var(--text-color)" }}
            >
              {dictionary.buttons.registration}
            </Link>
          </nav>
        )}
        <section className={styles.info}>
          <div className={styles.infoItem}>
            <h2>{dictionary.info.title_team}</h2>
            <p>{dictionary.info.team}</p>
          </div>
          <div className={styles.infoItem}>
            <h2>{dictionary.info.title_katika}</h2>
            {dictionary.info.project_katika}
          </div>
          <div className={styles.infoItem}>
            <h2>{dictionary.info.title_LarryDavidd}</h2>
            {dictionary.info.project_LarryDavidd}
          </div>
          <div className={styles.infoItem}>
            <h2>{dictionary.info.title_nadyavalin}</h2>
            <p>{dictionary.info.project_nadyavalin}</p>
          </div>
          <div className={styles.infoItem}>
            <h2>{dictionary.info.title_course}</h2>
            {dictionary.info.course}
          </div>
        </section>
        <section className={styles.sectionDevelopers}>
          <div className={styles.developers}>
            <div className={styles.developer}>
              <Image
                src={katika}
                alt="katika"
                width="250"
                height="250"
                className={styles.developerImage}
              />
              <p className={styles.developerName}>{dictionary.developers.katika.name}</p>
              <p className={styles.developerPosition}>{dictionary.developers.katika.position}</p>
              <Link href="https://github.com/ifbfirst" target="_blank" rel="noreferrer">
                katika&lsquo;s GitHub
              </Link>
              <p>{dictionary.developers.katika.desc}</p>
            </div>

            <div className={styles.developer}>
              <Image
                src={larry}
                alt="LarryDavidd"
                width="250"
                height="250"
                className={styles.developerImage}
              />
              <p className={styles.developerName}>{dictionary.developers.LarryDavidd.name}</p>
              <p className={styles.developerPosition}>
                {dictionary.developers.LarryDavidd.position}
              </p>
              <Link href="https://github.com/LarryDavidd" target="_blank" rel="noreferrer">
                LarryDavidd&lsquo;s GitHub
              </Link>
              <p>{dictionary.developers.LarryDavidd.desc}</p>
            </div>
            <div className={styles.developer}>
              <Image
                src={nadyavalin}
                alt="nadyavalin"
                width="250"
                height="250"
                className={styles.developerImage}
              />
              <p className={styles.developerName}>{dictionary.developers.nadyavalin.name}</p>
              <p className={styles.developerPosition}>
                {dictionary.developers.nadyavalin.position}
              </p>
              <Link href="https://github.com/nadyavalin" target="_blank" rel="noreferrer">
                nadyavalin&lsquo;s GitHub
              </Link>
              <p>{dictionary.developers.nadyavalin.desc}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
