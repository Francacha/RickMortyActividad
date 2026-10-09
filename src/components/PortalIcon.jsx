import { useId } from 'react';

// Portal verde dibujado en SVG. Con `animado` el espiral gira lento (se desactiva con reduced motion).
const PortalIcon = ({ size = 32, animado = false, className = '' }) => {
  const id = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <radialGradient id={`${id}-relleno`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e9fbc9" />
          <stop offset="35%" stopColor="#b8e86f" />
          <stop offset="75%" stopColor="#97ce4c" />
          <stop offset="100%" stopColor="#4e8a22" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill={`url(#${id}-relleno)`} />
      <g className={animado ? 'portal-espiral' : undefined}>
        <path
          d="M32 32 A2 2 0 0 1 36 32 A4 4 0 0 1 28 32 A6 6 0 0 1 40 32 A8 8 0 0 1 24 32 A10 10 0 0 1 44 32 A12 12 0 0 1 20 32 A14 14 0 0 1 48 32 A16 16 0 0 1 16 32 A18 18 0 0 1 52 32 A20 20 0 0 1 12 32 A22 22 0 0 1 56 32"
          fill="none"
          stroke="#3d7419"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
      </g>
    </svg>
  );
};

export default PortalIcon;
