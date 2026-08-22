import { createContext, useContext } from "react";

export const PrerenderContext = createContext(false);

export function usePrerender() {
  return useContext(PrerenderContext);
}
