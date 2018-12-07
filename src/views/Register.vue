<template>
    <div class="reg">
      <img src="../assets/img/liu.png" class="bg-star" width="400">
      <section class="form-wrap">
        <h2 class="title">电费在线后台管理系统</h2>
        <div class="res-form-main">
          <h2 class="reg-title">注册用户></h2>
          <div class="reg-form">
            <el-form :model="regUser" status-icon :rules="rules" ref="regForm" label-width="100px" class="reg-form">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="regUser.name" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="regUser.email" placeholder="请输入email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="regUser.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2">
                <el-input type="password" v-model="regUser.password2" placeholder="请确认密码"></el-input>
              </el-form-item>

              <el-form-item label="选择身份" prop="identity">
                <el-select v-model="regUser.identity" placeholder="请选择身份">
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="员工" value="0"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('regForm')" class="sub-btn">注册</el-button>
                <el-button @click="resetForm('regForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  data () {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      regUser: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 12,
            message: '用户名需要在2到12个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
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
        ],
        password2: [
          {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码需要在6到16位之间',
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        identity: [
          {
            required: true,
            message: '请选择身份',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let timer = null;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/users/reg', this.regUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: '帐号注册成功',
                type: 'success'
              })
              clearTimeout(timer);
              timer = setTimeout(function () {
                this.$router.push('/login')
              }.bind(this), 1000)

            })
            .catch(error => {
              this.$message.error(error);
            })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
.reg {
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

.reg .title {
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

</style>