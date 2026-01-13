"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardParticles } from "@/components/ui/DashboardParticles";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background Texture/Noise */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particles Background Effect */}
      <DashboardParticles />

      {/* Sidebar - Fixed, Sticky */}
      <Sidebar />

      {/* Main Content - Scrollable */}
      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

