<template>
  <form @submit.prevent="updateProducts()">
    <a-card title="Tạo mới tài khoản" style="width: 100%">
      <div class="row">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-12 d-flex justify-content-center mb-3 img-style">
              <a-avatar shape="square" :size="250">
                <template #icon>
                  <img v-if="selectedImagePath" :src="selectedImagePath" alt="img" />
                  <img :src="'http://localhost:8000' + feature_image_path" alt="***" />
                </template>
              </a-avatar>
            </div>
            <div class="row">
              <div class="col-md-9">
                <input
                  type="file"
                  name="picture"
                  class="form-control-file"
                  id="picture"
                  @change="onFileChange"
                />
              </div>
              <div class="col-md-3">
                <!-- <button class="btn btn-success btn-block" @click="uploadImage">
                  Upload Image
                </button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-8">
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Tên sản phẩm:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="name"
                placeholder="Nhập Tên sản phẩm"
                allow-clear
              />
              <div class="a-100"></div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Mã sản phẩm:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="sku"
                placeholder="Nhập mã sản phẩm"
                allow-clear
              />
              <div class="a-100"></div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Giá gốc:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="original_price"
                placeholder="Nhập giá gốc"
                allow-clear
              />
              <div class="a-100"></div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Giá bán:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="discounted_price"
                placeholder="Nhập giá bán"
                allow-clear
              />
              <div class="a-100"></div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Mô tả:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="description"
                placeholder="Nhập mô tả"
                allow-clear
              />
              <div class="a-100"></div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Size:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="sizes"
                placeholder="Nhập size"
                allow-clear
              />
              <div class="a-100"></div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label>
                <span class="text-danger me-1">*</span>
                <span>Màu sắc:</span>
              </label>
            </div>
            <div class="col-12 col-sm-5">
              <a-input
                class="border-fix"
                v-model:value="colors"
                placeholder="Nhập màu sắc"
                allow-clear
              />
              <div class="a-100"></div>
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

    const selectedImagePath = ref("");

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          selectedImagePath.value = reader.result; // Lưu đường dẫn của ảnh vào biến
        };
        reader.readAsDataURL(file); // Đọc tệp ảnh dưới dạng Data URL
      }
    };

    const updateProducts = () => {
      const formData = new FormData();
      if (selectedImagePath.value) {
        formData.append("feature_image_path", selectedImagePath.value);
      }

      formData.append("name", products.name);
      formData.append("sku", products.sku);
      formData.append("original_price", products.original_price);
      formData.append("discounted_price", products.discounted_price);
      formData.append("description", products.description);
      formData.append("sizes", products.sizes);
      formData.append("colors", products.colors);
      // Gửi FormData lên máy chủ
      axios
        .post(`http://127.0.0.1:8000/api/products/${route.params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if ((response.status = true)) {
            message.success("Chỉnh sửa thành công");
            router.push({ name: "admin-products" });
          } else {
            message.error("Vui lòng thử lại");
          }
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
        });
    };

    const products = reactive({
      name: "",
      sku: "",
      original_price: "",
      discounted_price: "",
      description: "",
      sizes: "",
      colors: "",
      feature_image_path: "",
    });

    const getProductsEdit = () => {
      axios
        .get(`http://127.0.0.1:8000/api/products/${route.params.id}/edit`)
        .then((response) => {
          products.name = response.data.name;
          products.sku = response.data.sku;
          products.original_price = response.data.original_price;
          products.discounted_price = response.data.discounted_price;
          products.description = response.data.description;
          products.sizes = response.data.sizes;
          products.colors = response.data.colors;
          products.feature_image_path = response.data.feature_image_path;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    getProductsEdit();

    return {
      ...toRefs(products),
      filterOption,
      errors,
      updateProducts,
      onFileChange,
      selectedImagePath,
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
.img-style .span {
  width: 100% !important;
  height: 100% !important;
  line-height: 200px !important;
  font-size: 100px !important;
}
</style>
