"use server";
import { promises as fs } from 'node:fs';


export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`./public/assets/uploads/${name}.png`, buffer);

  return new Response(JSON.stringify({ url: `/uploads/${name}.png` }));
}
