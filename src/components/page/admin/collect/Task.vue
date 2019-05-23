<template>
  <div class="task-box">
    <div v-if="!showAdd" style="overflow-y: auto; height: 100%;">
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
        <el-form-item label="类型：" style="width: 180px">
          <el-select v-model="filterReport.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="未发布" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-left: 15px">
          <el-button type="primary" @click="searchData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 操作 -->
      <div class="operating">
        <el-button icon="el-icon-plus" type="primary" @click="goAddTask">新建</el-button>
        <el-button :disabled="disabledDelete" @click="deleteData">删除</el-button>
        <el-button disabled="disabled">导入</el-button>
        <el-button disabled="disabled">导出</el-button>
      </div>
      <div class="report-list-warp">
        <el-alert
          :title="'任务总数：'+ statusCount.all +' 项 | 待发布：'+ statusCount.pending +' | 已发布：'+ statusCount.published"
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
            label="名称"
            min-width="150">
            <template slot-scope="scope">
              <span style="cursor: pointer" @click="editData(scope.row)">{{scope.row.name}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            width="120"
            label="状态">
            <template slot-scope="scope">
              <span :class="+scope.row.status == 1 ? 'published' : 'pending'">{{+scope.row.status === 1 ? '已发布' : '未发布'}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            min-width="170"
            label="通知单位(已阅/未阅)">
            <template slot-scope="scope">
              <span>{{scope.row.read}} / {{scope.row.notRead}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            label="发布日期"
            min-width="130"
            show-overflow-tooltip
            prop="releaseDate"/>
          <el-table-column
            min-width="130"
            label="开始日期"
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
              <el-button :class="+scope.row.status === 1 ? 'ly-gray' : ''" :disabled="+scope.row.status === 1" title="发布" type="text" @click="releaseData(scope.row)"><img src="@/assets/img/release.svg"></el-button>
              <el-button :class="+scope.row.status === 1 ? 'ly-gray' : ''" :disabled="+scope.row.status === 1" title="修改" type="text" @click="editData(scope.row)"><img src="@/assets/img/edit.svg"></el-button>
              <el-button type="text"><img src="@/assets/img/more.svg"></el-button>
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

    <!-- 新增任务 -->
    <add-task v-if="showAdd" :communication="rowTaskData" @on-close="closeOperating"></add-task>
  </div>
</template>

<script>
  import low from 'lowdb'
  import LocalStorage from 'lowdb/adapters/LocalStorage'
  import addTask from './AddTask.vue'

  export default {
    data() {
        return {
          showAdd: false,
          filterReport: {
            name: '',
            releaseDate: '',
            status: ''
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
            pending: 0,
            published: 0
          }
        }
    },
    components: {
      addTask
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
        this.statusCount.pending = 0
        this.statusCount.published = 0
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
        })
        // 任务统计
        const _this = this
        _this.annualReportList.forEach(thisData => {
          _this.statusCount.all ++
          if (+thisData.status === 0) {
            _this.statusCount.pending ++
          } else {
            _this.statusCount.published ++
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
        this.$confirm('确认删除选中任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectionData.forEach(thisSelection => {
            const adapter = new LocalStorage('task')
            const task = low(adapter)
            if (task.has('taskList').value()) {
              task.get('taskList').remove(thisSelection).write()
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })      
        })
      },
      // 新建任务
      goAddTask() {
        this.showAdd = true
        this.rowTaskData = {}
      },
      // 发布任务
      releaseData(row) {
        if (+row.status === 1) {
          this.$message.error('已发布任务不能再发布')
        } else {
          this.$confirm('确认发布 ' + row.name + ' 这条任务吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const adapter = new LocalStorage('task')
            const task = low(adapter)
            if (task.has('taskList').value()) {
              task.get('taskList').find(row).assign({status: 1}).write()
            } else {
              row.status = 1
            }
            this.$message({
              type: 'success',
              message: '发布任务成功'
            })
            this.getAnnualReportList(10, 0)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发布'
            })      
          })
        }        
      },
      // 编辑任务
      editData(row) {
        if (+row.status === 1) {
          this.$message.error('已发布任务不能修改')
        } else {
          this.rowTaskData = row
          this.showAdd = true
        }
      },
      // 关闭新建
      closeOperating() {
        this.showAdd = false
        this.getAnnualReportList(10, 0)
      }
    }
  }
</script>

<style lang="less">
  .task-box{
    background-color: #FFF;
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
      color: #FD8C01;
      background: url('../../../../assets/img/yellow.svg') no-repeat left center;
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
  }
</style>