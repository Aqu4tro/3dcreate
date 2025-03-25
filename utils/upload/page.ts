import { Room } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

export async function handleUpload(file: File, name: string): Promise<string> {
  let fileName = name;

  if (!fileName.includes(".")) {
    fileName += ".png";
  }
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", fileName);

  const response = await fetch("./api/uploads", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
  return data.url;
}

export async function handleUploadAmbience(
  event: React.ChangeEvent<HTMLInputElement>,
  setLots: Dispatch<SetStateAction<Room[]>>
) {
  const files = event.target.files;

  if (!files || files.length === 0) {
    console.warn("No files selected.");
    return;
  }

  const fileArray = Array.from(files);
  

  const validFiles = fileArray.filter((file) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return ["json", "png", "jpg", "jpeg"].includes(fileExtension || "");
  });

  if (validFiles.length === 0) {
    console.warn("No valid files found.");
    return;
  }

  const uploadedFileUrls = await Promise.all(
    validFiles.map(async (file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "json") {
        try {
          const jsonData = await file.text();
          const parsedData = JSON.parse(jsonData);
          if (Array.isArray(parsedData)) {
            setLots((prev) => [...(prev || []), ...parsedData]);
            return "JSON processed";
          } else {
            console.error("JSON does not contain an array.");
          }
        } catch (error) {
          console.error("Error processing JSON:", error);
        }
      } else if (fileExtension && ["png", "jpg", "jpeg"].includes(fileExtension)) {
        try {
          return await handleUpload(file, file.name);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        console.warn(`File ignored: ${file.name}`);
      }
      return null;
    })
  );

  
}
