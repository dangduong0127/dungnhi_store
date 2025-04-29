<script lang="ts" setup>
import { ref, h, shallowRef, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { NMenu, NButton, NDropdown, NIcon } from "naive-ui";
import { HomeOutline, FileTray, ReorderThreeOutline } from "@vicons/ionicons5";

const activeKey = ref("home");
const route = useRoute();
// const router = useRouter();
watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/") activeKey.value = "home";
    else if (newPath.startsWith("/warehouse")) activeKey.value = "warehouse";
  },
  { immediate: true }
);

function renderIcon(icon: any) {
  return () =>
    h(NIcon, null, { default: () => h(icon, { style: "color: #fff;" }) });
}

const menuOptions = shallowRef([
  {
    label: () =>
      h(
        RouterLink,
        { to: "/" },
        { default: () => h("span", { style: "color: #fff;" }, "Trang chủ") }
      ),
    key: "home",
    icon: renderIcon(HomeOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: "/warehouse" },
        { default: () => h("span", { style: "color: #fff;" }, "Kho hàng") }
      ),
    key: "warehouse",
    icon: renderIcon(FileTray),
  },
]);

// Options for dropdown menu
const dropdownOptions = [
  {
    label: () => h(RouterLink, { to: "/about" }, { default: () => "About" }),
    key: "about",
  },
  {
    label: () =>
      h(RouterLink, { to: "/services" }, { default: () => "Services" }),
    key: "services",
  },
  {
    label: () =>
      h(RouterLink, { to: "/contact" }, { default: () => "Contact" }),
    key: "contact",
  },
];
</script>

<template>
  <div class="menu-container">
    <n-menu
      :value="activeKey"
      @update:value="(val) => (activeKey = val)"
      :options="menuOptions"
      mode="horizontal"
    />
    <n-dropdown
      trigger="click"
      :options="dropdownOptions"
      placement="bottom-start"
    >
      <n-button type="primary"
        ><n-icon> <ReorderThreeOutline /> </n-icon
      ></n-button>
    </n-dropdown>
  </div>
</template>

<style scoped lang="scss">
.menu-container {
  display: flex;
  justify-content: space-between;
}

::deep .n-menu-item {
  color: #fff !important;
}

:root {
  --n-menu-item-text-color: #fff; /* Đổi màu chữ của các mục menu */
}

.n-dropdown {
  margin-left: 20px;
}
.n-button:focus-within {
  outline: none;
  box-shadow: none;
}
</style>
