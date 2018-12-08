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
import LocalStorageData from '../assets/js/loaclStorageData'

const localStorageData = new LocalStorageData('ananta')

export default {
  data () {
    return {}
  },

  created () {
    this.verifyToken()
  },
  methods: {
    // 验证是否过期
    verifyToken () {
      this.$http.get('/api/users/current')
        .then(res => {
          if (!res.data) {
            localStorageData.remove('ananta')
          }
        })
        .catch(err => {
          localStorageData.remove('ananta')
        })
    }
  },
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