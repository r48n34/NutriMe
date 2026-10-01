import { useEffect, useReducer, useState } from "react";
import type { ReactNode } from "react";
import { DemoContext } from "./DemoContext";
import { todayInHongKong } from "../utils/dates";
import { demoReducer } from "../utils/state";
import { readState, writeState } from "../utils/storage";

const browserStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};
export function DemoProvider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState(todayInHongKong);
  const [state, dispatch] = useReducer(demoReducer, today, (date) =>
    readState(browserStorage(), date),
  );
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    const available = writeState(browserStorage(), state);
    // Publish the result of synchronizing with browser storage, including quota failures.
    // oxlint-disable-next-line react/set-state-in-effect
    setStorageAvailable(available);
  }, [state]);
  useEffect(() => {
    const timer = window.setInterval(() => setToday(todayInHongKong()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <DemoContext.Provider value={{ state, dispatch, today, storageAvailable }}>
      {children}
    </DemoContext.Provider>
  );
}
