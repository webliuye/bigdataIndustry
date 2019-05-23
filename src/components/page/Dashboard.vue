<template>
  <div class="wrapper">
    <div class="main">
      <el-row :gutter="20">
        <el-col
          :span="18"
          class="col-cards"
        >
          <map-card />
          <trend-card />
          <high-grade-card />
        </el-col>
        <el-col
          :span="6"
          class="col-cards"
        >
          <todo-card />
          <notify-card />
          <policy-card />
        </el-col>
      </el-row>
    </div>
    <footer>
      <div>
        <span>Copyright&copy;企业综合评价服务平台,All Rights Reserved | 备案号: 京ICP备16002195号-1</span>
      </div>
    </footer>
    <div class="shortcut-menu" :class="{'folded': isShortcutFolded}" v-if="isAdminRole">
      <span class="open" v-if="isShortcutFolded">
        <i class="icon-fold reverse" @click="onFoldClick"></i>
      </span>
      <dl>
        <dt>便捷导航<i class="icon-fold" @click="onFoldClick"></i></dt>
        <dd>
          <router-link to="/collect/task">
            <el-button
              size="large"
              type="primary"
              plain
            >任务管理</el-button>
          </router-link>
        </dd>
        <dd>
          <router-link to="/collect/report/typein">
            <el-button
              size="large"
              type="primary"
              plain
            >数据填报</el-button>
          </router-link>
        </dd>
        <dd>
          <router-link to="/collect/audit/annual">
            <el-button
              size="large"
              type="primary"
              plain
            >数据审核</el-button>
          </router-link>
        </dd>
        <dd>
          <router-link to="/eval/index">
            <el-button
              size="large"
              type="primary"
              plain
            >综合评价</el-button>
          </router-link>
        </dd>
        
        <dd>
          <router-link to="/eval/notify">
            <el-button
              size="large"
              type="primary"
              plain
            >信息反馈</el-button>
          </router-link>
        </dd>
        <dd>
          <router-link to="/region/overview">
            <el-button
              size="large"
              type="primary"
              plain
            >区域概览</el-button>
          </router-link>
        </dd>
        
        <dd>
          <router-link to="/region/query">
            <el-button
              size="large"
              type="primary"
              plain
            >综合查询</el-button>
          </router-link>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Schart from 'vue-schart';
import MapCard from '@/components/widget/dashboard/Map.vue';
import TrendCard from '@/components/widget/dashboard/Trend.vue';
import HighGradeCard from '@/components/widget/dashboard/HighGrade.vue';
import TodoCard from '@/components/widget/dashboard/TodoList.vue';
import NotifyCard from '@/components/widget/dashboard/Notification.vue';
import PolicyCard from '@/components/widget/dashboard/Policy.vue';
import bus from '../common/bus';
export default {
  name: 'dashboard',
  data () {
    return {
      isShortcutFolded: false,
      data: [{
        name: '2018/09/04',
        value: 1083
      },
      {
        name: '2018/09/05',
        value: 941
      },
      {
        name: '2018/09/06',
        value: 1139
      },
      {
        name: '2018/09/07',
        value: 816
      },
      {
        name: '2018/09/08',
        value: 327
      },
      {
        name: '2018/09/09',
        value: 228
      },
      {
        name: '2018/09/10',
        value: 1065
      }
      ],
      options: {
        title: '最近七天每天的用户访问量',
        showValue: false,
        fillColor: 'rgb(45, 140, 240)',
        bottomPadding: 30,
        topPadding: 30
      },
      options2: {
        title: '最近七天用户访问趋势',
        fillColor: '#FC6FA1',
        axisColor: '#008ACD',
        contentColor: '#EEEEEE',
        bgColor: '#F5F8FD',
        bottomPadding: 30,
        topPadding: 30
      }
    }
  },
  components: {
    Schart,
    MapCard,
    TrendCard,
    HighGradeCard,
    TodoCard,
    NotifyCard,
    PolicyCard
  },
  computed: {
    isAdminRole () {
      const userType = localStorage.getItem("userType");
      return userType === "admin";
    }
  },
  created () {
    this.handleListener();
    this.changeDate();
    bus.$emit('hideSidebar', true);
  },
  mounted () {
    document.querySelector('#app .content-box').style.padding = 0;
    document.querySelector('#app .content-box .content').style.height = '100%';
  },
  activated () {
    this.handleListener();
    bus.$emit('hideSidebar', true);
    document.querySelector('#app .content-box').style.padding = 0;
    document.querySelector('#app .content-box .content').style.height = '100%';
  },
  deactivated () {
    window.removeEventListener('resize', this.renderChart);
    bus.$off('collapse', this.handleBus);
    bus.$emit('hideSidebar', false);

    const box  = document.querySelector('#app .content-box');
    box.style.padding = '0 24px 24px 24px';

    const content = document.querySelector('#app .content-box .content');
    content.style.height = 'calc(100% - 38px)';
  },
  methods: {
    onFoldClick () {
      this.isShortcutFolded = !this.isShortcutFolded;
    },
    changeDate () {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      })
    },
    handleListener () {
      bus.$on('collapse', this.handleBus);
      // 调用renderChart方法对图表进行重新渲染
      window.addEventListener('resize', this.renderChart)
    },
    handleBus (msg) {
      setTimeout(() => {
        this.renderChart()
      }, 300);
    },
    renderChart () {
      //this.$refs.bar.renderChart();
      //this.$refs.line.renderChart();
    }
  }
}
</script>


<style lang="less" scoped>
.wrapper {
  overflow: auto;
  position: relative;
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }

  .main {
    margin: 40px auto;
    width: 1110px;
  }

  .shortcut-menu {
    position: fixed;
    width: 100px;
    height: 392px;
    top: 105px;
    right: 6px;
    background: #ffffff;
    border-radius: 2px;
    padding: 20px 10px;

    .open {
      position: absolute;
      display: block;
      width: 16px;
      height: 16px;
      padding: 0 2px;
      background: #FFF;
      border: 1px solid #DDD;
      margin-left: -32px;
    }
    .icon-fold {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-left: 24px;
      vertical-align: middle;
      cursor: pointer;
      background: center / cover no-repeat url(../../assets/img/home/折叠.png);

      &.reverse {
        transform:rotate(180deg);
        margin-left: 0;
      }
    }

    dt {
      margin-bottom: 20px;
    }
    dd {
      margin-bottom: 12px;
      text-align: center;
      .el-button {
        font-size: 14px;
      }

      .el-button--primary.is-plain {
        background: #fff;
        &:hover {
          background: #409EFF;
        }
      }
    }

    &.folded {
      margin-right: -126px;
    }
  }

  footer {
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background: #489ad3;
    text-align: center;
    div {
      span {
        font-size: 12px;
        font-weight: 300;
        color: #fff;
        line-height: 50px;
      }
    }
  }
}
.el-row {
  margin-bottom: 20px;
  .col-cards > * {
    margin-bottom: 20px;
  }
}
</style>
