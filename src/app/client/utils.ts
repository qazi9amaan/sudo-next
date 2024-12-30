import { SudoEnginee } from "../../core/engine";
import { SudoSession } from "../../types";

declare global {
  interface Window {
    __SUDO_NEXT_INTERNAL_?: {
      getState: () => SudoSession;
      resetState: () => void;
    };
  }
}

const { getConfig } = SudoEnginee.getInstance();

export const getAuth = () => {
  const initialState = getConfig().getDefaultSessionData();
  if (typeof window === "undefined") return initialState;
  const state = window.__SUDO_NEXT_INTERNAL_?.getState?.() ?? initialState;
  if (getConfig().isGenuineSession(state)) return state;
  return initialState;
};

export const clearStoreAuth = async () => {
  if (typeof window === "undefined") return;
  window.__SUDO_NEXT_INTERNAL_?.resetState?.();
};
