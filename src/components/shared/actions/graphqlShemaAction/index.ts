"use server";

import { Methods } from "@shared/store/model";
import INTROSPECTION_QUERY from "./IntrospectionQuery";

export async function serverGraphiqlShemaResponse(sdlUrl: string) {
  const body = JSON.stringify({
    operationName: "IntrospectionQuery",
    query: INTROSPECTION_QUERY,
  });

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(sdlUrl, {
      method: Methods.post,
      body,
      headers,
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
