export default async function handleUpload(file: File, name: string) {
  const formData = new FormData();
  
 
  formData.append("file", file);
  formData.append("name", name);

 
  const response = await fetch('http://localhost:3000/api/uploads', {
    method: 'POST',
    body: formData, 
  });

  console.log(response.body)
  if (!response.ok) {
    throw new Error('Falha ao fazer upload do arquivo');
  }

  
  const data = await response.json();
  

  
  return data.url;
}
