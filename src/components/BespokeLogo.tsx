interface BespokeLogoProps {
  variant?: 'default' | 'wordmark' | 'icon-only' | 'stacked' | 'mono-dark' | 'mono-light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: { badge: 28, font: 'text-lg', stackFont: 'text-base', tagline: 'text-[9px]' },
  md: { badge: 36, font: 'text-2xl', stackFont: 'text-xl', tagline: 'text-[10px]' },
  lg: { badge: 48, font: 'text-3xl', stackFont: 'text-2xl', tagline: 'text-xs' },
  xl: { badge: 72, font: 'text-5xl', stackFont: 'text-4xl', tagline: 'text-sm' },
};

function BespokeIcon({ size, mono, onDark }: { size: number; mono?: boolean; onDark?: boolean }) {
  const fg = mono ? (onDark ? '#ffffff' : '#0f172a') : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor={mono ? (onDark ? '#334155' : '#94a3b8') : '#0d9488'} />
          <stop offset="1" stopColor={mono ? (onDark ? '#1e293b' : '#64748b') : '#2563eb'} />
        </linearGradient>
        <linearGradient id="accent-grad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor={mono ? (onDark ? '#94a3b8' : '#475569') : '#5eead4'} />
          <stop offset="1" stopColor={mono ? (onDark ? '#64748b' : '#334155') : '#93c5fd'} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#bg-grad)" />
      <text
        x="20"
        y="28"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="24"
        fill={fg ?? 'white'}
        letterSpacing="-1"
      >
        B
      </text>
      <path
        d="M 10 31 Q 20 35 30 31"
        stroke={fg ?? 'url(#accent-grad)'}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

export default function BespokeLogo({ variant = 'default', size = 'md', className = '' }: BespokeLogoProps) {
  const s = sizes[size];

  if (variant === 'icon-only') {
    return (
      <span className={`inline-flex ${className}`}>
        <BespokeIcon size={s.badge} />
      </span>
    );
  }

  if (variant === 'wordmark') {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <BespokeIcon size={s.badge * 2} />
        <span className={`${s.font} font-bold tracking-tight`}>
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Bespoke</span>
          <span className="text-gray-800"> IELTS</span>
        </span>
      </span>
    );
  }

  if (variant === 'stacked') {
    return (
      <span className={`inline-flex flex-col items-center gap-1 ${className}`}>
        <BespokeIcon size={s.badge} />
        <span className={`${s.stackFont} font-bold tracking-tight leading-none`}>
          <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Bespoke</span>
          <span className="text-gray-800"> IELTS</span>
        </span>
        <span className={`${s.tagline} font-medium text-gray-500 tracking-widest uppercase`}>
          Expert Coaching
        </span>
      </span>
    );
  }

  if (variant === 'mono-dark') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <BespokeIcon size={s.badge} mono onDark />
        <span className={`${s.font} font-bold tracking-tight text-white`}>
          Bespoke<span className="opacity-70"> IELTS</span>
        </span>
      </span>
    );
  }

  if (variant === 'mono-light') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <BespokeIcon size={s.badge} mono />
        <span className={`${s.font} font-bold tracking-tight text-slate-800`}>
          Bespoke<span className="text-slate-500"> IELTS</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BespokeIcon size={s.badge} />
      <span className={`${s.font} font-bold tracking-tight`}>
        <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Bespoke IELTS</span>
      </span>
    </span>
  );
}
