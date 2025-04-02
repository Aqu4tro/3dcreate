import { Room } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

export async function handleUpload(
  file: File,
  name: string,
  setFiles: Dispatch<
    SetStateAction<{ name: string; url: string; data: ArrayBuffer }[]>
  >
): Promise<void> {
  let fileName = name;

  if (!fileName.includes(".")) {
    fileName += ".png";
  }

  const buffer = await file.arrayBuffer();
  const fileUrl = URL.createObjectURL(file);

  setFiles((prev) => {
    const existingFile = prev.find((f) => f.name === fileName);

    if (existingFile) {
      URL.revokeObjectURL(existingFile.url);
    }

    const filteredFiles = prev.filter((f) => f.name !== fileName);
    return [...filteredFiles, { name: fileName, url: fileUrl, data: buffer }];
  });
}

export async function handleUploadAmbience(
  event: React.ChangeEvent<HTMLInputElement>,
  setLots: Dispatch<SetStateAction<Room[]>>,
  setFiles: Dispatch<
    SetStateAction<{ name: string; url: string; data: ArrayBuffer }[]>
  >
): Promise<void> {
  const files = event.target.files;

  if (!files || files.length === 0) {
    console.warn("No file selected.");
    return;
  }

  const fileArray = Array.from(files);

  const validFiles = fileArray.filter((file) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return ["json", "png", "jpg", "jpeg"].includes(fileExtension || "");
  });

  if (validFiles.length === 0) {
    console.warn("No valid file found.");
    return;
  }

  const fileMap: Record<string, string> = {};
  const newFiles: { name: string; url: string; data: ArrayBuffer }[] = [];

  for (const file of validFiles) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (["png", "jpg", "jpeg"].includes(fileExtension || "")) {
      try {
        const buffer = await file.arrayBuffer();
        const fileUrl = URL.createObjectURL(file);

        fileMap[file.name] = fileUrl;

        newFiles.push({ name: file.name, url: fileUrl, data: buffer });
      } catch (error) {
        console.error("Error processing image file:", error);
      }
    }
  }

  for (const file of validFiles) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (fileExtension === "json") {
      try {
        const jsonData = await file.text();
        const parsedData = JSON.parse(jsonData);

        if (Array.isArray(parsedData)) {
          const updatedData = parsedData.map((item) => ({
            ...item,
            floorTexture:
              fileMap[`${item.name}-floorTexture.png`] || item.floorTexture,
            topTexture:
              fileMap[`${item.name}-topTexture.png`] || item.topTexture,
            wallTexture:
              fileMap[`${item.name}-wallTexture.png`] || item.wallTexture,
          }));

          setLots((prev) => [...(prev || []), ...updatedData]);
        } else {
          console.error("The JSON does not contain a valid array.");
        }
      } catch (error) {
        console.error("Error processing JSON:", error);
      }
    }
  }

  setFiles((prev) => {
    prev.forEach((f) => URL.revokeObjectURL(f.url));
    return newFiles;
  });
}
