<script lang="ts" setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import {
  NButton,
  NInput,
  NRadioButton,
  NRadioGroup,
  NInputNumber,
} from "naive-ui";
import "./styles.scss";
import formatVND from "../../utils/formatMoney";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const today = ref("");
const hour = ref("");
const mode = ref<"amount" | "percent">("amount");
const value = ref<number | null>(null);
const props = defineProps<{
  dataFromSibling?: any;
}>();
const invoiceContent = ref<HTMLElement | null>(null);

const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());
const updateTime = () => {
  const now = new Date();
  today.value = `${padZero(now.getDate())}/${padZero(
    now.getMonth() + 1
  )}/${now.getFullYear()}`;
  hour.value = `${padZero(now.getHours())}:${padZero(
    now.getMinutes()
  )}:${padZero(now.getSeconds())}`;
};
const customer_name = ref("");

let timer: number | undefined = undefined;

onMounted(() => {
  updateTime(); // Cập nhật lần đầu
  timer = setInterval(updateTime, 1000); // Cập nhật mỗi giây
});

onUnmounted(() => {
  clearInterval(timer); // Clear khi component bị huỷ
});
// Formatter để hiển thị VND hoặc %
const formatter = (val: number | null) => {
  if (val === null) return "";
  return mode.value === "percent" ? `${val}%` : `${val.toLocaleString()} ₫`;
};

// Parser để xử lý input từ string thành number
const parser = (input: string) => {
  return parseFloat(input.replace(/[^\d.]/g, ""));
};

const discountedTotal = computed(() => {
  if (!value.value) return total_amount.value;

  if (mode.value === "percent") {
    return total_amount.value * (1 - value.value / 100);
  } else {
    return Math.max(0, total_amount.value - value.value);
  }
});

const totalQuantity = computed(() => {
  return (props.dataFromSibling || []).reduce(
    (sum: number, item: any) => sum + (item.quantity ?? 0),
    0
  );
});

const total_amount = computed(() => {
  return (props.dataFromSibling || []).reduce(
    (sum: number, item: any) => sum + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
});

const printInvoice = async (element: HTMLElement) => {
  const scale: number = 2;
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.autoPrint();

  // 💡 Xuất PDF ra dạng blob để in
  const pdfBlob = pdf.output("blob");
  const blobUrl = URL.createObjectURL(
    new Blob([pdfBlob], { type: "application/pdf" })
  );

  // 💡 Tạo iframe ẩn để in ngay trong trang
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.src = blobUrl;

  iframe.onload = () => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
  };

  document.body.appendChild(iframe);
};

const exportAndPrint = async () => {
  await nextTick();
  const el = invoiceContent.value;
  if (!el) return;

  await printInvoice(el);
};

