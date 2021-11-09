<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      <img
        class="mb-4"
        src="/docs/4.6/assets/brand/bootstrap-solid.svg"
        alt=""
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">請輸入帳號密</h1>
      <span v-show="code===102" class=" alert-danger" style="font-size:30px">{{this.message}}</span>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        v-model="user.username"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model="user.rememberMe" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2021</p>
    </form>
  </div>
</template>

<script>
import Alert from '../AlertMessage.vue';


export default {
  components:{
        Alert,
      },
  data() {
    return {
      message:"",
      code:"",
      user: {
        username: "",
        password: "",
        rememberMe:"",
      },
    };
  },

  methods: {
    // signin() {
    //   const api = `${process.env.APIPATH}/admin/signin`;
    //   const vm = this;
    //   this.$http.post(api, vm.user).then((response) => {
    //     console.log('/admin/signin:response.data',response.data);
    //     console.log('/admin/signin:response.data.success',response.data.success);
    //     if (response.data.success) {
    //       const token = response.data.token;
    //       const expired = response.data.expired;
    //       document.cookie = `hexToken = ${token};expires=${new Date(expired)};`;
    //       vm.$router.push("/dashboard/products");
    //     }else{
    //       console.log("signin:登入錯誤");
    //       vm.$bus.$emit("message:push", response.data.message, "danger");
    //     }
    //   });
    // },
    signin() {
      const api = `${process.env.APIPATH}/login`;
      const vm = this;
      //  let formData = JSON.stringify(vm.user);
       let body = new FormData();
        body.append('username', vm.user.username);
        body.append('password',  vm.user.password);
        body.append('remember-me',  vm.user.rememberMe);
      this.$http.post(api, body).then((response) => {
        console.log("signin:response", response, response);
        console.log("signin:response.data.success", response.data);
        if (response.data.code===0) {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken = ${token};expires=${new Date(expired)};`;
          vm.$router.push("/dashboard/openDate");
        }else{
          console.log("signin:登入錯誤");
          this.message=response.data.message
          this.code=response.data.code
          vm.$bus.$emit("message:push", response.data.code, "danger");
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>