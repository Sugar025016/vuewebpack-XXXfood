<template>
  <div>"123321"</div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
    };
  },
  methods: {
    createOrder() {
      console.log("createOrder() ");
      //開啟網頁就創建
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;

      this.$http.get(api).then((response) => {
        console.log("order/${vm.orderId}:response", response.data);
        if (response.data.success) {
            
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.createOrder()
  },
};
</script>

<style lang="scss" scoped>
</style>