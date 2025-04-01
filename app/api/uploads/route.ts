import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const uploadDir = path.join(process.cwd(), "public/assets/uploads");

export async function DELETE() {
  try {
    await fs.access(uploadDir);

    const files = await fs.readdir(uploadDir);
    await Promise.all(files.map((file) => fs.unlink(path.join(uploadDir, file))));

    return NextResponse.json({ message: "Uploads cleared!" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && (error as any).code === "ENOENT") {
      return NextResponse.json({ error: "Directory not found." }, { status: 404 });
    }
    console.error("Error clearing uploads:", error);
    return NextResponse.json({ error: "Internal error while clearing uploads." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;

    if (!file || !name) {
      return NextResponse.json({ error: "File or name missing" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, `${name}`);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/assets/uploads/${name}.png` }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal error during upload." }, { status: 500 });
  }
}
