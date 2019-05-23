<template>
  <el-card
    class="box-card"
    style="height: 100%"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span class="title">本期企业占比总数</span>
      <div
        style="float: right; display: flex; margin-top:-5px;"
        type="text"
      >
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 10px; font-size: 14px;">评价年度</span>
          <el-select
            size="small"
            style="width: 120px;"
            v-model="evalYear"
            placeholder="请选择"
          >
            <el-option
              label="2019"
              value="2019"
            >
            </el-option>
            <el-option
              label="2018"
              value="2018"
            >
            </el-option>
            <el-option
              label="2017"
              value="2017"
            >
            </el-option>
            <el-option
              label="2016"
              value="2016"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="14">
        <div ref="chart"></div>
        <div
          id="pieC"
          style="height: 100%; width: 100%; min-height: 280px;"
        ></div>
      </el-col>
      <el-col :span="10">
        <div style="padding: 12px 0;">
          <p style="text-align: right;">单位：家</p>
          <div
            class="rank-item"
            v-for="(item, index) in rankList"
            :key="index"
          >
            <span
              class="rect"
              :style="{'background': colorList[index] }"
            ></span>
            <span class="label">{{ item.label }}</span>
            <span class="amount">数量: {{ item.amount }}</span>
            <div class="progress-bar">
              <span class="bar">
                <span
                  class="progress"
                  :style="{'width': item.precent + '%', 'background': colorList[index] }"
                ></span>
              </span>
            </div>
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
      evalYear: '2019',
      rankList: [],
      colorList: [
        "#375BAF",
        "#259D9E",
        "#FFBE3C",
        "#FF6060"
      ],
      amColorList: [
        am4core.color("#375BAF"),
        am4core.color("#259D9E"),
        am4core.color("#FFBE3C"),
        am4core.color("#FF6060")
      ]
    }
  },
  mounted () {
    // Create chart instance
    // this.chart = am4core.create(this.$refs.chart, am4charts.PieChart);
    this.chart = this.$echarts.init(document.getElementById('pieC'))
    this.$axios.get('/mock/evaluate/proportion.json')
      .then(res => {
        const chartData = res.data.map(e => {
          return { value: e.amount, name: e.label }
        })
        this.initChart(chartData)
        const list = res.data;
        let total = 0;
        for (let item of list) {
          total += item.amount;
        }
        for (let item of list) {
          item.precent = (item.amount / total) * 100;
        }
        this.rankList = list;
      })

  },
  methods: {
    initChart (data) {

      this.chart.title = '环形图';

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}企业数（家）: {c} ({d}%)"
        },
        color: this.colorList,
        series: [
          {
            name: '数据详细',
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
          }
        ]
      }
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
.rank-item {
  display: flex;
  align-items: center;
  height: 60px;
  span.rect {
    display: block;
    width: 36px;
    height: 11px;
    margin-right: 20px;
    background: #f0f0f0;
  }
  .label {
    width: 80px;
  }
  .amount {
    width: 120px;
  }
}
</style>
