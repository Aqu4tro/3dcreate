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
  const wallMaterial = new THREE.MeshStandardMaterial({ map: texture });
  let finalMesh = new THREE.Mesh(wallGeometry, wallMaterial);

  let commonMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());

  components.forEach((f) => {
    if (
      (f.wall === "F" && name === "F") ||
      (f.wall === "B" && name === "B") ||
      (f.wall === "R" && name === "R") ||
      (f.wall === "L" && name === "L")
    ) {

      commonMesh.scale.set(
        f.type ? (f.wall === "L" || f.wall === "R" ? 0.15 : 0.97) : (f.wall === "L" || f.wall === "R" ? 0.15 : 1.4),
        f.type ? 2.05 : 1.1,
        f.wall === "L" || f.wall === "R" ? 0.8 : 0.15
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