const invoiceHtml = computed(() => {
  return `
    <div id="invoice" style="padding: 15px;display: flex;flex-direction: column;gap: 20px;">
      <div>
          <h2 style="text-align: center;">HÓA ĐƠN BÁN HÀNG</h2>
        <h3 style="text-align: center;">Cửa hàng tạp hoá Dung Nhi</h3>
      </div>
      <div style="display: flex;justify-content:space-between;gap: 20px;">
          <p>Khách hàng: ${customer_name.value}</p>
      <p>Ngày: ${today.value} ${hour.value}</p>
      </div>
      <table style="width: 100%;text-align:left;border-bottom: 1px solid #ccc;border-top: 1px solid #000;padding: 10px 0;">
        <tr>
          <th>Sản phẩm</th>
          <th>SL</th>
          <th style="text-align: center;">Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
        ${
          (props.dataFromSibling || [])
            .map(
              (item: any) => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td style="text-align: center;">${formatVND(item.price)}</td>
            <td>${formatVND(item.price * item.quantity)}</td>
          </tr>
        `
            )
            .join("") || `<tr><td colspan="4">Không có sản phẩm nào</td></tr>`
        }
            <tr>
                <td colspan="3">Giảm giá:</td>
                <td>${
                  mode.value === "percent"
                    ? (value.value ?? 0) + "%"
                    : value.value ?? 0 + " ₫"
                } </td>
            </tr>
      </table>
      <p style="text-align: right;font-size:20px;margin-top:0;"><strong>Thành tiền: ${
        mode.value === "percent"
          ? formatVND(total_amount.value * (1 - (value.value ?? 0) / 100))
          : formatVND(Math.max(0, total_amount.value - (value.value ?? 0)))
      }</strong></p>
    </div>
  `;
});
</script>

<template>
  <div class="payment-container">
    <div class="payment-inner">
      <div class="payment-header">
        <div class="cart-header">
          <div class="cart-header-control-left">
            <div class="cart-seller">
              <span>Hoá đơn bán hàng</span>
            </div>
          </div>

          <div class="cart-header-controll-right">
            <span>{{ today }} - {{ hour }}</span>
          </div>
        </div>
        <div class="search-custommer">
          <n-input
            :value="customer_name"
            @update:value="(val) => (customer_name = val)"
            type="text"
            placeholder="Nhập tên khách hàng"
          />
        </div>
      </div>

      <div class="payment-main">
        <div class="total-wrapper">
          <div class="total-title"><span>Tổng tiền hàng</span></div>
          <div class="total-quantity">
            <span>{{ totalQuantity }}</span>
          </div>
          <div class="total-price">
            <span>{{ formatVND(total_amount) }}</span>
          </div>
        </div>

        <div class="discount-wrapper">
          <div class="discount-title"><span>Giảm giá</span></div>
          <div class="discount-main">
            <span
              >-{{
                mode === "percent" ? (value ?? 0) + "%" : (value ?? 0) + "₫"
              }}</span
            >
          </div>
          <!-- <div class="discount-price">
            <div class="flex flex-col gap-4">
              <n-radio-group
                :value="mode"
                @update:value="(val) => (mode = val)"
                name="discount-mode"
                size="medium"
              >
                <n-radio-button value="amount"
                  >Giảm theo số tiền</n-radio-button
                >
                <n-radio-button value="percent"
                  >Giảm theo phần trăm</n-radio-button
                >
              </n-radio-group>

              <n-input-number
                :value="value"
                @update:value="(val) => (value = val)"
                :min="0"
                :max="mode === 'percent' ? 100 : undefined"
                :step="mode === 'percent' ? 1 : 1000"
                :formatter="formatter"
                :parser="parser"
                placeholder="Nhập giá trị"
                size="large"
              />
            </div>
          </div> -->

          <div class="discount-price">
            <div class="flex items-center gap-2">
              <n-radio-group
                :value="mode"
                @update:value="(val) => (mode = val)"
                name="discount-mode"
                size="small"
                class="discount-radio-group"
              >
                <n-input-number
                  :value="value"
                  @update:value="(val) => (value = val)"
                  :min="0"
                  :max="mode === 'percent' ? 100 : undefined"
                  :step="mode === 'percent' ? 1 : 1000"
                  :formatter="formatter"
                  :parser="parser"
                  placeholder="Nhập"
                  size="small"
                  class="discount-input-number"
                />
                <n-radio-button value="amount">VNĐ</n-radio-button>
                <n-radio-button value="percent">%</n-radio-button>
              </n-radio-group>
            </div>
          </div>
        </div>

        <div class="customer-debt">
          <div class="customer-debt-title"><span>Khách cần trả</span></div>
          <div class="customer-debt-price">
            <span>{{ formatVND(discountedTotal) }}</span>
          </div>
        </div>

        <!-- <div class="customer-pay">
          <div class="customer-pay-title"><span>Khách đã trả</span></div>
          <div class="customer-pay-price">
            <span>{{ formatVND(total_amount) }}</span>
          </div>
        </div> -->
      </div>
    </div>

    <div style="position: absolute; top: -9999px; left: -9999px">
      <div ref="invoiceContent" v-html="invoiceHtml"></div>
    </div>

    <div class="payment-footer">
      <n-button class="btn-buy" type="primary" @click="exportAndPrint"
        >Thanh toán</n-button
      >
    </div>
  </div>
</template>

<style scoped>
.n-button:focus-within {
  outline: none;
  box-shadow: none;
}

.discount-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discount-radio-group {
  display: flex;
}

.discount-input-number {
  width: 120px;
}
</style>
