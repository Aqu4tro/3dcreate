"use server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;

    if (!file || !name) {
      return new Response(JSON.stringify({ error: "File or name missing" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const uploadDir = path.join(process.cwd(), "public/assets/uploads");
    const filePath = path.join(uploadDir, `${name}`);

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    return new Response(JSON.stringify({ url: `/assets/uploads/${name}.png` }), { status: 200 });

  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
