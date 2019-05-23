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
        <el-button type="primary" :disabled="disabledFlag" @click="passReport('op')">通过</el-button>
        <el-button :disabled="disabledFlag" @click="returnReport('op')">退回</el-button>
        <el-button disabled="disabled">汇总上报</el-button>
        <el-button disabled="disabled">导出</el-button>
        <div style="float: right">
          <el-button type="primary" @click="searchData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </div>
      <div class="report-list-warp">
        <el-alert
          :title="'审核任务 '+ statusCount.all +' 项，通过： '+ statusCount.pass +' ，未审核： '+ statusCount.unreviewed +' ，已退回： '+ statusCount.returned"
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
            label="企业名称"
            width="220"
            show-overflow-tooltip
            prop="name"/>
          <el-table-column
            width="120"
            label="状态">
            <template slot-scope="scope">
              <span :class="+scope.row.status == 2 ? 'unreviewed' : +scope.row.status == 3 ? 'returned' : +scope.row.status == 4 ? 'pass' : ''">{{ +scope.row.status == 2 ? '未审核' : +scope.row.status == 3 ? '已退回' : +scope.row.status == 4 ? '通过' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="220"
            label="统一社会信用代码"
            show-overflow-tooltip
            prop="creditCode"/>
          <el-table-column
            width="150"
            label="注册资金（万元）"
            show-overflow-tooltip
            prop="registeredCapital"/>
          <el-table-column
            width="150"
            label="所属地区"
            show-overflow-tooltip
            prop="area"/>
          <el-table-column
            width="260"
            label="所在园区"
            show-overflow-tooltip
            prop="park"/>
          <el-table-column
            width="150"
            label="上缴税金（万元）"
            show-overflow-tooltip
            prop="payTaxes"/>
          <el-table-column
            width="150"
            label="用地面积（亩）"
            show-overflow-tooltip
            prop="landArea"/>
          <el-table-column
            width="150"
            label="工业总产值（万元）"
            show-overflow-tooltip
            prop="output"/>
          <el-table-column
            width="150"
            label="人均产值（万元）"
            show-overflow-tooltip
            prop="perCapita"/>
          <el-table-column
            width="240"
            label="单位产值能耗（吨标煤/万元）"
            show-overflow-tooltip
            prop="energyConsumption"/>
          <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button :class="+scope.row.status === 4 ? 'ly-gray' : ''" :disabled="+scope.row.status === 4" title="通过" type="text" @click="passReport(scope.row)"><img src="@/assets/img/pass.svg"></el-button>
              <el-button :class="+scope.row.status === 4 ? 'ly-gray' : ''" :disabled="+scope.row.status === 4" title="退回" type="text" @click="returnReport(scope.row)"><img src="@/assets/img/return.svg"></el-button>
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
          disabledFlag: true,
          selectionData: [],
          statusCount: {
            all: 0,
            pass: 0,
            unreviewed: 0,
            returned: 0
          }
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
        const adapter = new LocalStorage('annual')
        const annual = low(adapter)
        this.annualReportList = []
        if (annual.has('annualReportList').value()) {
          // LocalStorage有
          this.getReportData(annual.get('annualReportList').value(), pageSize, pageIndex, search)
        }
        // else {
        //   // json文件取
        //   this.$axios.get('/mock/annual/annualReport.json')
        //     .then(res => {
        //       // 过滤审核状态
        //       this.getReportData(res.data, pageSize, pageIndex, search)
        //     })
        // }
      },
      // 提交审核状态的数据
      getReportData(data, pageSize, pageIndex, search) {
        this.statusCount.all = 0
        this.statusCount.pass = 0
        this.statusCount.unreviewed = 0
        this.statusCount.returned = 0
        data.forEach((thisData, index) => {
          if (thisData.isReport) {
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
          _this.statusCount.all ++
          switch (+thisReport.status) {
            case 4:
              _this.statusCount.pass ++
              break
            case 2:
              _this.statusCount.unreviewed ++
              break
            case 3:
              _this.statusCount.returned ++
              break
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
          this.disabledFlag = false
        } else {
          this.disabledFlag = true
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
      // 通过上报
      passReport(row) {
        const adapter = new LocalStorage('annual')
        const annual = low(adapter)
        if (row !== 'op') {
          if (+row.status === 4) {
            this.$message.error('已审核通过的数据不能再操作')
            return
          } else{
            annual.get('annualReportList').find(row).assign({status: '4'}).write()
          }
        } else {
          this.selectionData.forEach(thisRow => {
            annual.get('annualReportList').find(thisRow).assign({status: '4'}).write()
          })
        }        
        // 更新列表
        this.getAnnualReportList(10, 0)
        this.$message({
          message: '审核通过成功',
          type: 'success'
        })
      },
      // 退回上报
      returnReport(row) {
        const adapter = new LocalStorage('annual')
        const annual = low(adapter)
        // 园区的数据
        const _streetAnnualReportList = annual.has('streetAnnualReportList').value() ? annual.get('streetAnnualReportList').value() : []
        if (row !== 'op') {
          if (+row.status === 4) {
            this.$message.error('已审核通过的数据不能再操作')
            return
          } else {
            // 经信委自己的退回
            annual.get('annualReportList').find(row).assign({status: '3'}).write()
            // 通知园区的退回
            _streetAnnualReportList.forEach(thisStreetData => {
              if (thisStreetData.id === row.id) {
                annual.get('streetAnnualReportList').find(thisStreetData).assign({status: '3', alreadyReported: false}).write()
              }
            })
          }
        } else {
          this.selectionData.forEach(thisRow => {
            // 经信委自己的退回
            annual.get('annualReportList').find(thisRow).assign({status: '3'}).write()
            // 通知园区的退回
            _streetAnnualReportList.forEach(thisStreetData => {
              if (thisStreetData.id === thisRow.id) {
                annual.get('streetAnnualReportList').find(thisStreetData).assign({status: '3', alreadyReported: false}).write()
              }
            })
          })
        }
        // 更新列表
        this.getAnnualReportList(10, 0)
        this.$message({
          message: '审核退回成功',
          type: 'success'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .annual-report{
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