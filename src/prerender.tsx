import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { AppContent } from "./App";

export function renderHomepage() {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={["/"]}>
        <AppContent />
      </MemoryRouter>
    </StrictMode>,
  );
}
