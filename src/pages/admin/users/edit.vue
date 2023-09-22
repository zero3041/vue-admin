<template>
  <form @submit.prevent="updateUsers()">
    <a-card title="Câp nhật tài khoản" style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3">
              <a-avatar shape="square" :size="200">
                <template #icon>
                  <img src="../../../assets/users.jpg" alt="users" />
                </template>
              </a-avatar>
            </div>
            <div class="col-12 d-flex justify-content-center">
              <a-button type="primary">
                <plus-outlined />
                <span> Chọn Ảnh </span>
              </a-button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span :class="{ 'text-danger': errors.status_id }">Tình Trạng:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-select
                class="border-fix"
                show-search
                placeholder="Tình trạng"
                style="width: 100%"
                :options="users_status"
                :filter-option="filterOption"
                v-model:value="status_id"
                :class="{ 'select-danger': errors.status_id }"
              ></a-select>
              <div class="a-100"></div>
              <small v-if="errors.status_id" class="text-danger">{{
                errors.status_id[0]
              }}</small>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Tên tài khoản:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="username"
                placeholder="Nhập tên tài khoản"
                allow-clear
                :class="{ 'texts-danger': errors.username }"
              />
              <div class="a-100"></div>
              <small v-if="errors.username" class="text-danger">{{
                errors.username[0]
              }}</small>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Họ và Tên:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="name"
                placeholder="Nhập Họ và Tên"
                allow-clear
                :class="{ 'texts-danger': errors.name }"
              />
              <div class="a-100"></div>
              <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Email:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="email"
                placeholder="Nhập Email"
                allow-clear
                :class="{ 'texts-danger': errors.email }"
              />
              <div class="a-100"></div>
              <small v-if="errors.email" class="text-danger">{{ errors.email[0] }}</small>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Phòng ban:</span>
              </label>
            </div>
            <div class="col-10 col-sm-4 mb-3">
              <a-select
                class="border-fix"
                show-search
                placeholder="Phòng ban"
                style="width: 100%"
                :options="departments"
                :filter-option="filterOption"
                v-model:value="department_id"
                :class="{ 'select-danger': errors.department_id }"
              >
              </a-select>
              <div class="a-100"></div>
              <small v-if="errors.department_id" class="text-danger">{{
                errors.department_id[0]
              }}</small>
            </div>
            <div class="col-2 col-sm-1">
              <a-button type="primary">
                <plus-outlined />
              </a-button>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end"></div>
            <div class="col-12 col-sm-5">
              <a-checkbox v-model:checked="change_password">Đổi mật khẩu:</a-checkbox>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Mật khẩu</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input-password
                class="border-fix"
                v-model:value="password"
                placeholder="Password"
                allow-clear
                :class="{ 'texts-danger': errors.password }"
              />
              <div class="a-100"></div>
              <small v-if="errors.password" class="text-danger">{{
                errors.password[0]
              }}</small>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Nhập lại mật khẩu:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input-password
                class="border-fix"
                v-model:value="password_confirmation"
                placeholder="Re Password"
                allow-clear
                :class="{ 'texts-danger': errors.password }"
              />
              <div class="a-100"></div>
              <small v-if="errors.password" class="text-danger">{{
                errors.password[0]
              }}</small>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Lần đăng nhập gần đây:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <span>{{ login_at }}</span>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Lần đổi mật khẩu gần đây:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <span>{{ change_password_at }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
          <a-button class="me-sm-2 me-0 mb-3 mb-sm-0">
            <router-link :to="{ name: 'admin-users' }">
              <span>Huỷ</span>
            </router-link>
          </a-button>
          <a-button type="primary" htmlType="submit">
            <span>Lưu</span>
          </a-button>
        </div>
      </div>
    </a-card>
  </form>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { PlusOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import axios from "axios";
import { Dayjs } from "dayjs";

export default defineComponent({
  components: {
    PlusOutlined,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const errors = ref({});

    // useMenu().selectedKeys(["admin-users"]);
    const users_status = ref([]);
    const departments = ref([]);
    const updateUsers = () => {
      axios
        .put(`http://127.0.0.1:8000/api/users/${route.params.id}`, users)
        .then((response) => {
          message.success("Cập nhật thành công");
          router.push({ name: "admin-users" });
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
          message.error("Cập nhật thất bại");
        });
    };
    const users = reactive({
      username: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      department_id: [],
      status_id: [],
      change_password: false,
      login_at: "",
      change_password_at: "",
    });

    const getUserEdit = () => {
      axios
        .get(`http://127.0.0.1:8000/api/users/${route.params.id}/edit`)
        .then((response) => {
          users.username = response.data.users.username;
          users.name = response.data.users.name;
          users.email = response.data.users.email;
          users.department_id = response.data.users.department_id;
          users.status_id = response.data.users.status_id;

          response.data.users.login_at
            ? (users.login_at = dayjs(response.data.users.login_at).format(
                "DD/MM/YYYY HH:mm"
              ))
            : (users.login_at = "Chưa đăng nhập lần nào");

          response.data.users.change_password_at
            ? (users.change_password_at = dayjs(
                response.data.users.change_password_at
              ).format("DD/MM/YYYY HH:mm"))
            : (users.change_password_at = "Chưa đổi mật khẩu lần nào");

          users_status.value = response.data.users_status;
          departments.value = response.data.departments;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    getUserEdit();

    return {
      users_status,
      departments,
      ...toRefs(users),
      filterOption,
      errors,
      updateUsers,
    };
  },
});
</script>

<style>
.select-danger {
  border: 1px solid red;
  border-radius: 6px;
}
.border-fix {
  border-radius: 0px !important;
  box-sizing: border-box;
  line-height: 1.5714285714285714;
}
.texts-danger {
  border: 1px solid red;
}
</style>
