export type RestClientState = {
  method: Methods;
  endpoint: string;
  body: string;
  headers: Item[];
  variables: Item[];
  response: string;
};

export interface Item {
  key: string;
  value: string;
}

export enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}
