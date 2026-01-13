interface LogoProps {
  className?: string;
}

/**
 * Logo MemoFlow - "Smart Play Button"
 * Un bouton play (▶) dont la pointe éclate en signal/étincelle
 * Symbolise l'enregistrement audio qui devient intelligence
 */
export function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MemoFlow Logo"
    >
      <defs>
        {/* Gradient Violet → Rose */}
        <linearGradient
          id="logo-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>

      {/* Triangle Play Button avec coins arrondis */}
      <path
        d="M 8 6 L 8 26 L 22 16 Z"
        fill="url(#logo-gradient)"
        stroke="url(#logo-gradient)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Les 3 lignes radiantes (signal/étincelle) qui partent de la pointe */}
      
      {/* Ligne centrale (horizontale) */}
      <line
        x1="22"
        y1="16"
        x2="27"
        y2="16"
        stroke="url(#logo-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ligne supérieure (diagonale haut) */}
      <line
        x1="22"
        y1="16"
        x2="26"
        y2="11"
        stroke="url(#logo-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ligne inférieure (diagonale bas) */}
      <line
        x1="22"
        y1="16"
        x2="26"
        y2="21"
        stroke="url(#logo-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
