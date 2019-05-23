
<template>
  <div
    class="main scrollBar"
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
              产行业：
            </span>
            <el-select
              v-model="params.industry"
              placeholder="请选择产、行业"
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
              状态：
            </span>
            <el-select
              v-model="params.comfirm_status"
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
        <el-col :span="24">
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
        :header-row-style="{
          fontFamily: 'PingFangSC-Medium',
          fontSize: '14px',
          color:'rgba(0, 0, 0, 0.85)',
          lineHeight: '22px',
          background: '#fafafa',
          borderRadius: '4px 4px 0px 0px'
        }"
        :height="tableHeight"
        style="width: 100%"
      >
        <el-table-column
          prop="eval_name"
          label="名称"
          min-width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div>
              {{ `${scope.row.year}年度企业综合评价`}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="comfirm_status"
          label="状态"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div :style=" `color:${states[status[scope.row.eval_status]]};font-weight:bold;`">
              <img
                :src="imgurls[scope.row.eval_status]"
                alt=""
              >
              {{status[scope.row.eval_status]}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="comp_name"
          label="企业名称"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="year"
          label="年度"
          min-width="60"
        >
        </el-table-column>
        <el-table-column
          prop="organ"
          label="评级机构"
          min-width="100"
          show-overflow-tooltip
        >
          <template>
            经济运行处
          </template>
        </el-table-column>
        <el-table-column
          prop="send_time"
          label="确认单到达日期"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="反馈截止日期"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="last_days"
          label="剩余天数"
          min-width="70"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          mmin-width="80"
        >
          <template slot-scope="scope">
            <div class="oper-btn">
              <img
                src="../../../../assets/img/preview.svg"
                @click="handleClick(scope.row)"
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
          label-width="120px"
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
            ></el-input>天
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
        >
          <el-button
            type="primary"
            @click="centerDialogVisible = false"
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
      @back="handleBack"
      :row="currentRow"
    ></NoticeDetail>
  </div>
</template>

<script>
import NoticeDetail from './component/NoticeDetail'
import eval_db from '@/utils/eval.js'
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
      params: {
        local: '中关村示范区顺义园'
      },
      confirm_states: ['全部', '待确认', '已确认', '已反馈'],
      states: {
        '全部': 'black',
        '已确认': 'rgba(1,130,1,1)',
        '已反馈': '#108EE9',
        '待确认': 'rgba(255,87,82,1)',
      },
      status: {
        '已告知': '待确认',
        '反馈已退回': '待确认',
        '反馈待审核': '已反馈',
        '已确认': '已确认',
      },
      stateTOstatus: {
        '待确认': '已告知',
        '已反馈': '反馈待审核',
        '已确认': '已确认',
      },
      imgurls: { '已告知': getUrl('red'), '已确认': getUrl('green'), '反馈已退回': getUrl('red'), '反馈待审核': getUrl('blue') },
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
      list: null,
      currentRow: null
    }
  },
  computed: {
    last_days () {
      if (this.formConfirm.end_time && this.formConfirm.send_time) {
        return (this.formConfirm.end_time - this.formConfirm.send_time) / 24 / 60 / 60 / 1000
      } else {
        return ''
      }
    },
    tableHeight () {
      return document.body.clientHeight - 346
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.list = eval_db.get('list').value().filter(e => {
        return (e.local === '中关村示范区顺义园' && e.eval_status !== '未告知')
      })
      this.tableData = this.list
      this.filterData()
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

    },
    handleClick (row) {
      this.isDetail = true
      this.currentRow = row

    },
    resetParams () {
      this.params = {}
      this.init()
    },
    handleBack () {
      this.isDetail = false
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: calc(100% - 46px);
  height: calc(100% - 50px);
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
</style>
