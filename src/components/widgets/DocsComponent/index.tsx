import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import docs from "@public/docs.png";
import { DocExplorer, GraphiQLProvider } from "@graphiql/react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { serverGraphiqlShemaResponse } from "@shared/actions/graphqlShemaAction";
import { updateIsSdlExists, updateSdlUrl } from "@shared/store/slices/graphiqlSlice";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import useAppSelector from "@shared/hooks/useAppSelector";

export const DocsComponent = () => {
  const dictionary = useDictionary();
  const dispatch = useAppDispatch();

  const [isDocsVisible, setDocsVisible] = useState(false);
  const toggleDocs = () => {
    setDocsVisible((prev) => !prev);
  };

  const isSdlExists = useAppSelector((state) => state.graphiql.isSdlExists);

  const sdlUrl = useAppSelector((state) => state.graphiql.sdlUrl);

  const endpoint = useAppSelector((state) => state.graphiql.endpoint);

  const onShemaResponse = async () => {
    dispatch(updateIsSdlExists(await serverGraphiqlShemaResponse(sdlUrl)));
  };

  useEffect(() => {
    onShemaResponse();
  }, [sdlUrl]);

  useEffect(() => {
    dispatch(updateSdlUrl(endpoint + "?sdl"));
  }, [endpoint]);

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
