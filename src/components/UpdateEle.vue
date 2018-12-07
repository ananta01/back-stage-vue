<template>
    <div class="update-wrap">
      <div class="area-info">
        <h2 class="title">修改电费信息（只可以输入数字）</h2>
        <form action="" onsubmit="return false;">
          <ul class="area-info-ul">
            <li class="area-info-text" v-for="(item, key, index) in dataEleList" :key="dataAxisList[index]">
              <span class="info-month">{{dataAxisList[index]}}月:</span>
              <span class="margin-5"><input type="text" v-model="dataEleList[key]" @input = "dataEleList[key]=dataEleList[key].replace(/[^\d]/g,'')" placeholder="请输入度数"></span>
              <span><input type="text" v-model="dataMoneyList[key]" @input = "dataMoneyList[key]=dataMoneyList[key].replace(/[^\d]/g,'')" placeholder="请输入金额"></span>
            </li>
          </ul>
          <div class="btn-wrap">
            <button class="btn-sub" @click="isSubmit">提交</button>
            <button class="btn-sub btn-reset" @click="isReset">重置</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dataAxisList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
      area: '',
      dataEleList: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: '',
        jul: '',
        aug: '',
        sep: '',
        oct: '',
        nov: '',
        dec: ''
      },
      dataMoneyList: {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: '',
        jul: '',
        aug: '',
        sep: '',
        oct: '',
        nov: '',
        dec: ''
      }
    }
  },
  mounted () {
    this.area = this.$route.query.area;
    this.getChartData();
  },
  methods: {
    // 获取数据渲染到input
    getChartData () {
      this.$http.get('/api/monthfiles', {
        params: {
          area: this.area
        }})
        .then(res => {
          res = res.data[0];
          if (res.janEle) this.dataEleList['jan'] = res.janEle;
          if (res.febEle) this.dataEleList['feb'] = res.febEle;
          if (res.marEle) this.dataEleList['mar'] = res.marEle;
          if (res.aprEle) this.dataEleList['apr'] = res.aprEle;
          if (res.mayEle) this.dataEleList['may'] = res.mayEle;
          if (res.junEle) this.dataEleList['jun'] = res.junEle;
          if (res.julEle) this.dataEleList['jul'] = res.julEle;
          if (res.augEle) this.dataEleList['aug'] = res.augEle;
          if (res.sepEle) this.dataEleList['sep'] = res.sepEle;
          if (res.octEle) this.dataEleList['oct'] = res.octEle;
          if (res.novEle) this.dataEleList['nov'] = res.novEle;
          if (res.decEle) this.dataEleList['dec'] = res.decEle;
          if (res.janMoney) this.dataMoneyList['jan'] = res.janMoney;
          if (res.febMoney) this.dataMoneyList['feb'] = res.febMoney;
          if (res.marMoney) this.dataMoneyList['mar'] = res.marMoney;
          if (res.aprMoney) this.dataMoneyList['apr'] = res.aprMoney;
          if (res.mayMoney) this.dataMoneyList['may'] = res.mayMoney;
          if (res.junMoney) this.dataMoneyList['jun'] = res.junMoney;
          if (res.julMoney) this.dataMoneyList['jul'] = res.julMoney;
          if (res.augMoney) this.dataMoneyList['aug'] = res.augMoney;
          if (res.sepMoney) this.dataMoneyList['sep'] = res.sepMoney;
          if (res.octMoney) this.dataMoneyList['oct'] = res.octMoney;
          if (res.novMoney) this.dataMoneyList['nov'] = res.novMoney;
          if (res.decMoney) this.dataMoneyList['dec'] = res.decMoney;

        }, err => {
          console.log(err);
        })
    },

    isSubmit () {
      if (this.area == '') return;
      this.$http.post(`api/monthfiles/update/${this.area}`, {dataEleList: this.dataEleList, dataMoneyList: this.dataMoneyList})
        .then(res => {
          if (res.status == 200) {
            this.$router.push({ path: '/electricitysearch', query: { area: this.area }})
          }
        })
    },

    isReset () {
      this.dataEleList = {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: '',
        jul: '',
        aug: '',
        sep: '',
        oct: '',
        nov: '',
        dec: ''
      };
      this.dataMoneyList = {
        jan: '',
        feb: '',
        mar: '',
        apr: '',
        may: '',
        jun: '',
        jul: '',
        aug: '',
        sep: '',
        oct: '',
        nov: '',
        dec: ''
      }
    }

  },
  computed: {},
  components: {}
}
</script>

<style scoped>

  .update-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background: #eaeaea;
  }

  .area-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    background: #fff;
    width: 70%;
    box-sizing: border-box;
    padding: 20px 20px 30px 40px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px #ccc;
  }

  .area-info .title {
    height: 40px;
    line-height:40px;
    font-size: 18px;
    font-weight: 700;
  }

  .area-info-ul {
    width: 90%;
    height: 360px;
  }

  .area-info-text {
    display: inline-block;
    width: 50%;
    height: 60px;
    line-height: 60px;
  }

  .area-info-text .info-month {
    width: 17%;
  }

  .area-info-text span {
    display: inline-block;
    width: 38%;
    border-top: 1px solid #dcdcdc;
    text-align: center;
    font-size: 16px;
    color: #787878;
  }

  .area-info-text input {
    width: 100%;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #c9c9c9;
    padding-left: 5px;
  }

  .area-info-text input:focus {
    border: 1px solid #409EFF;
  }

  .margin-5 {
    display: inline-block;
    margin-right: 15px;
  }

  .btn-sub {
    width: 100px;
    height: 35px;
    font-size: 16px;
    background: #409EFF;
    color: #fff;
    border-radius: 5px;
    margin-left: 5px;
  }

  .btn-wrap {
    text-align: right;
    margin: 10px 10.7% 0 0;
  }

  .btn-sub:hover {
    background: #66b1ff;
  }

  .btn-reset {
    background: #e6a23c;
  }

  .btn-reset:hover {
    background: #f4ae3e;
  }

</style>