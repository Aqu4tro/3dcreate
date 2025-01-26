import { Component } from "@/components/componentBlock/page";
import Door from "@/public/assets/objects/door/Scene"
import { useGLTF } from "@react-three/drei"
import { useEffect } from "react";


export default function ComponentAdd({component}: {component:Component}) {
    
    const {scene} = useGLTF(component.type ? '/assets/objects/door/scene.gltf' : '/assets/objects/window/scene.gltf');
    
    return(
        <>
            <mesh position={[component.position[0], component.position[1],component.position[2]]} scale={component.scale}>
                <primitive object={scene} />
            </mesh>
        </>
    )
}