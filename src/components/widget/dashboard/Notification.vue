<template>
  <el-card class="box-card" style="height: 480px;">
    <div slot="header" class="clearfix">
      <span>通知公告</span>
    <div style="float: right; display: flex; padding: 3px 0" type="text">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div>
      <div v-for="(o, idx) in messages" :key="idx" class="text item">
        <span class="label">{{ o.label }}</span>
        <span class="date">{{ o.date }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      messages: [
        { 
          label: '北京市经济和信息化局关于组织报送5G在工业互联网中应用进展情况的通知',
          date: '2019-04-27'
        },
        { 
          label: '北京市经济和信息化局关于对 《北京市公共数据管理办法（征求意见稿）》 征求意见的的函',
          date: '2019-04-26'
        },
        { 
          label: '关于征集大数据应用试点示范项目的通知',
          date: '2019-04-25'
        },
        { 
          label: '北京市经济和信息化局关于开展第22批北京市企业技术中心创建工作的通知',
          date: '2019-04-25'
        },
        { 
          label: '北京市经济和信息化局关于开展2019年度首台（套）重大技术装备保险补偿机制试点工作的预通知',
          date: '2019-04-24'
        },
        {
          label: '关于组织申报第三批国家工业遗产的通知',
          date: '2019-04-24'
        },
        {
          label: '北京市企业技术中心创建工作的通知',
          date: '2019-04-23'
        },
        {
          label: '北京市公共数据管理办法（征求意见稿）',
          date: '2019-04-23'
        },
        {
          label: '第22批北京市企业技术中心创建工作',
          date: '2019-04-23'
        },
        {
          label: '北京市企业技术中心创建工作的通知',
          date: '2019-04-22'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;

    &::before {
      content: ' ';
      position: absolute;
      display: inline-block;
      width: 18px;
      height: 18px;
      background: center / cover no-repeat url(../../../assets/img/home/通知.png);
    }

    .label {
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      margin-left: 24px;
    }
    .date {
      min-width: 100px;
      text-align: right;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>