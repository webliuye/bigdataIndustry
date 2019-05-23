<template>
  <el-card
    class="box-card"
    style="height: 480px;"
  >
    <div>
      <div class="grid-wrapper" :class="{'wide': !isAdminRole}">
        <i class="icon-previous el-icon-arrow-left"></i>
        <div class="grid">
          <div class="grid-item" :class="{'active': activeItems[0]}" @click="onActiveItemClick(0)">
            <span class="title">亩均税收</span>
            <span class="unit">(万元/亩)</span>
            <span class="number">
              <span class="key">8223</span>
              <span class="precent">同比 <i class="icon-up"></i> 10%</span>
            </span>
          </div>
          <div class="grid-item" :class="{'active': activeItems[1]}" @click="onActiveItemClick(1)">
            <span class="title">人均产值</span>
            <span class="unit">(万元)</span>
            <span class="number">
              <span class="key">78</span>
              <span class="precent">同比 <i class="icon-up"></i> 12%</span>
            </span>
          </div>
          <div class="grid-item" :class="{'active': activeItems[2]}" @click="onActiveItemClick(2)">
            <span class="title">R&D经费支出占比</span>
            <span
              class="unit"
            >&nbsp;</span>
            <span class="number">
              <span class="key">45%</span>
              <span class="precent">同比 <i class="icon-down"></i> 5.7%</span>
            </span>
          </div>
          <div class="grid-item" :class="{'active': activeItems[3]}" @click="onActiveItemClick(3)">
            <span class="title">单位产值能耗</span>
            <span class="unit">(吨标煤/万元)</span>
            <span class="number">
              <span class="key">30</span>
              <span class="precent">同比 <i class="icon-up"></i> 3.3%</span>
            </span>
          </div>
          <div
            class="grid-item"
            :class="{'active': activeItems[4]}" @click="onActiveItemClick(4)"
            v-if="isAdminRole"
          >
            <span class="title">主要园区</span>
            <span class="unit">(个)</span>
            <span class="number">
              <span class="key">15</span>
              <span class="precent">同比 <i class="icon-up"></i> 17.5%</span>
            </span>
          </div>
          <div
            class="grid-item"
            :class="{'active': activeItems[5]}" @click="onActiveItemClick(5)"
            v-if="isAdminRole"
          >
            <span class="title">企业数</span>
            <span class="unit">(万家)</span>
            <span class="number">
              <span class="key">6.9</span>
              <span class="precent">同比 <i class="icon-up"></i> 15%</span>
            </span>
          </div>
        </div>

        <i class="icon-next el-icon-arrow-right"></i>
      </div>

      <div class="chart-wrapper">
        <div
          id="dashboard-trend-chart"
          ref="chart"
          style="height: 300px; margin-top: -20px;"
        ></div>
        <span class="title">主要指标趋势</span>
      </div>
    </div>
  </el-card>
</template>
<script>
const isAdminRole = () => localStorage.getItem("userType") === "admin";

