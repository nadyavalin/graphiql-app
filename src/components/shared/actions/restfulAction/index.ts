"use server";

import { Item } from "@shared/store/model";

export async function updateUser(endpoint: string, method: string, body: string, headers: Item[]) {
  const newHeaders = new Headers();

  headers.forEach((item) => {
    newHeaders.append(item.key, item.value);
  });
  console.log(endpoint, method, body, headers, newHeaders);
  try {
    const response = await fetch(endpoint, {
      method: method,
      body: body ? body : undefined,
      headers: newHeaders,
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Failed to fetch data" });
  }
}
