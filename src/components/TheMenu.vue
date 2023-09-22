<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
    <a-menu-item key="admin-products">
      <router-link :to="{ name: 'admin-products' }">
        <span><shopping-cart-outlined class="me-1" />Sản Phẩm</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-users">
      <router-link :to="{ name: 'admin-users' }">
        <span><UserOutlined class="me-1" />Tài Khoản</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-roles">
      <router-link :to="{ name: 'admin-roles' }">
        <span><tag-outlined class="me-1" />Vai Trò</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="admin-settings">
      <router-link :to="{ name: 'admin-settings' }">
        <span><setting-outlined spin class="me-1" />Cài Đặt</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>
<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import {
  UserOutlined,
  TagOutlined,
  SettingOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
import { useMenu } from "../stores/use-menu.js";
export default defineComponent({
  components: {
    UserOutlined,
    TagOutlined,
    SettingOutlined,
    MenuOutlined,
    ShoppingCartOutlined,
  },
  setup() {
    const store = useMenu();

    return {
      ...storeToRefs(store),
    };
  },
});
</script>
