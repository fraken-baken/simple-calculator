export type CalculatorOperator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  displayValue: string;
  previousValue: number | null;
  operator: CalculatorOperator | null;
  waitingForOperand: boolean;
  error: string | null;
}
