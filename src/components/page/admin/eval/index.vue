<template>
  <!-- 综合评价入口 -->
  <div
    v-if="isPage"
    class="main"
  >
    <div class="search-bar">
      <span>
        名称：
        <el-input
          placeholder="请输入评价名称"
          v-model="name"
        >
        </el-input>
      </span>
      <span>

        年份：
        <el-select
          v-model="year"
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
        状态：
        <el-select
          v-model="state"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in Object.keys(states)"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </span>
      <span style="min-width: 180px; box-sizing: border-box;">
        <el-button
          type="primary"
          @click="filterData"
        >查询</el-button>
        <el-button @click="resetData">重置</el-button>
      </span>
    </div>
    <div class="operate">
      <el-button
        type="primary"
        @click="addEval"
      >
        <i class="el-icon-plus"></i>
        新增年度评价</el-button>
      <el-button @click="handleDelete">删除</el-button>
      <el-button disabled>导入</el-button>
      <el-button disabled>导出</el-button>
    </div>
    <div class="table-cl">
      <el-table
        :data="tableData"
        :height="tableHeight"
        style="width: 100%"
        :header-row-style="{
          fontFamily: 'PingFangSC-Medium',
          fontSize: '14px',
          color:'rgba(0, 0, 0, 0.85)',
          lineHeight: '22px',
          background: '#fafafa',
          borderRadius: '4px 4px 0px 0px'
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="eval_name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="eval_status"
          label="状态"
          width="180"
        >
          <template slot-scope="scope">
            <div :style=" `color:${states[scope.row.eval_status]};`">
              <img
                :src="imgurls[scope.row.eval_status]"
                alt=""
              > {{scope.row.eval_status}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="eval_org"
          label="经办部门"
        >
        </el-table-column>
        <el-table-column
          prop="eval_man"
          label="经办人"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="oper-btn">
              <img
                :class="{'ly-gray' : scope.row.eval_status !== '未告知'}"
                title="修改"
                src="../../../../assets/img/edit.svg"
                @click="scope.row.eval_status === '未告知' && handleClick(scope.row)"
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
  </div>
  <div
    v-else
    class="main"
  >
    <AddEval
      :type="current_type"
      :row="current_row"
      @back="hadleback"
    ></AddEval>
  </div>
</template>
<script>
import AddEval from './component/AddEval'
import company from '@/assets/company.js'
import eval_db from '@/utils/eval.js'
const getUrl = (name) => {
  return require('@/assets/img/' + name + '.svg')
}
export default {
  components: { AddEval },
  data () {
    return {
      isPage: true,
      name: '',
      year: '全部',
      years: ['全部', '2019', '2018'],
      state: '全部',
      states: { '全部': null, '未告知': '#FF5752', '已告知': '#108EE9', '已公示': '#018201' },
      imgurls: { '未告知': getUrl('red'), '已告知': getUrl('blue'), '已公示': getUrl('green') },
      tableData: [],
      def_data: [
        // {
        //   id: 1,
        //   eval_name: '评价1',
        //   eval_status: '未告知',
        //   eval_org: '部门1',
        //   eval_man: 'admin',
        //   year: '2019'
        // },
        // {
        //   id: 2,
        //   eval_name: '评价2',
        //   eval_status: '未告知',
        //   eval_org: '部门1',
        //   eval_man: 'admin',
        //   year: '2018'
        // },
        // {
        //   id: 3,
        //   eval_name: '评价3',
        //   eval_status: '已告知',
        //   eval_org: '部门1',
        //   eval_man: 'admin',
        //   year: '2019'
        // },
        // {
        //   id: 4,
        //   eval_name: '评价4',
        //   eval_status: '已公示',
        //   eval_org: '部门1',
        //   eval_man: 'admin',
        //   year: '2019'
        // }
      ],
      all_data: [],
      current_type: 'add',
      current_row: null,
      multipleSelection: []
    }
  },
  computed: {
    tableHeight () {
      return document.body.clientHeight - 312
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let list = eval_db.get('list').value()
      // 获取所有的年限组合
      if (list && list.length) {
        let years = list.map(e => e.year)
        years = [...new Set(years)]
        let tableList = years.map(y => {
          let data = {}
          data.id = 10 * y
          data.year = y
          let datas = list.filter(i => i.year === y)
          data.eval_name = datas[0].eval_name
          data.eval_man = localStorage.getItem('userName')
          data.eval_org = '经信部门'
          data.eval_status = datas.some(d => d.eval_status === '未告知') ? '未告知' : '已告知'
          return data
        })
        this.tableData = this.all_data = [...tableList, ...this.def_data]
      } else {
        this.tableData = this.all_data = this.def_data
      }
    },
    addEval () {
      this.isPage = false
      this.current_type = 'add'
      this.current_row = null
    },
    filterData () {
      let params = {
        name: null,
        year: null,
        state: null
      }
      Object.keys(params).forEach(key => {
        params[key] = this[key]
      })
      this.tableData = this.all_data.filter(row => {
        // 过滤
        let is_name = true
        let is_year = true
        let is_state = true

        if (params.name && (row.eval_name.indexOf(params.name) === -1)) {
          is_name = false
        }
        if (params.year && (params.year !== '全部') && (row.year !== params.year)) {
          is_year = false
        }
        if (params.state && (params.state !== '全部') && (row.eval_status !== params.state)) {
          is_state = false
        }
        return is_name && is_year && is_state
      })
    },
    resetData () {
      this.year = null
      this.name = '全部'
      this.state = '全部'
      this.tableData = this.all_data
    },
    handleDelete () {
      this.multipleSelection.forEach(e => {
        this.tableData.forEach((i, index) => {
          if (i.id === e.id) {

            let stayList = eval_db.get('list').value().filter(l => l.year !== i.year)
            console.log(stayList)
            eval_db.set('list', stayList).write()
            this.tableData.splice(index, 1)
          }
        })
      })
    },
    handleClick (row) {
      this.isPage = false
      this.current_type = 'edit'
      this.current_row = row
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    hadleback () {
      this.isPage = true
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
.el-input {
  width: 25%;
  display: inline-block;
}
.el-select {
  width: 15%;
  min-width: 152px;
}
.search-bar {
  line-height: 48px;
  padding-bottom: 10px;
  overflow: hidden;
  span {
    display: block;
    width: 25%;
    float: left;
    padding-right: 15px;
    box-sizing: border-box;

    .el-input,
    .el-select {
      width: calc(100% - 55px);
    }
  }
}
.operate {
  line-height: 48px;
  margin-bottom: 24px;
  .el-button {
    min-width: 88px;
  }
}
.status {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 12px;
  color: inherit;
  box-shadow: 0 0 10px #f00;
  margin-top: 16px;
  margin-right: 8px;
}
.oper-btn {
  img {
    cursor: pointer;
    padding: 8px;
  }
}
</style>
