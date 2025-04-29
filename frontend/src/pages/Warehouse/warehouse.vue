<script setup lang="ts">
import { NDataTable, NButton, NModal, useMessage } from "naive-ui";
import { ref, h, onMounted, computed } from "vue";
import type { DataTableColumns } from "naive-ui";
import type { RowData } from "../../types/types";
import { getAllProduct, deleteProductById } from "../../api/api";
import formatVND from "../../utils/formatMoney";
import EditProduct from "../../components/editProduct/editProduct.vue";

const products = ref<any>([]);
const message = useMessage();
const showModal = ref(false);
const showModalEdit = ref(false);
const currentRowId = ref<string | number | null>(null);
const currentPrd = ref<any>(null);
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
    unit: item.unit,
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

// Handle edit product
const handleEditProduct = async (row: any) => {
  showModalEdit.value = true;
  currentPrd.value = row;
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
    render: (row: any) => {
      return h("span", { style: "font-weight: 600;font-size: 20px" }, row.name);
    },
  },
  {
    title: "Số Lượng tồn kho",
    key: "quantity",
    render: (row: any) => {
      return h("div", { style: "display: flex;gap:10px" }, [
        h(
          "span",
          {
            style:
              "font-size: 20px;align-items: center;display: flex;text-align: center;",
          },
          row.quantity
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
              borderRadius: "3px",
            },
          },
          { default: () => row.unit }
        ),
        // h(
        //   NButton,
        //   {
        //     size: "small",
        //     style: {
        //       outline: "none",
        //       boxShadow: "none",
        //       fontSize: "18px",
        //       padding: "16px 11px",
        //     },
        //     // onClick: () => increaseQuantity(row),
        //   },
        //   { default: () => "+" }
        // ),
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
        formatVND(row.price)
      );
    },
  },
  {
    title: "Hành động",
    key: "action",
    render: (row: any) => {
      return h("div", { style: "display:flex;gap: 10px" }, [
        h(
          NButton,
          {
            size: "small",
            type: "warning",
            onClick: () => handleEditProduct(row),
          },
          { default: () => "Sửa" }
        ),
        h(
          NButton,
          {
            size: "small",
            type: "error",
            onClick: () => handleDelete(row),
          },
          { default: () => "Xóa" }
        ),
      ]);
    },
  },
];

const pagination = {
  pageSize: 10,
};
</script>

<template>
  <h1 style="text-align: center">Kho Hàng</h1>

  <n-modal
    v-model:show="showModalEdit"
    preset="dialog"
    title="Chỉnh sửa"
    style="width: 1000px; background-color: #fafafa; border-radius: 12px"
    ><EditProduct :data="currentPrd"
  /></n-modal>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Xoá sản phẩm"
    content="Bạn có chắc chắn muốn xóa sản phẩm này không?"
    positive-text="Đồng ý"
    negative-text="Huỷ"
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

<style scoped>
.n-button:focus-within {
  outline: none;
  box-shadow: none;
}
</style>
