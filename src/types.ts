export interface User {}

export interface Session extends User {
  expiresAt: number;
  sessionId: string;
}
