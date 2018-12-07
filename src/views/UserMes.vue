<template>
    <div class="user-mes-wrap">
      <div class="user-mes-main">
        <h2 class="title">用户留言板<button class="btn-add" @click="addMes" title="点击添加留言">添加</button></h2>
        <ul >
          <li v-for="mes in userMes" :key="mes._id" :class="mes.isLook == 1 ? 'is-look-mes' : ''">
            <div class="user-info">
              <img class="user-avatar" :src="mes.avatar" width="60">
              <div>
                <p class="user-name">{{mes.name}}</p>
                <p class="user-date">{{mes.created | getDate}}</p>
              </div>
            </div>
            <div class="user-mes">
              <p class="user-mes-text">{{mes.message}}</p>
            </div>
            <div class="user-edit">
              <button class="btn-look" @click="changeMes(mes._id)">{{mes.isLook == 0 ? '未确认' : '已确认'}}</button>
              <button class="btn-del" @click="delUserMes(mes._id)">删除</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userMes: [],
      user: this.$store.getters.user
    }
  },
  mounted () {
    this.getUserMes()
  },
  methods: {
    // 添加留言
    addMes () {
      this.$prompt('请输入您的留言', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$http.post('/api/usermes/add', {
          name: this.user.name,
          email: this.user.email,
          avatar: this.user.avatar,
          message: value
        }).then(res => {
          this.$message({
            type: 'success',
            message: '添加留言成功'
          });
          this.getUserMes()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消留言'
        });
      });
    },

    // 获取留言
    getUserMes () {
      this.$http.get('/api/usermes')
        .then(res => {
          this.userMes = [];
          res = res.data;
          for (let i = 0, len = res.length; i < len; i++) {
            if (res[i].isLook == '1') {
              this.userMes.push(res[i])
            } else {
              this.userMes.unshift(res[i])
            }
          }
        })
    },

    // 改变状态
    changeMes (id) {
      if (this.user.identity !== '0') {
        this.$http.get('/api/usermes/lookmes', {
          params: {
            id: id
          }
        })
          .then(res => {
            this.getUserMes()
          })
      } else {
        this.$message({
          type: 'warning',
          message: '对不起，只有管理员才能进行此操作'
        });
        return
      }
    },

    delUserMes (id) {
      if (this.user.identity !== '0') {
        this.$http.delete(`/api/usermes/delete/${id}`)
          .then(res => {
            this.getUserMes()
          })

      } else {
        this.$message({
          type: 'warning',
          message: '对不起，只有管理员才能进行此操作'
        });
        return
      }
    }
  },
  filters: {
    getDate (value) {
      return new Date(Date.parse(value)).toLocaleString();
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
.user-mes-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #e9e9e9;
}

.user-mes-main {
  position: absolute;
  width: 80%;
  height: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  overflow: hidden;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #ccc;
}

.user-mes-main ul {
  max-height: 90%;
  overflow: auto;
}


.user-mes-main .title {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  background: #324057;
  color: #fff;
  padding-left: 15px;
}

.user-mes-main li {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 15px;
  height: 60px;
  border-bottom: 1px solid #e5e5e5;
}

.user-mes-main li:hover {
  background: #f3f3f3;
  cursor: pointer;
}

.user-mes-main .user-info {
  flex: 1;
  font-size: 16px;
}

.user-mes-main .user-info > div {
  display: inline-block;
  vertical-align: middle;
}

.user-mes-main .user-info .user-avatar {
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

.user-mes-main .user-info .user-date {
  font-size: 14px;
  color: #8d8d8d;
}

.user-mes-text {
  width: 100%;
}

.user-mes-main .user-mes {
  flex: 2;
}


.user-mes-main .user-edit {
  flex: 1;
}

.user-edit {
  text-align: center;
}

.user-name {
  margin-bottom: 5px;
}

.btn-look, .btn-del, .btn-add {
  width: 80px;
  height: 35px;
  font-size: 16px;
  color: #fff;
  border-radius: 5px;
  margin-left: 5px;
}

.btn-look {
  background: #409EFF;
}

.btn-del {
  background: #e6a23c;
}

.btn-look:hover {
  background: #66b1ff;
}

.btn-del:hover {
  background: #f4ae3e;
}

.btn-add {
  background: #fff;
  float: right;
  margin: 7px 78px 0 0;
  color: #5f5f5f;
  font-weight: 700;
}

.is-look-mes {
  background: #ccc;
  border-bottom: 1px solid #fff;
}

.user-mes-main .is-look-mes:hover {
  background: #ccc;
  cursor: default;
}

.is-look-mes .btn-look {
  background: #a3a3a3;
}

.is-look-mes .btn-look:hover {
  background: #a3a3a3;
  cursor: default;
}


</style>