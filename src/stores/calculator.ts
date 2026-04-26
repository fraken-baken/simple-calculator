import { defineStore } from "pinia";
import type { CalculatorOperator, CalculatorState } from "../types/calculator";

const MAX_DISPLAY_LENGTH = 16;

const initialState: CalculatorState = {
  displayValue: "0",
  previousValue: null,
  operator: null,
  lastOperator: null,
  lastOperand: null,
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

      if (this.error) {
        this.clear();
      }

      if (this.waitingForOperand) {
        this.displayValue = digit;
        this.waitingForOperand = false;
        this.error = null;
        return;
      }

      if (this.displayValue.length >= MAX_DISPLAY_LENGTH) {
        return;
      }

      this.displayValue =
        this.displayValue === "0" ? digit : `${this.displayValue}${digit}`;
      this.error = null;
    },
    inputDecimal() {
      if (this.error) {
        this.clear();
      }

      if (this.waitingForOperand) {
        this.displayValue = "0.";
        this.waitingForOperand = false;
        this.error = null;
        return;
      }

      if (this.displayValue.includes(".")) {
        return;
      }

      if (this.displayValue.length >= MAX_DISPLAY_LENGTH) {
        return;
      }

      this.displayValue = `${this.displayValue}.`;
      this.error = null;
    },
    backspace() {
      if (this.error || this.waitingForOperand) {
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
      this.lastOperator = initialState.lastOperator;
      this.lastOperand = initialState.lastOperand;
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

      this.displayValue = this.formatResult(currentValue / 100);
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
          this.lastOperator = null;
          this.lastOperand = null;
          this.waitingForOperand = false;
          this.error = "Cannot divide by zero";
          return;
        }

        this.displayValue = this.formatResult(result);
        this.previousValue = result;
      } else {
        this.previousValue = currentValue;
      }

      this.operator = nextOperator;
      this.lastOperator = null;
      this.lastOperand = null;
      this.waitingForOperand = true;
      this.error = null;
    },
    calculateResult() {
      if (
        this.operator === null &&
        this.lastOperator !== null &&
        this.lastOperand !== null
      ) {
        const currentValue = Number(this.displayValue);
        const result = this.calculate(currentValue, this.lastOperand, this.lastOperator);

        if (result === null) {
          this.displayValue = "0";
          this.previousValue = null;
          this.operator = null;
          this.lastOperator = null;
          this.lastOperand = null;
          this.waitingForOperand = false;
          this.error = "Cannot divide by zero";
          return;
        }

        this.displayValue = this.formatResult(result);
        this.waitingForOperand = true;
        this.error = null;
        return;
      }

      if (this.operator === null || this.previousValue === null) {
        return;
      }

      const currentValue = Number(this.displayValue);
      if (Number.isNaN(currentValue)) {
        this.error = "Invalid number";
        return;
      }

      const activeOperator = this.operator;
      const result = this.calculate(this.previousValue, currentValue, activeOperator);
      if (result === null) {
        this.displayValue = "0";
        this.previousValue = null;
        this.operator = null;
        this.lastOperator = null;
        this.lastOperand = null;
        this.waitingForOperand = false;
        this.error = "Cannot divide by zero";
        return;
      }

      this.displayValue = this.formatResult(result);
      this.lastOperator = activeOperator;
      this.lastOperand = currentValue;
      this.previousValue = null;
      this.operator = null;
      this.waitingForOperand = true;
      this.error = null;
    },
    formatResult(value: number): string {
      if (!Number.isFinite(value)) {
        return "0";
      }

      const normalized = Number(value.toPrecision(12));
      const asPlain = String(normalized);
      if (asPlain.length <= MAX_DISPLAY_LENGTH) {
        return asPlain;
      }

      return normalized.toExponential(8);
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
