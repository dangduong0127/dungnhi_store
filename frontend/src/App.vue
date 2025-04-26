<script setup lang="ts">
import { ref, provide } from "vue";
import {
  NConfigProvider,
  NNotificationProvider,
  NDialogProvider,
} from "naive-ui";
import Header from "./components/layout/header.vue";
import Footer from "./components/layout/footer.vue";

const shareData = ref<any>(null);
provide("shareData", shareData);

const handleUpdate = (val: any) => {
  // console.log("val from Header:", val);
  // console.log("shareData before set:", shareData);
  if (shareData) {
    shareData.value = val;
  }
};
</script>

<template>
  <NConfigProvider>
    <n-notification-provider placement="top">
      <n-dialog-provider>
        <Header :onUpdated="handleUpdate" />
        <router-view />
        <Footer />
      </n-dialog-provider>
    </n-notification-provider>
  </NConfigProvider>
</template>
