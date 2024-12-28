import { cache } from "react";
import { cookies } from "next/headers";
import { getIronSession, IronSession } from "iron-session";
import auth from "@/_internal/auth";
import { Session } from "@/types";

export const getSessionCookie = cache(async () => {
  const clientCookies = await cookies();
  const session = await getIronSession<Session>(
    clientCookies, // The cookies from the client
    auth.getSessionConfigs(), // The session options
  );
  return session;
});

export async function setSessionCookie(session: Session) {
  const instance = await getSessionCookie();
  Object.assign(instance, { ...session, ...instance });
  instance.updateConfig(auth.getSessionConfigs());
  await instance.save();
}

export async function deleteSessionCookie(_: IronSession<Session>) {
  _.destroy();
}
