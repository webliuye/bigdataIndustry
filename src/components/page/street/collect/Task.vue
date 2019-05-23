<template>
  <div class="task-box">
    <div v-if="!showLook" style="overflow-y: auto; height: 100%;">
      <el-form :inline="true" :model="filterReport" ref="filterReport" class="filter-report" label-width="60px">
        <el-form-item label="名称：">
          <el-input v-model="filterReport.name"></el-input>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="filterReport.releaseDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" style="width: 180px">
          <el-select v-model="filterReport.streetReadStatus">
            <el-option label="全部" value=""></el-option>
            <el-option label="已阅" value="1"></el-option>
            <el-option label="未阅" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="op-right-button">
          <el-button type="primary" @click="searchData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作 -->
      <div class="operating">
        <el-button icon="el-icon-plus" type="primary" @click="allRead">全部标为已读</el-button>
        <el-button :disabled="disabledDelete" @click="deleteData">删除</el-button>
        <el-button disabled="disabled">下载</el-button>
      </div>
      <div class="report-list-warp">
        <el-alert
          :title="'任务总数：'+ statusCount.all +' 项 | 已阅：'+ statusCount.read +' | 未阅：'+ statusCount.unread"
          type="warning">
        </el-alert>
        <!-- 列表 -->
        <el-table
          :data="annualReportList"
          :height="tableHeight"
          ref="annualReportList"
          border
          class="c-table-main"
          style="width: 100%"
          @selection-change="listSelection">
          <el-table-column
            type="selection"
            width="55" />
          <el-table-column
            min-width="150"
            label="名称">
            <template slot-scope="scope">
              <span class="look-task" @click="lookTaskInfo(scope.row)">{{scope.row.name}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            width="120"
            label="状态">
            <template slot-scope="scope">
              <span :class="+scope.row.streetReadStatus === 1 ? 'published' : 'pending'">{{+scope.row.streetReadStatus === 1 ? '已阅' : '未阅'}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            label="发布日期"
            min-width="130"
            show-overflow-tooltip
            prop="releaseDate"/>
          <el-table-column
            label="开始日期"
            min-width="130"
            show-overflow-tooltip
            prop="cycle[0]"/>
          <el-table-column
            label="截止日期"
            min-width="130"
            show-overflow-tooltip
            prop="cycle[1]"/>
          <el-table-column
            label="类型"
            min-width="100"
            show-overflow-tooltip
            prop="type"/>
          <el-table-column
            label="发布部门"
            min-width="120"
            show-overflow-tooltip
            prop="department"/>
          <el-table-column
            label="发布人"
            min-width="120"
            show-overflow-tooltip
            prop="publisher"/>
          <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button title="打印" type="text" @click="printData(scope.row)"><img src="@/assets/img/print.svg"></el-button>
              <el-button title="更多" type="text"><img src="@/assets/img/more.svg"></el-button>
            </template>
          </el-table-column>  
        </el-table>
        <div v-if="annualReportList.length === 0" class="no-data" :style="'height:'+(tableHeight-10)+'px'">
          
        </div>
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

    <!-- 查看任务 -->
    <look-task v-if="showLook" :communication="rowTaskData" @on-close="closeOperating"></look-task>
  </div>
</template>

<script>
  import low from 'lowdb'
  import LocalStorage from 'lowdb/adapters/LocalStorage'
  import lookTask from './LookTask.vue'  

  export default {
    data() {
        return {
          showLook: false,
          filterReport: {
            name: '',
            releaseDate: '',
            streetReadStatus: ''
          },
          annualReportList: [],
          pageSize: 10,
          pageIndex: 0,
          pageTotal: 0,
          disabledDelete: true,
          selectionData: [],
          rowTaskData: {},
          statusCount: {
            all: 0,
            read: 0,
            unread: 0
          }
        }
    },
    components: {
      lookTask
    },
    computed:{
      tableHeight() {
        const bodyHeight = document.body.clientHeight - 332
        return bodyHeight ? bodyHeight : ''
      }
    },
    mounted() {
      this.getAnnualReportList(this.pageSize, this.pageIndex)
    },
    methods: {
      getAnnualReportList(pageSize, pageIndex, search) {
        const adapter = new LocalStorage('task')
        const task = low(adapter)
        if (task.has('taskList').value()) {
          // LocalStorage有
          this.processData(task.get('taskList').value(), pageSize, pageIndex, search)
        }
        // else {
        //   // json文件取
        //   this.$axios.get('/mock/task.json')
        //     .then(res => {
        //       this.processData(res.data, pageSize, pageIndex, search)
        //     })
        // }
      },
      // 获取的数据处理
      processData(data, pageSize, pageIndex, search) {
        this.annualReportList = []
        this.statusCount.all = 0
        this.statusCount.read = 0
        this.statusCount.unread = 0
        data.forEach((thisData, index) => {
          // 已发布的任务才能看
          if (+thisData.status === 1 && thisData.streetChildShow) {
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
          }
        })
        // 任务统计
        const _this = this
        _this.annualReportList.forEach(thisData => {
          _this.statusCount.all ++
          if (+thisData.streetReadStatus === 1) {
            _this.statusCount.read ++
          } else {
            _this.statusCount.unread ++
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
          this.disabledDelete = false
        } else {
          this.disabledDelete = true
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
      // 删除
      deleteData() {
        this.selectionData.forEach(thisSelection => {
          const adapter = new LocalStorage('task')
          const task = low(adapter)
          if (task.has('taskList').value()) {
            task.get('taskList').find(thisSelection).assign({streetChildShow: false}).write()
          } else {
            this.annualReportList.forEach((thisReport, index) => {
              if (thisSelection.name === thisReport.name) {
                this.annualReportList.splice(index, 1)
              }
            })
          }
        })
        this.$refs.annualReportList.clearSelection()
        this.getAnnualReportList(10, 0)
        this.$message({
          type: 'success',
          message: '删除任务成功'
        })
      },
      // 全部已阅
      allRead() {
        const adapter = new LocalStorage('task')
        const task = low(adapter)
        if (task.has('taskList').value()) {
          task.get('taskList').value().forEach(thisTask => {
            task.get('taskList').find(thisTask).assign({streetReadStatus: '1'}).write()
          })
        }
        this.getAnnualReportList(10, 0)
      },
      // 打印任务
      printData(row) {
        console.log(row)
      },
      // 查看任务
      lookTaskInfo(row) {
        const adapter = new LocalStorage('task')
        const task = low(adapter)
        task.get('taskList').find(row).assign({streetReadStatus: '1'}).write()
        this.showLook = true
        this.rowTaskData = row
      },
      // 关闭查看
      closeOperating() {
        this.showLook = false
        this.getAnnualReportList(10, 0)
      }
    }
  }
</script>

<style lang="less">
  .task-box{
    background-color: #ffffff;
    padding: 20px 0;
    height: 100%;
    box-sizing: border-box;

    .filter-report{
      width: 100%;

      .el-form-item{
        width: 25%;
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
      position: relative;

      .no-data{
        position: absolute;
        width: 100%;
        bottom: 10px;
        left: 0;
        background: url('../../../../assets/img/nodata.svg') no-repeat center;
        background-size: 70px 70px;
      }
    }

    .el-alert{
      margin-top: 10px;
    }

    .pending{
      color: #FF443F;
      background: url('../../../../assets/img/red.svg') no-repeat left center;
      padding-left: 15px;
    }

    .published{
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