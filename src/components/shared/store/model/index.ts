export type headersState = {
  headers: Item[];
};

export type variablesState = {
  variables: Item[];
};

export interface Item {
  key: string;
  value: string;
}
