import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Dumbbell, Flame, Leaf, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDemo } from "../state/DemoContext";
import { useToast } from "../state/ToastContext";
import { PageTitle } from "../components/UI";
import { Mascot } from "../components/Mascot";
import { ChoiceGroup } from "../components/ChoiceGroup";
import { DIET_LABELS, EQUIPMENT_LABELS, GOAL_LABELS } from "../data/fixtures";
import type { Profile } from "../types";

export function Personalize() {
  const { state, dispatch, today } = useDemo();
  const toast = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({ ...state.profile });
  const [step, setStep] = useState(0);
  const update = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile({ ...profile, [key]: value });
  const titles = [
    "Let’s start with you.",
    "Find your kind of active.",
    "Good things, on your terms.",
  ];
  return (
    <>
      <PageTitle
        title="A plan that feels like you."
        description="A few little details. A much more personal everyday."
      />
      <div className="assessment-layout">
        <section className="card assessment">
          <div className="assessment-progress" aria-label={`Step ${step + 1} of 3`}>
            {["Your goals", "Your rhythm", "Your preferences"].map((label, index) => (
              <div key={label} className={index <= step ? "current" : ""}>
                <span>{index < step ? <Check size={13} /> : index + 1}</span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (step < 2) {
                setStep(step + 1);
                return;
              }
              dispatch({
                type: "PROFILE",
                profile: { ...profile, name: profile.name.trim() },
                today,
              });
              toast("Your fresh plan is ready. Let’s make it a good day.");
              navigate("/app");
            }}
          >
            <div className="assessment-heading">
              <span className="eyebrow">STEP 0{step + 1} OF 03</span>
              <h2>{titles[step]}</h2>
            </div>
            {step === 0 && (
              <>
                <label className="field-label" htmlFor="profile-name">
                  What should we call you?
                </label>
                <input
                  id="profile-name"
                  className="text-input"
                  value={profile.name}
                  maxLength={30}
                  required
                  autoComplete="given-name"
                  onChange={(event) => update("name", event.target.value)}
                />
                <ChoiceGroup
                  legend="What would you like a little more of?"
                  hint="Start with the thing that matters most to you."
                  name="goal"
                  value={profile.goal}
                  onChange={(value) => update("goal", value)}
                  choices={[
                    {
                      value: "energy",
                      label: GOAL_LABELS.energy,
                      description: "Make room for a brighter everyday.",
                      icon: <Flame size={20} />,
                    },
                    {
                      value: "consistency",
                      label: GOAL_LABELS.consistency,
                      description: "Small habits that feel easier to keep.",
                      icon: <Leaf size={20} />,
                    },
                    {
                      value: "strength",
                      label: GOAL_LABELS.strength,
                      description: "Build confidence in your movement.",
                      icon: <Dumbbell size={20} />,
                    },
                  ]}
                />
                <ChoiceGroup
                  legend="How much time can you make for movement?"
                  name="minutes"
                  value={profile.minutes}
                  onChange={(value) => update("minutes", value)}
                  choices={[
                    { value: 10, label: "10 minutes" },
                    { value: 20, label: "20 minutes" },
                    { value: 30, label: "30 minutes" },
                  ]}
                />
              </>
            )}
            {step === 1 && (
              <>
                <ChoiceGroup
                  legend="Where are you starting?"
                  name="level"
                  value={profile.level}
                  onChange={(value) => update("level", value)}
                  choices={[
                    {
                      value: "beginner",
                      label: "Finding my feet",
                      description: "I’m new or getting back into a routine.",
                    },
                    {
                      value: "regular",
                      label: "Already moving",
                      description: "I’m comfortable with regular activity.",
                    },
                  ]}
                />
                <ChoiceGroup
                  legend="What do you have at home?"
                  hint="No equipment? No problem. We’ll work with what you have."
                  name="equipment"
                  value={profile.equipment}
                  onChange={(value) => update("equipment", value)}
                  choices={[
                    { value: "none", label: "Just me", description: "A little space to move." },
                    {
                      value: "bands",
                      label: "Resistance bands",
                      description: "Light, easy-to-store equipment.",
                    },
                    {
                      value: "dumbbells",
                      label: "Dumbbells",
                      description: "Weights for an at-home session.",
                    },
                  ]}
                />
              </>
            )}
            {step === 2 && (
              <>
                <ChoiceGroup
                  legend="How do you like to eat?"
                  name="diet"
                  value={profile.diet}
                  onChange={(value) => update("diet", value)}
                  choices={[
                    { value: "omnivore", label: DIET_LABELS.omnivore },
                    { value: "vegetarian", label: DIET_LABELS.vegetarian },
                    { value: "dairy-free", label: DIET_LABELS["dairy-free"] },
                  ]}
                />
                <ChoiceGroup
                  legend="Your monthly budget for optional products"
                  hint="Your daily plan comes first. Extras are always your choice."
                  name="budget"
                  value={profile.budget}
                  onChange={(value) => update("budget", value)}
                  choices={[
                    { value: 200, label: "HK$200" },
                    { value: 500, label: "HK$500" },
                    { value: 1000, label: "HK$1,000" },
                  ]}
                />
                <div className="assessment-summary">
                  <Sparkles size={19} />
                  <div>
                    <strong>A little preview of your plan</strong>
                    <p>
                      {GOAL_LABELS[profile.goal]} · {profile.minutes}-minute{" "}
                      {EQUIPMENT_LABELS[profile.equipment].toLowerCase()} sessions ·{" "}
                      {DIET_LABELS[profile.diet]}
                    </p>
                  </div>
                </div>
                <p className="fine-print">
                  Applying these preferences refreshes today’s plan and checklist. Your previous
                  days stay in your history.
                </p>
              </>
            )}
            <div className="assessment-actions">
              {step > 0 ? (
                <button className="text-link" type="button" onClick={() => setStep(step - 1)}>
                  <ArrowLeft size={16} />
                  Back a step
                </button>
              ) : (
                <Link className="text-link" to="/app">
                  Keep exploring
                </Link>
              )}
              <button className="button" type="submit" disabled={!profile.name.trim()}>
                {step === 2 ? "Make my plan" : "Next little step"}
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </section>
        <aside className="assessment-aside">
          <Mascot />
          <span className="eyebrow">YOUR PACE. YOUR POSSIBILITIES.</span>
          <h3>
            No perfect answers.
            <br />
            <em>Just your real life.</em>
          </h3>
          <p>
            We’ll make a starting point that fits. You can change these details whenever life
            changes.
          </p>
          <span className="aside-note">
            <Leaf size={15} /> Your choices stay in this browser.
          </span>
        </aside>
      </div>
    </>
  );
}
