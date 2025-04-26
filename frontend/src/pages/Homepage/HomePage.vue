<script setup lang="ts">
import { inject, ref } from "vue";
import type { Ref } from "vue";
import DataTable from "../../components/DataTable/dataTable.vue";
import "./homePage.scss";
import Payment from "../../components/Payment/payment.vue";

const shareData = inject<Ref<any>>("shareData");

const dataFromA = ref("");
// watch(
//   shareData,
//   (newVal) => {
//     console.log("Nhận được từ Header:", newVal);
//   },
//   { deep: true }
// );

// console.log(shareData);
</script>

<template>
  <div class="container">
    <div class="left-side">
      <DataTable
        :productData="shareData"
        @sendDataToSibling="dataFromA = $event"
      />
    </div>
    <div class="right-side"><Payment :dataFromSibling="dataFromA" /></div>
  </div>
</template>
