<template>
  <el-card class="box-card" style="height: 396px;">
    <div slot="header" class="clearfix">
      <span>政策法规</span>
    <div style="float: right; display: flex; padding: 3px 0" type="text">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div>
      <div v-for="o in policies" :key="o.label" class="text item">
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
      policies: [
        { 
          label: '工业和信息化部关于印发《工业互联网网络建设及推广指南》的通知',
          date: '2019-01-23'
        },
        { 
          label: '北京市经济和信息化局关于印发《北京市5G产业发展行动方案（2019年-2022年）》的通知',
          date: '2019-01-22'
        },
        { 
          label: '北京市经济和信息化局关于印发《北京市城镇集体企业清产核资产权界定工作暂行办法》（试行）的通知',
          date: '2019-01-15'
        },
        { 
          label: '北京市经济和信息化局关于印发北京市智能制造关键技术装备供应商推荐目录（2018）的通知',
          date: '2019-01-10'
        },
        { 
          label: '工业和信息化部关于印发《无线电干扰投诉和查处工作实施细则》的通知',
          date: '2018-10-22'
        },
        { 
          label: '北京市经济和信息化委员会 北京市食品 药品监督管理局 北京市中医管理局关于印发《北京市中药产业智能绿色发展 示范工程实施方案》的通知',
          date: '2018-09-29'
        },
        { 
          label: '关于印发《北京市关于加快推进自动驾驶车辆道路测试有关工作的指导意见（试行）》的通知',
          date: '2018-08-09'
        },
        { 
          label: '北京市财政局 北京市科学技术委员会 北京市经济和信息化委员会关于调整完善北京市新能源汽车推广应用财政补助政策的通知',
          date: '2018-08-07'
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
    .label {
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
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