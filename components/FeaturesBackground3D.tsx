"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pluie de Données Ascendante - "Data Flow Upload"
function DataFlowParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Génération des particules en pluie
  const { positions, colors, velocities } = useMemo(() => {
    const particleCount = 3000; // 3000 particules pour un effet dense mais subtil
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount); // Vitesse de montée par particule

    for (let i = 0; i < particleCount; i++) {
      // Position initiale aléatoire dans l'espace
      positions[i * 3] = (Math.random() - 0.5) * 100;     // X: -50 à 50
      positions[i * 3 + 1] = Math.random() * 100 - 50;    // Y: -50 à 50 (départ aléatoire)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;  // Z: -25 à 25 (profondeur)

      // Vitesse aléatoire de montée (variation pour effet naturel)
      velocities[i] = 0.02 + Math.random() * 0.03; // Entre 0.02 et 0.05

      // Distribution des couleurs : 85% Gris, 10% Violet, 5% Rose
      const colorRoll = Math.random();
      
      if (colorRoll < 0.85) {
        // Zinc-800 (gris foncé) - Majorité
        colors[i * 3] = 0.25;
        colors[i * 3 + 1] = 0.25;
        colors[i * 3 + 2] = 0.25;
      } else if (colorRoll < 0.95) {
        // Violet #A855F7
        colors[i * 3] = 0.66;
        colors[i * 3 + 1] = 0.33;
        colors[i * 3 + 2] = 0.97;
      } else {
        // Rose #EC4899
        colors[i * 3] = 0.93;
        colors[i * 3 + 1] = 0.28;
        colors[i * 3 + 2] = 0.6;
      }
    }

    return { positions, colors, velocities };
  }, []);

  // Animation : Montée continue des particules
  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.getAttribute('position');

    for (let i = 0; i < velocities.length; i++) {
      // Récupérer la position Y actuelle
      let y = positionAttribute.getY(i);

      // Monter la particule
      y += velocities[i];

      // Si la particule dépasse le haut (Y > 50), la repositionner en bas
      if (y > 50) {
        y = -50;
        // Randomiser légèrement X et Z pour varier le flux
        positionAttribute.setX(i, (Math.random() - 0.5) * 100);
        positionAttribute.setZ(i, (Math.random() - 0.5) * 50);
      }

      positionAttribute.setY(i, y);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
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
        size={0.1}              // Petites particules subtiles
        vertexColors
        transparent
        opacity={0.7}           // Légèrement transparent pour subtilité
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Traits lumineux ascendants (variante pour plus de richesse)
function DataStreaks() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const streakCount = 200; // 200 traits lumineux
    const positions = new Float32Array(streakCount * 6); // 2 points par trait (start, end)
    const colors = new Float32Array(streakCount * 6);

    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 100 - 50;
      const z = (Math.random() - 0.5) * 50;
      const streakLength = 1 + Math.random() * 3; // Longueur entre 1 et 4

      // Point de départ
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;

      // Point d'arrivée (au-dessus)
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y + streakLength;
      positions[i * 6 + 5] = z;

      // Couleur : majorité violet/rose pour les traits
      const isViolet = Math.random() > 0.5;
      
      for (let j = 0; j < 2; j++) { // Appliquer aux 2 points du trait
        if (isViolet) {
          colors[i * 6 + j * 3] = 0.66;
          colors[i * 6 + j * 3 + 1] = 0.33;
          colors[i * 6 + j * 3 + 2] = 0.97;
        } else {
          colors[i * 6 + j * 3] = 0.93;
          colors[i * 6 + j * 3 + 1] = 0.28;
          colors[i * 6 + j * 3 + 2] = 0.6;
        }
      }
    }

    return { positions, colors };
  }, []);

  // Animation des traits (montée lente)
  useFrame(() => {
    if (!linesRef.current) return;

    const positionAttribute = linesRef.current.geometry.getAttribute('position');

    for (let i = 0; i < 200; i++) {
      // Monter les 2 points du trait
      for (let j = 0; j < 2; j++) {
        const idx = i * 6 + j * 3;
        let y = positionAttribute.array[idx + 1];
        y += 0.04; // Vitesse de montée

        // Reset si dépasse le haut
        if (y > 50) {
          y = -50;
          // Repositionner X et Z aléatoirement
          positionAttribute.array[idx] = (Math.random() - 0.5) * 100;
          positionAttribute.array[idx + 2] = (Math.random() - 0.5) * 50;
        }

        positionAttribute.array[idx + 1] = y;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
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
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export default function FeaturesBackground3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: "transparent" }}
        onCreated={({ scene }) => {
          // Brouillard noir pour profondeur
          scene.fog = new THREE.Fog(0x09090b, 15, 60);
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[20, 20, 20]} intensity={0.5} color="#A855F7" />
        <pointLight position={[-20, -20, 20]} intensity={0.3} color="#EC4899" />

        <DataFlowParticles />
        <DataStreaks />
      </Canvas>
    </div>
  );
}

