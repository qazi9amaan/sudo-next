import { Session } from "@/types";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { createStore } from "zustand/vanilla";
import auth from "./auth";

const createAuthStore = (state: Session | null) => {
  return createStore<Session>()(() => ({
    ...(state || auth.getInitialSession()),
  }));
};

type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthContext = createContext<AuthStoreApi | undefined>(undefined);

type Props = PropsWithChildren<{ data: Session | null }>;

export const AuthStore = ({ children, data }: Props) => {
  const storeRef = useRef(createAuthStore(data || auth.getInitialSession()));

  useEffect(() => {
    const store = storeRef.current;
    Object.defineProperty(window, "__SUDO_NEXT_INTERNAL_", {
      get: () => ({
        getState: () => Object.freeze(store.getState()),
        resetState: () => store.setState(auth.getInitialSession()),
      }),
      configurable: true,
      enumerable: false,
    });
  }, []);

  useEffect(() => {
    if (data) {
      const store = storeRef.current;
      const getSession = async () => {
        try {
          const response = await fetch("/api/auth/session");
          if (response.ok) {
            const data = await response.json();
            store.setState(data);
          }
        } catch (error) {
          store.setState(auth.getInitialSession());
        }
      };
      getSession();
      return () => {
        store.setState(auth.getInitialSession());
      };
    }
  }, [data]);

  return (
    <AuthContext.Provider value={storeRef.current}>
      {children}
    </AuthContext.Provider>
  );
};
