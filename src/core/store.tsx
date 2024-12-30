import { SudoSession } from "../types";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { SudoEnginee } from "./engine";

const { getConfig } = SudoEnginee.getInstance();
const intitalData = getConfig().getDefaultSessionData();

export const AuthContext = createContext<SudoSession>({
  ...intitalData,
});

export const UtilContext = createContext({
  setAuth: (data: SudoSession) => {},
});

type Props = PropsWithChildren<{ data: SudoSession | null }>;

export const AuthStore = ({ children, data }: Props) => {
  const [state, setState] = useState<SudoSession>({
    ...intitalData,
    ...data,
  });

  useEffect(() => {
    Object.defineProperty(window, "__SUDO_NEXT_INTERNAL_", {
      get: () => ({
        getState: () => Object.freeze(state),
        resetState: () => setState(intitalData),
      }),
      configurable: false,
      enumerable: false,
    });
    return () => {
      delete window.__SUDO_NEXT_INTERNAL_;
    };
  }, []);

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
          setState(intitalData);
        }
      };
      getSession();
    }
  }, [data]);

  return (
    <UtilContext.Provider value={{ setAuth: setState }}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </UtilContext.Provider>
  );
};
