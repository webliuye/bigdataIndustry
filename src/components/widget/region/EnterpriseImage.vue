<template>
  <div class="main scrollBar">
    <el-card class="header">
      <div class="left">
        <div class="title">
          北京长城华冠汽车科技股份有限公司
          <ul class="tags">
            <li class="icon-blue">
              <i></i>
              A类企业
            </li>
            <li class="icon-red">
              <i></i>
              高精尖企业
            </li>
            <li class="icon-green">
              <i></i>
              智能新能源汽车产业
            </li>
            <li class="icon-yellow">
              <i></i>
              高新技术企业
            </li>
          </ul>
        </div>
        <ul class="flex-row">
          <li>
            <b class="label">企业法人</b>
            <span>陆群</span>
          </li>
          <li>
            <b class="label">注册资本</b>
            <span>61333.36万人民币</span>
          </li>
          <li>
            <b class="label">企业地址</b>
            <span>北京市顺义区仁和镇时骏北街1号院4栋(科技创新功能区)附近公司</span>
          </li>
        </ul>
      </div>
    </el-card>

    <el-row :gutter="20">
      <el-col :span="14">
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span>综合指标</span>
          </div>

          <el-table
            :data="tableData"
            style="width: 100%"
            class="c-table-main"
          >
            <el-table-column
              prop="indicator"
              label="指标"
              width="160"
            >
            </el-table-column>
            <el-table-column
              prop="currentYear"
              label="本年"
            >
            </el-table-column>
            <el-table-column
              prop="previousYear"
              label="同比去年"
            >
            </el-table-column>
            <el-table-column
              prop="bizAvg"
              label="行业均值"
            >
            </el-table-column>
            <el-table-column
              prop="unitAvg"
              label="亩均值"
            >
            </el-table-column>
          </el-table>
          <div class="grid-wrapper">
            <div class="grid">
              <div class="grid-item">
                <span class="title">实际使用面积(亩)</span>
                <span class="bar"></span>
                <span class="number">823</span>
              </div>
              <div class="grid-item">
                <span class="title">税收实际贡献(万元)</span>
                <span class="bar"></span>
                <span class="number">3378</span>
              </div>
              <div
                class="grid-item"
                style="border:none;"
              >
                <span class="title">主营业务收入(万元)</span>
                <span class="bar"></span>
                <span class="number">865000</span>
              </div>
            </div>
            <div class="spit"></div>
            <div class="grid">
              <div class="grid-item">
                <span class="title">年平均人工数(人/年)</span>
                <span class="bar"></span>
                <span class="number">4223</span>
              </div>
              <div class="grid-item">
                <span class="title">排污量(吨)</span>
                <span class="bar"></span>
                <span class="number">278</span>
              </div>
              <div
                class="grid-item"
                style="border:none;"
              >
                <span class="title">综合能耗(吨标煤)</span>
                <span class="bar"></span>
                <span class="number">4265</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="consx">
          <div
            slot="header"
            class="clearfix"
          >
            <span>企业画像</span>
          </div>
          <!-- <div
            ref="wordCloud"
            class="word-cloud"
            style="height: 240px;"
          ></div> -->
          <WordCloud
            style="height:270px;"
            v-if="list"
            :list="list"
          ></WordCloud>
        </el-card>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span>股权关系</span>
          </div>
          <stock-graph />
        </el-card>
      </el-col>
    </el-row>
    <el-card class="c-info">
      <div
        slot="header"
        class="clearfix"
      >
        <span>工商登记信息</span>
      </div>
      <div class="i-con">
        <div class="left">
          <div class="lf">
            <p>
              企业名称
            </p>
            <p>
              注册资本
            </p>
            <p>
              经营状态
            </p>
            <p>
              统一社会信用代码
            </p>
            <p>
              纳税人识别号
            </p>
            <p>
              营业期限
            </p>
            <p>
              纳税人资质
            </p>
            <p>
              实缴资本
            </p>
            <p>
              参保人数
            </p>
            <p>
              曾用名
            </p>
            <p>
              注册地址
            </p>
            <p>
              经营范围
            </p>
          </div>
        </div>
        <div
          class="right"
          style="height: 463px;"
        >
          <div class="rt">
            <p
              v-for="(col, idx) in columnLeft"
              :key="idx"
              :title="col"
            >
              {{col}}
            </p>
          </div>
          <div class="lf">
            <p>所属园区</p>
            <p>成立日期</p>
            <p>工商注册号</p>
            <p>组织机构代码</p>
            <p>公司类型</p>
            <p>行业</p>
            <p>核准日期</p>
            <p>人员规模</p>
            <p>登记机关</p>
            <p>英文名称</p>
          </div>
          <div class="rt">
            <p
              v-for="(col, idx) in columnRight"
              :key="idx"
              :title="col"
            >
              {{col}}
            </p>
          </div>
        </div>
        <div
          class="right"
          style="height: 90px;border-top:1px solid #d7d8d9; padding: 0 36px;"
        >
          <p
            v-for="(col, idx) in columnBo"
            :key="idx"
            :title="col"
          >
            {{col}}
          </p>
        </div>

      </div>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>专利信息</span>
      </div>
      <el-table
        :data="patentData"
        border
        class="c-table-main"
        style="width: calc(100% - 120px); margin: 0 auto"
      >
        <el-table-column
          width="120"
          label="序号"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="申请公布日"
          prop="date"
        >
        </el-table-column>
        <el-table-column
          label="专利名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="申请号"
          prop="sqh"
        >
        </el-table-column>
        <el-table-column
          label="申请公布号"
          prop="gbh"
        >
        </el-table-column>
        <el-table-column
          label="专利类型"
          prop="type"
        >
        </el-table-column>
        <el-table-column
          width="120"
          label="操作"
          prop="op"
        >
        </el-table-column>
      </el-table>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>软件著作权</span>
      </div>
      <el-table
        :data="softData"
        border
        class="c-table-main"
        style="width: calc(100% - 120px); margin: 0 auto"
      >
        <el-table-column
          width="120"
          label="序号"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="批准日期"
          prop="date"
        >
        </el-table-column>
        <el-table-column
          label="软件全称"
          prop="name"
        >
        </el-table-column>
        <el-table-column
          label="登记号"
          prop="djh"
        >
        </el-table-column>
        <el-table-column
          label="分类号"
          prop="flh"
        >
        </el-table-column>
        <el-table-column
          label="版本号"
          prop="version"
        >
        </el-table-column>
        <el-table-column
          width="120"
          label="操作"
          prop="op"
        >
        </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import bus from '@/components/common/bus';
