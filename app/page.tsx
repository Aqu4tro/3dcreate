'use client';
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import Floor from "@/components/floor/page";
import { CameraControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState } from "react";
import { PlusOneSharp } from "@mui/icons-material";
export default function Home() {
  const name_object = useState<string>('');
  const width = useState<number>(0);
  const height = useState<number>(0);
  const thick = useState<number>(0);
  
  return (
<div style={{width: '100vw', height: '100vh'}}>
<div>
  <div>
    <svg data-testid="PlusOneSharp" ></svg>
  </div>
</div>
<Canvas>      
        <PerspectiveCamera position={[0,0,-20]} >
        <Floor width={52} height={.2} size={52} />
        </PerspectiveCamera>
        <OrbitControls rotateSpeed={.2} />
      
      <ambientLight intensity={.1} />
      <directionalLight position={[5, -50, 5]} color="blue" />
    </Canvas>
</div>
     

  );
}
