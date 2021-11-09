// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate, { Validator } from 'vee-validate' //引入驗證
import zhTw_Validate from 'vee-validate/dist/locale/zh_TW'//引入驗證語言，locale資料夾下有多國語系
// import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueDatepickerLocal from 'vue-datepicker-local'
// import DatePicker from '@hyjiacan/vue-datepicker'
import '@hyjiacan/vue-datepicker/dist/datepicker.css'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
import DatePicker from 'ant-design-vue/lib/date-picker'; // 加载 JS
import TimePicker from 'ant-design-vue/lib/time-picker'; // 加载 JS
import Calendar from 'ant-design-vue/lib/calendar'; // 加载 JS
import Alert from 'ant-design-vue/lib/alert'; // 加载 JS
import Button from 'ant-design-vue/lib/button'; // 加载 JS
import Modal from 'ant-design-vue/lib/modal'; // 加载 JS
import Tooltip from 'ant-design-vue/lib/tooltip'; // 加载 JS
// import Affix from 'ant-design-vue/lib/affix'; // 加载 JS
import 'ant-design-vue/lib/date-picker/style/css'; // 加载 CSS
import 'ant-design-vue/lib/time-picker/style/css'; // 加载 CSS
import 'ant-design-vue/lib/calendar/style/css'; // 加载 CSS
import 'ant-design-vue/lib/alert/style/css'; // 加载 CSS
import 'ant-design-vue/lib/modal/style/css'; // 加载 CSS
import 'ant-design-vue/lib/tooltip/style/css'; // 加载 CSS
// import 'ant-design-vue/lib/affix/style/css'; // 加载 CSS
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router';
import './bus';
import CurrencyFilter from './filter/Currency';
import moment from 'moment';


moment.locale('zh-cn')
Vue.use(VueAxios,axios)
Vue.use(VeeValidate,{ events: 'input|blur'});//{ events: 'input|blur'}才會在滑鼠移入輸入欄位再移出時觸發驗證功能
// Vue.use(Antd);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Calendar);
Vue.use(Alert);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Tooltip);
// Vue.use(Affix);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
VeeValidate.Validator.localize('zh_TW',zhTw_Validate) //設定語言
Vue.component('Loading',Loading)
// Vue.component('DatePicker',DatePicker)
Vue.component('VueDatepickerLocal',VueDatepickerLocal)
Vue.component('ValidationObserver',VeeValidate.ValidationObserver)
Vue.component('ValidationProvider',VeeValidate.ValidationProvider)
Vue.filter('currency',CurrencyFilter)
Vue.config.productionTip = false
axios.defaults.withCredentials = true;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

// router.beforeEach((to,from,next)=>{
//   console.log('to',to,'from',from,'next',next)
//   if(to.meta.requiresAuth){
//     console.log("需要登入驗證")
//     const api= `${process.env.APIPATH}/api/user/check`;
//     axios.post(api).then((response)=>{
//       if(response.data.success){
//         console.log("登入驗證ok")
//         next();
//         }else{
//           console.log("登入驗證錯誤")
//           next({
//             path:'/login'
//           })
//         }
//     })
//   }else{
//     console.log("不需要驗證")
//     next();
//   }
// })
router.beforeEach((to,from,next)=>{
  console.log('to',to,'from',from,'next',next)
  if(to.matched[0].meta.requiresAuth){
    console.log("需要登入驗證")
    const api= `${process.env.APIPATH}/admin/check`;
    axios.post(api).then((response)=>{
      if(response.data.success){
        console.log("登入驗證ok")
        next();
        }else{
          console.log("登入驗證錯誤")
          next({
            path:'/login'
          })
        }
    })
  }else{
    console.log("不需要驗證")
    next();
  }
})


// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

function  generateRandomString (num) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1= ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < num; i++ ) {
      result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result1;
}
// document.cookie = `hexToken = ${token};expires=${new Date(expired)};`;
// document.cookie = `XSRF-TOKEN=${token};expires=${new Date(expired)};`;

// axios.interceptors.request.use(config => {
//   const cookie = document.cookie
//   if (cookie && config.method === 'post') {

//     axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN=${token};expires=${new Date(expired)}';
//   }
//   return config
// })



//回傳的錯誤攔截
let pendingRequests = new Map()
axios.interceptors.response.use((response) => {
  const code = response.data.code;

  console.log('code',code)
  // pendingRequests.delete(requestKey);

  if(code===109){
    console.log('code===109',code)
    // localStorage.removeItem('token');
            router.replace({
                path: '/'
                //登录成功后跳入浏览的当前页面
                // query: {redirect: router.currentRoute.fullPath}
            })
  }

  console.log(code)
  //回傳到呼叫方法
  return Promise.resolve(response);
}, (error) => {
  if (axios.isCancel(error)) {
    console.warn(error);
    return Promise.reject(error);
  }
  pendingRequests.clear();
  return Promise.reject(error);
})



//vee-validate自定義驗證
const getMessage = field => `${field}格式不正确`;

const validate = value => {
    const regex = /^\w+\.*\w+@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return regex.test(value);
};

const myValidator = {
    getMessage,
    validate,
};
Validator.extend('customizeEmailRule', myValidator);

// Validator.extend("passworda", {
//   message: "兩次密碼輸入不同，請重新確認",
//   validate(value, { password }) {
//     return value === password;
//   },
  
// })

// Validator.extend('password', {
//   params: ['target'],
//   validate(value, { target }) {
//     return value === target;
//   },
//   message: 'Password confirmation does not match'
// });


Validator.extend('confirmPassword', {
  params: ["password"],
  validate(value, { password }) {
    return value === password;
  },
  message: "SSSSSS"
})
