
<template>
  <div
    class="main"
    v-if="!isDetail"
  >
    <div class="search-bar">
      <el-row
        type="flex"
        class="row-bg"
        justify="space-between"
        :gutter="24"
      >
        <el-col :span="8">
          <div class="grid-content bg-purple">
            企业名称：
            <el-input v-model="params.comp_name"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            所属地区：
            <el-select
              v-model="params.local"
              placeholder="请选择所属地区"
            >
              <el-option
                v-for="item in locals"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span class="input_label">
              所属行业：
            </span>
            <el-select
              v-model="params.industry"
              placeholder="请选择产/行业"
            >
              <el-option
                v-for="item in industrys"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      &nbsp;
      <el-row
        type="flex"
        class="row-bg"
        justify="space-between"
        :gutter="24"
      >
        <el-col :span="8">
          <div class="grid-content bg-purple">
            评价年度：
            <el-select
              v-model="params.year"
              placeholder="请选择年度"
            >
              <el-option
                v-for="item in years"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            评价级别：
            <el-select
              v-model="params.level"
              placeholder="请选择级别"
            >
              <el-option
                v-for="item in Object.keys(levels)"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">

            <span class="input_label">
              确认单状态：
            </span>
            <el-select
              v-model="params.eval_status"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in confirm_states"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    &nbsp;
    <div>
      <el-row
        type="flex"
        class="row-bg"
        justify="space-between"
      >
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button
              type="warning"
              :disabled="!selectArr ||!selectArr.length"
              @click="handelMNotice"
            >
              <img
                src="../../../../assets/img/batch-notice.svg"
                alt=""
              >
              批量告知
            </el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div
            class="grid-content bg-purple"
            style="text-align: right;"
          >
            <el-button
              type="primary"
              @click="filterData"
            >
              查询
            </el-button>
            <el-button @click="resetParams">
              重置
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="tableData"
        :height="tableHeight"
        :key="c_key"
        style="width: 100%"
        :header-row-style="{
          fontFamily: 'PingFangSC-Medium',
          fontSize: '14px',
          color:'rgba(0, 0, 0, 0.85)',
          lineHeight: '22px',
          background: '#fafafa',
          borderRadius: '4px 4px 0px 0px'
        }"
        :style="`font-size: ${fontSize}px`"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          :selectable="selectable"
          type="selection"
          width="40"
        >
        </el-table-column>
        <el-table-column
          prop="eval_name"
          label="名称"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ `${scope.row.year}年度企业综合评价`}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="eval_status"
          label="确认单状态"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div :style=" `color:${states[scope.row.eval_status]};font-weight:bold;`">
              <img
                :src="imgurls[scope.row.eval_status]"
                alt=""
              >
              {{scope.row.eval_status}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="comp_name"
          label="企业名称"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="industry"
          label="所属行业"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="year"
          label="年度"
          width="60"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="transfer"
          label="动态调整"
          min-width="50"
        >
          <template slot-scope="scope">
            {{scope.row.transfer ? '有': '无'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="send_time"
          label="发送日期"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="截止日期"
          min-width="80"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="last_days"
          label="剩余时间"
          min-width="50"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.last_days> 0">
              {{scope.row.last_days }} 天
            </span>
            <span
              v-else-if="scope.row.last_days<0"
              style="color:#e4393c;"
            >
              已过期
            </span>
            <span v-else>
              {{''}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="评价级别"
          min-width="80"
        >
          <template slot-scope="scope">
            <div :style=" `color:${levels[scope.row.level]}; font-weight:bold;`">
              {{scope.row.level}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <div class="oper-btn">
              <img
                src="../../../../assets/img/edit.svg"
                @click="handleClick(scope.row)"
                title="修改"
                alt=""
              >
              <img
                :class="{'ly-gray' : !selectable(scope.row)}"
                src="../../../../assets/img/notice.svg"
                title="发送通知"
                @click="selectable(scope.row) && handleNotice(scope.row, 'yes')"
                alt=""
              >
              <img
                src="../../../../assets/img/more.svg"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
        title="企业综合评价结果告知单"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-form
          :label-position="labelPosition"
          label-width="140px"
          :model="formConfirm"
        >
          <el-form-item label="告知单发送日期:">
            <el-date-picker
              v-model="formConfirm.send_time"
              type="date"
              placeholder="选择发送日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结果确认截止日期:">
            <el-date-picker
              v-model="formConfirm.end_time"
              type="date"
              placeholder="选择截止日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="确认周期:">
            <el-input
              style="width:60px;"
              v-model="last_days"
            ></el-input>&nbsp;&nbsp;天
          </el-form-item>
          <el-form-item label="备注（选填）:">
            <el-input
              type="textarea"
              v-model="formConfirm.desc"
            ></el-input>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
          style="text-align: right;"
        >
          <el-button
            type="primary"
            @click="handleNote"
          >提交</el-button>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
  <div
    v-else
    class="main"
  >
    <NoticeDetail
      :row="currentRow"
      @back="handBack"
    ></NoticeDetail>
  </div>
</template>

<script>
import NoticeDetail from './component/NoticeDetail'
import eval_db from '@/utils/eval.js'
import { parseTime } from '@/utils/time.js'
const getUrl = (name) => {
  return require('@/assets/img/' + name + '.svg')
}
export default {
  components: { NoticeDetail },
  data () {
    return {
      isDetail: false,
      centerDialogVisible: false,
      labelPosition: 'right',
      formConfirm: {},
      params: {},
      confirm_states: ['全部', '未告知', '已确认', '已告知', '反馈待审核', '反馈已退回'],
      states: {
        '未告知': '#e4393c',
        '已确认': 'rgba(1,130,1,1)',
        '已告知': '#108EE9',
        '反馈待审核': 'rgba(255,87,82,1)',
        '反馈已退回': 'rgba(255,87,82,1)',
      },
      imgurls: { '未告知': getUrl('red'), '已确认': getUrl('green'), '已告知': getUrl('blue'), '已公示': getUrl('green'), '反馈待审核': getUrl('yellow') },
      locals: ['全部', '中关村示范区顺义园', '空港工业开发区', '国门商务区', '中国航信高科技产业园区'],
      years: ['全部', '2019', '2018'],
      industrys: ['全部', '智能新能源汽车产业', '航空航天产业', '生物医药大健康产业', '智能装备'],
      levels: {
        '全部': 'black',
        'A': 'rgba(255,96,96,1)',
        'B': 'rgba(255,190,60,1)',
        'C': 'rgba(37,157,158,1)',
        'D': 'rgba(55,91,175,1)'
      },
      tableData: [],
      selectArr: [],
      list: null,
      currentRow: null,
      c_key: 1
    }
  },
  computed: {
    last_days () {
      if (this.formConfirm.end_time && this.formConfirm.send_time) {
        return parseInt((this.formConfirm.end_time - this.formConfirm.send_time) / 1000 / 60 / 60 / 24)
      } else {
        return ''
      }
    },
    tableHeight () {
      return document.body.clientHeight - 340
    },
    fontSize () {
      return document.body.clientWidth > 1350 ? 14 : 12
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.list = eval_db.get('list').value()
      this.tableData = this.list
      this.list && this.list.forEach(e => {
        if (e.last_days) {
          e.last_days = parseInt((new Date(e.lastTime) - new Date().getTime()) / 1000 / 60 / 60 / 24)
        }
      })
      this.filterData()
    },
    handleSelectionChange (val) {
      this.selectArr = val
    },
    handBack () {
      this.init()
      this.isDetail = false
    },
    selectable (row, index) {
      return row.eval_status === '未告知' ? true : false
    },
    filterData () {

      let arr = {}
      Object.keys(this.params).forEach(key => {
        if (this.params[key] && this.params[key] !== '全部') {
          arr[key] = this.params[key]
        }
      })
      if (!Object.keys(arr).length) {
        this.tableData = this.list
        return
      }

      this.tableData = this.list.filter(row => {
        const bol = Object.keys(arr).some(key => {
          // 名称是  如果是name  row.comp_name 包含
          if (key === 'comp_name') {
            return row[key].indexOf(arr[key]) === -1
          } else {
            return row[key] !== arr[key]
          }
          // 其它 只要不相同则
        })
        return !bol
      })
      this.c_key = 1
    },
    handleClick (row) {
      this.isDetail = true
      this.currentRow = row
    },
    handleNotice (row, type = 'normal') {
      this.centerDialogVisible = true
      this.handType = 's'
      this.selectArr = [row]
      if (type === 'normal') {
        this.formConfirm.send_time = new Date()
        this.formConfirm.end_time = new Date(new Date().getTime() + 30 * 1000 * 24 * 60 * 60)
        this.handleNote()
      }
    },
    handelMNotice () {
      this.centerDialogVisible = true
      this.handType = 'm'
    },
    resetParams () {
      this.params = {}
      this.init()
    },
    handleNote () {
      // 对row进行处理
      // 遍历row
      if (!this.selectArr || !this.selectArr.length) return
      if (!this.formConfirm.send_time || !this.formConfirm.end_time) {
        this.$message.error('您有数据未输入')
        return
      }
      this.selectArr.forEach(e => {
        e.send_time = parseTime(this.formConfirm.send_time)
        e.end_time = parseTime(this.formConfirm.end_time)
        e.last_days = parseInt((this.formConfirm.end_time - new Date()) / 1000 / 60 / 60 / 24)
      })
      const coms = {}
      var list = eval_db.get('list').value()

      this.selectArr.forEach(c => {
        list.forEach(e => {
          if (e.id === c.id) {
            e = c
            e.eval_status = '已告知'
            c.eval_status = '已告知'
            e.lastTime = this.formConfirm.end_time
          }
        })
      })
      eval_db.set('list', list).write()
      this.formConfirm = {}
      this.init()
      this.c_key = 2
      setTimeout(() => {
        this.centerDialogVisible = false
        this.$message.success('通知成功')
        this.selectArr = []
      }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: calc(100% - 48px);
  height: calc(100vh - 174px);
  padding: 24px;
  background: #fff;
  overflow: auto;
}
.search-bar {
  width: 100%;
  height: 100px;
  .el-input,
  .el-select {
    width: calc(100% - 100px);
  }
  .input_label {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
}
/deep/.el-table__body-wrapper {
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
.oper-btn {
  img {
    cursor: pointer;
    padding: 4px;
  }
}
/deep/ .el-dialog__footer {
  text-align: right;
}
</style>
