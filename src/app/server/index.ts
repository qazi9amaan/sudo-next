import { getSession as getSessionRoute } from "./routes/session";
import SudoAuthProvider from "./rsc-provider";
import { clearAuth, getAuth, setAuth } from "./utils";
import { EngineParams, SudoEnginee } from "../../core/engine";
import { SharedMemory } from "../../core/mem";

export const createEnginee = (params: EngineParams) => {
  const enginee = new SudoEnginee(params);
  // set the enginee in the shared memory
  SharedMemory.setEnginee(enginee);
  // return the utils
  return {
    setAuth,
    clearAuth,
    getAuth,
    GET: getSessionRoute,
    AuthProvider: SudoAuthProvider,
  };
};
