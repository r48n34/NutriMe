import { useId } from "react";
import type { Meal, Product } from "../types";

export function MealArt({ meal, className = "" }: { meal: Meal; className?: string }) {
  const id = useId().replace(/:/g, "");
  const greens = [
    [99, 92, -25],
    [136, 73, 20],
    [165, 84, -13],
    [181, 113, 30],
    [89, 119, 12],
    [147, 131, -26],
  ];
  return (
    <svg
      viewBox="0 0 280 210"
      className={`meal-art ${className}`}
      role="img"
      aria-label={`Illustration of ${meal.name}`}
    >
      <defs>
        <radialGradient id={`${id}-bowl`}>
          <stop stopColor="#fffefa" />
          <stop offset="1" stopColor="#e3dece" />
        </radialGradient>
      </defs>
      <rect width="280" height="210" fill={meal.color} />
      <path d="M0 25 280 63M0 145l280 37" stroke="#fff" opacity=".16" strokeWidth="2" />
      <ellipse cx="146" cy="170" rx="89" ry="13" fill="#35422b" opacity=".12" />
      <circle cx="142" cy="106" r="80" fill="#f9f7ed" stroke="#fff" strokeWidth="5" />
      <circle cx="142" cy="106" r="66" fill={`url(#${id}-bowl)`} stroke="#d4d0c1" />
      {["yogurt", "oats", "congee"].includes(meal.art) ? (
        <>
          <circle cx="142" cy="105" r="61" fill={meal.art === "congee" ? "#e9ddbe" : "#fff6e2"} />
          {meal.art === "yogurt" ? (
            <>
              {[
                [-26, -12],
                [-11, -23],
                [2, -10],
                [-26, 8],
                [-8, 4],
              ].map(([x, y], i) => (
                <g key={i} transform={`translate(${142 + x!} ${99 + y!})`}>
                  <path d="M-11-4c2-13 24-14 23 0-2 11-7 18-13 21C-8 9-11 3-11-4Z" fill="#b85551" />
                  <path d="m-8-10 8 5 8-8" stroke="#71935c" strokeWidth="3" />
                  <circle cx="-4" cy="0" r="1" fill="#f6d3a3" />
                  <circle cx="4" cy="5" r="1" fill="#f6d3a3" />
                </g>
              ))}
              {[
                [19, -19],
                [34, -7],
                [14, 9],
                [33, 18],
                [15, 26],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={142 + x!}
                  cy={102 + y!}
                  r="7"
                  fill="#46536d"
                  stroke="#738095"
                  strokeWidth="2"
                />
              ))}
            </>
          ) : meal.art === "oats" ? (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <ellipse
                  key={i}
                  cx={112 + i * 15}
                  cy={87 + i * 8}
                  rx="17"
                  ry="11"
                  transform={`rotate(-28 ${112 + i * 15} ${87 + i * 8})`}
                  fill="#f4dda0"
                  stroke="#cbb67e"
                  strokeWidth="2"
                />
              ))}
              <path
                d="M114 133q24 16 52-1"
                stroke="#9a7147"
                strokeWidth="4"
                strokeDasharray="3 8"
              />
            </>
          ) : (
            <>
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${118 + i * 21} ${89 + i * 10}) rotate(-20)`}>
                  <path d="M-12 0c0-16 27-17 27 0Z" fill="#927258" />
                  <path d="M0 0v15" stroke="#c7b297" strokeWidth="7" />
                </g>
              ))}
              <path
                d="m103 118 17 7m30-34 12 6m-22 42 20-6m-11-29 12 5"
                stroke="#658447"
                strokeWidth="4"
              />
            </>
          )}
          {Array.from({ length: 13 }, (_, i) => (
            <ellipse
              key={i}
              cx={102 + ((i * 17) % 78)}
              cy={63 + ((i * 13) % 87)}
              rx="3"
              ry="2"
              fill="#bda475"
              transform={`rotate(${i * 30} ${102 + ((i * 17) % 78)} ${63 + ((i * 13) % 87)})`}
            />
          ))}
        </>
      ) : (
        <>
          <circle cx="142" cy="106" r="62" fill={meal.art === "noodles" ? "#d8cba2" : "#e4d6b2"} />
          {meal.art === "noodles" &&
            Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={`M${93 + i * 4} ${78 + i * 6}q45-25 83 12t-55 36`}
                stroke="#f4e3ac"
                strokeWidth="4"
                fill="none"
              />
            ))}
          {greens.map(([x, y, angle], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}>
              <path
                d="M0-17C-25-8-23 14 0 22 20 7 23-9 0-17Z"
                fill={i % 2 ? "#557647" : "#789a4c"}
              />
              <path d="M0-10v27m0-7-10-8m10 0 9-8" stroke="#a2b76c" fill="none" strokeWidth="1.5" />
            </g>
          ))}
          {meal.art === "salmon" ? (
            <g transform="rotate(27 142 112)">
              <rect
                x="107"
                y="88"
                width="75"
                height="44"
                rx="13"
                fill="#e6a17a"
                stroke="#bd8059"
                strokeWidth="2"
              />
              <path
                d="m118 89-4 36m18-36-4 41m18-41-4 41m18-39-4 36m17-31-3 23"
                stroke="#f6cbaa"
                strokeWidth="3"
              />
              <path
                d="m116 91 60 10m-64 6 58 11m-59 4 50 6"
                stroke="#aa734f"
                strokeWidth="2"
                opacity=".65"
              />
            </g>
          ) : (
            <g transform="rotate(-15 139 106)">
              {[
                [118, 86],
                [146, 93],
                [127, 115],
                [157, 119],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="23"
                  height="22"
                  rx="5"
                  fill={meal.art === "chicken" ? "#d5ac77" : "#dabc82"}
                  stroke="#ab8b56"
                  strokeWidth="1.5"
                />
              ))}
            </g>
          )}
          {[
            [107, 140],
            [182, 91],
            [174, 139],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="#be5b43" />
              <path d={`m${x! - 4} ${y! - 4} 4 2 3-4`} stroke="#688c48" strokeWidth="2" />
            </g>
          ))}
        </>
      )}
      <path
        d="m239 59-21 112m30-112-21 112"
        stroke="#9c7953"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="29" cy="35" r="21" fill="#e6d8b5" opacity=".6" />
      <circle cx="29" cy="35" r="15" fill="#ede6c5" />
    </svg>
  );
}

export function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <svg
      viewBox="0 0 280 230"
      className={`product-art ${className}`}
      role="img"
      aria-label={`Illustration of ${product.name}`}
    >
      <rect width="280" height="230" fill={product.color} />
      <circle cx="140" cy="105" r="83" fill="#fff" opacity=".22" />
      <ellipse cx="143" cy="199" rx="68" ry="10" fill="#244d35" opacity=".12" />
      {product.art === "bottle" ? (
        <>
          <path d="M126 41v-8c0-24 44-24 44 0v8" stroke="#3d7b63" strokeWidth="6" fill="none" />
          <rect x="119" y="37" width="55" height="24" rx="7" fill="#396a55" />
          <path
            d="M117 61c-7 15-14 18-14 35v85c0 13 11 19 36 19s46-3 46-19V95c0-17-10-24-13-34Z"
            fill="#76a48c"
            stroke="#567f69"
            strokeWidth="2"
          />
          <path
            d="M114 95v84c0 7 4 11 11 13"
            stroke="#b2cdb5"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M136 121c-16-1-23-11-23-21 17 1 25 8 23 21Zm2 0c-2-15 6-28 23-31 0 16-7 28-23 31Z"
            fill="#edf0ce"
          />
          <text
            x="143"
            y="146"
            textAnchor="middle"
            fill="#edf0ce"
            fontSize="13"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            nutrime
          </text>
        </>
      ) : product.art === "bands" ? (
        <>
          <ellipse
            cx="134"
            cy="118"
            rx="51"
            ry="66"
            stroke="#448871"
            strokeWidth="20"
            fill="none"
            transform="rotate(28 134 118)"
          />
          <ellipse
            cx="160"
            cy="140"
            rx="45"
            ry="57"
            stroke="#95b17a"
            strokeWidth="17"
            fill="none"
            transform="rotate(-25 160 140)"
          />
          <path d="M99 61c17-9 34-6 47 5" stroke="#81b59b" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : product.art === "tub" ? (
        <>
          <rect
            x="86"
            y="60"
            width="112"
            height="133"
            rx="18"
            fill="#f4f1db"
            stroke="#d1d7be"
            strokeWidth="2"
          />
          <rect x="82" y="49" width="120" height="26" rx="9" fill="#326c53" />
          <rect x="89" y="108" width="106" height="69" fill="#83a57b" />
          <path
            d="M139 106c-23-3-36-18-34-31 24 1 38 11 34 31Zm3 0c-4-22 8-38 29-43-1 21-12 38-29 43Z"
            fill="#477b54"
          />
          <text
            x="142"
            y="131"
            textAnchor="middle"
            fill="#fffbea"
            fontFamily="sans-serif"
            fontSize="17"
            fontWeight="700"
          >
            nutrime
          </text>
          <text
            x="142"
            y="150"
            textAnchor="middle"
            fill="#fffbea"
            fontFamily="sans-serif"
            fontSize="9"
            letterSpacing="2"
          >
            PLANT POWER
          </text>
        </>
      ) : (
        <>
          <path d="m79 89 93-22 39 25-93 23Z" fill="#e7edd6" />
          <path d="m118 115 93-23v87l-93 23Z" fill="#90b098" />
          <path d="m79 89 39 26v87l-39-26Z" fill="#477b63" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${106 + i * 28} ${64 - i * 5}) rotate(-10)`}>
              <rect width="21" height="50" rx="2" fill="#fffef1" stroke="#c6d6bc" />
              <path
                d="M10 27c-9-3-9-9-9-9 8 0 10 4 9 9Zm0 0c0-9 5-12 10-13-1 8-5 11-10 13Z"
                fill="#89aa7a"
              />
            </g>
          ))}
          <text
            x="161"
            y="143"
            textAnchor="middle"
            fill="#fffbed"
            fontFamily="sans-serif"
            fontWeight="700"
            fontSize="15"
            transform="rotate(-13 161 143)"
          >
            nutrime
          </text>
          <path
            d="M156 174c-17-5-23-13-20-23 16 3 23 11 20 23Zm2 0c0-15 9-23 20-25-1 15-9 23-20 25Z"
            fill="#dbe9b4"
          />
        </>
      )}
    </svg>
  );
}

