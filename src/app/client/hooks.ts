import { useContext } from "react";
import { AuthContext, UtilContext } from "../../core/store";

export const useGetAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }
  return store;
};

export const useSetAuth = () => {
  const utils = useContext(UtilContext);
  if (!utils) {
    throw new Error(`useSetAuth must be used within AuthProvider`);
  }
  return utils.setAuth;
};
