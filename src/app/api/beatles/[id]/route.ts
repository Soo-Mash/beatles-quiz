import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // await 'params' to avoid console error, suggested by terminal message. Since Next v15 - find in "Dynamic APIs are Asynchronous" page in NextJs docs.

  const url = `https://frontend-interview.evidentinsights.com/album_covers/${id}`;

  const r = await fetch(url, {
    cache: "no-store",
  });
  if (!r.ok)
    return NextResponse.json({ error: "Upstream error" }, { status: r.status });

  const contentType = r.headers.get("content-type") ?? "image/jpeg";
  const buf = await r.arrayBuffer(); //convert binary to 'raw bytes'

  return new NextResponse(buf, {
    headers: {
      "content-type": contentType,
    },
  });
}
