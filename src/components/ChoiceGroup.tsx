import type { ReactNode } from "react";
export function ChoiceGroup<T extends string | number>({
  legend,
  hint,
  name,
  value,
  choices,
  onChange,
}: {
  legend: string;
  hint?: string;
  name: string;
  value: T;
  choices: { value: T; label: string; description?: string; icon?: ReactNode }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="choice-group">
      <legend>{legend}</legend>
      {hint && <p>{hint}</p>}
      <div className="choice-options">
        {choices.map((choice) => (
          <label
            key={choice.value}
            className={`choice-option ${value === choice.value ? "selected" : ""}`}
          >
            <input
              type="radio"
              name={name}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
            />
            {choice.icon && <span className="choice-icon">{choice.icon}</span>}
            <span>
              <strong>{choice.label}</strong>
              {choice.description && <small>{choice.description}</small>}
            </span>
            <span className="radio-dot" />
          </label>
        ))}
      </div>
    </fieldset>
  );
}
