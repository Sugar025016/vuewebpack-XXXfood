


<template>
  <div>
    <header>
      <Navbar />
    </header>
      <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./HomeNavbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/_homeboard";
</style>