<script setup lang="ts">
defineProps<{
  label?: string;
  value: string;
}>();
</script>

<template>
  <header class="display-wrap">
    <p class="label">{{ label ?? "Simple Calculator" }}</p>
    <output class="display" aria-live="polite">{{ value }}</output>
  </header>
</template>

<style scoped>
.display-wrap {
  background: #1f2937;
  border-radius: 12px;
  padding: 0.75rem;
}

.label {
  margin: 0;
  color: #9ca3af;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.display {
  display: block;
  text-align: right;
  margin-top: 0.4rem;
  color: #f9fafb;
  font-size: 2rem;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
</style>