import { SET_BREADCRUMBS } from '@/utils/constants';
import WordCloud from './WordCloud';
import StockGraph from './StockGraph';

export default {
  components: {
    WordCloud,
    StockGraph
  },
  data () {
    return {
      patentData: [
        {
          id: '1',
          date: '2019-04-23',
          name: '壳体定位装置',
          sqh: 'CN201820874882.8',
          gbh: 'CN208773367U',
          type: '-',
          op: '操作'
        },
        {
          id: '2',
          date: '2019-04-23',
          name: '电池管理单元安装支架',
          sqh: 'CN201820989634.8',
          gbh: 'CN208774685U',
          type: '-',
          op: '操作'
        },
        {
          id: '3',
          date: '2019-04-23',
          name: '后围横梁连接支架及车辆',
          sqh: 'CN201820745115.7',
          gbh: 'CN208774885U',
          type: '-',
          op: '操作'
        },
        {
          id: '4',
          date: '2019-04-23',
          name: '锁螺钉机夹具',
          sqh: 'CN201820907144.9',
          gbh: 'CN208773405U',
          type: '-',
          op: '操作'
        },
        {
          id: '5',
          date: '2019-04-23',
          name: '车辆障碍物的提醒方法、系统及车辆',
          sqh: 'CN201710949815.8',
          gbh: 'CN109664892A',
          type: '-',
          op: '操作'
        },
      ],
      softData: [
        {
          id: '1',
          date: '2019-09-09',
          name: '锂离子单体电池温度采集及高温预警系统',
          djh: '2016SR255509',
          flh: '10100-0000',
          version: 'V3.1',
          op: '操作'
        },
        {
          id: '2',
          date: '2019-09-09',
          name: '电池管理系统SOC算法软件',
          djh: '2016SR255472',
          flh: '10100-0000',
          version: 'V1.0',
          op: '操作'
        },
        {
          id: '3',
          date: '2019-09-09',
          name: '电动汽车热管理控制软件',
          djh: '2016SR255496',
          flh: '10100-0000',
          version: 'V1.0',
          op: '操作'
        },
        {
          id: '4',
          date: '2019-09-09',
          name: '一种电池管理系统的休眠算法软件',
          djh: '2016SR255444',
          flh: '10100-0000',
          version: 'V1.0',
          op: '操作'
        },
        {
          id: '5',
          date: '2019-09-09',
          name: '冷却液温度调节及各测试点温度采集系统',
          djh: '2016SR255512',
          flh: '10100-0000',
          version: 'V2.1',
          op: '操作'
        }
      ],
      list: null,
      tableData: [
        {
          "indicator": "亩均税收(万元)",
          "currentYear": "99",
          "previousYear": "78.3",
          "bizAvg": "78.55",
          "unitAvg": "12.3"
        },
        {
          "indicator": "人均产值(万元)",
          "currentYear": "160.6",
          "previousYear": "135.4",
          "bizAvg": "158.39",
          "unitAvg": "160.6"
        },
        {
          "indicator": "单位产值能耗(吨标煤/万元)",
          "currentYear": "0.1",
          "previousYear": "0.08",
          "bizAvg": "0.12",
          "unitAvg": "0.1"
        },
        {
          "indicator": "R&D经费支出占比(%)",
          "currentYear": "3.5",
          "previousYear": "5",
          "bizAvg": "4.6",
          "unitAvg": "3.6"
        }
      ],
      columnLeft: [
        "北京长城华冠汽车科技股份有限公司",
        "75376.76万人民币",
        "在业",
        "91110113599641305P",
        "91110113599641305P",
        "2012-07-09至无固定期限",
        "-",
        "61333.36万人民币",
        "659",
        "北京长城华冠汽车科技有限公司"
      ],
      columnBo: [
        "北京市顺义区仁和镇时骏北街1号院4栋(科技创新功能区)附近公司",
        "汽车技术开发、技术转让、技术咨询、技术服务。（企业依法自主选择经营项目，开展经营活动；依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动；不得从事本市产业政策禁止和限制类项目的经营活动。）"
      ],
      columnRight: [
        "中关村科技园区顺义园	",
        "2012/7/9",
        "110113015075157",
        "599641305",
        "股份有限公司(非上市、自然人投资或控股)",
        "科技推广和应用服务业	",
        "2019/4/11",
        "500-999人",
        "北京市工商行政管理局顺义分局",
        "CH-AUTO Technology Co.,Ltd."
      ]
    }
  },
  created () {
    bus.$emit(SET_BREADCRUMBS, [
      { title: '区域洞察' },
      { title: '企业综合查询', event: 'back-region-query' },
      { title: '企业画像' }
    ])
  },
  destroyed () {
    bus.$emit(SET_BREADCRUMBS, [
      { title: '区域洞察' },
      { title: '企业综合查询' }
    ])
  },
  mounted () {
    // this.initWordCloud();
    this.list = [
      {
        "tag": "北京长城华冠汽车科技股份有限公司",
        "count": "1765836"
      }, {
        "tag": "A类企业",
        "count": "6688201"
      }, {
        "tag": "智能新能源汽车产业",
        "count": "5517355"
      }, {
        "tag": "0.101吨标煤/万元",
        "count": "1287691"
      }, {
        "tag": "全年税收",
        "count": "1263961"
      }, {
        "tag": "营业收入",
        "count": "1174721"
      }, {
        "tag": "用地面积 76亩",
        "count": "1116761"
      }, {
        "tag": "亩均税收 99万元",
        "count": "949831"
      }, {
        "tag": "用工人数 680",
        "count": "1056791"
      }, {
        "tag": "北京市顺义区仁和镇",
        "count": "1006012"
      }, {
        "tag": "中关村示范区顺义园",
        "count": "1115912"
      }, {
        "tag": "全年营收",
        "count": "874684"
      }, {
        "tag": "股份有限公司",
        "count": "950916"
      }, {
        "tag": "锁螺钉机夹具",
        "count": "109892"
      }, {
        "tag": "壳体定位装置",
        "count": "99222"
      },
      {
        "tag": " 高新技术企业",
        "count": "7917355"
      },
      {
        "tag": " 高精尖企业",
        "count": "5117355"
      },
      {
        "tag": " 技术转让",
        "count": "1434211"
      },
      {
        "tag": " 汽车技术开发",
        "count": "1344552"
      },
      {
        "tag": " 技术咨询",
        "count": "1134092"
      },
      {
        "tag": "技术服务",
        "count": "1302211"
      },
      {
        "tag": "行业",
        "count": "1744511"
      },
      {
        "tag": "应用服务业",
        "count": "1744511"
      },
      {
        "tag": "科技推广",
        "count": "1744511"
      }
    ];
  },
  methods: {
    initWordCloud () {
      var chart = am4core.create(this.$refs.wordCloud, am4plugins_wordCloud.WordCloud);
      var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
      series.randomness = 0.5;
      series.rotationThreshold = 0.2;
      this.list = series.data = [
        {
          "tag": "北京长城华冠汽车科技股份有限公司",
          "count": "1765836"
        }, {
          "tag": "A类企业",
          "count": "1688220"
        }, {
          "tag": "智能新能源汽车产业",
          "count": "15173550"
        }, {
          "tag": "0.101吨标煤/万元",
          "count": "1287629"
        }, {
          "tag": "110113015075157",
          "count": "1263946"
        }, {
          "tag": "营业收入 201384万元",
          "count": "1174721"
        }, {
          "tag": "用地面积 76亩",
          "count": "1116769"
        }, {
          "tag": "亩均税收 99万元",
          "count": "944983"
        }, {
          "tag": "用工人数 680",
          "count": "805679"
        }, {
          "tag": "北京市顺义区仁和镇时骏北街1号院4栋(科技创新功能区)附近公司",
          "count": "606051"
        }, {
          "tag": "中关村示范区顺义园",
          "count": "1591410"
        }, {
          "tag": "75376.76万人民币",
          "count": "574684"
        }, {
          "tag": "股份有限公司",
          "count": "550916"
        }, {
          "tag": "锁螺钉机夹具",
          "count": "479892"
        }, {
          "tag": "壳体定位装置",
          "count": "343092"
        }
      ];
      series.dataFields.word = "tag";
      series.dataFields.value = "count";
      series.colors = new am4core.ColorSet();
      series.colors.passOptions = {};
      series.fontWeight = "700";
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #fff;
  overflow: auto;
  .el-card {
    margin-bottom: 20px;
  }
}
* {
  box-sizing: border-box;
}
.header {
  width: 100%;
  height: 146px;
  ul {
    list-style-type: none;
    display: flex;

    li {
      margin-right: 20px;
      b.label {
        display: block;
        height: 18px;
        border-left: 2px solid #3aa0ff;
        padding-left: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 18px;
      }
    }

    &.flex-row {
      li {
        margin-right: 60px;
      }
    }
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;

    ul {
      font-size: 14px;
      color: #007aff;
      text-align: left;
      line-height: 22px;
      margin-left: 20px;
    }
  }
  .tags {
    i {
      display: inline-block;
      width: 11px;
      height: 11px;
    }
    .icon-blue {
      color: #007aff;
      i {
        background: center / cover no-repeat
          url(../../../assets/img/tag-blue.svg);
      }
    }
    .icon-red {
      color: #f2637b;
      i {
        background: center / cover no-repeat
          url(../../../assets/img/tag-red.svg);
      }
    }
    .icon-yellow {
      color: #fd8c01;
      i {
        background: center / cover no-repeat
          url(../../../assets/img/tag-yellow.svg);
      }
    }
    .icon-green {
      color: #1bc4c4;
      i {
        background: center / cover no-repeat
          url(../../../assets/img/tag-green.svg);
      }
    }
  }
}
.c-info {
  width: 100%;
  height: 660px;
  border-bottom: 1px solid #d7d8d9;
  h4 {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 60px;
  }
  .i-con {
    position: relative;
    width: calc(100% - 120px);
    margin: 0 60px;
    height: 564px;
    border: 1px solid #d7d8d9;

    .separator {
      position: absolute;
      left: 160px;
      top: 462px;
      width: calc(100% - 200px);
      height: 2;
      border-bottom: 1px solid #d7d8d9;
    }
    .right {
      width: calc(100% - 160px);
      height: 100%;
      float: left;

      .lf {
        border-left: 1px solid #d7d8d9;
      }
    }
    .left {
      width: 160px;
      height: 100%;
      float: left;
    }
    .lf {
      width: 160px;
      height: 100%;
      background: #fbfbfc;
      border-right: 1px solid #d7d8d9;
      float: left;
      padding: 12px;
      text-align: right;
      font-size: 16px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.85);
      float: left;
    }
    .rt {
      width: calc(50% - 80px);
      height: 100%;
      padding: 12px;
      text-align: left;
      float: left;
    }
    p {
      width: 100%;
      height: 45px;
      line-height: 42px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
    }
    .rt {
      p {
        padding: 0 24px;
      }
    }
  }
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  margin-top: 24px;
  .grid {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .grid-item {
      width: 33.3333%;
      height: 5%;
      border-right: 1px solid #e8e8e8;
      text-align: center;
      padding: 24px calc(16.6666% - 70px);
      span {
        display: block;
        &.title {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          text-align: left;
          line-height: 30px;
        }
        &.bar {
          width: 22px;
          height: 4px;
          background-image: linear-gradient(
            -90deg,
            rgba(250, 156, 178, 0.57) 0%,
            #f2637b 100%
          );
        }
        &.number {
          font-size: 30px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 60px;
          text-align: left;
        }
      }
    }
  }
}
.spit {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #e8e8e8;
}
.consx {
  /deep/.el-card__body {
    padding: 0 !important;
  }
}
</style>