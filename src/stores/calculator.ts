import { defineStore } from "pinia";
import type { CalculatorState } from "../types/calculator";

const initialState: CalculatorState = {
  displayValue: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  error: null,
};

export const useCalculatorStore = defineStore("calculator", {
  state: (): CalculatorState => ({ ...initialState }),
});
