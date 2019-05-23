<template>
  <el-card class="box-card" style="height: 396px;">
    <div slot="header" class="clearfix">
      <span>我的待办</span>
      <div style="float: right; display: flex; padding: 3px 0" type="text">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div>
      <div v-for="(o, idx) in todoList" :key="idx" class="text item">
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
      todoList: [
        { 
          label: '报送公告发布',
          date: '2019-04-27'
        },
        { 
          label: '2018年度评价结果发布',
          date: '2019-04-27'
        },
        { 
          label: '评级反馈',
          date: '2019-04-27'
        },
        { 
          label: '数据问题反馈',
          date: '2019-04-27'
        },
        { 
          label: '北京临空经济核心区汇总上报',
          date: '2019-04-27'
        },
        { 
          label: '2018年度评价结果确认',
          date: '2019-04-26'
        },
        { 
          label: '最新评级反馈',
          date: '2019-04-26'
        },
        { 
          label: '北京临空经济核心区汇总上报',
          date: '2019-04-26'
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
      background: center / cover no-repeat url(../../../assets/img/home/待办.png);
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