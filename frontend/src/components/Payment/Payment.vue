<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import { NButton, NInput } from "naive-ui";
import "./styles.scss";
import formatVND from "../../utils/formatMoney";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
// const doc = new jsPDF({
//   orientation: "landscape",
//   unit: "in",
//   format: [4, 2],
// });
const props = defineProps<{
  dataFromSibling?: any;
}>();
const invoiceContent = ref<HTMLElement | null>(null);
const today = new Date().toLocaleDateString();
const hour = new Date().getHours() + ":" + new Date().getMinutes();
const customer_name = ref("");
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
      <p>Ngày: ${today} ${hour}</p>
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
      </table>
      <p style="text-align: right;font-size:20px;margin-top:0;"><strong>Tổng cộng: ${formatVND(
        total_amount.value
      )}</strong></p>
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
          <div class="discount-main"><span>0%</span></div>
          <div class="discount-price"><span>0</span></div>
        </div>

        <div class="customer-debt">
          <div class="customer-debt-title"><span>Khách cần trả</span></div>
          <div class="customer-debt-price">
            <span>{{ formatVND(total_amount) }}</span>
          </div>
        </div>

        <div class="customer-pay">
          <div class="customer-pay-title"><span>Khách đã trả</span></div>
          <div class="customer-pay-price">
            <span>{{ formatVND(total_amount) }}</span>
          </div>
        </div>
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
</style>
