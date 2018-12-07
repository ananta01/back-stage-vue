<template>
    <div class="dialog">
      <el-dialog
          :title="dialog.title"
          :visible.sync="dialog.show"
          :close-on-click-modal='false'
          :close-on-press-escape='false'
          :modal-append-to-body="false"
      >
        <div class="form">
          <el-form
            ref="form"
            :model="formData"
            :rules="form_rules"
            label-width="120px"
            style="margin:10px;width:auto;">
            <el-form-item label="订单类型:" prop="type">
              <el-select v-model="formData.type" placeholder="订单类型">
                <el-option v-for="(formType, index) in format_type" :key="index" :label="formType" :value="formType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在区域:" prop="area">
              <el-select v-model="formData.area" placeholder="所在区域">
                <el-option v-for="(formArea, index) in format_area" :key="index" :label="formArea" :value="formArea"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单描述:" prop="desc">
              <el-input v-model="formData.desc" placeholder="订单描述"></el-input>
            </el-form-item>
            <el-form-item label="支出:" prop="expend">
              <el-input v-model="formData.expend" placeholder="支出资金"></el-input>
            </el-form-item>
            <el-form-item label="账户余额:" prop="cash">
              <el-input v-model="formData.cash" placeholder="账户余额"></el-input>
            </el-form-item>
            <el-form-item label="订单备注:" prop="remark">
              <el-input type="textarea" v-model="formData.remark" placeholder="订单备注"></el-input>
            </el-form-item>
            <el-form-item class="text-right">
              <el-button @click="dialog.show = false">取消</el-button>
              <el-button type="primary" class="sub-btn" @click="onSubmitForm('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  props: {
    dialog: Object,
    formData: Object
  },
  data () {
    return {
      format_type: [
        '缴纳电费',
        '充值余额'
      ],
      format_area: [
        '东区一栋',
        '东区二栋',
        '东区三栋',
        '旧东一栋',
        '旧东二栋',
        '旧东三栋',
        '中南',
        '中北'
      ],
      form_rules: {
        type: [
          {
            required: true,
            message: '订单类型不能为空',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '订单描述不能为空',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: '订单备注不能为空',
            trigger: 'blur'
          }
        ],
        area: [
          {
            required: true,
            message: '所在区域不能为空',
            trigger: 'blur'
          }
        ],
        expend: [
          {
            required: true,
            message: '支出资金不能为空',
            trigger: 'blur'
          }
        ],
        cash: [
          {
            required: true,
            message: '账户余额不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {

          // 判断是修改还是添加
          const url = this.dialog.option == 'add' ? 'add' : `update/${this.formData.id}`;
          const mes = url == 'add' ? ['数据添加成功！', '数据添加失败！'] : ['数据修改成功！', '数据修改失败！'];

          this.$http.post(`/api/profiles/${url}`, this.formData)
            .then(res => {
              this.$message({
                message: mes[0],
                type: 'success'
              })
              this.dialog.show = false
              this.$emit('update')
            })
            .catch(err => this.$message.error(mes[1]))
        }
      })
    },

    // test () {
    //   let odd = 0;
    //   let text = ['这个月这么多', '没钱啦好贵', '又交了', '又到了交钱的时候了呢', '电费又升价了', '好好加油']
    //   for (let i = 100; i < 1000; i++) {
    //     odd = odd === 0 ? 1 : 0;
    //     this.formData = {
    //         type: this.format_type[odd],
    //         desc: this.format_type == '缴纳电费' ? '这个月缴费了'+ i + '元' : '充值了' + i + '元',
    //         area: this.format_area[Math.floor(Math.random() * 8)],
    //         expend: i,
    //         cash: i * 10,
    //         remark: text[Math.floor(Math.random() * 8)]
    //     };
    //     this.$http.post(`/api/profiles/add`, this.formData)
    //   }
    // },
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
.form >>> .el-input__inner, .form .el-textarea {
  max-width: 520px;
  border-color: #b9babd;
}

.form .sub-btn {
  width: 150px;
}
</style>