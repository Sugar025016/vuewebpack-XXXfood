<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
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

        <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled': !pagination.has_pre}">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page-1)">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pagination.total_pages" :key="page"
     :class="{'active':pagination.current_page===page}" @click.prevent="getProducts(page)">
      <a class="page-link" href="#" >{{page}}</a></li>
    <li class="page-item" :class="{'disabled': !pagination.has_next}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page+1)">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
      </div>
      
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <table class="table col-md-8 mt-6">
          <thead>
            <tr>
              <th width="160" class="text-center"></th>
              <th width="200">產品名稱</th>
              <th width="120" class="text-right">數量</th>
              <th width="120" class="text-right">原價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td class="text-center">
                
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="delCart(item.id)"
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>{{ item.title }}</td>

              <td class="text-right">
                {{ item.qty }}
              </td>
              <td class="text-right">
                {{ item.total | currency }}
              </td>
              
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總價</td>

              <td class="text-right">
                {{ total | currency }}
              </td>
            </tr>
            <tr v-if="total !== final_total">
              <td colspan="3" class="text-right">折扣價</td>

              <td class="text-right">
                {{ final_total | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  <div class="my-5 row justify-content-center">
  <form class="col-md-6" @submit.prevent="createOrder">
    <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
        v-model="form.user.email" placeholder="請輸入 Email" 
        :class="{'is-invalid':errors.has('email')}"
        v-validate="'required|email'" 
        
        >
        <!-- required chrome網頁會自動攬載，目前不用這個 -->
        <!-- errors.has('input標籤的name') 條件設定 -->
        <!-- is-invalid 是否有效 -->
        <!-- v-validate 驗證 : required(必須要)|email(信箱格式)  -->
        
      <span class="text-danger" v-if=" errors.has('email') ">"請輸入正確的mail"</span>
      <span class="text-danger" v-if=" errors.has('email') ">{{errors.first('email')}}</span>
        <!-- errors.first 自動回傳預設錯誤訊息提示 -->
    </div>
  
    <div class="form-group">
      <label for="username">收件人姓名</label>
      <input type="text" class="form-control" name="name" id="username"
        :class="{'is-invalid':errors.has('name')}"
        v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名"
         
        >
      <span class="text-danger"  v-if=" errors.has('name') ">{{errors.first('name')}}</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
        placeholder="請輸入地址">
      <span class="text-danger">地址欄位不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger">送出訂單</button>
    </div>
  </form>
</div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option value="" disabled selected>--請選擇數量--</option>
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
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
      pagination:{},
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
      // vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/products?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        console.log("products:response", response.data);
        if (response.data.success) {
          vm.products = response.data.data.content;
          console.log("products:response.data.products", vm.products);
          vm.pagination=response.data.data.page;
        }
      });
    },
    getProduct(id) {
      //開啟網頁就創建
      const vm = this;
      vm.status.loadingItem = id;
      const api = `${process.env.APIPATH}/api/product/${id}`;
      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("products:response", response.data);
        if (response.data.success) {
          $("#productModal").modal("show");
          vm.product = response.data.data;
          console.log("products:response.data.products", vm.products);
        }
      });
    },
    addtoCart(id, qty=1) {
        console.log("addtoCart(id, qty) ");
      //開啟網頁就創建
      const vm = this;
      vm.status.loadingItem = id;


      const api = `${process.env.APIPATH}/${process.env.USER}/cart`;
      
          vm.status.loadingItem = id;
          const cartRequest={
            product_id: id, qty: qty
          }
      this.$http
        .post(api, cartRequest  )
        .then((response) => {
          vm.status.loadingItem = "";
          console.log("products:response", response.data);
          if (response.data.success) {
            $("#productModal").modal("hide");
            vm.getCart();
          }
        });
    },
    getCart() {
        console.log("getCart()  ");
      //開啟網頁就創建
      const vm = this;
        vm.status.loadingItem = "";
      const api = `${process.env.APIPATH}/${process.env.USER}/cart`;
      this.$http.get(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("cart:response", response.data);
        if (response.data.success) {
          vm.cart = response.data.data.carts;
          vm.total = response.data.data.total;
          vm.final_total = response.data.data.final_total;
          console.log("cart:response.data.carts", vm.cart);
        }
      });
    },
    delCart(id) {
        console.log("getCart()  ");
      //開啟網頁就創建
      const vm = this;
      const api = `${process.env.APIPATH}/${process.env.USER}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        vm.status.loadingItem = "";
        console.log("cart:response", response.data);
        if (response.data.success) {
          vm.getCart();
        }
      });
    },
    
    createOrder() {
        console.log("createOrder() ");
      
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;

      vm.$validator.validate().then((result)=>{
        if(result){
          this.$http
        .post(api, { data: vm.form  })
        .then((response) => {
          vm.status.loadingItem = "";
          console.log("products:response", response.data);
          if (response.data.success) {
            vm.$router.push(`/customer_checkout/${response.data.orderId}`)
          }
        });
        }
      })
  
      
    },
  },
//開啟網頁就創建
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
</style>