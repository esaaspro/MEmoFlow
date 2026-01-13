"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Tunnel Architectural - Grille Perspective
function ArchitecturalTunnel() {
  const groupRef = useRef<THREE.Group>(null);

  // Génération des lignes du tunnel
  const tunnelLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const segments = 30; // Nombre de segments en profondeur
    const gridSize = 8;  // Lignes horizontales et verticales

    // Lignes horizontales (haut et bas)
    for (let i = 0; i < segments; i++) {
      const z = -i * 3; // Espacement en profondeur
      const progress = i / segments; // 0 à 1
      
      // Couleur : Gris au début, Violet/Rose au centre/horizon
      let color: THREE.Color;
      if (progress > 0.5) {
        // Horizon : Gradient violet vers rose
        const horizonProgress = (progress - 0.5) * 2; // 0 à 1
        color = new THREE.Color().lerpColors(
          new THREE.Color(0xA855F7), // Violet
          new THREE.Color(0xEC4899), // Rose
          horizonProgress
        );
      } else {
        // Premier plan : Zinc-800
        color = new THREE.Color(0x27272a);
      }

      // Lignes horizontales (parallèles)
      for (let j = -gridSize / 2; j <= gridSize / 2; j += 2) {
        const points = [
          new THREE.Vector3(-gridSize, j, z),
          new THREE.Vector3(gridSize, j, z),
        ];
        
        lines.push(
          <line key={`h-${i}-${j}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  points[0].x, points[0].y, points[0].z,
                  points[1].x, points[1].y, points[1].z,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={color}
              transparent
              opacity={progress > 0.5 ? 0.8 : 0.3}
            />
          </line>
        );
      }

      // Lignes verticales (parallèles)
      for (let j = -gridSize / 2; j <= gridSize / 2; j += 2) {
        const points = [
          new THREE.Vector3(j, -gridSize, z),
          new THREE.Vector3(j, gridSize, z),
        ];
        
        lines.push(
          <line key={`v-${i}-${j}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  points[0].x, points[0].y, points[0].z,
                  points[1].x, points[1].y, points[1].z,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={color}
              transparent
              opacity={progress > 0.5 ? 0.8 : 0.3}
            />
          </line>
        );
      }
    }

    return lines;
  }, []);

  // Animation : Mouvement vers l'avant constant
  useFrame(() => {
    if (!groupRef.current) return;
    
    // Avancer lentement
    groupRef.current.position.z += 0.05;
    
    // Reset quand on a avancé d'un segment
    if (groupRef.current.position.z > 3) {
      groupRef.current.position.z = 0;
    }
  });

  return <group ref={groupRef}>{tunnelLines}</group>;
}

// Lignes de convergence (perspective vers le point de fuite)
function PerspectiveLines() {
  const lines = useMemo(() => {
    const perspectiveLines: JSX.Element[] = [];
    const gridSize = 8;

    // Lignes qui convergent vers le centre au fond
    for (let i = -gridSize / 2; i <= gridSize / 2; i += 2) {
      // Lignes horizontales convergeant
      const pointsH = [
        new THREE.Vector3(i, -gridSize, 0),
        new THREE.Vector3(0, 0, -90),
      ];
      
      perspectiveLines.push(
        <line key={`ph-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                pointsH[0].x, pointsH[0].y, pointsH[0].z,
                pointsH[1].x, pointsH[1].y, pointsH[1].z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={0x27272a}
            transparent
            opacity={0.2}
          />
        </line>
      );

      // Lignes verticales convergeant
      const pointsV = [
        new THREE.Vector3(-gridSize, i, 0),
        new THREE.Vector3(0, 0, -90),
      ];
      
      perspectiveLines.push(
        <line key={`pv-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                pointsV[0].x, pointsV[0].y, pointsV[0].z,
                pointsV[1].x, pointsV[1].y, pointsV[1].z,
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={0x27272a}
            transparent
            opacity={0.2}
          />
        </line>
      );
    }

    return perspectiveLines;
  }, []);

  return <group>{lines}</group>;
}

export default function PricingBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: "transparent" }}
        onCreated={({ scene }) => {
          // Brouillard pour profondeur
          scene.fog = new THREE.Fog(0x09090b, 20, 80);
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, -40]} intensity={1.5} color="#A855F7" />
        <pointLight position={[0, 0, -60]} intensity={1} color="#EC4899" />

        <ArchitecturalTunnel />
        <PerspectiveLines />
      </Canvas>
    </div>
  );
}