export function MovementArt() {
  return (
    <svg
      viewBox="0 0 300 210"
      role="img"
      aria-label="Illustrated exercise mat, resistance band and water bottle"
    >
      <rect width="300" height="210" fill="#e7ecdf" />
      <path d="m57 164 160-45 48 35-160 41Z" fill="#8dae99" />
      <path d="m69 166 151-41m-140 49 151-41m-140 48 151-41" stroke="#c2d4bc" strokeWidth="2" />
      <path
        d="M85 137c-19-40 50-74 72-35s-54 80-72 35Z"
        fill="none"
        stroke="#3e836b"
        strokeWidth="14"
      />
      <rect
        x="220"
        y="57"
        width="35"
        height="72"
        rx="10"
        fill="#f7f7e9"
        stroke="#adbda7"
        strokeWidth="2"
      />
      <rect x="228" y="44" width="20" height="17" rx="3" fill="#46755c" />
      <path
        d="M235 88c-12-6-12-16-12-16 14 1 15 8 12 16m0 0c1-12 7-17 15-18-2 11-7 17-15 18"
        fill="#7ca77a"
      />
      <path d="m94 166 77-28" stroke="#e3dfcb" strokeWidth="12" />
      <rect
        x="79"
        y="141"
        width="25"
        height="48"
        rx="8"
        fill="#eeeada"
        transform="rotate(-20 79 141)"
      />
      <rect
        x="167"
        y="113"
        width="25"
        height="48"
        rx="8"
        fill="#eeeada"
        transform="rotate(-20 167 113)"
      />
      <path d="M25 0c57 42 41 61 32 74S27 99 0 104" stroke="#c9d8ba" strokeWidth="22" fill="none" />
    </svg>
  );
}
