import { Component } from "@/components/componentBlock/page";
import Door from "@/public/assets/objects/door/Scene";
import { Window } from "@/public/assets/objects/window/Scene";

export default function ComponentAdd({ component }: { component: Component }) {
  return (
    <mesh
      rotation={[
        0,
        component.wall === "F" || component.wall === "B"
          ? component.type
            ? 1.575
            : 0
          : 0,
        0,
      ]}
      position={[
         component.position[0],
        component.position[1],
        component.position[2],
      ]}
      scale={[
        component.type
          ? 0.01
          : component.scale[0] / 10 + (component.type ? 0 : 0.5),
        component.scale[1] / 10 + (component.type ? 0 : 0.3),
        component.type ? component.scale[2] / 10 : 0.01,
      ]}
    >
      {component.type ? <Door /> : <Window />}
    </mesh>
  );
}
