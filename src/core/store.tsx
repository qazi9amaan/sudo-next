import { SudoSession } from "../types";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { SharedMemory } from "./mem";

const enginee = SharedMemory.getEnginee();

export class ClientAuthStore {
  static getAuth() {}
  static clearAuth() {}
}

export const AuthContext = createContext<SudoSession>({
  ...enginee.defaultSession,
});

type Props = PropsWithChildren<{ data: SudoSession | null }>;

export const AuthStore = ({ children, data }: Props) => {
  const [state, setState] = useState<SudoSession>({
    ...enginee.defaultSession,
    ...data,
  });

  useEffect(() => {
    ClientAuthStore.getAuth = () => state;
    ClientAuthStore.clearAuth = () => setState(enginee.defaultSession);
  }, [state]);

  useEffect(() => {
    if (data) {
      const getSession = async () => {
        try {
          const response = await fetch("/api/auth/session");
          if (response.ok) {
            const data = await response.json();
            setState(data);
          }
        } catch (error) {
          setState(enginee.defaultSession);
        }
      };
      getSession();
    }
  }, [data]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
