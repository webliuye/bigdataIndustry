<template>
  <el-card
    class="box-card"
    style="height: 396px;"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>高精尖产业情况</span>
    </div>
    <div>
      <div
        ref="chart"
        style="height: 280px;"
      ></div>
    </div>
  </el-card>
</template>

<script>
//import * as am4core from "@amcharts/amcharts4/core";
//import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    // this.chart = am4core.create(this.$refs.chart, am4charts.XYChart);

    this.chart = this.$echarts.init(this.$refs.chart);
    this.$axios.get('/mock/dashboard/high-grade.json')
      .then(res => {
        this.fillChart(res.data)
      })
  },
  methods: {
    fillChart (data) {
      const chart = this.chart;
      /*
      chart.data = data;
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.grid.template.fontSize = 10;
      categoryAxis.renderer.labels.template.fontSize = 12;
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      const series = chart.series.push(new am4charts.ColumnSeries());      
      series.dataFields.valueY = "growth";
      series.dataFields.categoryX = "name";
      series.clustered = false;
      series.tooltipText = "[bold]{valueY}[/]%";
      series.columns.template.adapter.add("fill", function(fill, target) {
        return '#259D9E';
      });
      const columnTemplate = series.columns.template;
      columnTemplate.width = 17;
      columnTemplate.strokeOpacity = 0;
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      */

      const seriesData = [];
      const xdata = [];
      data.forEach(it => {
        xdata.push(it.name);
        seriesData.push(it.growth);
      });
      const option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function (params) {
            var relVal = params[0].name;
            relVal += '<br>增速 ' + params[0].value + '%';
            return relVal;
          }
        },
        "grid": {
          "borderWidth": 0,
          "top": 60,
          "left": 60,
          "right": 10,
          "bottom": 18,
          textStyle: {
            color: "#fff"
          }
        },
        axisPointer: {
          type: 'line',
          axis: 'auto'
        },
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
          "data": xdata,
        }],
        "yAxis": [{
          name: '单位 (百分比)',
          "type": "value",
          nameTextStyle: {
            color: '#444'
          },
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
          }
        }],
        series: [
          {
            name: '',
            type: 'bar',
            barMaxWidth: 20,
            data: seriesData,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#FD6071 ' },
                    // { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#FFD85E' }
                  ]
                )
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
            markPoint: {
              symbol: 'circle',
              symbolSize: 50,
              symbolOffset: [0, 0],
              silent: true
            }
          }],
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        }

      };
      chart.setOption(option);
    }
  }
}
</script>

<style lang="less" scoped>
tspan {
  font-size: 12px;
}
</style>
