export type CalculatorOperator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  displayValue: string;
  previousValue: number | null;
  operator: CalculatorOperator | null;
  lastOperator: CalculatorOperator | null;
  lastOperand: number | null;
  waitingForOperand: boolean;
  error: string | null;
}
