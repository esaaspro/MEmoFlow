"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export function DashboardParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        direction: "top",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.2,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 2,
        random: {
          enable: true,
          minimumValue: 1,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Particles
        id="dashboard-particles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0"
      />
    </div>
  );
}

