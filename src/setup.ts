import { SudoAdapterBase, SudoConfigBase } from "./core/bases";
import { SudoEnginee } from "./core/engine";

const engine = SudoEnginee.getInstance();

export const setUpAdapter = (adapter: SudoAdapterBase) => {
  engine.setAdapter(adapter);
  return engine;
};

export const setUpConfig = (config: SudoConfigBase) => {
  engine.setConfig(config);
  return engine;
};
