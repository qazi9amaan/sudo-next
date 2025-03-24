import { SessionOptions } from "iron-session";

export const defaultSessionAge = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

export const defaultSession = {
  expiresAt: Date.now() + defaultSessionAge,
  sessionId: "",
  id: "",
};

export const defaultSessionConfigs: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "sudo.next",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // HTTPS in production
    httpOnly: true, // Prevent client-side JavaScript access
    sameSite: "lax", // Protect against CSRF
    maxAge: defaultSessionAge / 1000, // 1 week in seconds
    expires: new Date(Date.now() + defaultSessionAge),
  },
};
