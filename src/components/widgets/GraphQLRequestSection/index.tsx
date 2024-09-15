import { Box, IconButton } from "@mui/material";
import PrettifyIcon from "@mui/icons-material/FormatIndentIncrease";
import SendIcon from "@mui/icons-material/Send";
import { Field } from "@features/Field";
import { HeadersVariablesBlock } from "@features/HeadersVariablesBlock";
import { Editor } from "@features/Editor";
import { useDictionary } from "@shared/providers/DictionaryProvider";
import { formatDataEditor } from "@shared/utils/formatDataEditor";
import {
  updateBody,
  updateEndpoint,
  updateHeaders,
  updateSdlUrl,
  updateVariables,
} from "@shared/store/slices/graphiqlSlice";
import commonStyles from "../commonStyles.module.css";
import useAppDispatch from "@shared/hooks/useAppDispatch";
import useAppSelector from "@shared/hooks/useAppSelector";
import { IServerGraphiqlResponse } from "@shared/actions/graphiqlAction";
import { Item } from "@shared/store/model";
import { useEffect } from "react";

interface RequestSectionProps {
  onPlay: ({ endpoint, body, headers, variables }: IServerGraphiqlResponse) => Promise<void>;
  onUrlChange: (headers: Item[], endpoint: string, body: string) => void;
}

export const GHRequestSection: React.FC<RequestSectionProps> = ({ onPlay, onUrlChange }) => {
  const dictionary = useDictionary();
  const dispatch = useAppDispatch();

  const endpoint = useAppSelector((state) => state.graphiql.endpoint);
  const sdlUrl = useAppSelector((state) => state.graphiql.sdlUrl);
  const body = useAppSelector((state) => state.graphiql.body);
  const headers = useAppSelector((state) => state.graphiql.headers);
  const variables = useAppSelector((state) => state.graphiql.variables);

  useEffect(() => {
    onUrlChange(headers, endpoint, body);
  }, [endpoint, body, headers]);

  const onSend = () => {
    onPlay({ endpoint, body, headers, variables });
  };

  return (
    <section>
      <h2>Graph QL</h2>
      <div className={commonStyles.card} style={{ backgroundColor: "var(--bg-light-color)" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Field
            label={dictionary.labels.endpoint}
            onChange={(newValue) => dispatch(updateEndpoint(newValue.trim()))}
            value={endpoint}
          />
          <IconButton
            title={dictionary.titles.query}
            onClick={() => {
              dispatch(updateBody(formatDataEditor(body)));
            }}
          >
            <PrettifyIcon className={commonStyles.btnPrettify} />
          </IconButton>
          <IconButton title={dictionary.titles.sendRequest} onClick={onSend}>
            <SendIcon className={commonStyles.btnSend} />
          </IconButton>
        </Box>
        <Field
          label={"SDL URL"}
          onChange={(newValue) => dispatch(updateSdlUrl(newValue.trim()))}
          value={sdlUrl}
        />
        <h3>Query:</h3>
        <Editor value={body} onChange={(newValue) => dispatch(updateBody(newValue))} />
        <HeadersVariablesBlock
          title={dictionary.titles.addHeader}
          itemType={dictionary.titles.header}
          onChange={(newValue) => dispatch(updateHeaders(newValue))}
          value={headers}
        />
        <HeadersVariablesBlock
          title={dictionary.titles.addVariable}
          itemType={dictionary.titles.variable}
          onChange={(newValue) => dispatch(updateVariables(newValue))}
          value={variables}
        />
      </div>
    </section>
  );
};
