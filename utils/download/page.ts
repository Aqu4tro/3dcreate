import { Room } from '@/app/page';
import JSZip from 'jszip';

export default function downloadRoomsAsJson(lot: Room[]) {
  const zip = new JSZip();


  const jsonData = JSON.stringify(lot, null, 2);
  zip.file('data.json', jsonData);


  const imageUrls = lot.flatMap(room =>
    [room.wallTexture, room.topTexture, room.floorTexture].filter(Boolean)
  );

  Promise.all(imageUrls.map(async (url) => {
    if (url != null)
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split('/').pop() || 'image.jpg';
        zip.file(`images/${fileName}`, blob);
      } catch (error) {
        console.error(`Download error ${url}:`, error);
      }
  })).then(() => {
    zip.generateAsync({ type: 'blob' })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ambiente.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  });
};
