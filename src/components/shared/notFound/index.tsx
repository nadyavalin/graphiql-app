"use client";

import Image from "next/image";
import { Link } from "@mui/material";
import page404 from "@public/cat.png";
import { useDictionary } from "@shared/providers/DictionaryProvider";

export default function NotFoundTranslate() {
  const dictionary = useDictionary();
  return (
    <>
      <main>
        <section>
          <p className="text404">404</p>
          <Image src={page404} alt="404" width="441" height="509" />
          <p>{dictionary.error.smtWentWrong}</p>
          <p>{dictionary.error.sorry}</p>
          <Link href="/">{dictionary.error.back}</Link>
        </section>
      </main>
    </>
  );
}
