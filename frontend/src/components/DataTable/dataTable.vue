<template>
  <div class="data-table-wrapper">
    <n-data-table
      v-model="checkedRowKeys"
      :columns="columns"
      :data="dataTable"
      :pagination="pagination"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, h } from "vue";
import { NDataTable, NButton } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { RowData } from "../../types/types";
import formatVND from "../../utils/formatMoney";
// import { getProductById } from "../../api/api";

const props = defineProps<{
  productData: any;
}>();

const checkedRowKeys = ref<Array<string | number>>([]);

const dataArray = ref<Array<any>>([]);

const addProduct = (newProduct: any) => {
  const existingIndex = dataArray.value.findIndex(
    (item) => item.barcode === newProduct.barcode
  );

  if (existingIndex !== -1) {
    dataArray.value[existingIndex].quantity += 1;
  } else {
    dataArray.value.push({ ...newProduct, quantity: 1 });
  }

  emit("sendDataToSibling", dataArray.value);
};

const emit = defineEmits<{
  (e: "sendDataToSibling", val: any): void;
}>();

watch(
  () => props.productData,
  (newVal) => {
    if (newVal) {
      addProduct(newVal);
    }
  },
  { immediate: true, deep: true }
);

const decreaseQuantity = (row: any) => {
  dataArray.value.forEach((item) => {
    if (item.barcode === row.barcode) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  });
};

const increaseQuantity = (row: any) => {
  dataArray.value.forEach((item) => {
    if (item.barcode === row.barcode) {
      item.quantity += 1;
    }
  });
};

const handleDelete = (row: RowData) => {
  const index = dataArray.value.findIndex(
    (item) => item.barcode === row.barcode
  );
  if (index !== -1) {
    dataArray.value.splice(index, 1);
  }
};

// 💡 Tạo dataTable từ dataArray
const dataTable = computed<RowData[]>(() =>
  dataArray.value.map((item, index) => ({
    barcode: item?.barcode || "No Barcode",
    name: item?.name || "Unknown",
    price: formatVND(item?.price) || 0,
    quantity: item.quantity || 0,
    description: item?.description || "Null",
    image: item?.image || "null",
    unit: item?.unit || "No Unit",
    key: index,
  }))
);

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
    render: (row: any) => {
      return h("span", { style: "font-weight: 600;font-size: 20px" }, row.name);
    },
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
            onClick: () => decreaseQuantity(row),
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
            onClick: () => increaseQuantity(row),
          },
          { default: () => "+" }
        ),
        h(
          "span",
          {
            style: {
              outline: "none",
              boxShadow: "none",
              fontSize: "18px",
              padding: "0px 15px",
              backgroundColor: "#adcaffcf",
              border: "1px solid #005bff",
              color: "#005bff",
              borderRadius: "7px",
              marginLeft: "15px",
            },
          },
          { default: () => row.unit }
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
