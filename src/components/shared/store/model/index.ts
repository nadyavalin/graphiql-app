// Headers variables
export type HeadersState = {
  headers: Item[];
};

export type VariablesState = {
  variables: Item[];
};

export interface Item {
  key: string;
  value: string;
}

// Methods
export type MethodState = {
  method: Methods;
};

export enum Methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}

// Endpont
export type EndpointState = {
  endpoint: string;
};

// Body

export type BodyState = {
  body: string;
};

// Response

export type ResponseState = {
  response: string;
};
