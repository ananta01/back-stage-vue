<template>
    <header class="head-nav">
      <el-row>
        <el-col :span="12" class="logo-wrap">
          <router-link to="/index">
            <img src="../assets/img/logo.png" alt="电费在线后台管理系统" width="400">
          </router-link>
        </el-col>
        <el-col :span="6" class="user-wrap">
          <div class="user-main">
            <img :src="user.avatar" width="60" height="60">
            <div class="user-info">
              <p class="user-wele">欢迎 > </p>
              <p class="user-name">{{user.name}}</p>
            </div>
            <span class="arrow">
              <el-dropdown trigger="click" @command="setDialogInfo">
                <span class="el-dropdown-link">
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </el-col>
      </el-row>
    </header>
</template>

<script>
import LocalStorageData from '../assets/js/loaclStorageData'

const localStorageData = new LocalStorageData('ananta')


export default {
  data () {
    return {}
  },
  methods: {
    // 调用指令
    setDialogInfo (commandItem) {
      commandItem == 'info' ? this.showInfoList() : this.isLogout();
    },

    // 个人信息
    showInfoList () {
      this.$router.push('/user')
    },

    // 弹出层是否退出
    isLogout () {
      this.$confirm('你确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorageData.remove('ananta')
        this.$store.dispatch('clearAuthorization')
        this.$router.push('/login')

      })
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  components: {}
}
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 80px;
  background-color: #324057;
  border-bottom: 1px solid #5b5b5b;
}

.logo-wrap {
  height: 80px;
  line-height: 80px;
  overflow: hidden;
  font-size: 0;
}

.logo-wrap img {
  vertical-align: middle;
}

.user-wrap {
  float: right;
  height: 80px;
  margin-right: 60px;
}

.user-main {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}

.user-main > img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-main .user-info {
  margin-left: 10px;
  color: #fff;
  font-size: 12px;
  min-width: 50px;
}

.user-main .user-name {
  color: #409eff;
  font-size: 16px;
  margin-top: 5px;
  cursor: pointer;
}

.user-main .arrow {
  cursor: pointer;
}

.el-dropdown {
  color: #fff;
}

</style>