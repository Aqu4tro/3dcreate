import { Component } from "@/components/componentBlock/page";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import ComponentAdd from "../componentAdd/page";

export default function AddWall({
  x,
  y,
  z,
  H,
  W,
  L,
  components,
  name,
  texture,
}: {
  x: number;
  y: number;
  z: number;
  H: number;
  W: number;
  L: number;
  components: Component[];
  name: string;
  texture: THREE.Texture;
}) {
  // Create the wall geometry and material
  const wallGeometry = new THREE.BoxGeometry(W, H, L);
  const wallMaterial = new THREE.MeshStandardMaterial({ map: texture });
  const finalMesh = new THREE.Mesh(wallGeometry, wallMaterial);

  // Set the position of the final mesh
  finalMesh.position.set(x, y, z);

  // Perform CSG operations for each component
  components.forEach((f) => {
    if (
      (f.wall === "F" && name === "B") ||
      (f.wall === "B" && name === "F") ||
      (f.wall === "R" && name === "R") ||
      (f.wall === "L" && name === "L")
    ) {
      const commonGeometry = new THREE.BoxGeometry(
        ...(f.type
          ? [
              f.wall === "L" || f.wall === "R" ? 0.15 : 0.97,
              2.05,
              f.wall === "L" || f.wall === "R" ? 0.8 : 0.15,
            ]
          : [
              f.wall === "L" || f.wall === "R" ? 0.15 : 1.4,
              1.1,
              f.wall === "L" || f.wall === "R" ? 0.8 : 0.15,
            ])
      );

      const commonMesh = new THREE.Mesh(commonGeometry);
      commonMesh.position.set(f.position[0], f.position[1], f.position[2]);

      // Ensure the matrices are updated
      //commonMesh.updateMatrix();
      //finalMesh.updateMatrix();

      // Perform CSG operation
      const finalCSG = CSG.fromMesh(finalMesh);
      const commonCSG = CSG.fromMesh(commonMesh);
      const subtractedCSG = finalCSG.subtract(commonCSG);
      const subtractedMesh = CSG.toMesh(
        subtractedCSG,
        finalMesh.matrix,
        finalMesh.material as THREE.Material
      );

      // Update finalMesh with the new geometry and material
      //finalMesh.geometry.dispose(); 
      finalMesh.geometry = subtractedMesh.geometry as THREE.BoxGeometry; // Update geometry
      finalMesh.material = subtractedMesh.material as THREE.MeshStandardMaterial; // Update material
    }
  });

  return (
    <group>
      <mesh geometry={finalMesh.geometry} material={finalMesh.material} />
      {components?.map((f) =>
        f.wall === name ? <ComponentAdd key={f.id} component={f} /> : null
      )}
    </group>
  );
}