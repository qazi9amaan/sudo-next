import { cache } from "react";
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/_internal/cookies";
import auth from "@/_internal/auth";
import adapter from "@/_internal/adapter";

export const getServerAuth = cache(async () => {
  const session = await getSessionCookie();
  if (!auth.isGenuineSession(session)) return null;
  return session;
});

//TODO: secure this function
export async function setAuth<T extends object>(user: T) {
  const session = await adapter.createSession(user);
  await setSessionCookie(session);
  return session;
}

export async function clearServerAuth() {
  const session = await getSessionCookie();
  await Promise.all([
    // remove from redis
    adapter.removeSession(session.sessionId),
    // remove from cookie
    deleteSessionCookie(session),
  ]);
}
