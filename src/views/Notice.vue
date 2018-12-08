<template>
    <div class="notice-wrap">
      <div class="notice-main">
        <div class="notice-el">
          <el-collapse accordion v-model="activeName" class="notice-el-col">
            <el-collapse-item v-for="notice in sysNotice" :title="'管理员:' +　notice.name + '发布 -- 类型:' + notice.type" :name="notice._id" :key="notice._id">
              <div>{{notice.message}}</div>
              <div class="notice-time">{{notice.created | getDate}}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="notice-edit">
        <h2 class="title">
          系统公告
        </h2>
        <div class="admin-info-wrap" v-for="admin in adminInfo">
          <img class="admin-info-avatar" :src="admin.avatar">
          <div class="admin-info">
            <p>{{admin.name}}</p>
            <p class="admin-info-desc">{{admin.email}}</p>
          </div>
          <p class="admin-info-identity">系统管理员</p>
        </div>
        <div class="notice-edit-btn" v-if="this.$store.getters.user.identity == '1'">
          <button class="btn-look" @click="dialogVisible = true">添加</button>
          <button class="btn-del" @click="delNotice">删除</button>
        </div>
      </div>

      <el-dialog
          title="添加公告"
          :visible.sync="dialogVisible"
          width="30%"
          >
        <el-form
            ref="form"
            :model="SysNoticeInfo"
            :rules="form_rules"
            label-width="120px"
            style="margin:10px;width:auto;">
          <el-form-item label="公告类型:" prop="type">
            <el-select v-model="SysNoticeInfo.type" placeholder="公告类型">
              <el-option v-for="(notice, index) in SysNotice_type" :key="index" :label="notice" :value="notice"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公告内容:" prop="message">
            <el-input type="textarea" v-model="SysNoticeInfo.message" placeholder="公告内容"></el-input>
          </el-form-item>
          <el-form-item label="管理员:" prop="name">
            <el-input type="text" placeholder="管理员" :value="SysNoticeInfo.name" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" class="sub-btn" @click="onSubmitForm('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '',
      sysNotice: '',
      adminInfo: '',
      dialogVisible: false,
      SysNoticeInfo: {
        name: this.$store.getters.user.name,
        type: '',
        message: ''
      },
      SysNotice_type: ['系统公告', '系统更新'],
      form_rules: {
        type: [
          {
            required: true,
            message: '公告类型不能为空',
            trigger: 'blur'
          }
        ],
        message: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }
        ],
      }
    }
  },
  mounted () {
    this.getSysNotice()
    this.getAdminInfo()
  },
  methods: {
    // 获取系统公告
    getSysNotice () {
      this.$http.get('/api/sysnotice')
        .then(res => {
          if (res.data) {
            this.sysNotice = res.data;
          }
        })
    },

    // 获取管理员名单
    getAdminInfo () {
      this.$http.get('/api/users/identity')
        .then(res => {
          if (res.data) {
            this.adminInfo = res.data
          }
        })
    },

    // 添加公告
    onSubmitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {

          this.$http.post('/api/sysnotice/add', this.SysNoticeInfo)
            .then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.getSysNotice()

              this.SysNoticeInfo = {
                name: this.$store.getters.user.name,
                type: '',
                message: ''
              }
            })
            .catch(err => this.$message.error('添加失败'))
        }
      })
    },

    // 删除公告
    delNotice () {
      if (this.activeName) {
        this.$http.delete('/api/sysnotice/delete', {
          params: {
            id: this.activeName
          }
        })
          .then(res => {
            if (res.data) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }

            this.getSysNotice()
          })
          .catch(err => this.$message.error('删除失败'))
      } else {
        this.$message.error('请选择删除的公告')
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
.notice-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f3f3f3;
}

.notice-main {
  float: left;
  width: 60%;
  height: 70%;
  margin: 50px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 5px 8px 10px #e4e4e4;
  border-radius: 10px;
}

.notice-el {
  height: 100%;
  overflow: auto;
}

.notice-el-col {
  padding: 20px;
  height: 100%;
}

.notice-el-col >>> .el-collapse-item__header {
  transition: all .5s;
  font-size: 16px;
}

.notice-el-col >>> .el-collapse-item__header:hover {
  background-color: #f3f3f3;
  border-radius: 5px;
}

.notice-edit {
  width: 30%;
  height: 100%;
  padding: 20px;
  float: right;
  background: #fff;
  box-sizing: border-box;
  box-shadow: -3px 0 10px #d9d9d9;
}

.notice-edit .title {
  font-size: 20px;
  font-weight: 700;
  color: #373737;
  margin-bottom: 20px;
}

.notice-time {
  color: #00a4d9;
  margin-top: 10px;
}

.admin-info-wrap {
  display: flex;
  flex-direction: row;
  height: 75px;
  align-items: center;
  border-top: 1px solid #e7e7e7;
}

.admin-info-wrap:last-child {
  border-bottom: 1px solid #e7e7e7;
}

.admin-info {
  flex: 1;
}

.admin-info-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.admin-info-desc {
  color: #7f7f7f;
  font-size: 14px;
  margin-top: 3px;
}

.admin-info-identity {
  float: right;
  background: #00a4d9;
  border-radius: 10px;
  padding: 8px 10px;
  color: #fff;
  font-size: 14px;
}

.notice-edit-btn {
  margin-top: 20px;
  float: right;
}

.btn-look, .btn-del {
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

</style>