<template>
    <div class="init">
      <header-nav class="header"></header-nav>
      <left-nav></left-nav>
      <div class="right-wrap">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import HeaderNav from '../components/Header'
import LeftNav from '../components/LeftNav'

export default {
  data () {
    return {}
  },
  methods: {},
  computed: {},
  components: {
    HeaderNav,
    LeftNav
  }
}
</script>

<style scoped>
.init {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.right-wrap {
  height: 100%;
  margin-left: 180px;
  box-sizing: border-box;
}

</style>