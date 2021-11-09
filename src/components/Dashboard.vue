<template>
    <div>
      <navbar></navbar>
      <alert></alert>
    <div class="container-fluid">
      <div class="row">
        
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>


    </div>
</template>

<script>
import Navbar from './Navbar.vue';
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