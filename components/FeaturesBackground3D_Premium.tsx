"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Background 3D Premium - "Cyberespace Élégant"
 * Inspiré du brief : Fluide, High-Tech, Hypnotique
 * 
 * Caractéristiques :
 * - Réseau de particules interconnectées ondulant lentement
 * - Palette sombre : Noir → Bleu nuit avec accents Cyan/Violet/Magenta
 * - Mouvement organique et hypnotique (comme encre dans l'eau)
 * - Profondeur infinie avec fog volumétrique
 * - Lumière émissive diffuse (glow)
 */

// Particules microscopiques flottantes (poussière d'étoiles numériques)
function NeuralParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const numParticles = 3000; // Milliers de particules
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const sizes = new Float32Array(numParticles);

    for (let i = 0; i < numParticles; i++) {
      // Position aléatoire dans un grand volume
      positions[i * 3] = (Math.random() - 0.5) * 200; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z (profondeur)

      // Couleurs : Cyan, Violet, Magenta (diffuses)
      const rand = Math.random();
      if (rand < 0.3) {
        // Cyan électrique
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1.0;
      } else if (rand < 0.6) {
        // Violet profond
        colors[i * 3] = 0.6;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Magenta
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 0.8;
      }

      // Tailles variables (microscopiques)
      sizes[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions, colors, sizes };
  }, []);

  // Animation : Ondulation lente et organique (comme encre dans l'eau)
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positionAttribute = pointsRef.current.geometry.getAttribute('position');

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      // Ondulation organique (3 vagues combinées pour effet "liquide")
      const wave1 = Math.sin(x * 0.01 + time * 0.2) * 2;
      const wave2 = Math.cos(y * 0.01 + time * 0.15) * 2;
      const wave3 = Math.sin(z * 0.02 + time * 0.1) * 1.5;

      // Déplacement lent et hypnotique
      positionAttribute.setX(i, x + Math.sin(time * 0.1 + i) * 0.01);
      positionAttribute.setY(i, y + wave1 * 0.01);
      positionAttribute.setZ(i, z + (wave2 + wave3) * 0.01);

      // Reset si particule sort du volume
      if (Math.abs(positionAttribute.getX(i)) > 100) {
        positionAttribute.setX(i, (Math.random() - 0.5) * 200);
      }
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
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending} // Glow effect
        depthWrite={false}
      />
    </points>
  );
}

// Structures filaires (wireframes) subtiles
function WireframeStructures() {
  const groupRef = useRef<THREE.Group>(null);

  // Animation : Rotation lente et apparition/disparition douce
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Rotation très lente (hypnotique)
    groupRef.current.rotation.x = time * 0.05;
    groupRef.current.rotation.y = time * 0.03;

    // Pulsation d'opacité (apparition/disparition)
    const pulse = (Math.sin(time * 0.5) + 1) / 2; // 0 à 1
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        child.material.opacity = pulse * 0.15; // Très subtil
      }
    });
  });

  // Géométries abstraites (icosaèdres wireframe)
  const structures = useMemo(() => {
    const geometries = [];
    for (let i = 0; i < 5; i++) {
      const size = Math.random() * 10 + 5;
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 60;

      geometries.push(
        <mesh key={i} position={[x, y, z]}>
          <icosahedronGeometry args={[size, 1]} />
          <meshBasicMaterial
            color="#00D9FF" // Cyan
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      );
    }
    return geometries;
  }, []);

  return <group ref={groupRef}>{structures}</group>;
}

// Flux d'énergie liquide (lignes ondulantes interconnectées)
function EnergyFlow() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!linesRef.current) return;

    const time = state.clock.elapsedTime;

    // Ondulation des lignes
    linesRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Line) {
        const positionAttribute = child.geometry.getAttribute('position');
        for (let j = 0; j < positionAttribute.count; j++) {
          const y = positionAttribute.getY(j);
          const wave = Math.sin(j * 0.5 + time + i) * 2;
          positionAttribute.setY(j, y + wave * 0.01);
        }
        positionAttribute.needsUpdate = true;
      }
    });
  });

  // Lignes courbes (comme des connections neuronales)
  const lines = useMemo(() => {
    const lineElements = [];
    for (let i = 0; i < 20; i++) {
      const points = [];
      const numPoints = 50;
      
      for (let j = 0; j < numPoints; j++) {
        const x = (j - numPoints / 2) * 2;
        const y = Math.sin(j * 0.3) * 10 + (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 60;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));

      // Couleur aléatoire (Cyan/Violet/Magenta)
      const colors = [
        new THREE.Color(0x00D9FF), // Cyan
        new THREE.Color(0x9D4EDD), // Violet
        new THREE.Color(0xFF006E), // Magenta
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      lineElements.push(
        <line key={i} geometry={lineGeometry}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </line>
      );
    }
    return lineElements;
  }, []);

  return <group ref={linesRef}>{lines}</group>;
}

export default function FeaturesBackground3D_Premium() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ background: "transparent" }}
        onCreated={({ scene, gl }) => {
          // Dégradé noir → bleu nuit très foncé (via CSS, car Three.js bg = transparent)
          // Le dégradé est géré par Tailwind sur le parent

          // Fog volumétrique (brume numérique légère)
          scene.fog = new THREE.FogExp2(0x0a0a1a, 0.008); // Bleu nuit foncé, fog exponentiel

          // Antialiasing pour rendu premium
          gl.antialias = true;
        }}
      >
        {/* Lumière ambiante douce (subtile) */}
        <ambientLight intensity={0.2} color="#0a0a1a" />

        {/* Lumières directionnelles (god rays subtils) */}
        <directionalLight position={[10, 10, 5]} intensity={0.3} color="#00D9FF" />
        <directionalLight position={[-10, -10, 5]} intensity={0.2} color="#9D4EDD" />

        {/* Composants 3D */}
        <NeuralParticles />
        <WireframeStructures />
        <EnergyFlow />
      </Canvas>
    </div>
  );
}

