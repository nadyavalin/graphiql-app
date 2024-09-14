"use client";
import { DocExplorer, GraphiQLProvider } from "@graphiql/react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import useAppSelector from "@shared/hooks/useAppSelector";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { useState } from "react";
import Image from "next/image";
import docs from "@public/docs.png";
import styles from "./styles.module.css";

export const DocsComponent = () => {
  const dictionary = useDictionary();

  const [isDocsVisible, setDocsVisible] = useState(false);
  const toggleDocs = () => {
    setDocsVisible((prev) => !prev);
  };

  const isSdlExists = useAppSelector((state) => state.graphiql.isSdlExists);

  const sdlUrl = useAppSelector((state) => state.graphiql.sdlUrl);

  return isSdlExists ? (
    <div className={styles.docsBlock}>
      <div className={styles.imageText} onClick={toggleDocs}>
        <Image
          src={docs}
          priority
          alt="Docs Icon"
          width="30"
          height="30"
          className={styles.docsIcon}
        />
        {isDocsVisible && <h4>{dictionary.docs.docs}</h4>}
      </div>
      <div className={`${styles.docsComponent} ${isDocsVisible ? styles.visible : ""}`}>
        <div className={styles.docsArea}>
          <GraphiQLProvider fetcher={createGraphiQLFetcher({ url: sdlUrl })}>
            <DocExplorer />
          </GraphiQLProvider>
        </div>
      </div>
    </div>
  ) : null;
};
