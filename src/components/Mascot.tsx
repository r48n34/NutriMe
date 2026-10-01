import mascotImage from "../assets/nutrime-mascot.png";
import { MASCOT_POSES, MASCOT_SHEET } from "../data/mascot";

export function Mascot({
  className = "",
  pose = "wave",
}: {
  className?: string;
  pose?: keyof typeof MASCOT_POSES;
}) {
  const crop = MASCOT_POSES[pose];
  return (
    <span
      className={`mascot mascot--${pose} ${className}`}
      style={{ aspectRatio: `${crop.width} / ${crop.height}` }}
    >
      <img
        src={mascotImage}
        alt={
          pose === "rest"
            ? "NutriMe mascot resting with a green leaf"
            : "NutriMe mascot waving hello in a green cap and cream jacket"
        }
        width={MASCOT_SHEET.width}
        height={MASCOT_SHEET.height}
        decoding="async"
        draggable={false}
        style={{
          width: `${(MASCOT_SHEET.width / crop.width) * 100}%`,
          height: `${(MASCOT_SHEET.height / crop.height) * 100}%`,
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </span>
  );
}
