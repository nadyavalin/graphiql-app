"use client";

import styles from "./styles.module.css";

export const DocsComponent = () => {
  return (
    <section>
      <div className={styles.docsArea}>
        <div className={styles.titleArea}>
          <h2>Root Types</h2>
          <button className={styles.queryButton}>query: Query</button>
        </div>
        <p>All Schema Types</p>
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
