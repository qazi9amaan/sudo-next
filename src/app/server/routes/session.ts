import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "../../../core/cookies";
import { SudoEnginee } from "../../../core/engine";

const { getAdapter, getConfig } = SudoEnginee.getInstance();

export async function GET() {
  // get session from cookie
  const _session = await getSessionCookie();

  // if session is invalid, delete the cookie and return
  if (!getConfig().isGenuineSession(_session)) {
    if (_session) await deleteSessionCookie(_session);
    return Response.json({ message: "Invalid session" }, { status: 401 });
  }

  // validate session and set new session cookie
  const session = await getAdapter().revalidateSession(_session.sessionId);
  if (!session) {
    await deleteSessionCookie(_session);
    return Response.json({ message: "Invalid session" }, { status: 401 });
  }

  await setSessionCookie(session);
  return Response.json(session);
}
