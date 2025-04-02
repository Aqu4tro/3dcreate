import { Room } from "@/app/page";
import JSZip from "jszip";

interface FileData {
  name: string;
  data: ArrayBuffer;
}

export default async function downloadRoomsAsJson(
  lot: Room[],
  files: FileData[]
) {
  try {
    const zip = new JSZip();

    const jsonData = JSON.stringify(lot, null, 2);
    zip.file("data.json", jsonData);

    const imagesFolder = zip.folder("images");

    for (const file of files) {
      imagesFolder?.file(file.name, file.data);
    }

    const imageUrls = lot.flatMap((room) => {
      const roomTextures = [
        room.wallTexture,
        room.topTexture,
        room.floorTexture,
      ].filter(Boolean);
      const blockTextures =
        room.objects?.flatMap((block) =>
          [block.wallTexture, block.topTexture, block.floorTexture].filter(
            Boolean
          )
        ) || [];
      return [...roomTextures, ...blockTextures];
    });

    const existingFileNames = new Set(files.map((file) => file.name));
    const filteredImageUrls = imageUrls.filter((url) => {
      const fileName = url ? url.split("/").pop()?.trim() : undefined;
      return fileName && !existingFileNames.has(fileName);
    });

    const imagePromises = filteredImageUrls.map(async (url) => {
      try {
        if (!url) throw new Error("URL is undefined");

        const validExtensions = /\.(jpg|jpeg|png|webp)$/i;
        if (!validExtensions.test(url)) {
          console.warn(`Image ignored due to invalid extension: ${url}`);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

        const blob = await response.blob();
        if (blob.size === 0) throw new Error("Empty image received");

        let fileName =
          url.split("/").pop()?.trim() || `image_${Date.now()}.jpg`;

        imagesFolder?.file(fileName, blob);
      } catch (error) {
        console.error(`Error downloading ${url}:`, error);
      }
    });

    await Promise.all(imagePromises);

    const zipBlob = await zip.generateAsync({ type: "blob" });

    const url = window.URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "environment.zip";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating ZIP:", error);
  }
}
