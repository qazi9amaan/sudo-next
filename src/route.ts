import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "@/_internal/cookies";
import auth from "@/_internal/auth";
import adapter from "@/_internal/adapter";

export async function GET() {
  // get session from cookie
  const _session = await getSessionCookie();

  // if session is invalid, delete the cookie and return
  if (!auth.isGenuineSession(_session)) {
    if (_session) await deleteSessionCookie(_session);
    return Response.json({ message: "Invalid session" }, { status: 401 });
  }

  // validate session and set new session cookie
  const session = await adapter.validateAndSetSession(_session.sessionId);

  if (!session) {
    await deleteSessionCookie(_session);
    return Response.json({ message: "Invalid session" }, { status: 401 });
  }

  await setSessionCookie(session);

  return Response.json(session);
}
