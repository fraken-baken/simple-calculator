import { defineStore } from "pinia";
import type { CalculatorOperator, CalculatorState } from "../types/calculator";

const initialState: CalculatorState = {
  displayValue: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  error: null,
};

export const useCalculatorStore = defineStore("calculator", {
  state: (): CalculatorState => ({ ...initialState }),
  actions: {
    inputDigit(digit: string) {
      if (!/^\d$/.test(digit)) {
        return;
      }

      if (this.waitingForOperand) {
        this.displayValue = digit;
        this.waitingForOperand = false;
        this.error = null;
        return;
      }

      this.displayValue =
        this.displayValue === "0" ? digit : `${this.displayValue}${digit}`;
      this.error = null;
    },
    inputDecimal() {
      if (this.waitingForOperand) {
        this.displayValue = "0.";
        this.waitingForOperand = false;
        this.error = null;
        return;
      }

      if (this.displayValue.includes(".")) {
        return;
      }

      this.displayValue = `${this.displayValue}.`;
      this.error = null;
    },
    backspace() {
      if (this.waitingForOperand) {
        return;
      }

      if (this.displayValue.length === 1) {
        this.displayValue = "0";
        return;
      }

      if (this.displayValue.length === 2 && this.displayValue.startsWith("-")) {
        this.displayValue = "0";
        return;
      }

      this.displayValue = this.displayValue.slice(0, -1);
    },
    clear() {
      this.displayValue = initialState.displayValue;
      this.previousValue = initialState.previousValue;
      this.operator = initialState.operator;
      this.waitingForOperand = initialState.waitingForOperand;
      this.error = initialState.error;
    },
    toggleSign() {
      if (this.displayValue === "0") {
        return;
      }

      this.displayValue = this.displayValue.startsWith("-")
        ? this.displayValue.slice(1)
        : `-${this.displayValue}`;
    },
    percent() {
      const currentValue = Number(this.displayValue);
      if (Number.isNaN(currentValue)) {
        return;
      }

      this.displayValue = String(currentValue / 100);
      this.waitingForOperand = false;
      this.error = null;
    },
    setOperator(nextOperator: CalculatorOperator) {
      const currentValue = Number(this.displayValue);
      if (Number.isNaN(currentValue)) {
        this.error = "Invalid number";
        return;
      }

      if (this.operator && !this.waitingForOperand && this.previousValue !== null) {
        const result = this.calculate(this.previousValue, currentValue, this.operator);
        if (result === null) {
          this.displayValue = "0";
          this.previousValue = null;
          this.operator = null;
          this.waitingForOperand = false;
          this.error = "Cannot divide by zero";
          return;
        }

        this.displayValue = String(result);
        this.previousValue = result;
      } else {
        this.previousValue = currentValue;
      }

      this.operator = nextOperator;
      this.waitingForOperand = true;
      this.error = null;
    },
    calculateResult() {
      if (this.operator === null || this.previousValue === null) {
        return;
      }

      const currentValue = Number(this.displayValue);
      if (Number.isNaN(currentValue)) {
        this.error = "Invalid number";
        return;
      }

      const result = this.calculate(this.previousValue, currentValue, this.operator);
      if (result === null) {
        this.displayValue = "0";
        this.previousValue = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.error = "Cannot divide by zero";
        return;
      }

      this.displayValue = String(result);
      this.previousValue = null;
      this.operator = null;
      this.waitingForOperand = true;
      this.error = null;
    },
    calculate(
      left: number,
      right: number,
      operator: CalculatorOperator,
    ): number | null {
      switch (operator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          if (right === 0) {
            return null;
          }
          return left / right;
      }
    },
  },
});
