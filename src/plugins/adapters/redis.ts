import Redis, { RedisOptions } from "ioredis";
import _ from "crypto";
import { SudoEnginee } from "../../core/engine";
import { SudoAdapterBase } from "../../core/bases";
import { SudoSession, SudoUser } from "../../types";

const { getMaxAge } = SudoEnginee.getInstance().getConfig();

export class RedisAdapter extends SudoAdapterBase {
  instance: Redis;

  constructor(options: RedisOptions) {
    super();
    this.instance = new Redis(options);
  }

  createSID(user: SudoUser) {
    return _.createHash("sha256")
      .update(JSON.stringify(user) + Date.now())
      .digest("hex");
  }

  async createSession(user: SudoUser) {
    const sessionId = this.createSID(user);

    const session: SudoSession = {
      ...user,
      sessionId,
      expiresAt: Date.now() + 1000 * getMaxAge(),
    };

    await this.instance.set(
      sessionId,
      JSON.stringify(session),
      "EX",
      getMaxAge(),
    );

    return session;
  }

  async revalidateSession(sessionId: string) {
    const session = await this.instance.get(sessionId);
    if (!session) return null;

    const parsedSession: SudoSession = JSON.parse(session);
    parsedSession.expiresAt = Date.now() + 1000 * getMaxAge();

    await this.instance.set(
      sessionId,
      JSON.stringify(parsedSession),
      "EX",
      getMaxAge(),
    );

    return parsedSession;
  }

  async removeSession(sessionId: string) {
    await this.instance.del(sessionId);
  }
}
