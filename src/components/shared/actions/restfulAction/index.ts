"use server";

import { Item } from "@shared/store/model";
import isValidJson from "@shared/utils/checkIsValidJson";
import fixInvalidJson from "@shared/utils/formatToValidJson";
import replaceVariables from "@shared/utils/replaceVariables";

export interface IServerResponse {
  endpoint: string;
  method: string;
  body: string;
  headers: Item[];
  variables: Item[];
}

export async function serverResponse({
  endpoint,
  method,
  body,
  headers,
  variables,
}: IServerResponse) {
  const newHeaders = new Headers();
  headers.forEach((item) => {
    if (item.key !== "" && item.value !== "") {
      newHeaders.append(item.key, item.value);
    }
  });

  let newBody: string | undefined = "";
  if (body) {
    if (!isValidJson(body)) {
      newBody = fixInvalidJson(body);
    }
    if (variables.length > 0) {
      newBody = replaceVariables(newBody, variables);
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
    console.log(response, newBody, variables);

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
