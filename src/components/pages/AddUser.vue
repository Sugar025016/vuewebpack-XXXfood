<template>
  <div>
    <form class="col-md-6" @submit.prevent="addUser">
      <div class="form-group">
        <label for="useremail">Email</label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="useremail"
          v-model="user.email"
          placeholder="請輸入 Email"
          :class="{ 'is-invalid': errors.has('email') }"
          v-validate="'required|email'"
        />

        <span class="text-danger" v-if="errors.has('email')"
          >"請輸入正確的mail"</span
        >
        <span class="text-danger" v-if="errors.has('email')">{{
          errors.first("email")
        }}</span>
      </div>
      <div
                    v-on:click.capture="doConfirmation()"
                  >
      <div class="form-group">
        <label for="password">密碼</label>
        
        <input
          type="password"
          class="form-control"
          name="password"
          id="password"
          :class="{ 'is-invalid': errors.has('password') }"
          v-model="user.password"
          v-validate="'required'"
          placeholder="請輸入密碼"
        />
        <span class="text-danger" v-if="errors.has('password')">{{
          errors.first("password")
        }}</span>
      </div>
      </div>
<div
                    v-on:click.capture="doConfirmation()"
                  >
      <div class="form-group">
        <label for="ConfirmationPassword">密碼確認</label>
        
        <input
          type="password"
          class="form-control"
          name="confirmationPassword"
          id="confirmationPassword"
          :class="{ 'is-invalid': errors.has('confirmationPassword') }"
          v-model="user.confirmationPassword"
          v-validate="'required'"
          placeholder="請輸入確認密碼"
        />
        <span class="text-danger" v-if="errors.has('confirmationPassword')">{{
          errors.first("confirmationPassword")
        }}</span>
        <span class="text-danger" v-if="confirmation">兩次密碼輸入不同，請重新確認
        </span>
      </div>
      </div>

      <div class="form-group">
        <label for="username">暱稱</label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="username"
          :class="{ 'is-invalid': errors.has('name') }"
          v-model="user.name"
          v-validate="'required'"
          placeholder="請輸入暱稱"
        />
        <span class="text-danger" v-if="errors.has('name')">{{
          errors.first("name")
        }}</span>
      </div>

      <div class="form-group">
        <label for="usertel">電話</label>
        <input
          type="tel"
          class="form-control"
          name="usertel"
          id="usertel"
          :class="{ 'is-invalid': errors.has('usertel') }"
          v-model="user.tel"
          placeholder="請輸入電話"
          v-validate="'required'"
        />
        <span class="text-danger" v-if="errors.has('usertel')">{{
          errors.first("usertel")
        }}</span>
      </div>
      <div class="text-right">
        <button class="btn btn-danger">加入會員</button>
      </div>
    </form>
    <h1>{{response}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response:'',
      confirmation:"",
      user: {
        name: "",
        email: "",
        tel: "",
        password: "",
        confirmationPassword: "",
      },
    };
  },

  methods: {
    addUser() {
      console.log("createOrder() ");

      const vm = this;
      const api = `${process.env.APIPATH}/api/addUser`;

      vm.$validator.validate().then((result) => {

        if (result) {
            if(vm.user.password!==vm.user.confirmationPassword){
                this.confirmation=true
                return;
            }
            
          this.$http.post(api,  vm.user ).then((response) => {
            console.log("products:response", response.data);
            if (response.data.success) {
              vm.response=response.data.message;
            }else{
              vm.response=response.data.message;
            }
          });
        }
      });
    },
    doConfirmation(){
        this.confirmation=false
    }
  },
};

</script>

<style lang="scss" scoped>
</style>