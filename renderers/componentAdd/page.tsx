import { Component } from "@/components/componentBlock/page";
import { useGLTF } from "@react-three/drei"

export default function ComponentAdd({ component }: { component: Component }) {

    const { scene } = useGLTF(component.type ? '/assets/objects/door/scene.gltf' : '/assets/objects/window/scene.gltf');
    
    return (
        
            <mesh rotation={[0, component.wall === "F" || component.wall === "B" ? component.type ? 1.575 : 0 : 0, 0]} position={[component.position[0], component.position[1], component.position[2]]} scale={[component.type ? 0.01 : component.scale[0] / 10 + (component.type ? 0 : .5), component.scale[1] / 10 + (component.type ? 0 : 0.3), component.type ? component.scale[2] / 10 : 0.01]}>
                <primitive object={scene} />
            </mesh>
        
    )
}