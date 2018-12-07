<template>
  <div class="indent-wrap">
    <div class="add-info">
      <el-form :inline="true" ref="add_data" :model="searchTime">
        <el-form-item label="按照时间筛选：" class="time-wrap">
          <el-date-picker
              v-model="searchTime.startTime"
              type="datetime"
              placeholder="选择开始时间">
          </el-date-picker>
          <el-date-picker
              v-model="searchTime.endTime"
              type="datetime"
              placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="filter-btn">
          <el-button type="warning" size ="small" icon="search" @click='handleSearch'>筛选</el-button>
        </el-form-item>
        <el-form-item class="filter-btn">
          <el-button type="danger" size ="small" icon="view" @click='handleClearSearch'>清除</el-button>
        </el-form-item>
        <el-form-item class="btn-Right" label="添加订单:" v-if="userLevel.identity == '1'">
          <el-button type="primary" size ="small" icon="view" @click='handleAdd'>添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table
          v-if="tableData.length > 0"
          :data="tableData"
          max-height="450"
          style="width: 100%">
        <el-table-column
            prop="created"
            label="创建时间"
            align="center"
            min-width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.created | getDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="type"
            label="订单类型"
            align="center"
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="desc"
            label="订单详情"
            align="center"
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="remark"
            label="订单备注"
            align="center"
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="area"
            label="区域"
            align="center"
            min-width="100">
          <template slot-scope="scope">
            <span style="color: #00d053;">{{ scope.row.area }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="expend"
            label="支出"
            align="center"
            min-width="100">
          <template slot-scope="scope">
            <span style="color: #f56767;">- {{ scope.row.expend | moneyToFixed }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="cash"
            label="账户余额"
            align="center"
            min-width="150">
          <template slot-scope="scope">
            <span style="color: #4db3ff;">{{ scope.row.cash | moneyToFixed }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="150" label="操作" align="right" v-if="userLevel.identity == '1'">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-row>
        <el-col :span="24" class="paginations">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <Dialog :dialog="dialog" :formData="formData" @update="getProfiles"></Dialog>
  </div>
</template>

<script>
import Dialog from '../components/Dialog'

export default {
  data () {
    return {
      tableData: [],
      // allTableData: [],
      filterTableData: [],
      formData: {
        type: '',
        desc: '',
        area: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      },
      dialog: {
        title: '添加订单信息',
        show: false,
        option: 'edit'
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 10, // 默认1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      searchTime: {
        startTime: '',
        endTime: ''
      },
      pageDataOrFilterData: 'pageData'
    }
  },
  created () {
    this.getProfiles()
  },
  methods: {
    getProfiles () {
      // 获取分页数据
      this.$http.post('/api/profiles/pagelist', {page: this.paginations.page_index, page_sizes: this.paginations.page_size})
        .then(res => {
          this.tableData = res.data.profile;
          this.paginations.total = res.data.total;
        })
        .catch(error => console.log(error))
    },

    // setPaginations () {
    //   this.paginations.page_size = 5;
    //   this.paginations.page_index = 1;
    //   this.paginations.total = this.filterTableData.length;
    //
    //   this.tableData = this.filterTableData.filter((item, index) => {
    //     return index < this.paginations.page_size;
    //   })
    // },

    handleEdit (index, row) {
      console.log(row);
      this.formData = {
        type: row.type,
        desc: row.desc,
        area: row.area,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
      this.dialog = {
        title: '修改订单信息',
        show: true,
        option: 'edit'
      }
    },

    handleDelete (index, row) {
      // 删除订单
      this.$confirm('你确定要删除吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$http.delete(`/api/profiles/delete/${row._id}`)
          .then(res => {
            this.$message({
              message: '订单删除成功！',
              type: 'success'
            })
            this.getProfiles()
          })
          .catch(err => this.$message.error('订单删除失败！'))
      })
    },

    handleAdd () {
      // 添加
      this.formData = {
        type: '',
        desc: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      };
      this.dialog = {
        title: '添加订单信息',
        show: true,
        option: 'add'
      }
    },

    // 改变一页展现的数量
    handleSizeChange (page_sizes) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_sizes;

      if (this.pageDataOrFilterData === 'pageData') {
        this.getProfiles()
      } else {
        this.handleSearch()
      }

    },

    // 跳转到哪一页
    handleCurrentChange (page) {

      // 获取当前页
      this.paginations.page_index = page
      if (this.pageDataOrFilterData === 'pageData') {
        this.getProfiles()
      } else {
        this.handleSearch()
      }
    },

    // 筛选
    handleSearch () {

      if (!this.searchTime.startTime || !this.searchTime.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        return;
      }

      // 改变成筛选模式
      this.pageDataOrFilterData = 'filterData';

      const sTime = this.searchTime.startTime.getTime();
      const eTime = this.searchTime.endTime.getTime();


      this.$http.post('/api/profiles/filterdata',
        {
          startTime: sTime,
          endTime: eTime,
          page: this.paginations.page_index,
          page_sizes: this.paginations.page_size
        })
        .then(res => {
          this.tableData = res.data.profile;
          this.paginations.total = res.data.total;
        })
    },

    // 清除筛选
    handleClearSearch () {

      if (!this.searchTime.startTime) return

      this.searchTime = {
        startTime: '',
        endTime: ''
      };

      // 改为默认分页效果
      this.pageDataOrFilterData = 'pageData';
      this.getProfiles()
    }

  },
  computed: {
    userLevel () {
      return this.$store.getters.user;
    }
  },
  components: {
    Dialog
  },
  filters: {
    getDate (value) {
      return new Date(Date.parse(value)).toLocaleString();
    },
    moneyToFixed (value) {
      return parseFloat(value).toFixed(2);
    }
  }
}
</script>

<style scoped>
.indent-wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.paginations {
  text-align: right;
  margin: 15px 10px 0 0;
}

.add-info .time-wrap {
  margin-right: 10px;
}

.el-date-editor {
  margin-right: 10px;
}

.btn-Right {
  float: right;
}

</style>