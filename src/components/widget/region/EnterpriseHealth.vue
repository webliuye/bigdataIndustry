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

    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>年度同比指标</span>
        <div class="year-indicator">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            class="c-table-main"
          >
            <el-table-column
              prop="indicator"
              label="问题指标"
            >
            </el-table-column>
            <el-table-column
              prop="value"
              label="数值"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="bizAvg"
              label="行业均值"
            >
            </el-table-column>
            <el-table-column
              prop="areaAvg"
              label="区域均值"
            >
            </el-table-column>
            <el-table-column
              prop="lastYearValue"
              label="上年数值"
            >
            </el-table-column>
            <el-table-column
              prop="rose"
              label="同比增长"
            >
            </el-table-column>
          </el-table>
          <div class="grade">
            <h4 style="font-size: 20px">评 级</h4>
            <b class="grade-rect">
              A
            </b>
          </div>
        </div>
      </div>
    </el-card>

    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>总量指标</span>

        <div class="grid-wrapper">
          <div class="grid">
            <div class="grid-item">
              <span class="title">税收实际贡献(万元)</span>
              <span class="bar"></span>
              <span class="number">268223</span>
            </div>
            <div class="grid-item">
              <span class="title">工业增加值(万元)</span>
              <span class="bar"></span>
              <span class="number">839478</span>
            </div>
            <div class="grid-item">
              <span class="title">主营业务收入(万元)</span>
              <span class="bar"></span>
              <span class="number">45%</span>
            </div>
            <div class="grid-item">
              <span class="title">实际使用面积(亩)</span>
              <span class="bar"></span>
              <span class="number">151.2</span>
            </div>
          </div>
          <div class="spit"></div>
          <div class="grid">
            <div class="grid-item">
              <span class="title">年平均职工人数(人)</span>
              <span class="bar"></span>
              <span class="number">3118</span>
            </div>
            <div class="grid-item">
              <span class="title">研发经费支出(万元)</span>
              <span class="bar"></span>
              <span class="number">32295</span>
            </div>
            <div class="grid-item">
              <span class="title">排污量(吨)</span>
              <span class="bar"></span>
              <span class="number">17.85</span>
            </div>
            <div class="grid-item">
              <span class="title">综合能耗(吨标煤)</span>
              <span class="bar"></span>
              <span class="number">130</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import bus from '@/components/common/bus';
import { SET_BREADCRUMBS } from '@/utils/constants';

export default {
  data () {
    return {
      tableData: [
        {
          "indicator": "亩均税收（万元/亩）",
          "value": "176.4",
          "bizAvg": "48.6",
          "areaAvg": "36.1",
          "lastYearValue": "189.2",
          "rose": "-6.77%"
        },
        {
          "indicator": "研发经费支出占比（%）",
          "value": "0.84",
          "bizAvg": "3.91",
          "areaAvg": "1.88",
          "lastYearValue": "0",
          "rose": "0.84%"
        },
        {
          "indicator": "人均产值（万元）",
          "value": "26.3",
          "bizAvg": "22.7",
          "areaAvg": "29.8",
          "lastYearValue": "25.9",
          "rose": "1.94%"
        },
        {
          "indicator": "单位能耗增加值（万元/吨标煤）",
          "value": "6",
          "bizAvg": "5.1",
          "areaAvg": "1.2",
          "lastYearValue": "5.78",
          "rose": "3.63%"
        }
      ]
    }
  },
  created () {
    bus.$emit(SET_BREADCRUMBS, [
      { title: '区域洞察' },
      { title: '企业综合查询', event: 'back-region-query' },
      { title: '企业体检' }
    ])
  },
  destroyed () {
    bus.$emit(SET_BREADCRUMBS, [
      { title: '区域洞察' },
      { title: '企业综合查询' }
    ])
  },
  methods: {
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
.year-indicator {
  display: flex;
  .el-table {
    width: 64.9%;
  }
  .grade {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 13.7%;

    h4 {
      font-size: 16px;
      line-height: 1.33;
      margin-bottom: 20px;
    }

    .grade-rect {
      color: #fff;
      width: 80px;
      height: 80px;
      line-height: 80px;
      background: #f2637b;
      border-radius: 4px;
      font-size: 50px;
      text-align: center;
    }
  }
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
      color: #007AFF;
      i {
        background: center / cover no-repeat url(../../../assets/img/tag-blue.svg);
      }
    }
    .icon-red {
      color: #F2637B;
      i {
        background: center / cover no-repeat url(../../../assets/img/tag-red.svg);
      }
    }
    .icon-yellow{
      color: #FD8C01;
      i {
        background: center / cover no-repeat url(../../../assets/img/tag-yellow.svg);
      }
    }
    .icon-green {
      color: #1BC4C4;
      i {
        background: center / cover no-repeat url(../../../assets/img/tag-green.svg);
      }
    }
  }
}
.c-info {
  width: 100%;
  height: 680px;
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
    height: 556px;
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
      width: 50%;
      height: 100%;
      float: left;

      .lf {
        border-left: 1px solid #d7d8d9;
      }
    }
    .left {
      width: 50%;
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
    }
    .rt {
      width: 100%;
      height: 100%;

      padding: 12px;
      padding-left: 160px;
      text-align: left;
    }
    p {
      width: 100%;
      height: 45px;
      line-height: 42px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
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
  margin-bottom: 20px;
  .grid {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .grid-item {
      width: 25%;
      height: 10%;
      padding: 20px 7.5%;
      border-right: 1px solid #e8e8e8;

      &:last-child {
        border-right: none;
      }

      span {
        display: block;
        &.title {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          text-align: left;
          line-height: 28px;
          word-break: keep-all;
          white-space: nowrap;
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
</style>