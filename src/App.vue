<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import type { CalculatorOperator } from "./types/calculator";
import CalculatorButton from "./components/CalculatorButton.vue";
import CalculatorDisplay from "./components/CalculatorDisplay.vue";
import { useCalculatorStore } from "./stores/calculator";

const calculator = useCalculatorStore();

const displayValue = computed(() =>
  calculator.error ?? calculator.displayValue,
);
const hasError = computed(() => calculator.error !== null);

function handleDigit(digit: string) {
  calculator.inputDigit(digit);
}

function handleOperator(operator: CalculatorOperator) {
  calculator.setOperator(operator);
}

function handleKeydown(event: KeyboardEvent) {
  const { key } = event;

  if (/^\d$/.test(key)) {
    calculator.inputDigit(key);
    return;
  }

  if (key === ".") {
    calculator.inputDecimal();
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculator.calculateResult();
    return;
  }

  if (key === "Backspace") {
    calculator.backspace();
    return;
  }

  if (key === "Escape") {
    calculator.clear();
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperator(key);
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <main class="page">
    <section class="calculator" aria-label="Simple calculator">
      <CalculatorDisplay :value="displayValue" :is-error="hasError" />

      <div class="keys" role="group" aria-label="Calculator keys">
        <CalculatorButton
          variant="function"
          aria-label="Clear"
          @click="calculator.clear"
        >
          C
        </CalculatorButton>
        <CalculatorButton
          variant="function"
          aria-label="Toggle sign"
          @click="calculator.toggleSign"
        >
          +/-
        </CalculatorButton>
        <CalculatorButton
          variant="function"
          aria-label="Percent"
          @click="calculator.percent"
        >
          %
        </CalculatorButton>
        <CalculatorButton
          variant="operator"
          aria-label="Divide"
          @click="handleOperator('/')"
        >
          /
        </CalculatorButton>

        <CalculatorButton aria-label="Seven" @click="handleDigit('7')">7</CalculatorButton>
        <CalculatorButton aria-label="Eight" @click="handleDigit('8')">8</CalculatorButton>
        <CalculatorButton aria-label="Nine" @click="handleDigit('9')">9</CalculatorButton>
        <CalculatorButton
          variant="operator"
          aria-label="Multiply"
          @click="handleOperator('*')"
        >
          *
        </CalculatorButton>

        <CalculatorButton aria-label="Four" @click="handleDigit('4')">4</CalculatorButton>
        <CalculatorButton aria-label="Five" @click="handleDigit('5')">5</CalculatorButton>
        <CalculatorButton aria-label="Six" @click="handleDigit('6')">6</CalculatorButton>
        <CalculatorButton
          variant="operator"
          aria-label="Subtract"
          @click="handleOperator('-')"
        >
          -
        </CalculatorButton>

        <CalculatorButton aria-label="One" @click="handleDigit('1')">1</CalculatorButton>
        <CalculatorButton aria-label="Two" @click="handleDigit('2')">2</CalculatorButton>
        <CalculatorButton aria-label="Three" @click="handleDigit('3')">3</CalculatorButton>
        <CalculatorButton
          variant="operator"
          aria-label="Add"
          @click="handleOperator('+')"
        >
          +
        </CalculatorButton>

        <CalculatorButton wide aria-label="Zero" @click="handleDigit('0')">0</CalculatorButton>
        <CalculatorButton aria-label="Decimal point" @click="calculator.inputDecimal">
          .
        </CalculatorButton>
        <CalculatorButton
          variant="operator"
          aria-label="Equals"
          @click="calculator.calculateResult"
        >
          =
        </CalculatorButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 1.5rem;
  background: #f3f4f6;
}

.calculator {
  width: min(100%, 360px);
  border-radius: 16px;
  background: #111827;
  box-shadow: 0 12px 32px rgba(17, 24, 39, 0.35);
  padding: 1rem;
}

.calculator :deep(.display-wrap) {
  margin-bottom: 0.9rem;
}

.keys {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
}

@media (max-width: 420px) {
  .page {
    padding: 0.75rem;
  }

  .calculator {
    width: 100%;
    border-radius: 12px;
  }
}
</style>