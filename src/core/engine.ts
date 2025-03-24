import { SessionConfigs, SudoSession } from "../types";
import {
  defaultSession as getDefaultSessionData,
  defaultSessionAge,
  defaultSessionConfigs,
} from "./default";
import { SudoAdapterBase } from "../plugins/adapters/base";

export interface EngineParams extends SessionConfigs {
  adapter: SudoAdapterBase;
}

export class SudoEnginee {
  defaultSession = getDefaultSessionData;
  sessionConfigs = defaultSessionConfigs;
  sessionAge = defaultSessionAge;

  adapter: SudoAdapterBase;

  constructor({ adapter, ...config }: EngineParams) {
    // initialise configs
    if (!adapter) throw new Error("Adapter is required");
    this.adapter = adapter;

    this._initializeConfig(config);
  }

  private _initializeConfig({
    sessionAge = defaultSessionAge,
    sessionConfigs = defaultSessionConfigs,
    defaultSession = getDefaultSessionData,
    isValidSession,
  }: SessionConfigs) {
    // set configs
    this.sessionAge = sessionAge;
    this.sessionConfigs = sessionConfigs;
    this.defaultSession = defaultSession;
    this.isGenuineSession = isValidSession;

    // initialise adapter
    this.adapter.initialise({
      sessionAge,
      sessionConfigs,
      defaultSession,
      isValidSession,
    });
  }

  isGenuineSession(session: SudoSession) {
    if (!session) return false;
    if (!session.sessionId) return false;
    if (!session.expiresAt) return false;
    return session.expiresAt > Date.now();
  }
}
