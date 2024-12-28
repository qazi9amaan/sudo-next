"use client";

import { useCallback, useContext } from "react";
import auth from "@/_internal/auth";
import { AuthContext } from "@/_internal/store";
import { useStore } from "zustand";
import { Session } from "@/types";

declare global {
  interface Window {
    __SUDO_NEXT_INTERNAL_?: {
      getState: () => Session;
      resetState: () => void;
    };
  }
}

export const useAuth = () => {
  const _AuthStoreContext = useContext(AuthContext);
  if (!_AuthStoreContext) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }
  return useStore(_AuthStoreContext);
};

export const useSetAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error(`useSetAuth must be used within AuthProvider`);
  }
  return useCallback(store.setState, [store]);
};

export const getAuth = () => {
  const initialState = auth.getInitialSession();
  if (typeof window === "undefined") return initialState;
  const state = window.__SUDO_NEXT_INTERNAL_?.getState?.() ?? initialState;
  if (auth.isGenuineSession(state)) return state;
  return initialState;
};

export const clearStoreAuth = async () => {
  if (typeof window === "undefined") return;
  window.__SUDO_NEXT_INTERNAL_?.resetState?.();
};
