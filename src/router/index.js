import Vue from 'vue'
import Router from 'vue-router'
import bus from '../components/common/bus'

Vue.use(Router)

let userType = localStorage.getItem('userType')
bus.$on('user-change', ut => {
  userType = ut
})

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '首页' },
      children: [
        {
          path: `/dashboard`,
          component: resolve =>
            require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: `/collect`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/index.vue`
            ], resolve),
          meta: { title: '数据采集' },
          redirect: { path: '/collect/task' }
        },
        {
          path: `/collect/task`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/Task.vue`
            ], resolve),
          meta: { title: '任务管理' }
        },
        {
          path: `/collect/fillin`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/Fillin.vue`
            ], resolve),
          meta: { title: '数据填报' }
        },
        {
          path: `/collect/report/annual`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/Annual.vue`
            ], resolve),
          meta: { title: '企业信息年报填报' }
        },
        {
          path: `/collect/report/typein`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/Typein.vue`
            ], resolve),
          meta: { title: '工作数据平台录入' }
        },
        {
          path: `/collect/audit/annual`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/AnnualAudit.vue`
            ], resolve),
          meta: { title: '企业信息年报审核' }
        },
        {
          path: `/collect/audit/typein`,
          component: resolve =>
            require([
              `../components/page/${userType}/collect/TypeinAudit.vue`
            ], resolve),
          meta: { title: '工作数据平台录入审核' }
        },
        {
          path: `/eval`,
          component: resolve =>
            require([`../components/page/${userType}/eval/index.vue`], resolve),
          meta: { title: '综合评价' }
        },
        {
          path: `/eval/index`,
          component: resolve =>
            require([`../components/page/${userType}/eval/index.vue`], resolve),
          meta: {
            title: '企业综合评价'
          }
        },
        {
          path: `/eval/notify`,
          component: resolve =>
            require([
              `../components/page/${userType}/eval/Notify.vue`
            ], resolve),
          meta: { title: '评价信息告知' }
        },
        {
          path: `/eval/result`,
          component: resolve =>
            require([
              `../components/page/${userType}/eval/Result.vue`
            ], resolve),
          meta: { title: '评价结果总览' }
        },
        {
          path: `/eval/confirm`,
          component: resolve =>
            require([`../components/page/${userType}/eval/index.vue`], resolve),
          meta: { title: '评价信息确认' }
        },
        {
          path: `/region`,
          component: resolve =>
            require([
              `../components/page/${userType}/region/index.vue`
            ], resolve),
          meta: { title: '区域洞察' },
          redirect: { path: '/region/overview' }
        },
        {
          path: `/region/overview`,
          component: resolve =>
            require([
              `../components/page/${userType}/region/Overview.vue`
            ], resolve),
          meta: { title: '区域概览' }
        },
        {
          path: `/region/query`,
          component: resolve =>
            require([
              `../components/page/${userType}/region/Query.vue`
            ], resolve),
          meta: { title: '企业综合查询' }
        },
        {
          path: `/region/warn`,
          component: resolve =>
            require([
              `../components/page/${userType}/region/Warn.vue`
            ], resolve),
          meta: { title: '运行预警' }
        },
        {
          path: '/404',
          component: resolve =>
            require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
