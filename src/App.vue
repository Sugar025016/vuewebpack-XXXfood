<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){//開啟網頁就創建
    // const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    // this.$http.get(api).then((response)=>{
    //   console.log('開啟網頁就創建products:response',response.data)
    // });
  },
}
</script>

<style  lang="scss">
@import "./assets/all";//.scss 可以省略
</style>