<template>
    <div class="user-wrap">
      <el-row type="flex" justify="center" class="user-low">
        <el-col :span="6" class="avatar-col">
          <img :src="user.avatar">
        </el-col>
        <el-col :span="18" class="user-info-col">
          <div class="userinfo">
            <div class="user-item">
              <i class="fa fa-user-circle"></i>
              <span>{{user.name}}</span>
            </div>
            <div class="user-item">
              <i class="fa fa-envelope-open"></i>
              <span>{{user.email}}</span>
            </div>
            <div class="user-item">
              <i class="fa fa-address-card"></i>
              <span>{{user.identity === '1' ? '管理员' : '普通员工'}}</span>
            </div>
            <div class="user-item">
              <span class="logout" @click="isLogout">退出登录</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import LocalStorageData from '../assets/js/loaclStorageData'

const localStorageData = new LocalStorageData('ananta')

export default {
  data () {
    return {}
  },
  methods: {
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
      return this.$store.getters.user;
    }
  },
  components: {}
}
</script>

<style scoped>

.user-wrap, .user-low {
  width: 100%;
  height: 100%;
  overflow: hidden;

}
.avatar-col {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/bg3.jpg") no-repeat 0 0;
  background-size: cover;
  box-shadow: 2px 0 8px #e4e4e4;
}
.avatar-col img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-top: -250px;
  box-shadow: 0 2px 5px rgba(149, 149, 149, 0.39);
}

.user-info-col {
  display: flex;
  align-items: center;
  padding-left: 60px;

}

.user-info-col .userinfo {
  margin-top: -240px;
}

.user-info-col .user-item {
  margin-bottom: 20px;
  font-size: 24px;
  color: #4c4c4c;
}

.user-info-col .user-item i {
  margin-right: 10px;
  color: #000;
}

.logout {
  display: inline-block;
  padding: 10px 18px;
  font-size: 18px;
  background: #409eff;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

</style>