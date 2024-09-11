export type RestClientState = {
  method: Methods;
  endpoint: string;
  body: string;
  headers: Item[];
  variables: Item[];
  response: string;
  responseStatus: number | null;
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

export interface ResponseType {
  status: number | null;
  data: string;
}