"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Champ de Particules Ondulatoire FULLSCREEN - "Neural Audio Wave"
function NeuralWaveField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Génération de la grille ÉTENDUE pour couvrir tout l'écran
  const { positions, colors } = useMemo(() => {
    const gridSize = 150; // Augmenté de 100 → 150 pour plus de densité
    const spacing = 0.8;  // Augmenté de 0.5 → 0.8 pour couvrir plus d'espace
    const positions = new Float32Array(gridSize * gridSize * 3);
    const colors = new Float32Array(gridSize * gridSize * 3);

    let index = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing;
        const y = (j - gridSize / 2) * spacing;
        const z = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Couleur de base : Zinc-800 (gris foncé)
        colors[index * 3] = 0.16; // R
        colors[index * 3 + 1] = 0.16; // G
        colors[index * 3 + 2] = 0.16; // B

        index++;
      }
    }

    return { positions, colors };
  }, []);

  // Animation d'onde respiratoire FULLSCREEN
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    const colorAttribute = geometry.getAttribute('color');

    const gridSize = 150; // Doit correspondre à la génération
    const spacing = 0.8;  // Doit correspondre à la génération

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        const x = (i - gridSize / 2) * spacing;
        const y = (j - gridSize / 2) * spacing;

        // Onde sinusoïdale amplifiée avec mouvement horizontal
        const distance = Math.sqrt(x * x + y * y);
        const horizontalWave = Math.sin(x * 0.2 + time * 1.2); // Vague horizontale
        const radialWave = Math.sin(distance * 0.3 - time * 0.8) * Math.cos(y * 0.1 + time * 0.5);
        const wave = (horizontalWave + radialWave) * 0.6; // Combinaison des deux
        const z = wave * 4; // Amplitude augmentée de 3 → 4

        positionAttribute.setZ(index, z);

        // Illumination violette renforcée + gris métallique
        const intensity = (wave + 1) / 2; // Normalise entre 0 et 1
        
        if (intensity > 0.5) { // Seuil abaissé de 0.7 → 0.5 pour plus de violet
          // Violet #A855F7 plus intense
          const boost = intensity * 1.5; // Boost de luminosité
          colorAttribute.setXYZ(
            index,
            0.66 * boost, // R
            0.33 * boost, // G
            0.97 * boost  // B
          );
        } else if (intensity > 0.3) {
          // Gris métallique intermédiaire
          colorAttribute.setXYZ(
            index,
            0.5 * intensity,  // R
            0.5 * intensity,  // G
            0.55 * intensity  // B (légère teinte bleue)
          );
        } else {
          // Zinc-700 (plus clair que zinc-800)
          colorAttribute.setXYZ(index, 0.25, 0.25, 0.25);
        }
      }
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
  });

  return (
    <points 
      ref={pointsRef} 
      rotation={[-Math.PI / 6, 0, 0]}  // Rotation réduite de 45° → 30° pour plus de frontalité
      position={[0, -5, -15]}          // Plus proche : -10/-20 → -5/-15
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}           // Réduit de 0.15 → 0.12 (subtil pour fullscreen)
        vertexColors
        transparent
        opacity={0.9}         // Réduit de 1 → 0.9 (légèrement transparent pour ne pas gêner le texte)
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Globe central SUPPRIMÉ pour effet fullscreen immersif

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 75 }}  // Caméra ajustée pour vue fullscreen
        style={{ background: "transparent" }}
        onCreated={({ scene }) => {
          // Brouillard pour profondeur infinie
          scene.fog = new THREE.Fog(0x09090b, 25, 70); // Ajusté pour la nouvelle distance
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#A855F7" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#9333EA" />

        <NeuralWaveField />
        {/* GhostSphere SUPPRIMÉE - Fullscreen wave only */}
      </Canvas>
    </div>
  );
}

