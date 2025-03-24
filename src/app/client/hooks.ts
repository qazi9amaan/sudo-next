import { useContext } from "react";
import { AuthContext } from "../../core/store";

export const useAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }
  return store;
};
