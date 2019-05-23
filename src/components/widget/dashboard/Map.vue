<template>
  <el-card
    class="box-card"
    style="height: 396px;"
  >
    <div
      slot="header"
      class="header clearfix"
    >
      <span>园区分布</span>
      <div
        class="controls"
        type="text"
      >
        <el-radio-group
          v-model="dateScale"
          size="mini"
          style="margin-right: 10px;"
        >
          <el-radio-button label="month">月度</el-radio-button>
          <el-radio-button label="quarter">季度</el-radio-button>
          <el-radio-button label="year">年度</el-radio-button>
        </el-radio-group>
        <el-date-picker
          size="mini"
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 240px;"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row>
        <el-col
          :span="14"
          class="map"
        >
          <div
            ref="mapChart"
            style="height: 280px; width: 640px; margin-left: -300px;"
          ></div>
        </el-col>
        <el-col
          :span="10"
          class="grid"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <h4>报送进度</h4>
              <span class="number">{{ details.reportProgress }}%</span>

              <div class="progress-bar">
                <span class="bar">
                  <span
                    class="progress"
                    :style="{'width': details.reportProgress + '%', 'background': '#259D9E' }"
                  ></span>
                </span>
              </div>

              <div class="flex-row" v-show="isAdminRole">
                <div>
                  <span class="label">应报</span>
                  <span class="label">{{ details.reportTotal }}家</span>
                </div>
                <div>
                  <span class="label">已报</span>
                  <span class="label">{{ details.reportPercent }}%</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <h4>审核情况</h4>
              <span class="number">{{ details.auditTotal }}</span>
              
              <div class="progress-bar">
                <span class="bar" style="background: #249D9E; border-radius: 1px;">
                  <span
                    class="progress"
                    style="background: #FFBF60;"
                    :style="{'width': ((details.auditPending) / details.auditTotal * 100) + '%'}"
                  >
                  {{ details.auditPending }}
                  </span>
                  <span class="total">{{ details.auditTotal - details.auditPending }}</span>
                </span>
              </div>

              <div class="flex-row" v-show="isAdminRole">
                <div>
                  <span class="label">待审核</span>
                  <span class="label">{{ details.auditPending }}家</span>
                </div>
                <!--
                <div>
                  <span class="label">已报</span>
                  <span class="label">{{ details.confirm }}家</span>
                </div>
                -->
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <h4>企业反馈</h4>
              <span class="number">{{ details.feedback }}</span>

              <div class="progress-bar">
                <span class="bar">
                  <span
                    class="progress"
                    :style="{'width': details.reportPercent + '%'}"
                  ></span>
                </span>
              </div>

              <div class="flex-row" v-show="isAdminRole">
                <div>
                  <span class="label">待处理</span>
                  <span class="label">{{ details.confirm }}家</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <h4>任务情况</h4>
              <span class="label">已发布</span><span class="number">{{ details.taskPublish }}</span>
              
              <div class="progress-bar">
                <span class="bar" style="background: #375BAE; border-radius: 1px;">
                  <span
                    class="progress"
                    style="background: #FF6060;"
                    :style="{'width': (details.taskPublish / (details.taskPublish + details.taskPending + details.taskInProgress) * 100) + '%'}"
                  >
                  {{ details.taskPublish }}
                  </span>
                  <span class="total">{{ details.taskPublish + details.taskPending + details.taskInProgress }}</span>
                </span>
              </div>

              <div class="flex-row" v-show="isAdminRole">
                <div>
                  <span class="label">待开始</span>
                  <span class="label">{{ details.taskPending }}个</span>
                </div>
                <div>
                  <span class="label">进行中</span>
                  <span class="label">{{ details.taskInProgress }}个</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import districtShunyi from "@/assets/geojson/shunyi.json";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway.js";
import Sparkline from 'vue-sparklines';
import { setTimeout } from 'timers';

const maxZoomLevel = 3;
const hoverColorHex = "#CFC3E9";
const hoverColor = am4core.color(hoverColorHex);

const isAdminRole = () =>  localStorage.getItem("userType") === "admin";

