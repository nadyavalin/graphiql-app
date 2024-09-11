"use server";

import { Item } from "@shared/store/model";
import isValidJson from "@shared/utils/checkIsValidJson";
import fixInvalidJson from "@shared/utils/formatToValidJson";

export async function updateUser(endpoint: string, method: string, body: string, headers: Item[]) {
  const newHeaders = new Headers();

  headers.forEach((item) => {
    newHeaders.append(item.key, item.value);
  });

  let newBody: string | undefined = "";
  if (body) {
    if (!isValidJson(body)) {
      newBody = fixInvalidJson(body);
    }
  } else {
    newBody = undefined;
  }

  try {
    const response = await fetch(endpoint, {
      method: method,
      body: newBody,
      headers: newHeaders,
    });

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      return { status: response.status, data: response.statusText };
    }

    const data = await response.json();
    return { status: response.status, data };
  } catch {
    return { status: null, data: "Failed to fetch" };
  }
}
