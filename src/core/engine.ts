import { SudoAdapterBase, SudoConfigBase } from "../core/bases";
import { DefaultConfigs } from "../plugins/configs/default";

export class SudoEnginee {
  private static _instance: SudoEnginee;

  private adapter: SudoAdapterBase;
  private config: SudoConfigBase = new DefaultConfigs();

  getAdapter() {
    if (!this.adapter) {
      throw new Error("Sudo Adapter not set");
    }
    return this.adapter;
  }

  getConfig() {
    if (!this.config) {
      throw new Error("Sudo Config not set");
    }
    return this.config;
  }

  setAdapter(adapter: SudoAdapterBase) {
    this.adapter = adapter;
  }

  setConfig(config: SudoConfigBase) {
    this.config = config;
  }

  static getInstance() {
    if (!SudoEnginee._instance) {
      SudoEnginee._instance = new SudoEnginee();
    }
    return SudoEnginee._instance;
  }
}
