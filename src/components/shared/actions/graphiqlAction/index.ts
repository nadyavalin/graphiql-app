"use server";

import { Item } from "@shared/store/model";

export interface IServerGraphiqlResponse {
  endpoint: string;
  body: string;
  headers: Item[];
  variables: Item[];
}

export async function serverGraphiqlResponse(data: IServerGraphiqlResponse) {
  const headers = data.headers.reduce(
    (acc, item) => {
      acc[item.key] = item.value;
      return acc;
    },
    {} as Record<string, string>,
  );

  const variables = data.variables.reduce(
    (acc, item) => {
      acc[item.key] = item.value;
      return acc;
    },
    {} as Record<string, string>,
  );

  try {
    const response = await fetch(data.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        query: data.body,
        variables: variables,
      }),
    });

    if (!response.ok) {
      return { status: response.status, data: response.statusText };
    }

    const res = await response.json();
    return { status: response.status, data: res };
  } catch {
    return { status: null, data: "Failed to fetch" };
  }
}
