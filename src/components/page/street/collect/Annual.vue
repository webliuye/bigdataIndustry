<template>
  <div class="annual-report">
    <div style="overflow-y: auto; height: 100%;">
      <el-form :inline="true" :model="filterReport" ref="filterReport" class="filter-report" label-width="100px">
        <el-form-item label="企业名称：">
          <el-input v-model="filterReport.companyName"></el-input>
        </el-form-item>
        <el-form-item label="产业和行业：">
          <el-select v-model="filterReport.industry">
            <el-option label="全部" value=""></el-option>
            <el-option label="智能新能源汽车产业" value="智能新能源汽车产业"></el-option>
            <el-option label="航空航天产业" value="航空航天产业"></el-option>
            <el-option label="生物医药大健康产业" value="生物医药大健康产业"></el-option>
            <el-option label="智能装备" value="智能装备"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="filterReport.date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="填报状态：">
          <el-select v-model="filterReport.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="未填报" value="1"></el-option>
            <el-option label="未审核" value="2"></el-option>
            <el-option label="已退回" value="3"></el-option>
            <el-option label="通过" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地：">
          <el-select v-model="filterReport.area">
            <el-option label="顺义区" value="顺义区"></el-option>
            <el-option label="大兴区" value="大兴区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否规模企业：">
          <el-select v-model="filterReport.guimo">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="园区内外：">
          <el-select v-model="filterReport.inside">
            <el-option label="全部" value=""></el-option>
            <el-option label="园区内" value="园区内"></el-option>
            <el-option label="园区外" value="园区外"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 操作 -->
      <div class="operating">
        <el-button :disabled="disabledReport" type="primary" @click="submitReport">上报</el-button>
        <el-button @click="submitSave">保存</el-button>
        <el-button disabled="disabled">导入</el-button>
        <el-button disabled="disabled">导出</el-button>
        <el-button disabled="disabled">打印</el-button>
        <div style="float: right">
          <el-button type="primary" @click="searchData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </div>
      <div class="report-list-warp">
        <el-alert
          :title="'未填报共 ' + notReported + ' 项'"
          type="warning">
        </el-alert>
        <!-- 列表 -->
        <el-table
          v-loading="loading"
          :height="tableHeight"
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
            prop="name"
            width="220"
            show-overflow-tooltip
            label="企业名称" />  
          <el-table-column
            width="120"
            label="状态">
            <template slot-scope="scope">
              <span :class="+scope.row.status == 2 ? 'unreviewed' : +scope.row.status == 3 ? 'returned' : +scope.row.status == 4 ? 'pass' : 'not-reported'">{{ +scope.row.status == 2 ? '未审核' : +scope.row.status == 3 ? '已退回' : +scope.row.status == 4 ? '通过' : '未填报'}}</span>
            </template>
          </el-table-column>  
          <el-table-column
            width="220"
            label="统一社会信用代码">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.creditCode"></el-input>
            </template>
          </el-table-column>  
          <el-table-column
            width="150"
            label="注册资金（万元）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.registeredCapital"></el-input>
            </template>
          </el-table-column>  
          <el-table-column
            width="150"
            label="所属地区">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.area"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="260"
            label="所在园区">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.park"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="上缴税金（万元）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.payTaxes"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="用地面积（亩）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.landArea"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="工业总产值（万元）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.output"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="人均产值（万元）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.perCapita"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="240"
            label="单位产值能耗（吨标煤/万元）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.energyConsumption"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="R&D经费支出占比（%）">
            <template slot-scope="scope">
              <el-input :disabled="+scope.row.status === 4 ? true : false" v-model="scope.row.scale"></el-input>
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
  </div>
</template>

<script>
  import low from 'lowdb'
  import LocalStorage from 'lowdb/adapters/LocalStorage'

  export default {
    data() {
        return {
          filterReport: {
            name: '',
            industry: '',
            date: '',
            status: '',
            area: '',
            guimo: '',
            inside: ''
          },
          annualReportList: [],
          loading: false,
          pageSize: 10,
          pageIndex: 0,
          pageTotal: 0,
          disabledReport: true,
          selectionData: [],
          notReported: 0,
          alreadyPass: []
        }
    },
    computed:{
      tableHeight() {
        const bodyHeight = document.body.clientHeight - 382
        return bodyHeight ? bodyHeight : ''
      }
    },
    mounted() {
      // 拉数据
      this.getAnnualReportList(this.pageSize, this.pageIndex)
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
        let getData = null
        // json文件取
        this.$axios.get('/mock/annual/streetReport.json')
          .then(res => {
            let jsonData = res.data
            // LocalStorage取
            const adapter = new LocalStorage('annual')
            const annual = low(adapter)
            const newData = []
            if (annual.has('streetAnnualReportList').value()) {
              const _streetAnnualReportList = annual.get('streetAnnualReportList').value()
              let flag = false  // 是否已存josn已有数据
              jsonData.forEach((thisJson, index) => {
                _streetAnnualReportList.forEach(thisReport => {
                  if (thisJson.name === thisReport.name) {
                    flag = true
                  }
                })
              })
              if (flag) {
                getData = _streetAnnualReportList
              } else {
                getData = jsonData.concat(_streetAnnualReportList)
              }
            } else {
              getData = jsonData
            }
            this.processReportData(getData, pageSize, pageIndex, search)
          })
      },
      // 获取的数据处理
      processReportData(data, pageSize, pageIndex, search) {
        this.annualReportList = []
        this.notReported = 0
        data.forEach((thisData, index) => {
          if (+thisData.status === 4) {
            this.alreadyPass.push(thisData)
          } else {
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
        _this.annualReportList.forEach(thisReport => {
          if (+thisReport.status === 1) {
            _this.notReported ++
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
      // 保存
      submitSave() {
        const adapter = new LocalStorage('annual')
        const annual = low(adapter)
        // 把过滤掉已通过的数据也存进去
        if (this.alreadyPass.length > 0) {
          this.alreadyPass.forEach(thisPass => {
            this.annualReportList.push(thisPass)
          })
        }
        annual.set('streetAnnualReportList', this.annualReportList).write()
        this.getAnnualReportList(10, 0)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      },
      // 上报
      submitReport() {
        const adapter = new LocalStorage('annual')
        const annual = low(adapter)
        let flag = true
        this.selectionData.forEach(thisRow => {
          for (let i in thisRow) {
            if (thisRow[i] === '') {
              this.$message.error('所选上报企业存在空信息字段，完整信息企业已上报')
              flag = false
              break
            }
          }
          // 更改上报状态
          if (flag) {
            thisRow.isReport = true
            thisRow.status = '2'
          }
        })
        // 开始上报
        if (flag) {
          // 把过滤掉已通过的数据也存进去
          if (this.alreadyPass.length > 0) {
            this.alreadyPass.forEach(thisPass => {
              this.annualReportList.push(thisPass)
            })
          }
          annual.set('streetAnnualReportList', this.annualReportList).write()
          // 更新列表
          this.getAnnualReportList(10, 0)
          this.$message({
            message: '上报成功，请等待审核',
            type: 'success'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .annual-report{
    background-color: #ffffff;
    padding: 20px 0;
    background-color: #ffffff;
    padding: 20px 0;
    height: 100%;
    box-sizing: border-box;

    /deep/ .filter-report{
      width: 100%;

      .el-form-item{
        width: 25%;
        box-sizing: border-box;
        margin: 0 0 10px 0;

        .el-form-item__label{
          padding: 0;
        }

        .el-form-item__content{
          width: calc(100% - 120px);

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
  }
</style>