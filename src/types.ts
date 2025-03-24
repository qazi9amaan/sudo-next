import { SessionOptions } from "iron-session";

export interface SudoUser extends Record<string, any> {
  id: string;
}

export interface SudoSession extends SudoUser {
  expiresAt: number;
  sessionId: string;
}

export interface SessionConfigs {
  sessionAge?: number;
  defaultSession?: SudoSession;
  sessionConfigs?: SessionOptions;
  isValidSession(session: SudoSession): boolean;
}
