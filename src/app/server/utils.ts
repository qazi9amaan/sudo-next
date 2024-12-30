import { cache } from "react";
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "../../core/cookies";
import { SudoEnginee } from "../../core/engine";
import { SudoUser } from "../../types";

const { getAdapter, getConfig } = SudoEnginee.getInstance();

export const getAuth = cache(async () => {
  const session = await getSessionCookie();
  if (!getConfig().isGenuineSession(session)) return null;
  return session;
});

export async function setAuth(user: SudoUser) {
  const session = await getAdapter().createSession(user);
  await setSessionCookie(session);
  return session;
}

export async function clearAuth() {
  const session = await getSessionCookie();
  await Promise.all([
    // remove from redis
    getAdapter().removeSession(session.sessionId),
    // remove from cookie
    deleteSessionCookie(session),
  ]);
}
