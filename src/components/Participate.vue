<template>
    <div>
       


<!-- <div class="container">
  <div class="row justify-content-around align-self-center">
     <form >
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="inputPassword4">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
  </div>
</div> -->

<div class=" container">
  <div class="my-5 row justify-content-center align-items-center   ">
      


     <form class="col-md-6" @submit.prevent="createOrder">
          <div class="form-row">
  <div class="form-group col-md-6">
      <label for="inputEmail4">信箱</label>
      <input type="email" class="form-control" name="email" id="useremail"
        v-model="form.user.email" placeholder="請輸入 Email" 
        :class="{'is-invalid':errors.has('email')}"
        v-validate="'required|email'" 
        >
        <span class="text-danger" v-if=" errors.has('email') ">"請輸入正確的mail"</span>
      <span class="text-danger" v-if=" errors.has('email') ">{{errors.first('email')}}</span>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">密碼</label>
      <!-- <input type="password" class="form-control" id="inputPassword4">
            <p class="control has-icon has-icon-right"> -->
                <input class="form-control" name="passsword" v-model="form.user.passsword" v-validate="'required|alpha'" :class="{'is-invalid': errors.has('passsword') }" type="password" placeholder="Password">
                <i v-show="errors.has('passsword')" class="text-danger fa fa-warning"></i>
                <span v-show="errors.has('passsword')" class="help text-danger">{{ errors.first('passsword') }}</span>
            <!-- </p> -->
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputShopName">商店名稱</label>
      <input type="text" class="form-control" name="name" id="shopName"
        :class="{'is-invalid':errors.has('name')}"
        v-model="form.user.name" v-validate="'required|customizeEmailRule'" placeholder="輸入店名"
         
        >
      <span class="text-danger"  v-if=" errors.has('name') ">{{errors.first('name')}}</span>
    
    </div>
    <div class="form-group col-md-6">
    <label for="inputAddress2">電話</label>
    <input type="phone" class="form-control" id="shoptel" name="phone"
    :class="{'is-invalid':errors.has('phone')}"
    v-model="form.user.tel" placeholder="接單手機號碼"
    v-validate="'required|numeric'"
    >
    <span class="text-danger"  v-if=" errors.has('phone') ">{{errors.first('phone') }}</span>
    
    <span class="text-danger"  v-if=" errors.has('phone') ">電話輸入錯誤</span>
    
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">城市</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">區</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">郵遞區號</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  
  <div class="form-group">
    <label for="inputAddress">詳細地址</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
  </div>

  
  </div>
</div>

</template>

<script>
    import $ from "jquery";
    // import { MobileValidate } from '@/validates/MobileValidates'

// Validator.extend('phone', MobileValidate);
export default {

    
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: "",
      },
      
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
      
    
    createOrder() {
        console.log("createOrder() ");
      //開啟網頁就創建
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

  
};
</script>

<style lang="scss" scoped>

.h{
    // padding: 30%;
    margin-top:20%;
    // height: 100%;
}
</style>