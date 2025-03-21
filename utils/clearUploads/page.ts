export default async function handleClearUploads() {
    const response = await fetch("/api/uploads", { method: "DELETE" });
    const data = await response.json();
  
    if (response.ok) {
      console.log(data.message);
    } else {
      console.error("Erro:", data.error);
    }
  }
  