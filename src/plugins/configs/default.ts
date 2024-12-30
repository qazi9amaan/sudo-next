import { SudoConfigBase } from "../../core/bases";
import { SudoSession } from "../../types";

export class DefaultConfigs extends SudoConfigBase {
  getMaxAge(): number {
    return 60 * 60 * 24 * 7; // 1 week in seconds
  }

  getDefaultSessionData() {
    return {
      id: "",
      expiresAt: -1,
      sessionId: "",
    };
  }

  getSessionConfigs() {
    const sessionOptions = {
      password: "complex_password_at_least_32_characters_long",
      cookieName: "sudo.next",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production", // HTTPS in production
        httpOnly: true, // Prevent client-side JavaScript access
        sameSite: "lax", // Protect against CSRF
        maxAge: this.getMaxAge(), // 1 week in seconds
        expires: new Date(Date.now() + this.getMaxAge() * 1000),
      },
    };
    return sessionOptions;
  }

  isGenuineSession(session: SudoSession) {
    return session && session.sessionId && session.expiresAt > Date.now();
  }
}
