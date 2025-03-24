import { cache } from "react";
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "../../core/cookies";
import { SudoUser } from "../../types";
import { SharedMemory } from "../../core/mem";

const enginee = SharedMemory.getEnginee();

export const getAuth = cache(async () => {
  const session = await getSessionCookie();
  if (!enginee.isGenuineSession(session)) return null;
  return session;
});

export async function setAuth(user: SudoUser) {
  const session = await enginee.adapter.createSession(user);
  await setSessionCookie(session);
  return session;
}

export async function clearAuth() {
  const session = await getSessionCookie();
  await Promise.all([
    // remove from redis
    enginee.adapter.removeSession(session.sessionId),
    // remove from cookie
    deleteSessionCookie(session),
  ]);
}
