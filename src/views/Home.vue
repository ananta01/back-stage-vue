<template>
  <div class="home-wrap">
    <div class="home-main">
      <p>Content Management System</p>
      <h1 class="title">电费在线后台管理系统</h1>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {},
    computed: {},
    components: {}
  }
</script>

<style scoped>
  .home-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/img/bg2.jpg") no-repeat center center;
    background-size: cover;
  }

  .home-main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    color: #fff;
    text-align: center;
  }

  .home-main .title {
    font-size: 14px;
    font-weight: 700;
    color: #bababa;
  }

  .home-main > p {
    font-size: 34px;
    margin: 100px 0 20px 0;
    text-shadow: 2px 2px 5px #3f3f3f;
  }


</style>