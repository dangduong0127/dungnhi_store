<script setup lang="ts">
import { ref } from "vue";
import { useNotification } from "naive-ui";
import { createProduct } from "../../api/api";

const notification = useNotification();
const productName = ref("");
const productCapitalPrice = ref(0);
const productSellPrice = ref<number>(0);
const productBarcode = ref("");
const productQuantity = ref(0);
const productUnit = ref("");
const productImage = ref("");
const productDescription = ref("");
let numberRegex = /^[0-9]{1,13}$/;

const showError = (msg: string): boolean => {
  notification.error({
    content: msg,
    duration: 3000,
  });

  return false;
};

const validate = (): boolean => {
  if (!productBarcode.value)
    return showError("Vui lòng nhập mã Barcode hoặc tên sản phẩm");

  if (!productCapitalPrice.value) return showError("Vui lòng nhập giá vốn");

  if (!numberRegex.test(String(productCapitalPrice.value)))
    return showError("Giá vốn phải là số hợp lệ");

  if (!productSellPrice.value) return showError("Vui lòng nhập giá bán");
  if (!numberRegex.test(String(productSellPrice.value)))
    return showError("Giá bán phải là số hợp lệ");

  if (Number(productSellPrice.value) <= Number(productCapitalPrice.value))
    return showError("Giá bán phải lớn hơn giá vốn");

  if (!productQuantity.value || Number(productQuantity.value) <= 0)
    return showError("Số lượng phải lớn hơn 0");

  if (!productName.value) return showError("Vui lòng nhập tên sản phẩm");

  if (!productUnit.value) return showError("Vui lòng nhập đơn vị sản phẩm");
  return true;
};

const submitProduct = async () => {
  if (validate()) {
    try {
      await createProduct({
        barcode: productBarcode.value,
        description: productDescription.value,
        name: productName.value,
        price: productSellPrice.value,
        image: productImage.value,
        quantity: productQuantity.value,
        unit: productUnit.value,
      });
      notification.success({
        content: "Sản phẩm đã được thêm thành công!",
        duration: 3000,
      });
    } catch (err: any) {
      notification.error({
        content: err.response.data.message,
        description: "Đã có lỗi xảy ra!",
        duration: 3000,
      });
    }
  }
};

// const handleCallApiBarcode = async (barcode: string | number) => {
//   try {
//     const response = await getInforProduct(barcode);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };
</script>

<template>
  <div>
    <form id="addProduct" @submit.prevent="submitProduct">
      <div class="col-left">
        <div class="barcode-input">
          <label for="barcode">Mã hàng</label>
          <input
            v-model="productBarcode"
            type="text"
            name="barcode"
            placeholder="Ví dụ: 09453247374"
          />
        </div>
        <div class="capital-price-input">
          <label for="capital-price">Giá vốn</label>
          <input
            v-model="productCapitalPrice"
            type="text"
            name="capital-price"
            placeholder="Giá vốn"
          />
        </div>
        <div class="selling-price-input">
          <label for="selling-price">Giá bán</label>
          <input
            v-model="productSellPrice"
            type="text"
            name="selling-price"
            placeholder="Giá bán"
          />
        </div>
        <div class="category-input">
          <label for="category">Danh mục</label>
          <select value="Lựa chọn">
            <option value="">Gia vị</option>
          </select>
        </div>
      </div>
      <div class="col-right">
        <div class="warehouse-quantity-input">
          <label for="quantity">Số lượng</label>
          <input
            v-model="productQuantity"
            type="number"
            name="quantity"
            placeholder="Số lượng nhập"
          />
        </div>
        <div class="product-name-input">
          <label for="product-name">Tên hàng</label>
          <input
            v-model="productName"
            type="text"
            name="product-name"
            placeholder="Tên hàng"
          />
        </div>

        <div class="default-unit">
          <label for="unit">Đơn vị</label>

          <input
            v-model="productUnit"
            type="text"
            name="unit"
            placeholder="Ví dụ: Chai, Hộp, Gói,..."
          />
        </div>

        <div class="product-image-input">
          <label for="image-link">Link ảnh </label>
          <input
            v-model="productImage"
            type="text"
            name="image-link"
            placeholder="link ảnh (nếu có)"
          />
        </div>
      </div>
      <button class="btn-addProduct" type="submit">Thêm mới</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
form#addProduct {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  font-size: 18px;
  .col-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    div {
      display: grid;
      grid-template-columns: 100px 1fr;
      align-items: center;
    }
  }
  .col-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    div {
      display: grid;
      grid-template-columns: 100px 1fr;
      align-items: center;
    }
  }
  label {
    font-weight: bold;
  }
  input,
  select {
    background-color: #fff;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
    color: #000;
  }

  .btn-addProduct {
    grid-column: span 2;
    justify-self: end;
    background-color: #2080f0;
    width: 150px;
  }
}

input:focus-within {
  outline: none;
  box-shadow: none;
}
</style>
