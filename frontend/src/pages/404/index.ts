import { defineComponent, h } from "vue";

export default defineComponent({
  name: "ErrPage",
  setup() {
    return () => h("h1", "Không tìm thấy trang");
  },
});
