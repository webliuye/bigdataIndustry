<template>
  <!-- 运行预警 -->
  <div class="warn-box">
    <avue-crud
      :data="data"
      :option="option"
      @search-change="searchChange"
    ></avue-crud>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          name: '北京福郁华混凝土有限公司顺义分公司',
          dateTime: '2019-01-07',
          caseNo: '(2019)京0113执339号',
          court: '北京市顺义区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2018)京0113民初31043号',
          description: '违反财产报告制度'
        },
        {
          name: '北京福郁华混凝土有限公司顺义分公司',
          dateTime: '2019-07-09',
          caseNo: '(2018)京03执638号',
          court: '北京市第三中级人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2018)京仲裁字第0744号',
          description: '违反企业劳动法'
        },
        {
          name: '北京福郁华混凝土有限公司顺义分公司',
          dateTime: '2019-03-01',
          caseNo: '(2018)京0112执2504号',
          court: '北京市通州区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2016)京0112民初28080号',
          description: '违反财产报告制度'
        },
        {
          name: '北京大梦科技有限公司',
          dateTime: '2019-03-27',
          caseNo: '(2019)京0108执7687号',
          court: '北京市海淀区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2019)京0108民初10576号',
          description: '违反财产报告制度'
        },
        {
          name: '北京大梦科技有限公司',
          dateTime: '2019-03-27',
          caseNo: '(2019)京0108执7683号',
          court: '北京市海淀区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2019)京0108民初14101号',
          description: '违反企业劳动法'
        },
        {
          name: '北京大梦科技有限公司',
          dateTime: '2019-03-26',
          caseNo: '(2019)京0108执7590号',
          court: '北京市海淀区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2019)京0108民初141号',
          description: '违反财产报告制度'
        },
        {
          name: '北京大梦科技有限公司',
          dateTime: '2019-03-21',
          caseNo: '(2019)京0108执7301号',
          court: '北京市海淀区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2019)京0108民初11269号',
          description: '违反财产报告制度'
        },
        {
          name: '北京大梦科技有限公司',
          dateTime: '2019-01-15',
          caseNo: '(2019)京0108执2615号',
          court: '北京市海淀区人民法院',
          filingTime: '2018-06-23',
          accordingNo: '(2018)京0108民初43287号',
          description: '违反财产报告制度'
        }
      ],
      page: {
        pageSizes: [10, 20, 50, 100],
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      option: {
        align: 'center',
        size: 'large',
        menuAlign: 'center',
        searchMenuSpan: 6,
        page: false,
        menu: false,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        refreshBtn: false,
        columnBtn: false,
        searchBtn: false,
        column: [
          {
            label: '企业名称',
            prop: 'name',
            search: true
          },
          {
            label: '时间',
            prop: 'dateTime'
          },
          {
            label: '案号',
            prop: 'caseNo'
          },
          {
            label: '执行法院',
            prop: 'court'
          },
          {
            label: '立案时间',
            prop: 'filingTime'
          },
          {
            label: '执行依据文号',
            prop: 'accordingNo'
          },
          {
            label: '具体情况',
            prop: 'description'
          }
        ]
      }
    };
  },
  methods: {
    searchChange (params) {
      this.$message.success('搜索数据' + JSON.stringify(params));
    },
  }
}
</script>

<style lang="less">
  .warn-box{
    height: 100%;

    .avue-crud{
      height: 100%;
      padding-bottom: 20px;

      .el-card{
        height: 100%;
        overflow-y: auto;
      }
    }
  }
</style>

