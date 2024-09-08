import Image from "next/image";
import styles from "./styles.module.css";
import { Link } from "@mui/material";
import page404 from "@public/cat.png";

export function NotFoundComponent() {
  return (
    <>
      <main>
        <section>
          <p className={styles.text}>404</p>
          <Image src={page404} priority alt="404" width="390" height="460" />
          <p>Somethings missing.</p>
          <p>Sorry, we cant find that page. You will find lots to explore on the Home Page.</p>
          <Link href="/">Back to Home Page</Link>
          <br />
          <p>Чего-то не хватает.</p>
          <p>
            Извините, мы не можем найти эту страницу. Вы найдете много интересного на главной
            странице.
          </p>
          <Link href="/">Вернуться на главную страницу</Link>
        </section>
      </main>
    </>
  );
}