export default {
  data () {
    return {
      chart: null,
      isAdminRole: false,
      activeItems: [true, false, false, false, false, false]
    }
  },
  created () {
    this.isAdminRole = isAdminRole();
  },
  mounted () {
    this.chart = this.$echarts.init(this.$refs.chart);
    this.$axios.get('/mock/dashboard/trend.json')
      .then(res => {
        this.fillChart(res.data);
      })
  },
  methods: {
    fillChart (data) {
      const chart = this.chart;
      const data1 = [];
      const data2 = [];
      const xData = [];
      data.forEach(it => {
        xData.push(it.date.split('年')[1]);
        data1.push(it.total);
        data2.push(it.part);
      });
      const option = {
        backgroundColor: '#fff',        
        "tooltip": {
          "trigger": "axis",
          "axisPointer": {
            "type": "line",
            textStyle: {
              color: "#fff"
            },
            lineStyle: {
              color: '#ccc'
            }
          },
          formatter: function (params) {
            const relVal = params[0].seriesName + ' ' + params[0].value + '亿元<br>' + params[1].seriesName + ' ' + params[1].value + '亿元';
            return relVal;
          }
        },
        "grid": {
          "borderWidth": 0,
          "top": 45,
          "left": 60,
          "right": 10,
          "bottom": 18,
          textStyle: {
            color: "#fff"
          }
        },
        "legend": {
          right: '0%',
          top: 10,
          data: [
            {
              name: '工业总产值',
              textStyle: { color: '#259D9E' }
            },
            {
              name: '规上企业收入',
              textStyle: { color: '#FF6060' }
            }
          ]
        },
        "calculable": true,
        "xAxis": [{
          name: '',
          "type": "category",
          "axisLine": {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          "splitLine": {
            "show": false,
            lineStyle: {
              color: '#e7e7e7',
            }
          },
          "axisTick": {
            "show": false
          },
          "splitArea": {
            "show": false
          },
          "axisLabel": {
            "interval": 0,
            textStyle: {
              color: '#444'
            },
            show: true
          },
          "data": xData,
        }],
        "yAxis": [{
          name: '',
          "type": "value",
          "splitLine": {
            "show": true,
            lineStyle: {
              color: '#e6e6e6',
              type: 'dashed'
            }
          },
          "axisLine": {
            show: false,
            lineStyle: {
              color: '#ccc'
            }
          },
          "axisTick": {
            "show": false
          },
          "axisLabel": {
            "interval": 0,
            textStyle: {
              color: '#444'
            },
            show: true
          },
          "splitArea": {
            "show": false
          },

        }],
        "series": [{
          "name": "工业总产值",
          "type": "line",
          "stack": "工业总产值",
          symbolSize: 8,
          symbol: 'emptyCircle',
          "itemStyle": {
            "normal": {
              "color": "#259D9E",
              "barBorderRadius": 0,
            }
          },
          "data": data1
        }, {
          "name": "规上企业收入",
          "type": "line",
          "stack": "规上企业收入",
          symbolSize: 8,
          symbol: 'emptyCircle',
          "itemStyle": {
            "normal": {
              "color": "#FF6060",
              "barBorderRadius": 0,
            }
          },
          "data": data2
        }]
      }
      this.chart.setOption(option);
    },
    onActiveItemClick(index) {
      for (let i = 0; i < this.activeItems.length; i++) {
        this.$set(this.activeItems, i, false);
      }
      this.$set(this.activeItems, index, true);
    }
  }
}
</script>
<style lang="less" scoped>
.grid-wrapper {
  display: flex;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 10px;
  i {
    display: block;
    width: 20px;
  }
  .grid {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    width: 100%;

    .grid-item {
      width: 16%;
      height: 7.6%;
      border-top: 2px solid #FFF;
      padding: 0 6px;
      cursor: pointer;
      span {
        display: block;
        &.key {
          min-width: 60px;
        }
        &.title {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
          text-align: left;
          line-height: 3;
          overflow: hidden;
          word-break: keep-all;
          text-overflow: ellipsis;
        }
        &.unit {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          text-align: left;
          line-height: 3;
        }
        &.number {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.45);
          text-align: left;
          line-height: 32px;
          display: flex;
          align-items: center;

          .precent {            
            display: inline-block;
            font-size: 12px;
            line-height: 1.5;
            color: rgba(0,0,0,0.45);
            margin-left: 7.5%;

            i {
              display: inline-block;
              width: 10px;
              height: 6px;
              padding: 0;
              margin: 0;
              &.icon-up {
                background: center / cover no-repeat url(../../../assets/img/home/up.png);
              }
              &.icon-down {
                background: center / cover no-repeat url(../../../assets/img/home/down.png);
              }
            }
          }
        }
      }

      &.active {
        border-top: 2px solid #1882C8;
        .title {
          color: #1882C8;
        }
        .number {
          color: rgba(0,0,0,0.85);
        }
      }
    }
  }

  &.wide {
    .grid {
      .grid-item {
        width: 25%;
      }
    }
  }

  svg {
    text {
      tspan {
        font-size: 12px;
      }
    }
  }
}
.chart-wrapper {
  position: relative;
  padding: 20px;
  margin-top: 30px;
  .title {
    position: absolute;
    top: 0;
    left: 20px;
  }
}
</style>

