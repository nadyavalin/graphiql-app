import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const encodedRequest = searchParams.get("request");

  if (!encodedRequest) {
    return NextResponse.json({ error: "Request parameter is missing" }, { status: 400 });
  }

  const decodedRequest = decodeURIComponent(encodedRequest);

  const [method, encodedEndpoint, encodedBody] = decodedRequest.split("/");

  const headers = Object.fromEntries(searchParams.entries());

  delete headers["request"];

  if (!encodedEndpoint) {
    return NextResponse.json({ error: "Endpoint is missing" }, { status: 400 });
  }

  const endpoint = Buffer.from(encodedEndpoint, "base64").toString("utf8");
  const body = encodedBody ? Buffer.from(encodedBody, "base64").toString("utf8") : null;

  try {
    const response = await fetch(endpoint, {
      method: method,
      body: body ? JSON.parse(body) : undefined,
      headers: headers,
    });
    const data = await response.json();

    return new Response(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
