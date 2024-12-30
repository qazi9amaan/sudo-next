import { cache } from "react";
import { SudoEnginee } from "../../core/engine";
import { getSessionCookie } from "../../core/cookies";

const { getConfig } = SudoEnginee.getInstance();

export const getAuth = cache(async () => {
  const session = await getSessionCookie();
  if (!getConfig().isGenuineSession(session)) return null;
  return session;
});
