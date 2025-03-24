import { cache } from "react";
import { getSessionCookie } from "../../core/cookies";
import { SharedMemory } from "../../core/mem";

export const getAuth = cache(async () => {
  const session = await getSessionCookie();
  const enginee = SharedMemory.getEnginee();
  if (!enginee.isGenuineSession(session)) return null;
  return session;
});
