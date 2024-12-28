import { type NextRequest } from "next/server";
import { setUpAuth } from "@/index";
import { Session } from "@/types";

export class Auth {
  getMaxAge() {
    return 60 * 60 * 24 * 7; // 1 week
  }

  getInitialSession(): Session {
    return {
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

  isGenuineSession(session: Session) {
    return session && session.sessionId && session.expiresAt > Date.now();
  }

  getAuthRoutes() {
    return ["/profile", "/logout"];
  }

  onRedirectToLogin(request: NextRequest) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname ?? "/");
    return () => redirectUrl;
  }
}

const auth = setUpAuth();

if (!(auth instanceof Auth)) {
  throw new Error("setUpAuth should return an instance of Auth");
}

export default auth;
