import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

const targetBaseUrl = "https://rosette-solver-157013217208.europe-west1.run.app";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const input = url.searchParams.get("prefix");

    const targetUrl = `${targetBaseUrl}?prefix=${encodeURIComponent(input ?? "")}`;

    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(targetBaseUrl);

    const res = await client.request({ url: targetUrl });
    console.log(targetUrl)
    return NextResponse.json({ data: res.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Call failed" }, { status: 500 });
  }
}