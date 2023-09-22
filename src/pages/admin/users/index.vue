<template>
  <a-card title="Tài khoản" style="width: 100%">
    <div class="row">
      <div class="mb-3 col-12 d-flex justify-content-end">
        <router-link :to="{ name: 'admin-users-create' }">
          <a-button type="primary">
            <plus-outlined />
          </a-button>
        </router-link>
      </div>
      <div class="col-12">
        <a-table :dataSource="users" :columns="columns" :scroll="{ x: 576 }">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
            </template>

            <template v-if="column.key === 'status'">
              <span v-if="record.status_id == 1" class="text-primary">{{
                record.status
              }}</span>
              <span v-else-if="record.status_id == 2" class="text-danger">{{
                record.status
              }}</span>
            </template>

            <template v-if="column.key === 'action'">
              <router-link :to="{ name: 'admin-users-edit', params: { id: record.id } }">
                <a-button type="primary"> <edit-outlined /> </a-button>
              </router-link>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMenu } from "../../../stores/use-menu.js";
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import axios from "axios";
export default {
  components: {
    PlusOutlined,
    EditOutlined,
  },
  setup() {
    useMenu().onSelectedKeys(["admin-users"]);

    const users = ref([]);
    const columns = [
      {
        title: "#",
        key: "index",
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
      },
    ];

    const getUsers = () => {
      axios
        .get("http://127.0.0.1:8000/api/users")
        .then(function (response) {
          users.value = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getUsers();
    return {
      users,
      columns,
    };
  },
};
</script>
