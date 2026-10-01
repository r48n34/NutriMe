import { useId } from "react";

export function DispenserArt() {
  const id = useId();
  return (
    <svg
      viewBox="0 0 280 210"
      role="img"
      aria-label="Sample personalised dispenser box and daily tear-pack for Alex"
    >
      <defs>
        <linearGradient id={`${id}-box`} x2="1" y2="1">
          <stop stopColor="#e5edd8" />
          <stop offset="1" stopColor="#c2d5b4" />
        </linearGradient>
      </defs>
      <rect width="280" height="210" fill="#edf2e5" />
      <ellipse cx="142" cy="182" rx="104" ry="12" fill="#294939" opacity=".1" />
      <path d="m48 62 97-24 65 28-96 24Z" fill="#f5f8ec" />
      <path d="m48 62 66 28v90l-66-29Z" fill="#a8c399" />
      <path d="m114 90 96-24v90l-96 24Z" fill={`url(#${id}-box)`} />
      <path d="m130 149 64-16v15l-64 16Z" fill="#547954" />
      <text x="131" y="107" fill="#294939" fontFamily="sans-serif" fontSize="14" fontWeight="700">
        nutrime
      </text>
      <text x="131" y="124" fill="#476545" fontFamily="sans-serif" fontSize="9">
        30 DAILY PACKS
      </text>
      <g transform="translate(178 107) rotate(9)">
        <rect width="75" height="85" rx="5" fill="#fffefa" stroke="#d0dcc5" />
        <path d="M5 9h65M5 76h65" stroke="#b9caad" strokeDasharray="2 3" />
        <text x="10" y="27" fill="#294939" fontFamily="sans-serif" fontSize="13" fontWeight="700">
          ALEX
        </text>
        <text x="10" y="42" fill="#5d7656" fontFamily="sans-serif" fontSize="7">
          YOUR DAILY FORMULA
        </text>
        <circle cx="23" cy="56" r="6" fill="#d8bc73" />
        <rect x="34" y="51" width="18" height="9" rx="4.5" fill="#9db883" />
        <text x="10" y="69" fill="#5d7656" fontFamily="sans-serif" fontSize="6">
          One small step.
        </text>
      </g>
    </svg>
  );
}

export function AssessmentArt() {
  return (
    <svg
      viewBox="0 0 280 210"
      role="img"
      aria-label="Illustration of a three-minute lifestyle questionnaire and personalised nutrient profile"
    >
      <rect width="280" height="210" fill="#f4eddf" />
      <rect x="45" y="26" width="151" height="159" rx="13" fill="#fffefa" stroke="#e2dacb" />
      <text x="62" y="50" fill="#294939" fontFamily="sans-serif" fontSize="12" fontWeight="700">
        LET’S START WITH YOU
      </text>
      <text x="62" y="68" fill="#61715b" fontFamily="sans-serif" fontSize="9">
        Diet · Routine · Stress · Goals
      </text>
      {[92, 116, 140].map((y) => (
        <g key={y}>
          <rect x="62" y={y - 8} width="14" height="14" rx="4" fill="#dce9d0" />
          <path d={`m65 ${y - 2} 3 3 5-6`} fill="none" stroke="#557d4e" strokeWidth="1.5" />
          <path d={`M86 ${y - 1}h80`} stroke="#d8dfcf" strokeWidth="6" strokeLinecap="round" />
        </g>
      ))}
      <rect x="159" y="126" width="80" height="57" rx="12" fill="#315d45" />
      <text x="176" y="151" fill="#fffefa" fontFamily="sans-serif" fontSize="20" fontWeight="700">
        3 min
      </text>
      <text x="176" y="167" fill="#dce9d0" fontFamily="sans-serif" fontSize="8">
        MADE FOR YOU
      </text>
    </svg>
  );
}

export function TrackerArt() {
  return (
    <svg
      viewBox="0 0 280 210"
      role="img"
      aria-label="NutriTracker concept showing daily intake check-ins, habit rewards and nutritionist messaging"
    >
      <rect width="280" height="210" fill="#e8efee" />
      <rect x="91" y="14" width="98" height="184" rx="19" fill="#315d45" />
      <rect x="96" y="20" width="88" height="172" rx="15" fill="#fffefa" />
      <path d="M125 27h30" stroke="#315d45" strokeWidth="4" strokeLinecap="round" />
      <text x="105" y="54" fill="#294939" fontFamily="sans-serif" fontSize="11" fontWeight="700">
        NutriTracker
      </text>
      <circle cx="140" cy="92" r="22" fill="#e3edd8" stroke="#9bb686" strokeWidth="3" />
      <path
        d="m130 92 7 7 14-15"
        fill="none"
        stroke="#557d4e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="113" y="129" fill="#5d7656" fontFamily="sans-serif" fontSize="8">
        DAILY PACK TAKEN
      </text>
      <rect x="106" y="144" width="68" height="28" rx="8" fill="#edf2e5" />
      <text x="115" y="161" fill="#315d45" fontFamily="sans-serif" fontSize="8">
        Ask a nutritionist
      </text>
      <circle cx="195" cy="63" r="23" fill="#e9d69d" />
      <path d="m195 47 4 10 11 1-8 7 2 11-9-6-10 6 3-11-8-7 11-1Z" fill="#fffefa" />
    </svg>
  );
}
