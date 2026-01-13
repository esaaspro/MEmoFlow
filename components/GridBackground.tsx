"use client";

export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-20">
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(9, 9, 11, 0.9) 100%)",
        }}
      />
    </div>
  );
}

