<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  import jwt_decode from 'jwt-decode'
  import LocalStorageData from './assets/js/loaclStorageData'

  const localStorageData = new LocalStorageData('ananta')

  export default {
    created () {
      let isToken = localStorageData.get();
      if (isToken) {
        const decoded = jwt_decode(isToken);

        // 把token存储到vuex中
        this.$store.dispatch('setAuthorization', !this.isEmpty(decoded))
        this.$store.dispatch('setUser', decoded)
      }
    },
    methods: {
      // 判断是否有值
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      }
    }
  }
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}

html {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
</style>
