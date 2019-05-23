<template>
  <div style="padding-top:20px">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>园区数据统计</span>
      </div>
      <el-table
        :data="tableData"
        :header-row-style="{
            fontFamily: 'PingFangSC-Medium',
            fontSize: '12px',
            color:'rgba(0, 0, 0, 0.85)',
            lineHeight: '22px',
            background: '#fafafa',
            borderRadius: '4px 4px 0px 0px'
          }"
        style="width: 100%;font-size:12px;"
      >
        <el-table-column
          prop="sn"
          label="序号"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="园区名称"
        >
        </el-table-column>
        <el-table-column
          prop="enterpriseCount"
          label="企业总数(家)"
          width="80"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="area"
          label="规划面积
          (平方公里)"
          width="80"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="industryTotal"
          label="生产总值(万元)"
          width="80"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="acreTax"
          label="亩均税收(万元/亩)"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="capitaOutput"
          label="人均产值(万元)"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="unitEnergy"
          label="单位产值能耗(吨标煤/万元)"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="rdFunds"
          label="R&D经费占比(%)"
          width="100"
          header-align="center"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.$axios.get('/mock/region/regional-stat-list.json')
      .then(res => {
        this.tableData = res.data;
      })
  }
}
</script>
