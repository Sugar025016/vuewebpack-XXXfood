<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-2 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-0 shadow-sm">
              <div
                style="
                  height: 150px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></div>
              <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{
                  item.category
                }}</span>
                <h5 class="card-title">
                  <a href="#" class="text-dark">{{ item.title }}</a>
                </h5>
                <p class="card-text">{{ item.content }}</p>
                <div class="d-flex justify-content-end align-items-baseline">
                  <!-- <div class="h5">2,800 元</div> -->
                  <del class="h6" v-if="item.origin_price > item.price">{{
                    item.origin_price
                  }}</del>
                  <div class="h5 justify-content-end">{{ item.price }}</div>
                </div>
              </div>
              <div class="card-footer d-flex">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="getProduct(item.id)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="item.id === status.loadingItem"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm ml-auto"
                  @click="addtoCart(item.id, 1)"
                >
                  <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  

  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [], //接收回傳的資料，必須和回傳資料名稱相同
      isLoading: false,
      status: {
        loadingItem: "",
      },
      product: {},
      cart: [],
      total: 0,
      final_total: 0,
      form:{
        user:{
        name:'',
        email:'',
        tel:'',
        address:'',
      },
      message:'',
      },

    };
  },
  methods: {
    getProducts(page = 1) {
        console.log("getProducts(page = 1) ");
      //開啟網頁就創建
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        console.log("products:response", response.data);
        if (response.data.success) {
          vm.products = response.data.products;
          console.log("products:response.data.products", vm.products);
        }
      });
    },
    
    
    
  },

  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
</style>