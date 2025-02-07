import { Component } from "@/components/componentBlock/page";
import { use, useEffect } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

 export default function AddWall({ H, W, L, components , name, texture}: { H: number; W: number; L: number; components: Component[]; name: string ; texture: THREE.Texture}) {
    useEffect(() => {
        console.log("Components updated:", components);
    }, [components]);
    const wallGeometry = new THREE.BoxGeometry(W, H, L);
    let Mesh = new THREE.Mesh(wallGeometry, new THREE.MeshStandardMaterial({ map: texture }));
    let finalMesh = Mesh;
    if (components.length > 0) {
      components.forEach((f) => {
        if (f.wall === "F" && name === "B" || f.wall === "B" && name === "F" || f.wall === "R" && name === "R" || f.wall === "L" && name === "L") {
          const commonGeometry = new THREE.BoxGeometry(...(f.type ? [f.wall ===  "L" || f.wall === "R" ? 0.15 :0.8 , 2.1, f.wall ===  "L" || f.wall === "R" ? 0.8 : 0.15] : [f.wall ===  "L" || f.wall === "R" ? 0.15 : 1.4 , 1.1, f.wall ===  "L" || f.wall === "R" ? 0.8 : 0.15]));
          const commonMesh = new THREE.Mesh(commonGeometry);
          const finalCSG = CSG.fromMesh(finalMesh);
          const commonCSG = CSG.fromMesh(commonMesh);
          const subtractedCSG = finalCSG.subtract(commonCSG);
          const subtractedMesh = CSG.toMesh(subtractedCSG, finalMesh.matrix, finalMesh.material as THREE.Material);
          finalMesh.geometry = subtractedMesh.geometry as THREE.BoxGeometry;
          finalMesh.material = subtractedMesh.material as THREE.MeshStandardMaterial;
        }
      });
    }
  
    return (
      <mesh geometry={finalMesh.geometry} material={finalMesh.material} position={[0, 0, 0]} />
    );
  }
  