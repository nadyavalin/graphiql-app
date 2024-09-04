import Image from "next/image";
import styles from "./styles.module.css";
import { Locale } from "@config/i18n-config";
import { getDictionary } from "@app/[lang]/dictionaries";
import nadyavalin from "@public/nadyavalin.jpg";
import katika from "@public/ifbfirst.jpg";
import larry from "@public/LarryDavidd.jpg";

export const WelcomePage = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <main>
        <section className={styles.sectionDevelopers}>
          <h1>Welcome Page</h1>
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
