import { SudoEnginee } from "./engine";

export class SharedMemory {
  private static enginee: SudoEnginee;
  static setEnginee = (engine: SudoEnginee) => {
    this.enginee = engine;
  };
  static getEnginee = () => {
    return this.enginee;
  };
}
