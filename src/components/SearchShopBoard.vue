<template>
    <div>
      <alert></alert>
        
          <router-view></router-view>

    </div>
</template>

<script>
import Alert from './AlertMessage.vue';
    export default {
        components:{
        
        Alert,
      },
      
      
        
    }
</script>

<style lang="sass" scoped>

</style>