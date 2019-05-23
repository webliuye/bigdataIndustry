<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu
            :index="item.index"
            :key="item.index"
          >
            <template slot="title">
              <img
                v-if="item.icon"
                :src="icons(item)"
                alt=""
              ><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <img
              v-if="item.icon"
              :src="icons(item)"
              alt=""
            >
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';

const generateUUID = () => {
  return (
    S4() + S4() + S4()
  )
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
}

export default {
  data () {
    return {
      collapse: false,
      items: []

    }
  },
  computed: {
    onRoutes () {
      return this.$route.path;
    }
  },
  created () {
    const menuData = JSON.parse(localStorage.getItem('menuData'));

    if (menuData) {
      this.onMenuData(menuData);
    }

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    });
    // bus.$on('menu-data', this.onMenuData);

    bus.$on('route-change', route => {
      this.onMenuData(menuData);
    });
  },
  methods: {
    icons (item) {
      const getIcon = (name) => {
        return (this.onRoutes === item.index) ? require('@/assets/img/icons/' + name + '.svg') : require('@/assets/img/icons/' + name + '_blue.svg')
      }
      return getIcon(item.icon)
    },
    onMenuData (data) {
      this.items = [];

      const currentNav = localStorage.getItem('currentNav');
      const navItem = data.find(c => c.path === currentNav);

      if (!navItem) {
        return;
      }

      const { children } = navItem;

      if (children) {
        for (let child of children) {
          const sub = {
            index: child.path,
            title: child.label,
            icon: child.icon
          };
          if (child.children) {
            sub.subs = [];
            for (let c of child.children) {
              sub.subs.push({
                index: c.path,
                title: c.label,
                icon: c.icon
              });
            }
          }
          this.items.push(sub);
        }
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  background: rgba(213, 236, 250, 1);
  display: block;
  position: absolute;
  left: 0;
  top: 64px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 214px;
  background: rgba(213, 236, 250, 1);
}
.sidebar > ul {
  height: 100%;
}
img {
  padding-right: 8px;
}
.el-menu-item.is-active {
  color: #ffffff;
  background: #43A7E2;
}
</style>
