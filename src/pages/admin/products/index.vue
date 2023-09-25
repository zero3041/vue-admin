<template>
  <div class="mb-3 col-12 d-flex justify-content-end">
    <a-select
      v-model="selectedFilter"
      style="width: 200px; margin-right: 10px"
      placeholder="Lọc và sắp xếp"
      @change="handleFilterChange"
    >
      <a-select-option value="price_low_to_high">Giá thấp đến cao</a-select-option>
      <a-select-option value="price_high_to_low">Giá cao đến thấp</a-select-option>
      <a-select-option value="name_alphabetical">Tên A-Z</a-select-option>
      <a-select-option value="name_reverse_alphabetical">Tên Z-A</a-select-option>
    </a-select>
    <router-link style="margin-right: 5px" :to="{ name: 'admin-products-create' }">
      <a-button type="primary">
        <plus-outlined />
      </a-button>
    </router-link>
    <a-button type="primary" danger @click="confirmDeleteSelectedProducts">
      Xoá Sản Phẩm Đã Chọn
    </a-button>
  </div>
  <a-table
    :row-key="(record) => record.id"
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="products"
    :scroll="{ x: 576 }"
  >
    <template #bodyCell="{ column, index, record }">
      <template v-if="column.key === 'index'">
        <span>{{ index + 1 }}</span>
      </template>
      <template v-if="column.key === 'feature_image_path'">
        <img
          style="width: 50px"
          :src="'http://localhost:8000' + record.feature_image_path"
          alt=""
        />
      </template>
      <template v-if="column.key === 'original_price'">
        <span>{{ record.original_price }}$</span>
      </template>
      <template v-if="column.key === 'discounted_price'">
        <span>{{ record.discounted_price }}$</span>
      </template>
      <template v-if="column.key === 'action'">
        <router-link :to="{ name: 'admin-products-edit', params: { id: record.id } }">
          <a-button type="primary"> <edit-outlined /> </a-button>
        </router-link>

        <a-button
          style="margin-top: 3px !important"
          type="primary"
          danger
          @click="deleteProduct(record.id)"
        >
          <delete-outlined />
        </a-button>
      </template>
    </template>
  </a-table>
</template>
<script>
import { defineComponent, ref } from "vue";
import { message } from "ant-design-vue";
import { Modal } from "ant-design-vue";
import {
  PlusOutlined,
  EditOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useMenu } from "../../../stores/use-menu.js";
import axios from "axios";

export default {
  components: {
    PlusOutlined,
    EditOutlined,
    CloseOutlined,
    DeleteOutlined,
  },
  setup() {
    const selectedFilter = ref("price_low_to_high"); // Giá trị mặc định cho lọc và sắp xếp

    const handleFilterChange = (value) => {
      selectedFilter.value = value;
      applyFilter(value);
    };

    const applyFilter = (filterValue) => {
      switch (filterValue) {
        case "price_low_to_high":
          products.value.sort((a, b) => a.discounted_price - b.discounted_price);
          break;
        case "price_high_to_low":
          products.value.sort((a, b) => b.discounted_price - a.discounted_price);
          break;
        case "name_alphabetical":
          products.value.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name_reverse_alphabetical":
          products.value.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    };
    const selectedProductIds = ref([]);
    useMenu().onSelectedKeys(["admin-products"]);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        selectedProductIds.value = selectedRowKeys;
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
    };
    const products = ref([]);
    const columns = [
      {
        title: "#",
        key: "index",
      },
      {
        title: "Hình Ảnh",
        dataIndex: "feature_image_path",
        key: "feature_image_path",
      },
      {
        title: "Sản Phẩm",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Mã sản phẩm",
        dataIndex: "sku",
        key: "sku",
      },
      {
        title: "Giá gốc",
        dataIndex: "original_price",
        key: "original_price",
      },
      {
        title: "Giá bán",
        dataIndex: "discounted_price",
        key: "discounted_price",
      },
      {
        title: "Nội dung",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Kích cỡ",
        dataIndex: "sizes",
        key: "sizes",
      },
      {
        title: "Màu Sắc",
        dataIndex: "colors",
        key: "colors",
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
      },
    ];
    const getProducts = () => {
      axios
        .get("http://localhost:8000/api/products")
        .then(function (response) {
          products.value = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getProducts();
    // xoa san pham
    const deleteProduct = (productId) => {
      axios
        .delete(`http://localhost:8000/api/products/${productId}`)
        .then(function (response) {
          getProducts();
          message.success("Xoá sản phẩm thành công!");
        })
        .catch(function (error) {
          console.log(error);
          message.error("Xoá sản phẩm thất bại.");
        });
    };
    // xoa multi-thread
    const confirmDeleteSelectedProducts = () => {
      if (selectedProductIds.value.length === 0) {
        message.warning("Vui lòng chọn ít nhất một sản phẩm để xoá.");
        return;
      }

      Modal.confirm({
        title: "Xác nhận",
        content: "Bạn có chắc chắn muốn xoá các sản phẩm đã chọn?",
        okText: "Xoá",
        okType: "danger",
        cancelText: "Hủy",
        onOk: () => {
          axios
            .delete("http://localhost:8000/api/products", {
              data: { products: selectedProductIds.value },
            })
            .then(function (response) {
              getProducts();
              message.success("Xoá các sản phẩm đã chọn thành công!");
            })
            .catch(function (error) {
              console.log(error);
              message.error("Xoá các sản phẩm đã chọn thất bại.");
            });
        },
      });
    };

    return {
      deleteProduct,
      products,
      columns,
      rowSelection,
      confirmDeleteSelectedProducts,
      handleFilterChange,
      applyFilter,
    };
  },
};
</script>
