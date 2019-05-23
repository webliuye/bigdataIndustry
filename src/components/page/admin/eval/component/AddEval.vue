<template>
  <div class="top main">
    <div class="progress">
      <span :class="{'active' : active >= 1}">
        <p v-if="active <= 1">1</p>
        <img
          v-else
          src="@/assets/img/ended.svg"
          style="vertical-align: middle;"
          alt=""
        >
        &nbsp; &nbsp;
        指标设置
      </span>
      <i></i>
      <span :class="{'active' : active >= 2}">
        <p v-if="active <= 2">2</p>
        <img
          v-else
          src="@/assets/img/ended.svg"
          style="vertical-align: middle;"
          alt=""
        >
        &nbsp; &nbsp;
        结果生成
      </span>
      <i></i>
      <span :class="{'active' : active === 3}">
        <p>3</p>
        &nbsp; &nbsp;
        完成
      </span>
    </div>
    <div
      class="content1"
      v-if="active === 1"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        row-class-name="row-cls"
        :header-row-style="{
          fontFamily: 'PingFangSC-Medium',
          fontSize: '14px',
          color:'rgba(0, 0, 0, 0.85)',
          lineHeight: '22px',
          background: '#fafafa',
          borderRadius: '4px 4px 0px 0px'
        }"
        key="first"
      >
        <el-table-column
          prop="type_class"
          label="评分项"
        >
          <template slot-scope="scope">
            <div>
              {{ typeObj[scope.row.type_class] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="average"
          label="平均值"
        >
        </el-table-column>
        <el-table-column
          prop="control"
          label="控制值"
        >
        </el-table-column>
        <el-table-column
          prop="recommend"
          label="推荐值"
        >
        </el-table-column>
        <el-table-column
          prop="percent"
          label="本次评价占比"
          width="180"
        >
          <template slot-scope="scope">
            <div class="percent">
              <el-input-number
                v-model="scope.row.percent"
                controls-position="right"
                :min="1"
                :max="100"
              ></el-input-number>&nbsp;%
              <!-- <el-input
                type="number"
                max="100"
                min="0"
              ></el-input> &nbsp;% -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <p>总比率: {{ total_percent }} %</p>
      </div>
      <div class="select-class">
        <p>
          评比年份：
          <el-select
            v-model="year"
            placeholder="请选择年份"
          >
            <el-option
              v-for="item in years.slice(1)"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </p>
        <p>
          生成类型：
          <el-select
            v-model="prd_type"
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in states"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </p>
        <p>
          <el-button
            type="primary"
            @click="handleNext2"
          >生成评价</el-button>
        </p>
      </div>
    </div>
    <div
      class="content2"
      v-if="active === 2"
    >
      <div class="search-bar">
        <span style="width: 290px;">
          名称：
          <el-input
            placeholder="请输入企业名称"
            v-model="pramas.comp_name"
          >
          </el-input>
        </span>
        <span>
          级别:
          <el-select
            v-model="pramas.level"
            placeholder="请选择级别"
          >
            <el-option
              v-for="item in ['全部','A','B','C', 'D']"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </span>
        <span>

          年份：
          <el-select
            v-model="pramas.year"
            placeholder="请选择年份"
          >
            <el-option
              v-for="item in years"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </span>
        <span>
          产行业：
          <el-select
            v-model="pramas.industry"
            placeholder="请选择产行业"
          >
            <el-option
              v-for="item in ['全部','智能新能源汽车产业','航空航天产业','生物医药大健康产业','智能装备']"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </span>
        <span>
          所属地：
          <el-select
            v-model="pramas.local"
            disabled
            placeholder="请选择所属地"
          >
            <el-option
              v-for="item in years"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </span>

        <span style="text-align: right;width:70px;">
          <el-button
            class="search"
            type="primary"
            @click="filterData"
          >查询</el-button>
        </span>
      </div>
      <el-table
        :data="resultData"
        key="second"
        style="width: 100%;"
        :header-row-style="{
          fontFamily: 'PingFangSC-Medium',
          fontSize: '12px',
          color:'rgba(0, 0, 0, 0.85)',
          lineHeight: '22px',
          background: '#fafafa',
          borderRadius: '4px 4px 0px 0px'
        }"
        :style="`font-size: ${12}px`"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="comp_name"
          label="企业名称"
          min-width="160"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="industry"
          label="行业"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="area"
          label="用地面积（亩）"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="tax"
          label="税收实际贡献（万元）"
          width="100"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="total_value"
          label="工业总产值（万元）"
          min-width="80"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="elec"
          label="总用电量（kw/h）"
          min-width="70"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="staff"
          label="年均职工数（人）"
          min-width="80"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="评价级别"
          header-align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="调档"
          fixed="right"
          align="center"
          header-align="center"
          width="60"
        >
          <template slot-scope="scope">
            <div class="trans">
              <img
                src="@/assets/img/transfer.svg"
                title="调档"
                @click="handleTransfer(scope.row)"
                alt=""
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="select-class">
        <div style="text-align:right;">
          <el-button @click="handlePre(1)">上一步</el-button>
          <el-button
            type="primary"
            @click="handleNext3"
          >保存评价结果</el-button>
        </div>
      </div>
    </div>
    <div
      class="content2"
      v-if="active === 3"
    >
      <InfoPage @back="handleBack"></InfoPage>
    </div>
    <el-dialog
      v-if="dialogFormVisible"
      title="评价升降级调整"
      :visible.sync="dialogFormVisible"
      :show-close="true"
      width="483px"
      height="522px"
    >
      <el-form
        :model="form"
        label-width="140px"
      >
        <el-form-item label="企业名称:">
          {{form.comp_name}}
        </el-form-item>
        <el-form-item label="行业排名:">
          {{form.order}}
        </el-form-item>
        <el-form-item label="本期评价级别:">
          <span class="ed_level"> {{form.level}}</span>
        </el-form-item>
        <el-form-item label="本次动态调整选择:">
          <el-radio-group v-model="check">
            <el-radio label="上调">上调</el-radio>
            <el-radio label="下调">下调</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="调整级别:">
          <el-radio-group v-model="newlevel">
            <el-radio label="A">A</el-radio>
            <el-radio label="B">B</el-radio>
            <el-radio label="C">C</el-radio>
            <el-radio label="D">D</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="调整原因备注:">
          <div style="margin-left:0px;width:200px;height:200px;">
            <el-checkbox-group
              v-model="desc"
              @change="handleCheckChange"
            >
              <el-checkbox
                v-for="item in resons"
                :label="item"
                :key="item"
              >{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="附件上传:">
          <div style="posistion:relative;">
            <el-button>
              <i class="el-icon-upload"></i>
              点击上传
            </el-button>
            <input
              type="file"
              class="hiddenfile"
            />
          </div>
          <span>文件大小不能超过10M</span>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleTransferEnd"
        >确认调整</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InfoPage from './InfoPage'
import eval_db from '@/utils/eval.js'
import { parseTime } from '@/utils/time.js'
import bus from '@/components/common/bus';
import { SET_BREADCRUMBS } from '@/utils/constants';
export default {
  components: { InfoPage },
  data () {
    return {
      active: 1,
      typeObj: ['亩均税收(万元/亩)：', '人均产值(万元)：', 'R&D经费占比(%)：', '单位产值能耗(吨标煤/万元)：'],
      tableData: [
        {
          type_class: 0,
          average: 75,
          control: 88,
          recommend: 60,
          percent: 25
        },
        {
          type_class: 1,
          average: 70,
          control: 100,
          recommend: 50,
          percent: 25
        },
        {
          type_class: 2,
          average: 2.63,
          control: 3,
          recommend: 1.77,
          percent: 25
        },
        {
          type_class: 3,
          average: 0.33,
          control: 0.28,
          recommend: 0.4,
          percent: 25
        }
      ],
      year: '2019',
      years: ['全部', '2019', '2018', '2017'],
      prd_type: '全部生成',
      states: ['全部生成'],
      pramas: {
        comp_name: null,
        level: null,
        year: null,
        industry: null,
        local: null
      },
      resultData: [],
      df_Data: [
        {
          comp_name: '北京现代汽车有限公司',
          local: '中关村示范区顺义园',
          industry: '智能新能源汽车产业',
          area: '90',
          tax: '10170',
          total_value: '610000',
          area_tax: '113',
          staff_val: '130',
          u_mei: '0.12',
          rd_p: '5',
          year: '2019',
          level: 'A'
        },
        {
          comp_name: '北京汽车集团有限公司',
          local: '中关村示范区顺义园',
          industry: '智能新能源汽车产业',
          area: '89',
          tax: '9523',
          total_value: '720000',
          area_tax: '107',
          staff_val: '120',
          u_mei: '0.14',
          rd_p: '5.5',
          year: '2019',
          level: 'A'
        },
        {
          comp_name: '中航复合材料有限责任公司',
          local: '中关村示范区顺义园',
          industry: '航空航天产业',
          area: '70',
          tax: '6510',
          total_value: '150000',
          area_tax: '93',
          staff_val: '120',
          u_mei: '0.15',
          rd_p: '4',
          year: '2019',
          level: 'A'
        },
        {
          comp_name: '北京青云航电科技有限公司',
          local: '中关村示范区顺义园',
          industry: '航空航天产业',
          area: '54',
          tax: '5238',
          total_value: '120000',
          area_tax: '97',
          staff_val: '110',
          u_mei: '0.11',
          rd_p: '3.6',
          year: '2019',
          level: 'A'
        },
        {
          comp_name: '北京世桥生物制药有限公司',
          local: '中关村示范区顺义园',
          industry: '生物医药大健康产业',
          area: '56',
          tax: '5656',
          total_value: '80000',
          area_tax: '101',
          staff_val: '100',
          u_mei: '0.14',
          rd_p: '3',
          year: '2018',
          level: 'A'
        },
        {
          comp_name: '北京佳普益康生物科技有限公司',
          local: '中关村示范区顺义园',
          industry: '生物医药大健康产业',
          area: '32',
          tax: '1600',
          total_value: '40000',
          area_tax: '50',
          staff_val: '90',
          u_mei: '0.24',
          rd_p: '3',
          year: '2019',
          level: 'C'
        },
        {
          comp_name: '北京星箭长空测控技术股份有限公司',
          local: '中关村示范区顺义园',
          industry: '智能装备',
          area: '32',
          tax: '3136',
          total_value: '120000',
          area_tax: '98',
          staff_val: '150',
          u_mei: '0.14',
          rd_p: '4.5',
          year: '2019',
          level: 'A'
        },
        {
          comp_name: '北京中瑞和电气有限公司',
          local: '中关村示范区顺义园',
          industry: '智能装备',
          area: '28',
          tax: '2296',
          total_value: '70000',
          area_tax: '82',
          staff_val: '120',
          u_mei: '0.16',
          rd_p: '3',
          year: '2019',
          level: 'B'
        }
      ],
      dialogFormVisible: false,
      form: {
      },
      newlevel: 'A',
      check: '上调',
      desc: [],
      resons: ["国家高新技术企业", "一年内发生重大事故", "未投产或投产不满一年企业", "污染、能耗超标企业", "其他原因"],
      currentRow: null,
      levels: ['A', 'B', 'C', 'D']
    }
  },
  computed: {
    total_percent () {
      return this.tableData.reduce((old, cru) => {
        return old + Number(cru.percent)
      }, 0)
    },
    tableHeight () {
      return document.body.clientHeight - 500
    },
    fontSize () {
      return document.body.clientWidth > 1350 ? 14 : 12
    }
  },
  created () {
    this.resultData = this.df_Data.map(e => {
      const index = Math.floor(Math.random(0, 10) * 3)
      // e.level = this.levels[index]
      e.order = Math.ceil(Math.random(0, 10) * 50)
      e.year = this.year
      return e
    })
    bus.$emit(SET_BREADCRUMBS, [{ title: '综合评价', event: 'goBack' }, { title: '企业综合评价' }]);
    bus.$on('goBack', () => {
      this.handleBack()
    })
  },
  methods: {
    handleNext2 () {
      if (this.total_percent !== 100) {
        this.$message.error('请重新确认您填写的比率')
      } else {
        this.active = 2
      }
    },
    handleNext3 () {
      this.active = 3
      this.resultData.forEach((e, index) => {
        e.year = this.year
        e.eval_name = `${e.year}年度综合评价${Math.ceil(Math.random(0, 10) * 100)}`
        e.eval_status = '未告知'
        e.createTime = parseTime(new Date())
        e.id = e.year + 'abc' + index
      })

      // 首先拿取数据
      const list = eval_db.get('list').value()
      if (list && list.length) {
        let setlist = this.resultData
        if (list.some(e => e.year === this.year)) {
          const relist = list.filter(e => e.year !== this.year)
          setlist = [...setlist, ...relist]
        } else {
          setlist = [...setlist, ...list]
        }
        eval_db.set('list', setlist).write()
      } else {
        eval_db.set('list', this.resultData).write()
      }
      // 然后查看 是否有this.year相同的数据
      // 没有则插入到头部
      //有则 过滤掉，然后重新插到头部
    },
    handlePre (index) {
      this.active = index
    },
    filterData () {
      let arr = {}
      Object.keys(this.pramas).forEach(key => {
        if (this.pramas[key] && this.pramas[key] !== '全部') {
          arr[key] = this.pramas[key]
        }
      })
      if (!Object.keys(arr).length) {
        this.resultData = this.df_Data
        return
      }
      this.resultData = this.df_Data.filter(row => {
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
    handleTransfer (row) {
      this.form = {}
      this.desc = []
      this.currentRow = row
      Object.assign(this.form, row)
      this.check = '上调'
      this.dialogFormVisible = true
    },
    handleBack () {
      this.$emit('back')
    },
    handleCheckChange (val) {
      // console.log(val, this.form.desc)
    },
    handleTransferEnd () {
      if (!this.newlevel) return
      Object.assign(this.currentRow, this.form)
      this.currentRow.level = this.newlevel
      this.newlevel = 'A'
      this.currentRow.desc = this.desc.join(',')
      this.dialogFormVisible = false
      this.currentRow.transfer = true
    }
  }
}
</script>

<style lang="less" scoped>
.percent {
  /deep/ .el-input-number {
    width: 100px;
    display: inline-block;
  }
}
.progress {
  display: block;
  width: 870px;
  padding-bottom: 30px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  * {
    display: inline-block;
  }
  & > span {
    color: rgba(0, 0, 0, 0.45);
    p {
      width: 32px;
      height: 32px;
      font-size: 16px;
      font-family: HelveticaNeue;
      border-radius: 16px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      text-align: center;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  i {
    display: inline-block;
    width: 180px;
    margin: 4px 48px;
    line-height: 1px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  .active {
    color: rgba(0, 0, 0, 0.85);
    p {
      color: #fff;
      background: rgba(16, 142, 233, 1);
      border: 1px solid rgba(16, 142, 233, 1);
    }
  }
}
.content1 {
  width: 100%;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
.content2 {
  width: 100%;
  margin-left: 50%;
  transform: translate(-50%, 0);
}
.total {
  text-align: right;
  line-height: 60px;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid #ddd;
}
.select-class {
  padding: 24px;
  p {
    width: 33%;
    display: inline-block;
    box-sizing: border-box;
    .el-select {
      width: 150px;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
}

// 2
.search-bar {
  line-height: 48px;
  padding: 8px;
  .search {
    cursor: pointer;
  }
  span {
    display: inline-block;
    padding-right: 2px;
    line-height: 40px;
    width: 152px;
  }
  .el-input {
    width: 220px;
    display: inline-block;
  }
  .el-select {
    width: 90px;
  }
}
.trans {
  cursor: pointer;
  text-align: center;
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
.el-dialog__body {
  .el-input {
    width: 300px;
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
/deep/.el-form-item {
  margin-bottom: 2px;
}
/deep/ .el-table::before {
  background: none;
}
/deep/.el-table {
  td,
  th {
    border: none;
  }
  th {
    background: #fafafa;
    border-radius: 4px 4px 0px 0px;
  }
}
/deep/ .el-dialog__body {
  margin: 0;
  padding: 12px 34px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  .ed_level {
    background: #13c2c2;
    border-radius: 1px;
    color: #fff;
    width: 24px;
    line-height: 24px;
    font-size: 17px;
    padding: 0 6px;
  }
  .el-form-item {
    min-height: 32px;
    .el-form-item__label {
      height: 32px;
      line-height: 32px;
    }
  }
  .el-form-item__content {
    min-height: 32px;
    line-height: 32px;
  }
}
</style>