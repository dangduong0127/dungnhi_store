<script setup lang="ts">
defineProps<{
  size: number | string;
  color: string;
}>();
</script>

<template>
  <svg
    class="btn-close"
    :width="size || 24"
    :height="size || 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    :style="{ color }"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
      fill="currentColor"
    ></path>
  </svg>
</template>
