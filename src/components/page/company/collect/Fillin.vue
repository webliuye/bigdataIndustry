<template>
  <div class="fillin-box">
    <div v-if="!showEdit">
      <el-form :inline="true" :model="filterReport" ref="filterReport" class="filter-report" label-width="60px">
        <el-form-item label="名称：" style="width: 260px">
          <el-input v-model="filterReport.name"></el-input>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="filterReport.date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型：" style="width: 160px">
          <el-select v-model="filterReport.type">
            <el-option label="全部" value=""></el-option>
            <el-option label="年报" value="年报"></el-option>
            <el-option label="季报" value="季报"></el-option>
            <el-option label="月报" value="月报"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" style="width: 160px">
          <el-select v-model="filterReport.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="未报" value="1"></el-option>
            <el-option label="已报" value="2"></el-option>
            <el-option label="退回" value="3"></el-option>
            <el-option label="通过" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="op-right-button">
          <el-button type="primary" @click="searchData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作 -->
      <div class="operating">
        <!-- <el-button :disabled="disabledReport" type="primary" @click="submitReport">上报</el-button> -->
        <el-button disabled="disabled">导入</el-button>
        <el-button disabled="disabled">导出</el-button>
        <el-button disabled="disabled">打印</el-button>
      </div>
      <div class="report-list-warp">
        <el-alert
          :title="'报送任务 '+ statusCount.all +' 项，已报： '+ statusCount.report +'，未报： '+ statusCount.unreport"
          type="warning">
        </el-alert>
        <!-- 列表 -->
        <el-table
          :data="annualReportList"
          ref="annualReportList"
          border
          class="c-table-main"
          style="width: 100%"
          @selection-change="listSelection">
          <el-table-column
            :selectable="selectable"
            type="selection"
            width="55" />
          <el-table-column
            label="名称">
            <template slot-scope="scope">
              <span v-if="scope.row.name === '《企业基本信息表年报表》' && +scope.row.status !== 4" class="look-task" @click="editData(scope.row)">{{scope.row.name}}</span>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            width="120"
            label="状态">
            <template slot-scope="scope">
              <span :class="+scope.row.status == 2 ? 'unreviewed' : +scope.row.status == 3 ? 'returned' : +scope.row.status == 4 ? 'pass' : 'not-reported'">{{ +scope.row.status == 2 ? '已报' : +scope.row.status == 3 ? '已退回' : +scope.row.status == 4 ? '通过' : '未报'}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            label="类型"
            show-overflow-tooltip
            prop="type"/>
          <el-table-column
            label="发布日期"
            show-overflow-tooltip
            prop="releaseDate"/>
          <el-table-column
            label="开始日期"
            show-overflow-tooltip
            prop="cycle[0]"/>
          <el-table-column
            label="截止日期"
            show-overflow-tooltip
            prop="cycle[1]"/>
          <el-table-column
            label="填报说明"
            show-overflow-tooltip
            prop="remarks"/>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button title="修改" type="text" @click="editData(scope.row)"><img src="@/assets/img/edit.svg"></el-button>
              <el-button title="更多" type="text"><img src="@/assets/img/more.svg"></el-button>
            </template>
          </el-table-column>  
        </el-table>
        <el-pagination
          v-if="pageTotal > pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>

    <!-- 数据填报 -->
    <edit-fillin v-if="showEdit" :communication="rowReportData" @on-close="closeOperating"></edit-fillin>
  </div>
</template>

<script>
  import low from 'lowdb'
  import LocalStorage from 'lowdb/adapters/LocalStorage'
  import editFillin from './EditFillin.vue'

  export default {
    data() {
      return {
        showEdit: false,
        rowReportData: {},
        filterReport: {
          name: '',
          date: '',
          type: '',
          status: ''
        },
        annualReportList: [],
        loading: false,
        pageSize: 10,
        pageIndex: 0,
        pageTotal: 0,
        disabledReport: true,
        selectionData: [],
        statusCount: {
          all: 0,
          report: 0,
          unreport: 0,
          return: 0,
          pass: 0
        }
      }
    },
    components: {
      editFillin
    },
    mounted() {
      // 拉数据
      this.getAnnualReportList(this.pageSize, this.pageIndex)
      this.resetForm()
    },
    methods: {
      // 勾选框禁用
      selectable(row) {
        if (+row.status === 4) {
          return false
        } else {
          return true
        }
      },
      // 获取数据
      getAnnualReportList(pageSize, pageIndex, search) {
        this.$axios.get('/mock/annual/companyFillin.json')
          .then(res => {
            this.processReportData(res.data, pageSize, pageIndex, search)
          })
      },
      // 获取的数据处理
      processReportData(data, pageSize, pageIndex, search) {
        // 统计数据清空
        this.annualReportList = []
        this.statusCount.all = 0
        this.statusCount.report = 0
        this.statusCount.unreport = 0
        this.statusCount.return = 0
        this.statusCount.pass = 0
        // 企业填报
        const fillinAdapter = new LocalStorage('fillin')
        const fillin = low(fillinAdapter)
        // 园区填报
        const annualAdapter = new LocalStorage('annual')
        const annual = low(annualAdapter)
        // 处理开始
        data.forEach((thisData, index) => {
          if (search) {
            // 查询处理
            let _obj = thisData
            const _filterReport = this.filterReport
            for (let j in _filterReport) {
              if (_filterReport.hasOwnProperty(j) && _filterReport[j] && _filterReport[j] !== thisData[j]) {
                _obj = null
              } 
            }
            _obj ? this.annualReportList.push(_obj) : ''
          } else {
            this.annualReportList.push(thisData)
          }
          // 填报统计
          this.statusCount.all++
          switch (+thisData.status) {
            case 0:
              this.statusCount.report++
              break
            case 1:
              this.statusCount.unreport++
              break
            case 2:
              this.statusCount.return++
              break
            case 3:
              this.statusCount.pass++
              break      
          }
          // 数据是否上报,注意如果园区已经收到上报数据，应该获取园区的填报状态
          if (annual.get('streetAnnualReportList').value()) {
            const _streetData = annual.get('streetAnnualReportList').value()
            _streetData.forEach(thisStreetData => {
              if (thisStreetData.id === thisData.id) {
                // 园区里面找到对应企业上报数据
                thisData.status = thisStreetData.status
              } else {
                // 园区有，但是没找到对应的，那就看看企业有没有保存
                if (fillin.has('fillinList').value()) {
                  const _fillinData = fillin.get('fillinList').value()
                  if (thisData.id === _fillinData.id) {
                    thisData.status = _fillinData.status
                  }
                }
              }
            })
          } else if (fillin.has('fillinList').value()) {
            const _fillinData = fillin.get('fillinList').value()
            if (thisData.id === _fillinData.id) {
              thisData.status = _fillinData.status
            }
          }          
        })
        this.pageTotal = this.annualReportList.length
        this.pageIndex = pageIndex + 1
        this.annualReportList = this.annualReportList.splice(pageIndex * pageSize, pageSize)
      },
      handleSizeChange(val) {
        this.getAnnualReportList(val, this.pageIndex - 1)
      },
      handleCurrentChange(val) {
        this.getAnnualReportList(this.pageSize, val - 1)
      },
      // 选取操作数据
      listSelection(val) {
        if (val.length > 0) {
          this.disabledReport = false
        } else {
          this.disabledReport = true
        }
        this.selectionData = val
      },
      // 查询
      searchData() {
        let flag = true
        for (let i in this.filterReport) {
          if (this.filterReport.hasOwnProperty(i) && this.filterReport[i]) {
            flag = false
          }
        }
        if (flag) {
          this.getAnnualReportList(10, 0)
        } else {
          this.getAnnualReportList(10, 0, 'search')
        }
      },
      // 重置
      resetForm() {
        for (let i in this.filterReport) {
          if (this.filterReport.hasOwnProperty(i)) {
            this.filterReport[i] = ''
          }
        }
      },
      // 填报
      editData(row) {
        if (+row.status !== 4) {
          if (row.name === '《企业基本信息表年报表》') {
            this.showEdit = true
            this.rowReportData = row
          } else {
            return
          }          
        } else {
          this.$message.error('已通过数据不能再修改')
        }
      },
      // 上报
      submitReport() {
        
      },
      // 关闭填报页面
      closeOperating() {
        this.showEdit = false
        this.getAnnualReportList(10, 0)
      }
    }
  }
</script>

<style lang="less" scoped>
  .fillin-box{
    background-color: #ffffff;
    padding: 20px 0;
    overflow-y: auto;
    height: 100%;

    /deep/ .filter-report{
      width: 100%;

      .el-form-item{
        width: 20%;
        box-sizing: border-box;
        margin: 0 0 10px 0;

        .el-form-item__label{
          padding: 0;
        }

        .el-form-item__content{
          width: calc(100% - 60px);

          .el-input, .el-select{
            width: 100%;
          }
        }
      }

      .op-right-button{
        width: 180px;
        padding-left: 15px;

        .el-form-item__content{
          width: 100%;
        }
      }
    }

    .operating, .report-list-warp{
      padding: 10px 20px 0;
    }

    .el-alert{
      margin-top: 10px;
    }

    .unreviewed{
      color: #FD8C01;
      background: url('../../../../assets/img/yellow.svg') no-repeat left center;
      padding-left: 15px;
    }

    .not-reported{
      color: #FF443F;
      background: url('../../../../assets/img/red.svg') no-repeat left center;
      padding-left: 15px;
    }

    .returned{
      color: #108EE9;
      background: url('../../../../assets/img/blue.svg') no-repeat left center;
      padding-left: 15px;
    }

    .pass{
      color: #048304;
      background: url('../../../../assets/img/green.svg') no-repeat left center;
      padding-left: 15px;
    }

    .el-pagination{
      padding-top: 20px;
      text-align: center;
    }

    .look-task{
      cursor: pointer;

      &:hover{
        color: #108EE9;
      }
    }
  }
</style>