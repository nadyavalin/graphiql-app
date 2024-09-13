"use client";

import { useDictionary } from "@shared/providers/DictionaryProvider";
import styles from "./styles.module.css";

export const DocsComponent = () => {
  const dictionary = useDictionary();
  return (
    <section>
      <div className={styles.docsArea}>
        <div className={styles.titleArea}>
          <h2>{dictionary.docs.root}</h2>
          <button className={styles.queryButton}>query: Query</button>
        </div>
        <p>{dictionary.docs.types}</p>
        <div className={styles.buttonsArea}>
          <button>Query</button>
          <button>ID</button>
          <button>Int</button>
          <button>String</button>
          <button>...</button>
          <button>...</button>
          <button>...</button>
          <button>...</button>
          <button>...</button>
          <button>...</button>
          <button>...</button>
          <button>...</button>
        </div>
      </div>
    </section>
  );
};
