"use client";

import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import commonStyles from "../commonStyles.module.css";
import { Editor } from "@features/Editor";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { MethodsBlock } from "@features/Methods";
import {
  updateBody,
  updateEndpoint,
  updateHeaders,
  updateMethod,
  updateVariables,
} from "@shared/store/slices/restClientSlice";
import { Item, Methods } from "@shared/store/model";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import useAppSelector from "@shared/hooks/useAppSelector";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import { IServerResponse } from "@shared/actions/restfulAction";

interface RequestSectionProps {
  onPlay: ({ endpoint, method, body, headers, variables }: IServerResponse) => Promise<void>;
  onUrlChange: (headers: Item[], endpoint: string, body: string, method: Methods) => void;
}

export const RestFullRequestSection: React.FC<RequestSectionProps> = ({ onPlay, onUrlChange }) => {
  const dictionary = useDictionary();
  const dispatch = useAppDispatch();

  const headers = useAppSelector((state) => state.restClient.headers);
  const variables = useAppSelector((state) => state.restClient.variables);
  const body = useAppSelector((state) => state.restClient.body);
  const endpoint = useAppSelector((state) => state.restClient.endpoint);
  const method = useAppSelector((state) => state.restClient.method);

  useEffect(() => {
    if (endpoint || method || body || headers) onUrlChange(headers, endpoint, body, method);
  }, [endpoint, method, body, headers]);

  const onSend = () => {
    onPlay({ endpoint, method, body, headers, variables });
  };

  return (
    <section>
      <h2>REST Client</h2>
      <Box className={commonStyles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <MethodsBlock method={method} onChange={(value) => dispatch(updateMethod(value))} />
          <Field
            label={dictionary.labels.endpoint}
            onChange={(value) => dispatch(updateEndpoint(value))}
            value={endpoint}
          />
          <IconButton
            title={dictionary.titles.query}
            onClick={() => dispatch(updateBody(formatDataEditor(body)))}
          >
            <PrettifyIcon className={commonStyles.btnPrettify} />
          </IconButton>
          <IconButton title={dictionary.titles.sendRequest} onClick={onSend}>
            <SendIcon className={commonStyles.btnSend} />
          </IconButton>
        </Box>
        {method !== Methods.get ? (
          <>
            <h3>{dictionary.titles.body}:</h3>
            <Editor value={body} onChange={(value) => dispatch(updateBody(value))} />
            <HeadersVariablesBlock
              title={dictionary.titles.addVariable}
              itemType={dictionary.titles.variable}
              onChange={(value) => dispatch(updateVariables(value))}
              value={variables}
            />
          </>
        ) : null}
        <HeadersVariablesBlock
          title={dictionary.titles.addHeader}
          itemType={dictionary.titles.header}
          onChange={(value) => dispatch(updateHeaders(value))}
          value={headers}
        />
      </Box>
    </section>
  );
};
