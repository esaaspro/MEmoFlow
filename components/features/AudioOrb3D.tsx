"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AudioSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    timeRef.current += delta;
    const time = timeRef.current;

    // Ondulation liquide comme une fréquence audio
    const geometry = meshRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const distance = vertex.length();
      
      // Effet de pulsation audio
      const wave1 = Math.sin(distance * 2 + time * 1.5) * 0.1;
      const wave2 = Math.cos(distance * 3 - time * 2) * 0.08;
      const displacement = wave1 + wave2;
      
      vertex.normalize().multiplyScalar(distance + displacement);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;

    // Rotation lente
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#9333ea"
        emissive="#db2777"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

export function AudioOrb3D() {
  return (
    <div className="relative h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#9333ea" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#db2777" />
        <AudioSphere />
      </Canvas>
    </div>
  );
}

