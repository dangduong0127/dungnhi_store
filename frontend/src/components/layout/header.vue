<script setup lang="ts">
import { NButton, NInput, useNotification, useDialog } from "naive-ui";
import { IconPlus, IconSearch, IconClose } from "../Icons";
import RightMenu from "./right-menu/RightMenu.vue";
import { getProductByBarcode } from "../../api/api";
import { ref, h, onMounted, onBeforeUnmount } from "vue";
import AddProduct from "../addProduct/AddProduct.vue";
import "./header.scss";

const props = defineProps<{
  onUpdated: (val: any) => void;
}>();
const productData = ref<any>(null);
const searchVal = ref("");
const notification = useNotification();
const dialog = useDialog();
// const barcode = ref<string>("");
let buffer: string = "";
// let timeout: any = null;

const openModal = () => {
  dialog.info({
    title: "Thêm sản phẩm",
    content: () => h(AddProduct),
    // positiveText: "Thêm",
    // negativeText: "Cancel",
    style: {
      width: "1000px",
      borderRadius: "12px",
    },
    action: () =>
      h(
        "div",
        { style: "display: flex; justify-content: flex-end; gap: 12px;" },
        [
          h(
            "button",
            {
              style: `
              padding: 10px 21px;
              background-color: red;
              border: 1px solid #ccc;
              border-radius: 9px;
              cursor: pointer;
              font-size: 18px;
              color: #fff;
              width: 150px;
              font-weight: 600;
            `,
              onClick: () => {
                dialog.destroyAll(); // Đóng popup
              },
            },
            "Huỷ"
          ),
          // h(
          //   "button",
          //   {
          //     style: `
          //     padding: 6px 20px;
          //     background-color: #2080f0;
          //     color: white;
          //     border: none;
          //     border-radius: 6px;
          //     font-weight: 600;
          //     cursor: pointer;
          //   `,
          //     onClick: () => {
          //       console.log("Đã lưu!");
          //       dialog.destroyAll(); // Đóng sau khi lưu
          //     },
          //   },
          //   "Lưu"
          // ),
        ]
      ),
  });
};

const getProduct = async (id: string | number) => {
  try {
    if (!id) {
      return notification.error({
        content: "Vui lòng nhập vào mã barcode hoặc tên sản phẩm",
      });
    }

    const response = await getProductByBarcode(id);
    if (response?.data) {
      productData.value = response.data;
      if (props.onUpdated && productData.value) {
        if (productData.value.message) {
          notification.error({
            content: () => h("div", {}, productData.value.message),
            meta: () =>
              h("div", { style: "text-align:center;" }, [
                "Vui lòng nhập đúng mã barcode sản phẩm",
                h("br"),
                h(
                  NButton,
                  {
                    style: "margin-top: 10px;",
                    type: "primary",
                    onClick: openModal,
                  },
                  { default: () => "Thêm mới hàng hoá?" }
                ),
              ]),
            duration: 3000,
          });
        } else {
          props.onUpdated(productData.value);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  focusInput();
});

onBeforeUnmount(() => {
  window.addEventListener("keydown", handleKeydown);
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    if (buffer.length >= 6) {
      searchVal.value = buffer;
      getProduct(buffer);
    }
    buffer = "";
  } else if (e.key?.length === 1) {
    buffer += e.key;
  }
};
const focusInput = () => {
  const inputElement: any = document.querySelector("#ip-search-product");
  if (inputElement) {
    inputElement.focus();
  }
};
</script>

<template>
  <header>
    <div class="header-left">
      <div class="col-left-control">
        <div class="search-wrapper">
          <IconSearch size="24" color="#ccc" />
          <n-input
            :value="searchVal"
            @update:value="(val) => (searchVal = val)"
            @keyup.enter="getProduct(searchVal)"
            id="ip-search-product"
            class="ip-search"
            type="text"
            style="padding-left: 20px; height: 100% !important"
            placeholder="Tìm hàng hoá"
            @click="focusInput"
          />
        </div>
        <n-button @click="getProduct(searchVal)" type="primary"
          >Tìm kiếm</n-button
        >
      </div>
      <div class="col-right-control">
        <div class="header-tab-wrap">
          <div class="content-tab">
            <ul class="list-tabs">
              <div class="invoices">
                <div class="invoice-inner">
                  <div class="single-invoice" href="">
                    Hoá đơn 1<IconClose size="18" color="#fff" />
                  </div>
                </div>
                <div class="invoice-inner active">
                  <div class="single-invoice" href="">
                    Hoá đơn 2<IconClose size="18" color="#fff" />
                  </div>
                </div>
              </div>
              <li>
                <n-button @click="openModal" quaternary
                  ><IconPlus size="28" color="#fff"
                /></n-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <RightMenu />
    </div>
  </header>
</template>

<style scoped lang="scss">
.n-button:focus-within {
  outline: none;
  box-shadow: none;
}
</style>