export default {
  name: 'MapCard',
  components: {
    Sparkline
  },
  data () {
    return {
      dateScale: 'month',
      dateRange: '',
      mapChart: null,
      isAdminRole: false,
      streets: [],
      streetDetails: {},
      highlightItems: [],
      details: {
        feedback: 151,
        auditTotal: 1615,
        auditPending: 64,
        approvalPending: 23,
        confirm: 87,
        reportTotal: 2600,
        reportPercent: 63,
        reportProgress: 78,
        taskPublish: 20,
        taskInProgress: 17,
        taskPending: 3
      },
      spData3: (() => {
        const len = 15
        return Array.from({
          length: len
        }, () => Math.floor(Math.random() * len))
      })(),
      spData4: (() => {
        const len = 15
        return Array.from({
          length: len
        }, () => Math.floor(Math.random() * len))
      })(),
      // 曲线样式
      spCurveStyles3: {
        stroke: '#54a5ff',
        fill: '#000'
      },
      // 结点样式
      spSpotStyles3: {
        fill: '#54a5ff'
      },
      // 结点属性
      spSpotProps3: {
        size: 2
      },
      // 参考线种类：'max', 'min', 'mean', 'avg', 'median', 'custom' or false
      spRefLineType3: 'avg',
      // 参考线样式
      spRefLineStyles3: {
        stroke: '#d14',
        strokeOpacity: 0,
        strokeDasharray: '2, 2'
      },
      // 当前结点
      spIndex3: 3,
      // 字体样式
      spTextStyles3: {
        fill: '#d14',
        fontSize: '0'
      },
      // 指示器样式
      spIndicatorStyles3: {
        stroke: '#000'
      },
      // tooltip属性（通常用于自定义提示信息, formatter方法参数为数据value和颜色color对象）
      spTooltipProps3: {
        formatter (val) {
          return `当前数据为：<label style="color:${val.color};font-weight:bold;">${val.value}</label>`
        }
      },
      // 曲线样式
      spCurveStyles4: {
        stroke: '#54a5ff',
        fill: '#000'
      },
      // 结点样式
      spSpotStyles4: {
        fill: '#54a5ff'
      },
      // 结点属性
      spSpotProps4: {
        size: 2
      },
      // 参考线种类：'max', 'min', 'mean', 'avg', 'median', 'custom' or false
      spRefLineType4: 'avg',
      // 参考线样式
      spRefLineStyles4: {
        stroke: '#d14',
        strokeOpacity: 0,
        strokeDasharray: '2, 2'
      },
      // 当前结点
      spIndex4: 3,
      // 字体样式
      spTextStyles4: {
        fill: '#d14',
        fontSize: '0'
      },
      // 指示器样式
      spIndicatorStyles4: {
        stroke: '#000'
      },
      // tooltip属性（通常用于自定义提示信息, formatter方法参数为数据value和颜色color对象）
      spTooltipProps4: {
        formatter (val) {
          return `当前数据为：<label style="color:${val.color};font-weight:bold;">${val.value}</label>`
        }
      }

    }
  },
  created () {
    this.isAdminRole = isAdminRole();
    this.$axios.get('/mock/dashboard/streets.json')
      .then(res => {
        const streets = this.filterStreet(res.data);
        this.streets = Array.isArray(streets) ? streets : [streets];
        this.listStreets();
      })

    this.$axios.get('/mock/dashboard/street-details.json')
      .then(res => {
        const details = this.filterDetail(res.data);
        this.streetDetails = res.data;
        this.details = details;
      })
  },
  mounted () {
    this.loadMapChart();
  },
  methods: {
    loadMapChart () {
      const mapChart = am4core.create(this.$refs.mapChart, am4maps.MapChart);
      mapChart.geodata = districtShunyi;
      mapChart.projection = new am4maps.projections.Mercator();
      mapChart.homeZoomLevel = 1.05;
      mapChart.maxZoomLevel = 3;
      mapChart.seriesContainer.draggable = false;
      mapChart.seriesContainer.resizable = false;
      mapChart.maxZoomLevel = 1.05;
      mapChart.minZoomLevel = 1.05;

      // Polygon series
      const polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeOpacity = 0.5;
      polygonSeries.properties.fill = '#419CD2';

      const polygonTemplate = polygonSeries.mapPolygons.template;
      const districtHover = polygonSeries.mapPolygons.template.states.create("hover");
      polygonTemplate.properties.fill = '#419CD2';
      districtHover.properties.fill = '#52ADE3';
      districtHover.properties.stroke = hoverColor;
      districtHover.properties.strokeOpacity = 1;
      mapChart.goHome();
      this.mapChart = mapChart;
    },
    listStreets () {
      if (this.mapChart.series.length > 1) {
        this.mapChart.series.pop();
      }

      const streetSeries = this.mapChart.series.push(new am4maps.MapImageSeries());
      const streetTemplate = streetSeries.mapImages.template;

      const imageStreet = streetTemplate.createChild(am4core.Image);
      imageStreet.propertyFields.href = "imageURL";
      imageStreet.width = 22;
      imageStreet.height = 22;
      imageStreet.horizontalCenter = "middle";
      imageStreet.verticalCenter = "middle";

      streetTemplate.propertyFields.latitude = "latitude";
      streetTemplate.propertyFields.longitude = "longitude";
      streetTemplate.horizontalCenter = "middle";
      streetTemplate.verticalCenter = "middle";
      streetTemplate.align = "center";
      streetTemplate.valign = "middle";
      streetTemplate.width = 16;
      streetTemplate.height = 16;
      streetTemplate.nonScaling = true;

      streetTemplate.background.fillOpacity = 0;
      streetTemplate.background.fill = am4core.color("#ffffff");
      streetTemplate.setStateOnChildren = true;
      streetTemplate.states.create("hover");      
      streetTemplate.config = {
        cursorOverStyle: [
          {
            "property": "cursor",
            "value": "pointer"
          }
        ]
      };
      const labelStreet = streetTemplate.createChild(am4core.Label);
      labelStreet.html = '<h5 style="text-shadow: 1px 1px 5px rgba(0, 0, 0, .5);">{title}</h5>';
      labelStreet.config = {
        fill: "#FFF",
        fontWeight: 400,
        fontSize: 12
      };
      labelStreet.horizontalCenter = "middle";
      labelStreet.verticalCenter = "top";
      labelStreet.dy = 16;

      streetSeries.data = this.streets;

      if (this.streets.length === 1) {
        setTimeout(() => {
          this.clearFocus();
          this.appendFocus(this.streets[0]);
        }, 5000);
      } else {
        streetTemplate.events.on("hit", this.drillDownMap);
      }
    },
    drillDownMap (event) {
      this.clearFocus();
      this.appendFocus(event.target.dataItem.dataContext);
    },    
    listDetails (item) {
      this.details = this.streetDetails[item.title];
      this.spData3 = this.getRandData();
      this.spData4 = this.getRandData();
    },
    appendFocus (item) {      
      const chart = this.mapChart;
      const focusSeries = chart.series.push(new am4maps.MapImageSeries());
      const focusTemplate = focusSeries.mapImages.template;
      const circle = focusTemplate.createChild(am4core.Circle);
      const { imageURL, latitude, longitude, title } = item;
      circle.width = 72;
      circle.height = 72;
      circle.fill = am4core.color("#FFF");
      circle.fillOpacity = 0.5;
      focusTemplate.propertyFields.latitude = "latitude";
      focusTemplate.propertyFields.longitude = "longitude";
      focusTemplate.horizontalCenter = "middle";
      focusTemplate.verticalCenter = "middle";
      focusTemplate.align = "center";
      focusTemplate.valign = "middle";
      focusTemplate.width = 16;
      focusTemplate.height = 16;
      focusTemplate.nonScaling = true;
      focusTemplate.background.fillOpacity = 0;
      focusTemplate.background.fill = am4core.color("#FFFFFF");

      if (this.streets.length > 1) {
        focusTemplate.events.on("hit", () => {
          this.clearFocus();
          this.details = this.streetDetails.ALL;
          this.spData3 = this.getRandData();
          this.spData4 = this.getRandData();
        });

        if (this.highlightItems.length) {
          this.clearFocus();
        } else {
          this.highlightItems.push(focusSeries);
          this.listDetails(item);
        }

        focusSeries.data = [item];
      }
    },
    clearFocus () {
      const chart = this.mapChart;
      for (let hi of this.highlightItems) {
        chart.series.removeIndex(chart.series.indexOf(hi)).dispose();
      }
      this.highlightItems.length = 0;
    },
    getRandData () {
      return Array.from({
        length: 15
      }, () => Math.floor(Math.random() * 15))
    },
    filterStreet (dataset) {
      if (!isAdminRole()) {
        const matched = dataset.find((item, idx) => {
          return item.title === "中关村示范区顺义园";
        });
        return matched;
      }
      return dataset;
    },
    filterDetail (dataset) {
      if (!isAdminRole()) {
        for (const key in dataset) {
          if (key === "中关村示范区顺义园") {
            return dataset[key];
          }
        }
      }
      return dataset.ALL;
    }
  }
}
</script>

<style lang="less" scoped>
* {
  line-height: 1.33;
}
h4,
.label {
  font-size: 12px;
  font-weight: 600;
  color: #262626;
  text-align: left;
  padding-right: 10px;
}
.flex-row {
  display: flex;
  justify-content: space-between;
}
.number {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.85);
}

.map {
  width: 356px;
  margin-right: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .controls {
    display: flex;
    width: 400px;
    .el-radio-group {
      .el-radio-button {
        /deep/ span {
          padding: 7px 10px !important;
        }
      }
    }
  }
}
.grid {
  width: 406px;
  padding-left: 20px;

  .el-col {
    width: 192px;
    height: 143px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.14);
    margin: 0 10px 10px 0;
    padding: 10px;
  }
}
</style>

