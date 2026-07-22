import React from 'react';

interface NexusLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const NexusLogo: React.FC<NexusLogoProps> = ({
  size = 36,
  showText = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Ambient Outer Blue/Cyan Glow */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 blur-md opacity-60 animate-pulse"
          style={{ width: size, height: size }}
        />

        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Main Gradient */}
            <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Glowing Ring Gradient */}
            <linearGradient id="ringGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>

            {/* Node Radial Glow */}
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Circular Network Orbit Ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#ringGradient)"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-spin"
            style={{ animationDuration: '30s' }}
          />

          {/* Outer Network Connecting Lines */}
          <path
            d="M 22 22 L 50 12 L 78 22 L 88 50 L 78 78 L 50 88 L 22 78 L 12 50 Z"
            stroke="#2563EB"
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          {/* Stylized Node Network Letter 'N' */}
          {/* Left Vertical Pillar */}
          <path
            d="M 28 72 L 28 28"
            stroke="url(#nexusGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Diagonal Connector */}
          <path
            d="M 28 28 L 72 72"
            stroke="url(#nexusGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Right Vertical Pillar */}
          <path
            d="M 72 72 L 72 28"
            stroke="url(#nexusGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Network Nodes (Interconnected Dots representing Principal, Teacher, Student, Admin) */}
          {/* Top Node - Principal */}
          <circle cx="50" cy="12" r="5" fill="#38BDF8" />
          <circle cx="50" cy="12" r="8" fill="url(#nodeGlow)" />

          {/* Right Node - Teacher */}
          <circle cx="88" cy="50" r="5" fill="#38BDF8" />
          <circle cx="88" cy="50" r="8" fill="url(#nodeGlow)" />

          {/* Bottom Node - Student */}
          <circle cx="50" cy="88" r="5" fill="#38BDF8" />
          <circle cx="50" cy="88" r="8" fill="url(#nodeGlow)" />

          {/* Left Node - Admin */}
          <circle cx="12" cy="50" r="5" fill="#38BDF8" />
          <circle cx="12" cy="50" r="8" fill="url(#nodeGlow)" />

          {/* 'N' Vertex Connection Points */}
          <circle cx="28" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="72" cy="72" r="4.5" fill="#FFFFFF" />
          <circle cx="72" cy="28" r="4" fill="#38BDF8" />
          <circle cx="28" cy="72" r="4" fill="#38BDF8" />

          {/* Center Connection Lines connecting outer nodes to central 'N' */}
          <line x1="50" y1="12" x2="28" y2="28" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="88" y1="50" x2="72" y2="28" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="50" y1="88" x2="72" y2="72" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="12" y1="50" x2="28" y2="72" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-wider text-white font-mono flex items-center gap-1">
            KLYRO TECH
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </span>
          <span className="text-[9px] font-semibold tracking-widest text-cyan-400 uppercase -mt-1">
            Digital Campus
          </span>
        </div>
      )}
    </div>
  );
};

export const KlyroLogo = NexusLogo;
