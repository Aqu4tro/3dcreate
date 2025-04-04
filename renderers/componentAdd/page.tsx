import { Component } from "@/components/componentBlock/page";
import Door from "@/public/assets/objects/door/Scene";
import { Window } from "@/public/assets/objects/window/Scene";

export default function ComponentAdd({ component }: { component: Component }) {
  return (
    <mesh
      rotation={[
        0,
        component.wall === "F" || component.wall === "B"
          ? !component.type
            ? 1.575
            : 0
          : !component.type
          ? 0
          : 1.575,
        0,
      ]}
      position={[
        component.position[0],
        component.position[1],
        component.position[2] -
          (component.wall === "F" || component.wall === "B" ? 0.1 : 0),
      ]}
      scale={[
        component.type ? component.scale[0] : component.scale[2],
        component.scale[1],
        !component.type
          ? component.scale[0] * 0.0101
          : component.scale[2] + 0.01,
      ]}
    >
      {component.type === 0 ? (
        <Door />
      ) : component.type === 1 ? (
        <Window />
      ) : null}
    </mesh>
  );
}
