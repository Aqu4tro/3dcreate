import { Room } from '@/app/page';
import JSZip from 'jszip';

export default async function downloadRoomsAsJson(lot: Room[]) {
  const zip = new JSZip();

  const jsonData = JSON.stringify(lot, null, 2);
  zip.file('data.json', jsonData);

  const imagesFolder = zip.folder('images');

  const imageUrls = lot.flatMap(room => {
    const roomTextures = [room.wallTexture, room.topTexture, room.floorTexture].filter(url => url != null);
    const blockTextures = room.objects?.flatMap(block => 
      [block.wallTexture, block.topTexture, block.floorTexture].filter(url => url != null)
    ) || [];
    return [...roomTextures, ...blockTextures];
  });

  const imagePromises = imageUrls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
  
      const blob = await response.blob();
      if (blob.size === 0) throw new Error("Empty image received");
  
      let fileName = url.split('/').pop()?.trim() || `image_${Date.now()}.jpg`;
  
      if (!fileName.match(/\.(jpg|jpeg|png|webp)$/i)) {
        fileName = `image_${Date.now()}.jpg`;
      }
  
      imagesFolder?.file(fileName, blob);
    } catch (error) {
      console.error(`Error downloading ${url}:`, error);
    }
  });

  await Promise.all(imagePromises);

  zip.generateAsync({ type: 'blob' }).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'environment.zip';
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); 
  });
};
