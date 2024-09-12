"use client";

import { Box } from "@mui/material";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { RootState } from "@shared/store";
import { Languages } from "@shared/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { HistoryBlock } from "@features/HistoryBlock";

export default function HistoryRequest() {
  const dictionary = useDictionary();
  const history = useSelector((state: RootState) => state.history);
  const currentLanguage: Languages = useSelector((state: RootState) => state.language.lang);

  return (
    <main>
      <h1>{dictionary.titles.history}</h1>
      <Box className={styles.content}>
        {!history.listRequestsGraphQL.length && !history.listRequestsRestClient.length ? (
          <Box>
            {dictionary.history.noRequests}
            <Box className={styles.linksBlock}>
              <Link href={`/${currentLanguage}/rest-client`}>{dictionary.buttons.restClient}</Link>
              <Link href={`/${currentLanguage}/graph-ql`}>{dictionary.buttons.graphQL}</Link>
            </Box>
          </Box>
        ) : (
          <>
            <HistoryBlock
              listRequests={history.listRequestsRestClient}
              title={dictionary.buttons.restClient}
            />
            <HistoryBlock
              listRequests={history.listRequestsGraphQL}
              title={dictionary.buttons.graphQL}
            />
          </>
        )}
      </Box>
    </main>
  );
}
