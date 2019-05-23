<template>
  <el-card>
    <div
      slot="header"
      class="header clearfix"
    >
      <span>园区产值排名情况</span>
    </div>
    <el-row v-show="!isShowCompany">
      <el-col :span="15">
        <div
          ref="chart"
          style="height: 420px; width: 100%; margin-left: -100px; padding-top: 40px;"
        ></div>
      </el-col>
      <el-col :span="9">
        <div
          ref="barChart"
          style="height: 400px; width: 100%;"
        ></div>
      </el-col>
    </el-row>

    <el-row v-show="isShowCompany">
      <el-col :span="24">
        <div
          ref="chartCompany"
          style="height: 420px; padding: 20px; overflow: hidden;"
        ></div>
      </el-col>
    </el-row>

    <el-row style="border-top: 1px solid #E9E9E9; margin: 10px;">
      <el-col :span="24">
        <regional-stat-list />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import spiritedaway from "@amcharts/amcharts4/themes/spiritedaway.js";
import districtShunyi from "@/assets/geojson/shunyi.json";
import RegionalStatList from './RegionalStatList';

const maxZoomLevel = 3;
const hoverColorHex = "#CFC3E9";
const hoverColor = am4core.color(hoverColorHex);


// 企业
const randEnterprise = [
  {
    "id": 1,
    "latitude": 40.06982,
    "longitude": 116.7499,
    "imageURL": "./public/images/company.svg",
    "width": 32,
    "height": 32,
    "label": "F企业"
  }, {
    "id": 2,
    "latitude": 40.15752,
    "longitude": 116.52397,
    "imageURL": "./public/images/company.svg",
    "width": 32,
    "height": 32,
    "label": "A企业"
  }, {
    "id": 3,
    "latitude": 40.19752,
    "longitude": 116.82478,
    "imageURL": "./public/images/company.svg",
    "width": 32,
    "height": 32,
    "label": "B企业"
  }
];

