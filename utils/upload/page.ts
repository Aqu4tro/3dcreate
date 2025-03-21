import { Room } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

export async function handleUpload(file: File, name: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Falha ao fazer upload do arquivo");
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
    console.warn("Nenhum arquivo selecionado.");
    return;
  }

  const fileArray = Array.from(files);
  console.log("Arquivos selecionados:", fileArray.map((f) => f.name));

  const validFiles = fileArray.filter((file) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return ["json", "png", "jpg", "jpeg"].includes(fileExtension || "");
  });

  if (validFiles.length === 0) {
    console.warn("Nenhum arquivo válido encontrado.");
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
            return "JSON processado";
          } else {
            console.error("O JSON não contém um array.");
          }
        } catch (error) {
          console.error("Erro ao processar JSON:", error);
        }
      } else if (fileExtension && ["png", "jpg", "jpeg"].includes(fileExtension)) {
        try {
          return await handleUpload(file, file.name);
        } catch (error) {
          console.error("Erro ao fazer upload:", error);
        }
      } else {
        console.warn(`Arquivo ignorado: ${file.name}`);
      }
      return null;
    })
  );

  console.log("Arquivos enviados:", uploadedFileUrls.filter(Boolean));
}
