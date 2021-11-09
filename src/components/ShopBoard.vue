<template>
    <div>
      <!-- <navbar></navbar> -->
      <alert></alert>
        
        <!-- <sidebar></sidebar> -->
          <router-view></router-view>


    </div>
</template>

<script>
import Navbar from './ShopNavbar.vue';
import Sidebar from './Sidebar.vue';
import Alert from './AlertMessage.vue';
    export default {
      components:{
        Sidebar,
        Navbar,
        Alert,
      },
      created(){
        var headers = {};
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common.Authorization = `${token}`;
        // this.$http.defaults.headers= headers;
    }
        
    }
</script>

<style lang="scss" scoped>

</style>