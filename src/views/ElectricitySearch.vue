<template>
    <section class="ele-wrap">
      <div class="bar-wrap">
        <div class="bar-ele-count">
          <div class="electricity-count" ref="electricityCount"></div>
        </div>
        <div class="bar-ele-money">
          <div class="electricity-money" ref="electricityMoney"></div>
        </div>
      </div>
      <div class="area-wrap">
        <div class="sub-area">
          <div class="search-area">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item style="width: 170px">
                <el-select v-model="chartArea" placeholder="更改区域">
                  <el-option v-for="(text, index) in chartAreaText" :key="index" :label="text" :value="text"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <router-link :to="{path: '/updateele', query: {area: this.chartAreaList[chartArea]}}"  v-if="this.$store.getters.user.identity === '1'">
                <el-form-item>
                  <el-button type="warning">修改</el-button>
                </el-form-item>
              </router-link>
            </el-form>
          </div>
          <div class="area-info" v-if="chartCount.length > 0">
            <h2 class="title">所在区域：{{this.chartArea}}</h2>
            <ul class="area-info-text">
              <li v-for="(item, index) in chartDataAxis" :key="item">
                <span class="info-month">{{item}}月:</span>
                <span>电量：{{chartCount[index]}}度</span>
                <span>金额：{{chartMoney[index] | moneyToFixed }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
</template>

<script>

import echarts from 'echarts'

export default {
  data () {
    return {
      chartEleCount: null,
      chartCount: [],
      chartMoney: [],
      chartAreaList: {
        '东区一栋': 'xd1',
        '东区二栋': 'xd2',
        '东区三栋': 'xd3',
        '旧东一栋': 'jd1',
        '旧东二栋': 'jd2',
        '旧东三栋': 'jd3',
        "中南": 'zn',
        "中北": 'zb',
      },
      chartAreaText: {
        xd1: '东区一栋',
        xd2: '东区二栋',
        xd3: '东区三栋',
        jd1: '旧东一栋',
        jd2: '旧东二栋',
        jd3: '旧东三栋',
        zn: '中南',
        zb: '中北',
      },
      chartArea: '东区一栋',
      chartDataAxisList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
      chartDataAxis: []
    }
  },
  mounted () {
    this.isUrlArea();
    this.getChartData();
  },
  methods: {
    // 获取图表数据
    getChartData () {
      this.$http.get('/api/monthfiles', {
        params: {
          area: this.chartAreaList[this.chartArea]
        }})
        .then(res => {
          res = res.data[0];
          if (res.janEle) this.chartCount.push(res.janEle);
          if (res.febEle) this.chartCount.push(res.febEle);
          if (res.marEle) this.chartCount.push(res.marEle);
          if (res.aprEle) this.chartCount.push(res.aprEle);
          if (res.mayEle) this.chartCount.push(res.mayEle);
          if (res.junEle) this.chartCount.push(res.junEle);
          if (res.julEle) this.chartCount.push(res.julEle);
          if (res.augEle) this.chartCount.push(res.augEle);
          if (res.sepEle) this.chartCount.push(res.sepEle);
          if (res.octEle) this.chartCount.push(res.octEle);
          if (res.novEle) this.chartCount.push(res.novEle);
          if (res.decEle) this.chartCount.push(res.decEle);
          if (res.janMoney) this.chartMoney.push(res.janMoney);
          if (res.febMoney) this.chartMoney.push(res.febMoney);
          if (res.marMoney) this.chartMoney.push(res.marMoney);
          if (res.aprMoney) this.chartMoney.push(res.aprMoney);
          if (res.mayMoney) this.chartMoney.push(res.mayMoney);
          if (res.junMoney) this.chartMoney.push(res.junMoney);
          if (res.julMoney) this.chartMoney.push(res.julMoney);
          if (res.augMoney) this.chartMoney.push(res.augMoney);
          if (res.sepMoney) this.chartMoney.push(res.sepMoney);
          if (res.octMoney) this.chartMoney.push(res.octMoney);
          if (res.novMoney) this.chartMoney.push(res.novMoney);
          if (res.decMoney) this.chartMoney.push(res.decMoney);

          this.chartDataAxis = this.chartDataAxisList.slice(0, this.chartCount.length);

          this.initChartCount();
          this.initChartMoney();
        })
    },

    // 初始化每月电量
    initChartCount () {
      this.chartEleCount = echarts.init(this.$refs.electricityCount);

      let dataAxis = this.chartDataAxis;
      let data = this.chartCount;
      let yMax = 4000;
      let dataShadow = [];

      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }

      this.chartEleCount.setOption({
        title: {
          text: '      2018年各月份电量/度 （可缩放图表）：',
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            data: data
          }
        ]
      })
    },

    // 初始化每月金额
    initChartMoney () {
      this.chartEleCount = echarts.init(this.$refs.electricityMoney);

      let dataAxis = this.chartDataAxis;
      let data = this.chartMoney;
      let yMax = 2000;
      let dataShadow = [];

      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }

      this.chartEleCount.setOption({
        title: {
          text: '      2018年各月份金额/元 （可缩放图表）：',
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#f6a400'},
                    {offset: 0.5, color: '#f07305'},
                    {offset: 1, color: '#f06d08'}
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#f06d08'},
                    {offset: 0.7, color: '#f07305'},
                    {offset: 1, color: '#f6a400'}
                  ]
                )
              }
            },
            data: data
          }
        ]
      })
    },

    // 提交更改
    onSubmit () {
      // 先把之前的清除掉
      this.chartCount = [];
      this.chartMoney = [];
      this.getChartData()
    },

    // 查看是不是修改后返回
    isUrlArea () {
      if (this.$route.query.area) {
        this.chartArea = this.chartAreaText[this.$route.query.area];
      }
    }
  },
  filters: {
    moneyToFixed (value) {
      return parseFloat(value).toFixed(2);
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
.ele-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.bar-wrap {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background: #f6f6f6;
}

.bar-ele-count, .bar-ele-money{
  height: 45%;
}

.electricity-count, .electricity-money {
  width: 100%;
  height: 100%;
}

.area-wrap {
  flex: 1;
  border-left: 1px solid #e6e6e6;
  padding-left: 30px;
}

.sub-area {
  margin-top: 25px;
}

.sub-area .area-info .title {
  height: 30px;
  margin-top: 10px;
}

.area-info-text {
  height: 40px;
  line-height: 40px;
}

.area-info-text li .info-month {
  width: 70px;
}

.area-info-text li span {
  display: inline-block;
  width: 140px;
  border-top: 1px solid #dcdcdc;
  text-align: center;
  font-size: 14px;
  color: #787878;
}


</style>