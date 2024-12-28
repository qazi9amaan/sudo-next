import auth from "@/_internal/auth";
import { cache } from "react";
import { getSessionCookie } from "@/_internal/cookies";

export const getSession = cache(async () => {
  const session = await getSessionCookie();
  return auth.isGenuineSession(session) ? session : null;
});
