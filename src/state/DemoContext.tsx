import { createContext, useContext } from "react";
import type { Dispatch } from "react";
import type { DemoAction, DemoState } from "../types";

interface DemoContextValue {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
  today: string;
  storageAvailable: boolean;
}
export const DemoContext = createContext<DemoContextValue | null>(null);
export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}
