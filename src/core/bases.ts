import { SudoSession, SudoUser } from "../types";
import type { SessionOptions } from "iron-session";

export abstract class SudoConfigBase {
  abstract getMaxAge(): number;
  abstract getDefaultSessionData(): SudoSession | undefined;
  abstract getSessionConfigs(): SessionOptions;
  abstract isGenuineSession(session: SudoSession): boolean;
}

export abstract class SudoAdapterBase {
  abstract createSession(user: SudoUser): Promise<SudoSession>;
  abstract revalidateSession(sessionId: string): Promise<SudoSession>;
  abstract removeSession(sessionId: string): Promise<void>;
}
