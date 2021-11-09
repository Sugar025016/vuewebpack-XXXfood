<template>
  <div >
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods:{
    signout(){
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
    this.$http.post(api).then((response)=>{
      console.log('logout:response',response.data)
      if(response.data.success){
        vm.$router.push('/login')
      }
    });
    }
  }
}
</script>

