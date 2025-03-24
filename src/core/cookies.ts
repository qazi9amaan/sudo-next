import { cache } from "react";
import { cookies } from "next/headers";
import { getIronSession, IronSession } from "iron-session";
import { SudoSession } from "../types";
import { SharedMemory } from "./mem";

const enginee = SharedMemory.getEnginee();

export const getSessionCookie = cache(async () => {
  const clientCookies = await cookies();
  const session = await getIronSession<SudoSession>(
    clientCookies, // The cookies from the client
    enginee.sessionConfigs, // The session options
  );
  return session;
});

export async function setSessionCookie(session: SudoSession) {
  const instance = await getSessionCookie();
  Object.assign(instance, { ...session, ...instance });
  instance.updateConfig(enginee.sessionConfigs);
  await instance.save();
}

export async function deleteSessionCookie(_: IronSession<SudoSession>) {
  _.destroy();
}
