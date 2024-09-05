// Headers variables
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

// Methods
export type methodState = {
  method: Methods;
};

export enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}
