export interface SudoUser extends Record<string, any> {
  id: string;
}

export interface SudoSession extends SudoUser {
  expiresAt: number;
  sessionId: string;
}
