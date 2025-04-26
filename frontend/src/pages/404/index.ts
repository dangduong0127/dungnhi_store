import { defineComponent, h } from "vue";

export default defineComponent({
  name: "errPage",
  setup() {
    return () => h("h1", "Không tìm thấy trang");
  },
});
