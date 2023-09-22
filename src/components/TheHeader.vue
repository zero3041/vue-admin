<template>
  <div class="container-fluid">
    <div class="row text-white" style="background-color: #0c713d; padding: 1rem">
      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span @click="showDrawer()"><menu-outlined /></span>
      </div>

      <div
        class="col-10 col-sm-9 d-flex align-items-center justify-content-center justify-content-sm-start"
      >
        <img src="../assets/vue.svg" alt="logo" height="32" width="34" />
        <span class="d-none d-sm-flex">DashBoard</span>
      </div>

      <div class="col-sm-3 d-none d-sm-flex align-items-center justify-content-sm-end">
        <span>Admin</span>
      </div>

      <div class="col-1 d-flex d-sm-none align-items-center justify-content-center">
        <span @click="showDrawerUser()"><user-outlined /></span>
      </div>
    </div>
  </div>

  <a-drawer v-model:open="visible" title="DANH MỤC" placement="left">
    <TheMenu />
  </a-drawer>

  <a-drawer v-model:open="visible_user" title="ADMIN" placement="right">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>
<script>
import TheMenu from "./TheMenu.vue";
import { defineComponent, ref } from "vue";
import { MenuOutlined, UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    TheMenu,
    MenuOutlined,
    UserOutlined,
  },
  setup() {
    const visible = ref(false);
    const visible_user = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };
    const showDrawerUser = () => {
      visible_user.value = true;
    };
    return {
      visible,
      showDrawer,
      visible_user,
      showDrawerUser,
    };
  },
});
</script>
