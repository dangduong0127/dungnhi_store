<script setup lang="ts">
import { NAlert } from "naive-ui";

defineProps<{
  title: string;
  type: "success" | "info" | "warning" | "error";
  mess: string;
}>();
</script>

<template>
  <n-alert :title="title" :type="type" closable>
    {{ mess || "null" }}
  </n-alert>
</template>
