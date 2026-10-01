import { useId } from "react";

export function Mascot({
  className = "",
  pose = "wave",
}: {
  className?: string;
  pose?: "wave" | "rest";
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`mascot ${className}`}
      viewBox="0 0 360 410"
      fill="none"
      role="img"
      aria-label="Me, your friendly green-capped NutriMe companion"
    >
      <defs>
        <linearGradient
          id={`${id}-cap`}
          x1="89"
          y1="73"
          x2="268"
          y2="186"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#409875" />
          <stop offset="1" stopColor="#145b43" />
        </linearGradient>
        <linearGradient
          id={`${id}-body`}
          x1="107"
          y1="247"
          x2="260"
          y2="328"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#62a883" />
          <stop offset="1" stopColor="#1b654b" />
        </linearGradient>
        <linearGradient
          id={`${id}-cream`}
          x1="120"
          y1="149"
          x2="257"
          y2="254"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff8df" />
          <stop offset="1" stopColor="#ece1ba" />
        </linearGradient>
      </defs>
      <ellipse cx="190" cy="389" rx="117" ry="13" fill="#214c37" opacity=".1" />
      <path
        d="M122 317 112 365c-14 1-26 8-26 21h68l9-52M214 334l7 51h69c0-14-17-22-34-23l-3-47"
        fill="#2a7656"
      />
      <path
        d="M109 356c20-8 39-7 48 9l-3 17H89c0-12 7-21 20-26ZM226 362c14-9 27-9 36-3 15 4 24 12 26 23h-65Z"
        fill="#f8efd6"
        stroke="#e0d2ad"
        strokeWidth="2"
      />
      <path d="M99 378h56m69 0h62" stroke="#3d8862" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M94 242c13-23 33-36 78-37 46-1 82 13 102 48l-18 71c-49 25-102 25-145 1Z"
        fill={`url(#${id}-body)`}
      />
      <path
        d="M143 220c-15 22-20 66-15 102l-35-9-9-67 19-21ZM208 220c17 19 24 53 21 107l31-9 12-72-19-23Z"
        fill="#f5edda"
        stroke="#dfd6bc"
        strokeWidth="2"
      />
      <path d="M117 230 112 310m133-75 4 73" stroke="#dbd1b5" strokeWidth="2" />
      <path
        d="M225 266c-12-13-21-11-22 0 1 9 13 15 19 21 5-8 18-19 15-27-4-8-11-1-12 6Z"
        fill="#73a969"
      />
      <path d="M221 278v14" stroke="#386f4d" strokeWidth="2" />
      <path d="M263 253c28-7 43 7 42 28-1 11-9 18-20 19l-19-29Z" fill="#326f53" />
      <path
        d="M277 280c-3-7 4-14 11-13 8 0 15 6 15 14 0 11-9 18-17 17-11 0-13-9-9-18Z"
        fill="#65a879"
      />
      {pose === "wave" ? (
        <g className="mascot-hand">
          <path
            d="M108 249C72 259 57 234 59 203l27-4 35 32Z"
            fill="#f3ead3"
            stroke="#ded4b9"
            strokeWidth="2"
          />
          <path
            d="M64 203c-17-14-24-36-16-47 7-8 15-1 17 10-3-17 0-31 9-31 10-1 10 15 9 26 3-14 9-20 16-15 8 6 2 17-3 28 10-8 20-5 20 3-2 10-18 25-28 29-9 3-17 2-24-3Z"
            fill="#66a677"
            stroke="#4f9365"
            strokeWidth="2"
          />
          <path
            d="m34 137-11-15m26-1-4-20m60 25 11-12"
            stroke="#7ea769"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g>
          <path d="M99 246c-22 10-27 25-12 42l29-12" fill="#f3ead3" />
          <ellipse cx="106" cy="279" rx="16" ry="17" fill="#65a879" />
        </g>
      )}
      <path
        d="M118 213c13 16 41 28 66 34 19-10 48-24 62-45"
        fill="#207a53"
        stroke="#165d40"
        strokeWidth="3"
      />
      <path
        d="M99 155c0-45 27-73 81-73 61 0 96 36 89 91-3 43-31 67-77 70-57 4-93-31-93-88Z"
        fill={`url(#${id}-cream)`}
        stroke="#e9ddb8"
        strokeWidth="2"
      />
      <ellipse cx="145" cy="183" rx="8" ry="12" fill="#233b2d" transform="rotate(-7 145 183)" />
      <ellipse cx="224" cy="183" rx="8" ry="12" fill="#233b2d" transform="rotate(6 224 183)" />
      <circle cx="142" cy="179" r="2.5" fill="white" />
      <circle cx="221" cy="179" r="2.5" fill="white" />
      <ellipse cx="125" cy="207" rx="12" ry="9" fill="#a6c68a" opacity=".7" />
      <ellipse cx="243" cy="207" rx="12" ry="9" fill="#a6c68a" opacity=".7" />
      <path d="M170 205c7 10 19 12 29 1" stroke="#233b2d" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M88 152c-5-67 29-111 94-115 62-5 105 39 109 106-26-4-53-10-81-12-46-3-85 6-122 21Z"
        fill={`url(#${id}-cap)`}
        stroke="#1b664a"
        strokeWidth="2"
      />
      <path
        d="M91 146c-12 4-16 17-7 24 22 9 49-12 92-20 49-9 80-1 115 9 22 5 31-7 18-16-51-21-135-26-218 3Z"
        fill="#1e6548"
        stroke="#155437"
        strokeWidth="2"
      />
      <path d="M95 151c65-26 139-27 202-4" stroke="#dce4b8" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M168 104c-28-4-42-21-42-39 28 2 45 14 42 39ZM169 106c-2-25 11-45 38-50-1 25-11 43-38 50Z"
        fill="#d2e7a1"
      />
      <path
        d="m169 113-2-25m0 9-24-17m27 13 21-20"
        stroke="#7caa65"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M171 38c-2-13 23-16 26-3" fill="#226e4c" />
      <path
        d="M119 86c9-22 22-35 41-40"
        stroke="#78b48d"
        strokeWidth="3"
        opacity=".5"
        strokeLinecap="round"
      />
    </svg>
  );
}
