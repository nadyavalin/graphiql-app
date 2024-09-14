import { DocExplorer, GraphiQLProvider } from "@graphiql/react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import useAppSelector from "@shared/hooks/useAppSelector";

export const DocSection = () => {
  const isSdlExists = useAppSelector((state) => state.graphiql.isSdlExists);

  const sdlUrl = useAppSelector((state) => state.graphiql.sdlUrl);

  return isSdlExists ? (
    <GraphiQLProvider fetcher={createGraphiQLFetcher({ url: sdlUrl })}>
      <DocExplorer />
    </GraphiQLProvider>
  ) : null;
};
