<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "default" | "function" | "operator";
    wide?: boolean;
    ariaLabel?: string;
  }>(),
  {
    variant: "default",
    wide: false,
    ariaLabel: undefined,
  },
);
</script>

<template>
  <button
    class="key"
    :class="{
      'key--function': variant === 'function',
      'key--operator': variant === 'operator',
      'key--double': wide,
    }"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>

<style scoped>
.key {
  border: none;
  border-radius: 10px;
  min-height: 3rem;
  background: #374151;
  color: #f9fafb;
  font-size: 1.1rem;
  cursor: pointer;
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