export default {
  components: {
    RegionalStatList
  },
  data () {
    return {
      chart: null,
      barChart: null,
      streets: [],
      enterprises: [],
      isShowCompany: false
    }
  },
  created () {
    this.$axios.get('/mock/dashboard/streets.json')
      .then(res => {
        this.streets = res.data;
        this.listStreets();
        this.loadRankChart();
      })
  },
  mounted () {
    this.loadMapChart();
  },
  methods: {
    listStreets () {
      const chart = this.chart;
      if (chart.series.length > 1) {
        chart.series.pop();
      }

      const streetSeries = chart.series.push(new am4maps.MapImageSeries());
      const streetTemplate = streetSeries.mapImages.template;
      const imageStreet = streetTemplate.createChild(am4core.Image);
      
      imageStreet.propertyFields.href = "imageURL";
      imageStreet.width = 32;
      imageStreet.height = 32;
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
      streetTemplate.tooltipText = "[font-size: 14px; #666]{title}\n企业总数 {enterpriseCount}家\n工业生产总值 {industryTotal}亿元\n工业税收 {acreTax}万元[/]";
      
      const hs = streetTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#FFF");

      streetTemplate.background.fillOpacity = 0;
      streetTemplate.background.fill = am4core.color("#ffffff");
      streetTemplate.setStateOnChildren = true;
      streetTemplate.events.on("hit", this.drillDownMap);
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
        fill: "#EEE",
        fontWeight: 600,
        fontSize: 14
      };
      labelStreet.horizontalCenter = "middle";
      labelStreet.verticalCenter = "top";
      labelStreet.dy = 16;

      streetSeries.data = this.streets;
    },
    listCompany (street) {
      const chart = this.chart;

      if (chart.series.length > 1) {
        chart.series.pop();
      }

      const companySeries = chart.series.push(new am4maps.MapImageSeries());
      const companyTemplate = companySeries.mapImages.template;
      companyTemplate.propertyFields.longitude = "longitude";
      companyTemplate.propertyFields.latitude = "latitude";
      companyTemplate.nonScaling = true;
      companyTemplate.config = {
        cursorOverStyle: [
          {
            "property": "cursor",
            "value": "pointer"
          }
        ]
      };
      companyTemplate.events.on("hit", this.drillDownMap);
      
      const hs = companyTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#FFF");
      companyTemplate.tooltipText = "[font-size: 14px; #666]{title}\n亩均税收  {acreTax}万元\n人均产值  {unitOutput}万元\n工业产值能耗  {unitEnergy}吨标煤/万元\nR&D经费占比  {rdFunds}%\n企业评价  {grade}[/]";
      const imageCompany = companyTemplate.createChild(am4core.Image);
      imageCompany.propertyFields.href = "imageURL";
      imageCompany.width = 32;
      imageCompany.height = 32;
      imageCompany.horizontalCenter = "middle";
      imageCompany.verticalCenter = "middle";

      const labelCompany = companyTemplate.createChild(am4core.Label);
      labelCompany.text = "{title}";
      labelCompany.horizontalCenter = "middle";
      labelCompany.verticalCenter = "top";
      labelCompany.dy = 20;
      labelCompany.config = {
        fill: "#EEE",
        fontWeight: 400,
        fontSize: 12
      };

      for (let ep of this.enterprises) {
        ep.imageURL = "/assets/img/enterprise.svg";
      }
      companySeries.data = street ? this.enterprises : randEnterprise;
    },
    showCompanyDetail (item) {
      this.isShowCompany = true;

      const chart = this.chartCompany;

      if (chart.series.length > 1) {
        chart.series.pop();
      }

      chart.zoomToMapObject(item);
      const companySeries = chart.series.push(new am4maps.MapImageSeries());
      const companyTemplate = companySeries.mapImages.template;
      companyTemplate.propertyFields.longitude = "longitude";
      companyTemplate.propertyFields.latitude = "latitude";
      companyTemplate.nonScaling = true;
      companyTemplate.config = {
        cursorOverStyle: [
          {
            "property": "cursor",
            "value": "pointer"
          }
        ]
      };
      companyTemplate.events.on("hit", this.drillDownMap);
      const hs = companyTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#FFF");
      companyTemplate.tooltipText = "[font-size: 14px; #666]{title}\n亩均税收 {acreTax}万元\n人均产值 {unitOutput}万元\n工业产值能耗 {unitEnergy}吨标煤/万元\nR&D经费占比 {rdFunds}%\n企业评价 {grade}[/]";
      const imageCompany = companyTemplate.createChild(am4core.Image);
      imageCompany.propertyFields.href = "imageURL";
      imageCompany.width = 32;
      imageCompany.height = 32;
      imageCompany.horizontalCenter = "middle";
      imageCompany.verticalCenter = "middle";

      const labelCompany = companyTemplate.createChild(am4core.Label);
      labelCompany.text = "{title}";
      labelCompany.horizontalCenter = "middle";
      labelCompany.verticalCenter = "top";
      labelCompany.dy = 20;
      labelCompany.config = {
        fill: "#EEE",
        fontWeight: 400,
        fontSize: 12
      };

      for (let ep of this.enterprises) {
        ep.imageURL = "/assets/img/enterprise.svg";
      }
      companySeries.data = this.enterprises;
    },
    drillDownMap (event) {
      const chart = this.chart;
      const item = event.target.dataItem.dataContext;
      const { longitude, latitude } = item;

      if (chart.zoomLevel === chart.homeZoomLevel) {
        this.$axios.get('/mock/dashboard/enterprises.json')
          .then(res => {
            this.enterprises = res.data;
            this.listCompany(item);
            this.showCompanyDetail(item);
          })
      }
    },
    onMapZoomChange (event) {
      const chart = this.chart;
      if (chart.zoomLevel === chart.homeZoomLevel) {
        this.listStreets();
      } else {
        // listCompany();
      }
    },
    onMapPolygonClick (event) {
      const chart = this.chart;
      if (chart.zoomLevel !== 1.) {
        chart.goHome();
      }
    },
    onCompanyMapPolygonClick (event) {
      this.chart.goHome();
      this.listStreets();
      this.isShowCompany = false;
    },
    loadMapChart () {
      am4core.useTheme(spiritedaway);

      const chart = am4core.create(this.$refs.chart, am4maps.MapChart);
      this.chart = chart;
      chart.chartContainer.wheelable = false;
      chart.geodata = districtShunyi;
      chart.projection = new am4maps.projections.Miller();
      chart.events.on("zoomlevelchanged", this.onMapZoomChange);
      chart.zoomControl = new am4maps.ZoomControl();
      chart.zoomControl.plusButton.hide();
      chart.zoomControl.minusButton.hide();
      chart.homeZoomLevel = 1.3;
      chart.maxZoomLevel = 3;
      chart.homeGeoPoint = { longitude: 116.653525, latitude: 40.128936 };
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeOpacity = 0.5;
      polygonSeries.events.on("hit", this.onMapPolygonClick);
      const districtHover = polygonSeries.mapPolygons.template.states.create("hover");
      districtHover.properties.fill = hoverColor;
      districtHover.properties.fillOpacity = 0.9;
      districtHover.properties.stroke = hoverColor;
      districtHover.properties.strokeOpacity = 1;
      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.properties.fill = '#0F79C2';
      districtHover.properties.fill = '#429CD2';
      this.listStreets();


      const chartCompany = am4core.create(this.$refs.chartCompany, am4maps.MapChart);
      this.chartCompany = chartCompany;
      chartCompany.chartContainer.wheelable = false;
      chartCompany.geodata = districtShunyi;
      chartCompany.projection = new am4maps.projections.Miller();
      chartCompany.events.on("zoomlevelchanged", this.onMapZoomChange);
      chartCompany.zoomControl = new am4maps.ZoomControl();
      chartCompany.zoomControl.plusButton.hide();
      chartCompany.zoomControl.minusButton.hide();
      chartCompany.homeZoomLevel = 3;
      chartCompany.maxZoomLevel = 5;
      chartCompany.homeGeoPoint = { longitude: 116.653525, latitude: 40.128936 };
      chartCompany.seriesContainer.draggable = false;
      chartCompany.seriesContainer.resizable = false;
      const polygonSeries2 = chartCompany.series.push(new am4maps.MapPolygonSeries());
      polygonSeries2.useGeodata = true;
      polygonSeries2.nonScalingStroke = true;
      polygonSeries2.strokeOpacity = 0.5;
      polygonSeries2.events.on("hit", this.onCompanyMapPolygonClick);
      const districtHover2 = polygonSeries2.mapPolygons.template.states.create("hover");
      districtHover2.properties.fill = hoverColor;
      districtHover2.properties.fillOpacity = 0.9;
      districtHover2.properties.stroke = hoverColor;
      districtHover2.properties.strokeOpacity = 1;
      const polygonTemplate2 = polygonSeries2.mapPolygons.template;
      polygonTemplate2.properties.fill = '#0F79C2';
      districtHover2.properties.fill = '#429CD2';
    },
    loadRankChart () {
      const rankList = this.streets.sort((a, b) => {
        return a.acreTax < b.acreTax ? 1 : -1;
      });
      const yData = [];
      const seriesData = [];
      rankList.forEach(it => {
        yData.unshift(it.title);
        seriesData.unshift(it.acreTax);
      });

      this.barChart = this.$echarts.init(this.$refs.barChart);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: "{b} <br> 亩均税收: {c}万元"
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        "yAxis": [{
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
              color: '#444',
              fontSize: 14,
              fontWeight: 500
            },
            show: true
          },
          "data": yData
        }],
        "xAxis": [{
          name: '',
          type: 'value',
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
            show: false
          },
          "splitArea": {
            "show": false
          },

        }],
        series: [{
          type: 'bar',
          barMaxWidth: 20,
          label: {
            position: 'insideRight',
            normal: {
              show: true,
              fontSize: 14,
              position: 'insideRight',
              padding: [0, 6, 0, 0],
              formatter: function (v) {
                var val = v.data;
                if (val == 0) {
                  return '';
                }
                return val;
              },
              color: '#fff'
            }
          },
          data: seriesData,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                1, 0, 0, 1,
                [
                  { offset: 0, color: '#FA3434 ' },
                  { offset: 1, color: '#F7B95E' }
                ]
              )
            },
            emphasis: {
              color: new this.$echarts.graphic.LinearGradient(
                1, 0, 0, 1,
                [
                  { offset: 0, color: '#FA3434 ' },
                  { offset: 1, color: '#F7B95E' }
                ]
              )
            }
          }
        }]
      };

      this.barChart.setOption(option);
    }
  }
}
</script>
