<script setup lang="ts">
import { NDataTable, NButton, NModal, useMessage } from "naive-ui";
import { ref, h, onMounted, computed } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { RowData } from "../../types/types";
import { getAllProduct, deleteProductById } from "../../api/api";
import { IdCard } from "@vicons/ionicons5";

const products = ref<any>([]);
const message = useMessage();
const showModal = ref(false);
const currentRowId = ref<string | number | null>(null);
const submitCallback = async () => {
  try {
    if (currentRowId.value !== null) {
      await deleteProductById(currentRowId.value);
      message.success("Xóa thành công");
      showModal.value = false;

      const res = await getAllProduct();
      products.value = res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};
const cancelCallback = () => {
  showModal.value = false;
  console.log("cancel");
};

onMounted(async () => {
  const res = await getAllProduct();
  products.value = res.data.data;
});
const data = computed(() => {
  if (!products.value) return [];
  return products.value.map((item: any) => ({
    key: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    barcode: item.barcode,
    image: item.image,
  }));
});

const handleDelete = async (row: any) => {
  try {
    showModal.value = true;
    currentRowId.value = row.key;
  } catch (e) {
    console.log(e);
  }
};
const checkedRowKeys = ref<Array<string | number>>([]);
const columns: DataTableColumns<RowData> = [
  {
    type: "selection",
    options: [
      "all",
      "none",
      {
        label: "Select first 2 rows",
        key: "f2",
        onSelect: (pageData) => {
          checkedRowKeys.value = pageData.map((row) => row.key).slice(0, 2);
        },
      },
    ],
    // disabled(row) {
    //   return row.name === "Edward King 3";
    // },
  },
  {
    title: "Mã sản phẩm",
    key: "barcode",
  },
  {
    key: "image",
    render: (row: any) => {
      return h("img", {
        src: row.image,
        alt: `ảnh ${row.name}`,
        style: "width:150px;height:150px;object-fit:contain;",
      });
    },
  },
  {
    title: "Tên sản phẩm",
    key: "name",
  },
  {
    title: "Số Lượng",
    key: "quantity",
    render: (row: any) => {
      return h("div", { style: "display: flex;" }, [
        h(
          NButton,
          {
            size: "small",
            style: {
              outline: "none",
              boxShadow: "none",
              fontSize: "18px",
              padding: "16px 11px",
            },
            // onClick: () => decreaseQuantity(row),
          },
          { default: () => "-" }
        ),
        h(
          "span",
          {
            style:
              "font-size: 18px;align-items: center;display: flex;text-align: center;padding: 0 10px;border-top:1px solid rgb(224, 224, 230);border-bottom:1px solid rgb(224, 224, 230)",
          },
          row.quantity
        ),
        h(
          NButton,
          {
            size: "small",
            style: {
              outline: "none",
              boxShadow: "none",
              fontSize: "18px",
              padding: "16px 11px",
            },
            // onClick: () => increaseQuantity(row),
          },
          { default: () => "+" }
        ),
      ]);
    },
  },
  {
    title: "Giá",
    key: "price",
    render: (row: any) => {
      return h(
        "span",
        { style: "color: green;font-weight: 600;font-size: 20px" },
        row.price
      );
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (row: any) => {
      return h(
        NButton,
        {
          size: "small",
          type: "error",
          onClick: () => handleDelete(row),
        },
        { default: () => "Xóa" }
      );
    },
  },
];

const pagination = {
  pageSize: 10,
};
</script>

<template>
  <h1>Kho Hang</h1>
  <n-button @click="showModal = true"> Start me up </n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Dialog"
    content="Are you sure?"
    positive-text="Submit"
    negative-text="Cancel"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  />
  <n-data-table
    v-model="checkedRowKeys"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</template>
