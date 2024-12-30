import { cache } from "react";
import { cookies } from "next/headers";
import { getIronSession, IronSession } from "iron-session";
import { SudoSession } from "../types";
import { SudoEnginee } from "./engine";

const { getConfig } = SudoEnginee.getInstance();

export const getSessionCookie = cache(async () => {
  const clientCookies = await cookies();
  const session = await getIronSession<SudoSession>(
    clientCookies, // The cookies from the client
    getConfig().getSessionConfigs(), // The session options
  );
  return session;
});

export async function setSessionCookie(session: SudoSession) {
  const instance = await getSessionCookie();
  Object.assign(instance, { ...session, ...instance });

  instance.updateConfig(getConfig().getSessionConfigs());
  await instance.save();
}

export async function deleteSessionCookie(_: IronSession<SudoSession>) {
  _.destroy();
}
