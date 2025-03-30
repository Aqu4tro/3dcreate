import { Component } from "@/components/componentBlock/page";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import ComponentAdd from "../componentAdd/page";

export default function AddWall({
  H,
  W,
  L,
  components,
  name,
  texture,
}: {
  H: number;
  W: number;
  L: number;
  components: Component[];
  name: string;
  texture: THREE.Texture;
}) {

  const wallGeometry = new THREE.BoxGeometry(W, H, L);
  const wallMaterial =  new THREE.MeshStandardMaterial({ map: texture });
  let finalMesh = new THREE.Mesh(wallGeometry, wallMaterial);

  let commonMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
  components.forEach((f) => {
    
    if (
      f.wall === name
    ) {
     
      commonMesh.scale.set(
        f.scale[0],
        f.scale[1],
         !f.type ? f.scale[0] : f.wall === "F" || f.wall==="B" ? f.scale[2]*1.5 : f.scale[0],
      );
      
      commonMesh.position.set((f.wall === "R" || f.wall === "L") ? 0 : f.position[0], f.position[1], (f.wall === "B" || f.wall === "F") ? 0 : f.position[2]);

      commonMesh.updateMatrix();

      let result = CSG.subtract(finalMesh, commonMesh);
      finalMesh = result as THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
    }
  });
  finalMesh.updateMatrix();

  return (
    <group>
      <mesh geometry={finalMesh.geometry} material={finalMesh.material}>
        {components?.map((f) => {
          
          return (f.wall === name ? <ComponentAdd key={f.id} component={f} /> : null);
        })}
      </mesh>
    </group>
  );
}
