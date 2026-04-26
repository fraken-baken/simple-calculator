import { invoke } from "@tauri-apps/api/core";
import type { CalculatorOperator } from "../types/calculator";

export async function calculateBinaryInRust(
  left: number,
  right: number,
  operator: CalculatorOperator,
): Promise<number> {
  return invoke<number>("calculate_binary", { left, right, operator });
}
