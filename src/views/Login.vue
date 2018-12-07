<template>
    <div class="login">
      <img src="../assets/img/liu.png" class="bg-star" width="400">
      <section class="form-wrap">
        <h2 class="title">电费在线后台管理系统</h2>
        <div class="res-form-main">
          <h2 class="reg-title">用户登录></h2>
          <div class="reg-form">
            <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="100px" class="reg-form">
              <el-form-item label="用户" prop="name">
                <el-input v-model="loginUser.name" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" class="sub-btn">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="not-user">
            <p>还没有帐号？现在开始<router-link to="/reg">注册</router-link></p>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import LocalStorageData from '../assets/js/loaclStorageData'

const localStorageData = new LocalStorageData('ananta')

export default {
  data () {
    return {
      loginUser: {
        name: 'ananta',
        password: '123456'
      },
      rules: {
        name: [
          {
            required: true,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码需要在6到16位之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/users/login', this.loginUser)
            .then(res => {
              // 登录成功
              const { token } = res.data;
              // 存储
              localStorageData.add(token)

              // 解析token
              const decoded = jwt_decode(token);

              // 把token存储到vuex中
              this.$store.dispatch('setAuthorization', !this.isEmpty(decoded))
              this.$store.dispatch('setUser', decoded)

              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.push('/index')

            })
            .catch(error => {
              this.$message.error(error);
            })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 判断是否有值
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/img/bg01.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}

.bg-star {
  position: absolute;
  top: -256px;
  right: -350px;
  animation: dropStar 12s linear infinite;
}

@keyframes dropStar {
  0% {
    transform: translate(-200px, -256px);
    opacity: 0.8;
  }

  20% {
    transform: translate(-500px, 100px);
    opacity: 0.8;
  }

  40% {
    transform: translate(-900px, 400px);
    opacity: 0.6;
  }

  60% {
    transform: translate(-1200px, 700px);
    opacity: 0.6;
  }

  80% {
    transform: translate(-1400px, 900px);
    opacity: 0.4;
  }

  100% {
    transform: translate(-1606px, 1100px);
    opacity: 0.2;
  }
}

.login .title {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  text-shadow: 0 2px 5px #616161;
}

.reg-form >>> .el-input__inner {
  border-color: #bcbcbc;
}

.sub-btn {
  width: 120px;
}

.res-form-main {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 10px 40px 10px 0;
  border-radius: 5px;
  box-shadow: 3px 6px 10px #959595;
  transform: translate(-50%, -60%);
  background: #fff;
}

.reg-form {
  width: 360px;
}

.reg-title {
  height: 70px;
  line-height: 70px;
  margin-bottom: 25px;
  margin-left: 46px;
  font-size: 22px;
  border-bottom: 1px solid #e1e1e1;
}

.not-user {
  font-size: 12px;
  text-align: right;
  padding-bottom: 5px;
  color: #a6a6a6;
}

</style>