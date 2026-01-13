import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#18181B', // Zinc-900 (fond sombre)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px', // Léger arrondi
        }}
      >
        {/* Logo SVG - Smart Play Button */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient Violet → Rose */}
            <linearGradient
              id="favicon-gradient"
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
            fill="url(#favicon-gradient)"
            stroke="url(#favicon-gradient)"
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
            stroke="url(#favicon-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Ligne supérieure (diagonale haut) */}
          <line
            x1="22"
            y1="16"
            x2="26"
            y2="11"
            stroke="url(#favicon-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Ligne inférieure (diagonale bas) */}
          <line
            x1="22"
            y1="16"
            x2="26"
            y2="21"
            stroke="url(#favicon-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
