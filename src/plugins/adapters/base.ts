import { SessionConfigs, SudoSession, SudoUser } from "../../types";

export abstract class SudoAdapterBase {
  abstract createSession(user: SudoUser): Promise<SudoSession>;
  abstract revalidateSession(sessionId: string): Promise<SudoSession | null>;
  abstract removeSession(sessionId: string): Promise<void>;

  protected configs: SessionConfigs;
  initialise(sessionConfigs: SessionConfigs) {
    this.configs = sessionConfigs;
  }
}
