import auth from "@/_internal/auth";
import { Session, User } from "@/types";
import { setUpAdapter } from "@/index";

export class Adapter {
  generateSessionId() {
    return Math.random().toString(36).substring(2);
  }

  async createSession(user: User) {
    const sessionId = this.generateSessionId();
    const session = {
      ...user,
      sessionId,
      // Convert seconds to milliseconds,
      expiresAt: Date.now() + auth.getMaxAge() * 1000,
    };
    return session as Session;
  }

  async validateAndSetSession(sessionId: string): Promise<Session | null> {
    return Promise.resolve(auth.getInitialSession());
  }

  async removeSession(sessionId: string) {
    return Promise.resolve(sessionId);
  }
}

const adapter = setUpAdapter();

if (!(adapter instanceof Adapter)) {
  throw new Error("setUpAdapter should return an instance of Adapter");
}

export default adapter;
