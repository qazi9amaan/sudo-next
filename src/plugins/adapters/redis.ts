import Redis, { RedisOptions } from "ioredis";
import { createHash } from "crypto";
import { SudoSession, SudoUser } from "../../types";
import { SudoAdapterBase } from "./base";

export class RedisAdapter extends SudoAdapterBase {
  private readonly instance: Redis;
  private readonly sessionPrefix = "session:";

  constructor(options: RedisOptions) {
    super();
    this.instance = new Redis(options);
  }

  private createSID(user: SudoUser): string {
    return createHash("sha256")
      .update(`${JSON.stringify(user)}:${Date.now()}`)
      .digest("hex");
  }

  private getSessionKey(sessionId: string): string {
    return `${this.sessionPrefix}${sessionId}`;
  }

  private async setSession(
    sessionId: string,
    session: SudoSession,
    expiry: number,
  ) {
    const key = this.getSessionKey(sessionId);
    await this.instance.set(key, JSON.stringify(session), "PX", expiry);
  }

  async createSession(user: SudoUser): Promise<SudoSession> {
    const sessionId = this.createSID(user);
    const expiry = this.configs.sessionAge;

    const session: SudoSession = {
      ...user,
      sessionId,
      expiresAt: Date.now() + expiry,
    };

    await this.setSession(sessionId, session, expiry);
    return session;
  }

  async revalidateSession(sessionId: string) {
    const key = this.getSessionKey(sessionId);
    const sessionData = await this.instance.get(key);

    if (!sessionData) return null;

    const session: SudoSession = {
      ...JSON.parse(sessionData),
      expiresAt: Date.now() + this.configs.sessionAge,
    };

    await this.setSession(sessionId, session, this.configs.sessionAge);
    return session;
  }

  async removeSession(sessionId: string): Promise<void> {
    const key = this.getSessionKey(sessionId);
    await this.instance.del(key);
  }
}
