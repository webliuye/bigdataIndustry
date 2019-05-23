<template>
  <div>
    <div class="header">
      <div class="right">
        <div>
          <p class="til">本期得分</p>
          <p class="ct">
            <span class="fi">{{scroes[row.level]}}</span>
            <span class="se">分</span>
          </p>
          <p class="bt">
            <el-popover
              placement="right"
              width="300"
              trigger="hover"
            >
              <Card type="info"></Card>
              <el-button
                type="text"
                slot="reference"
              >资源要素应用情况</el-button>
            </el-popover>
          </p>
        </div>
        <div class="borderd"></div>
        <div>
          <p class="til">评价等级</p>
          <p class="ct">
            <span class="fi">{{row.level}}</span>
            <span class="se">级</span>
          </p>
          <p class="bt">
            <el-popover
              placement="right"
              width="300"
              trigger="hover"
            >
              <Card type="type"></Card>
              <el-button
                type="text"
                slot="reference"
              >企业级别分类</el-button>
            </el-popover>
          </p>
        </div>
      </div>
      <div class="left">
        <div class="title">
          <img
            src="@/assets/img/comp.svg"
            alt=""
          >
          &nbsp;<span>企业名称：</span>{{row.comp_name}}
        </div>
        <div class="info">
          <div class="lf">
            <p>评价部门：<span>经信部门</span></p>
            <p>评价时间：<span>{{row.createTime}}</span></p>
            <p>本行业A级企业数：<span>187</span></p>
            <div
              class="desc"
              v-if="row.last_days"
            >
              备注：请于<span>{{row.last_days}}</span>个工作日内确认！
            </div>
          </div>
          <div class="rt">
            <p>评价年度：<span>{{row.year}}年度</span></p>
            <p>行业排名：<span>第{{row.order}}名</span></p>
            <p>上期评级：<span>B</span></p>
          </div>
        </div>

      </div>
    </div>
    <div class="c-score">
      <h4>本期评价得分</h4>
      <div class="s-con">
        <div
          class="left"
          id="opc"
        >
          <p></p>
          <p style="margin-top: 12px;">亩均税收(万元/亩)：</p>
          <p>人均产值(万元)：</p>
          <p>R&D经费支出占比：</p>
          <p>单位产值能耗(吨标煤/万元)：</p>
        </div>
        <div class="right">
          <p
            class="t-h"
            id="opc"
          >
            <span>企业本次值</span>
            <span>全市平均值</span>
            <span>单项得分</span>
          </p>
          <p style="margin-top: 12px;">
            <span>{{row.area_tax}}</span>
            <span>75</span>
            <span>{{scroes[row.level]}}</span>
          </p>
          <p>
            <span>{{row.staff_val}}</span>
            <span>70</span>
            <span>{{scroes[row.level]}}</span>
          </p>
          <p>
            <span>{{row.rd_p}}</span>
            <span>2.63</span>
            <span>{{scroes[row.level]}}</span>
          </p>
          <p>
            <span>{{row.u_mei}}</span>
            <span>0.33</span>
            <span>{{scroes[row.level]}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="c-info">
      <h4>评价综合信息</h4>
      <div class="i-con">
        <div class="left">
          <div
            class="lf"
            id="opc"
          >
            <p>
              用地面积（亩）:
            </p>
            <p>
              纳税贡献情况（万元）:
            </p>
            <p>
              工业增加值（万元）:
            </p>
            <p>
              用电量（万/千瓦时）:
            </p>
            <p>
              开发经费支出（万元）:
            </p>
          </div>
          <div
            class="rt"
            style="border-right:none;"
          >
            <p>{{row.area}}</p>
            <p>{{row.tax}}</p>
            <p>10245</p>
            <p>6345</p>
            <p>41545</p>
          </div>
        </div>
        <div class="right">
          <div
            class="lf"
            id="opc"
          >
            <p>工业总产值（万元）:</p>
            <p>年平均职工人数（人）:</p>
            <p>
              主营业务收入（万元）:
            </p>
            <p>
              综合能耗（吨标煤）:
            </p>
            <p>排污量（吨）:</p>
          </div>
          <div class="rt">
            <p>{{row.total_value}}</p>
            <p>680</p>
            <p>110000</p>
            <p>2132</p>
            <p>12312</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="c-fb"
      v-if="(row.eval_status === '反馈待审核' || row.eval_status === '反馈已退回' || row.eval_status === '已确认') && row.fd_back"
    >
      <h4>异议反馈</h4>
      <div class="fb-con">
        <div class="item">
          <p class="left">
            是否异议反馈：
          </p>
          <p class="right">
            <el-radio-group
              :disabled="true"
              v-model="isFb"
            >
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </p>
        </div>
        <div class="item">
          <p class="left">
            异议反馈类型：
          </p>
          <p class="right">
            <el-radio-group
              :disabled="true"
              v-model="fb_type"
            >
              <el-radio :label="'err'">评价数值错误</el-radio>
              <el-radio :label="'uniq'">特殊情况</el-radio>
            </el-radio-group>
          </p>
        </div>

        <div class="item">
          <p class="left">
            异议反馈备注：
          </p>
          <p class="right">
            <el-input
              type="textarea"
              :disabled="true"
              rows="4"
              v-model="fb_desc"
            ></el-input>
          </p>
        </div>
        <div
          class="item"
          style="line-height: 90px;"
        >
          <p
            class="left"
            style="line-height: 90px;"
          >
            附件上传：
          </p>
          <p
            class="right"
            style="line-height: 90px;"
          >
            <el-button>
              <i class="el-icon-upload"></i>
              点击上传
            </el-button>
            <span>文件大小不能超过10M</span>
            <input
              type="file"
              class="hiddenfile"
            />
          </p>
        </div>
      </div>
    </div>
    <div
      class="c-fb"
      v-if="row.eval_status === '反馈待审核' || row.eval_status === '反馈已退回'"
    >
      <h4>审核意见</h4>
      <div class="fb-con">
        <div class="item">
          <p class="left">
            审核意见：
          </p>
          <p class="right">
            <el-radio-group
              :disabled="disabledFBAu"
              v-model="isTrueth"
            >
              <el-radio :label="true">同意</el-radio>
              <el-radio :label="false">不同意</el-radio>
            </el-radio-group>
          </p>
        </div>
        <div class="item">
          <p class="left">
            评价结果：
          </p>
          <p class="right">
            <el-radio-group
              :disabled="disabledFBAu || !isTrueth"
              v-model="level"
            >
              <el-radio label="A">A档</el-radio>
              <el-radio label="B">B档</el-radio>
              <el-radio label="C">C档</el-radio>
              <el-radio label="D">D档</el-radio>
            </el-radio-group>
          </p>
        </div>

        <div class="item">
          <p class="left">
            审核意见：
          </p>
          <p class="right">
            <el-input
              type="textarea"
              :disabled="disabledFBAu || !isTrueth"
              rows="4"
              v-model="aduit_desc"
            ></el-input>
          </p>
        </div>
        <div
          class="item"
          style="line-height: 90px;"
        >
          <p
            class="left"
            style="line-height: 90px;"
          >
            附件上传：
          </p>
          <p
            class="right"
            style="line-height: 90px;"
          >
            <el-button>
              <i class="el-icon-upload"></i>
              点击上传
            </el-button>
            <span>文件大小不能超过10M</span>
            <input
              type="file"
              class="hiddenfile"
            />
          </p>
        </div>
      </div>
    </div>
    <div style="float: left;width: 100%;text-align:right;margin-top:24px;height:60px;">
      <el-button
        type="primary"
        v-if="row.eval_status === '未告知' || row.eval_status === '反馈待审核'"
        @click="handleNotice"
      >发送
      </el-button>
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import Card from './Card'
import eval_db from '@/utils/eval.js'
export default {
  components: { Card },
  props: {
    row: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      isFb: true,
      fb_type: 'err',
      fb_desc: '',
      isTrueth: true,
      level: 'A',
      aduit_desc: '',
      scroes: {
        A: '93',
        B: '75',
        C: '55',
        D: '30'
      },
      disabledFBAu: false
    }
  },
  created () {
    if (this.row.fd_back) {
      this.isFb = this.row.fd_back.isFb || true
      this.fb_type = this.row.fd_back.fb_type || 'err'
      this.fb_desc = this.row.fd_back.fb_desc || ''
    }
    if (this.row.audiData) {
      this.isTrueth = this.row.audiData.isTrueth
      this.level = this.row.audiData.level
      this.aduit_desc = this.row.audiData.aduit_desc
      this.disabledFBAu = true
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    handleNotice () {
      if (this.row.eval_status === '未告知') {
        this.$parent.handleNotice(this.row)
      } else {
        // 查出数据
        // 修改数据
        // 状态变更为，审核通过 则改为已告知 || 
        //反馈已退回  状态完，存储 审核不通过数据，之后不可修改
        var list = eval_db.get('list').value()
        if (this.isTrueth) { // 通过
          list.forEach(e => {
            if (e.id === this.row.id) {
              e.eval_status = '已告知'
              e.fd_back = null
              e.level = this.level
            }
          })
        } else { // 驳回
          list.forEach(e => {
            if (e.id === this.row.id) {
              e.eval_status = '反馈已退回'
              e.level = this.level
              e.audiData = {
                isTrueth: false,
                level: this.level,
                aduit_desc: this.aduit_desc,
              }
            }
          })
        }
        eval_db.set('list', list).write()
      }
      this.back()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.header {
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
  .right {
    width: 410px;
    height: 220px;
    float: right;
    > div {
      width: 200px;
      height: 220px;
      float: right;
      > p {
        text-align: center;
      }
      .til {
        color: rgba(0, 0, 0, 0.45);
        line-height: 50px;
      }
      .ct {
        line-height: 100px;
        .fi {
          font-family: DINAlternate-Bold;
          font-size: 50px;
          color: #f04864;
          line-height: 50px;
        }
        .se {
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: rgba(240, 72, 100, 0.85);
          line-height: 50px;
        }
      }
      .bt {
        color: rgba(89, 89, 89, 1);
        line-height: 50px;
      }
    }
    .borderd {
      width: 1px;
      height: 200px;
      margin-top: 10px;
      background: #e8e8e8;
    }
  }
  .left {
    width: 100%;
    padding-right: 410px;
    height: 220px;
    .title {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 40px;
      img {
        vertical-align: middle;
      }
      span {
        font-size: 20px;
        font-weight: 700;
      }
    }
    .info {
      width: 500px;
      height: 140px;
      .lf {
        padding-left: 36px;
        float: left;
        width: 250px;
        height: 180px;
      }
      .desc {
        line-height: 50px;
        span {
          color: #f04864;
        }
      }
      .rt {
        padding-left: 60px;
        float: left;
        width: 250px;
        height: 140px;
      }
      p {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 32px;
        span {
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
  }
}
.c-score {
  width: 100%;
  height: 342px;
  border-bottom: 1px solid #e8e8e8;
  h4 {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 60px;
  }
  .s-con {
    width: calc(100% - 120px);
    margin: 0 60px;
    height: 248px;
    margin-left: 50%;
    transform: translate(-50%, 0);
    .left {
      width: 220px;
      height: 100%;
      float: left;
      box-sizing: border-box;
      border: 1px solid #d7d8d9;
      p {
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: right;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .right {
      width: 100%;
      padding-left: 220px;
      box-sizing: border-box;
      height: 100%;
      border: 1px solid #d7d8d9;
      p {
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: right;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        span {
          display: inline-block;
          width: 33%;
          height: 100%;
          text-align: center;
        }
      }
      .t-h {
        border-bottom: 1px solid #d7d8d9;
        span {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }
}
.c-info {
  width: 100%;
  height: 340px;
  border-bottom: 1px solid #e8e8e8;
  h4 {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 60px;
  }
  .i-con {
    width: calc(100% - 120px);
    margin: 0 60px;
    height: 250px;
    .right {
      width: 50%;
      height: 100%;
      float: left;
    }
    .left {
      width: 50%;
      height: 100%;
      float: left;
    }
    .lf {
      width: 200px;
      height: 100%;
      border: 1px solid #d7d8d9;
      float: left;
      padding: 12px;
      text-align: right;
    }
    .rt {
      width: 100%;
      height: 100%;
      border: 1px solid #d7d8d9;
      padding: 12px;
      padding-left: 200px;
      text-align: left;
    }
    p {
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-family: PingFangSC-Regular;
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
.c-fb {
  float: left;
  width: 100%;
  height: auto;
  min-height: 400px;
  border-bottom: 1px solid #e8e8e8;
  h4 {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 60px;
  }
  .fb-con {
    width: calc(100% - 120px);
    margin: 0 60px;
    .item {
      width: 100%;
      min-height: 50px;
      height: auto;
      float: left;
      p.left {
        width: 120px;
        min-height: 50px;
        line-height: 48px;
        float: left;
        text-align: right;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        text-align: right;
      }
      p.right {
        width: 600px;
        padding-left: 24px;
        min-height: 50px;
        line-height: 48px;
        float: left;
        position: relative;
        > span {
          position: absolute;
          bottom: -30px;
          left: 24px;
        }
      }
      .hiddenfile {
        position: absolute;
        cursor: pointer;
        opacity: 0;
        width: 200px;
        line-height: 90px;
        top: 0;
        left: 0;
      }
    }
  }
}
#opc {
  background: #fcfcfc;
}
</style>