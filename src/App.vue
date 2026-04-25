<script setup lang="ts">
import CalculatorDisplay from "./components/CalculatorDisplay.vue";
</script>

<template>
  <main class="page">
    <section class="calculator" aria-label="Simple calculator">
      <CalculatorDisplay value="0" />

      <div class="keys" role="group" aria-label="Calculator keys">
        <button class="key key--function">C</button>
        <button class="key key--function">+/-</button>
        <button class="key key--function">%</button>
        <button class="key key--operator">/</button>

        <button class="key">7</button>
        <button class="key">8</button>
        <button class="key">9</button>
        <button class="key key--operator">*</button>

        <button class="key">4</button>
        <button class="key">5</button>
        <button class="key">6</button>
        <button class="key key--operator">-</button>

        <button class="key">1</button>
        <button class="key">2</button>
        <button class="key">3</button>
        <button class="key key--operator">+</button>

        <button class="key key--double">0</button>
        <button class="key">.</button>
        <button class="key key--operator">=</button>
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

.key {
  border: none;
  border-radius: 10px;
  min-height: 3rem;
  background: #374151;
  color: #f9fafb;
  font-size: 1.1rem;
  cursor: default;
}

.key--function {
  background: #4b5563;
}

.key--operator {
  background: #2563eb;
}

.key--double {
  grid-column: span 2;
}
</style>