<template>
  <el-card
    class="box-card"
    style="height: 100%"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span class="title">高精尖产业级别统计图</span>
    </div>
    <el-row>
      <el-col :span="16">
        <div
          id="xyC"
          style="height: 100%; width: 100%; min-height: 280px;"
        ></div>
      </el-col>
      <el-col :span="8">
        <div class="box">
          <p style="text-align: right;">单位：家</p>
          <div
            class="rank-item"
            v-for="(item, index) in rankList"
            :key="index"
          >
            <span class="rect"></span>
            <span class="label">{{ item.type }}</span>
            <span class="amount">数量: {{ item.value }} 家</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  data () {
    return {
      chart: null,
      rankList: []
    }
  },
  mounted () {
    // Create chart instance
    // this.chart = am4core.create(this.$refs.chart, am4charts.XYChart);
    this.chart = this.$echarts.init(document.getElementById('xyC'))
    this.$axios.get('/mock/evaluate/high-grade.json')
      .then(res => {
        this.initChart(res.data);
        // this.initChart()
        this.rankList = res.data;
      })
  },
  methods: {
    initChart (res) {
      var dataAxis = res.map(e => e.type)
      var data = res.map(e => {
        return {
          value: e.value,
          name: e.type
        }
      }
      )
      const maxs = data.map(d => d.value)
      var yMax = (Math.max(...maxs) + 100) - (Math.max(...maxs) + 100) % 100
      var dataShadow = [];
      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              opacity: 0
            }
          },
          formatter: function (prams) {
            return prams[1].name + '企业数（家）： ' + prams[1].value
          }
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            show: true,
            color: '#888888',
            fontSize: 16
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
          name: '企业数（家）',
          splitLine: {    //网格线
            lineStyle: {
              type: 'dashed',   //设置网格线类型 dotted：虚线   solid:实线
              color: '#ddd'
            },
            show: true //隐藏或显示
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#888888',
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
              normal: { color: 'rgba(0,0,0,0.05)' }
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            barWidth: 20,
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#FD6071 ' },
                    // { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#FFD85E' }
                  ]
                ),
                barBorderRadius: 50,
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#FD6071 ' },
                    // { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#FFD85E' }
                  ]
                )
              }
            },
            data: data
          }
        ]
      };
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}
.box {
  padding: 32px 0;
}
.rank-item {
  display: flex;
  align-items: center;
  height: 50px;
  // padding: 24px 0;
  .label {
    width: 80px;
  }
  .amount {
    width: 120px;
  }
}
</style>