"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./styles.module.css";
import { Link } from "@mui/material";
import { auth } from "@config/firebaseConfig";
import nadyavalin from "@public/nadyavalin.jpg";
import katika from "@public/ifbfirst.jpg";
import larry from "@public/LarryDavidd.jpg";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { Loader } from "@features/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "@shared/types";
import { useSelector } from "react-redux";
import { RootState } from "@shared/store";

export const WelcomePage = () => {
  const router = useRouter();
  const dictionary = useDictionary();
  const [user, loading] = useAuthState(auth);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    if (user && !loading) {
      router.push(`/${currentLanguage}`);
    }
  }, [user, loading, router, currentLanguage]);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    router.push(`/${currentLanguage}`);
  }

  return (
    <>
      <main>
        {user ? (
          <h3>{dictionary.titles.welcomeUser}, [user]!</h3>
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
              <p>{dictionary.developers.nadyavalin.desc}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
