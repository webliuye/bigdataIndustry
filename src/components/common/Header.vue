<template>
  <div
    class="header"
    :class="{'left-padding': addLeftPadding}"
  >
    <div class="wrapper">
      <div
        class="collapse-btn"
        @click="collapseChage"
      >
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">
        <img
          src="../../assets/img/logo.png"
          alt="企业综合评价服务平台"
        >
      </div>
      <ul
        class="nav-list"
        @click="onNavClick"
      >
        <li
          class="nav-item"
          data-route="/dashboard"
          :class="{'active': currentNav === '/dashboard'}"
        >
          <i class="icon-home"></i>
          <span>首页</span>
        </li>
        <li
          class="nav-item"
          data-route="/collect"
          :class="{'active': currentNav === '/collect'}"
          v-if="navItems.collect"
        >
          <i class="icon-collect"></i>
          <span>数据采集</span>
        </li>
        <li
          class="nav-item"
          data-route="/eval"
          :class="{'active': currentNav === '/eval'}"
          v-if="navItems.eval"
        >
          <i class="icon-evaluate"></i>
          <span>综合评价</span>
        </li>
        <li
          class="nav-item"
          data-route="/region"
          :class="{'active': currentNav === '/region'}"
          v-if="navItems.region"
        >
          <i class="icon-region"></i>
          <span>区域洞察</span>
        </li>
      </ul>
    </div>
          
          <div class="header-right">
            <div class="header-user-con">
              <!-- 全屏显示 -->
              <div class="btn-search" style="margin-right: 15px">
                <i class="el-icon-search"></i>
              </div>
              <!-- 消息中心 -->
              <div class="btn-bell">
                <i class="el-icon-bell"></i>
              </div>
            
              <!-- 用户头像 -->
              <div class="user-avator"><img :src="userPic"></div>
              <!-- 用户名下拉菜单 -->
              <el-dropdown
                class="user-name"
                trigger="click"
                @command="handleCommand"
              >
                <span class="el-dropdown-link">
                  {{username}} <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    divided
                    command="loginout"
                  >退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
        </div>
      </div>
  </div>
</template>
<script>
import bus from '../common/bus';
export default {
  data () {
    return {
      collapse: false,
      fullscreen: false,
      name: 'jingxin',
      message: 2,
      currentNav: '/dashboard',
      navItems: {
        collect: false,
        eval: false,
        region: false
      },
      addLeftPadding: true
    }
  },
  computed: {
    username () {
      let username = localStorage.getItem('userName');
      return username ? username : this.name;
    },
    userPic () {
      let userType = localStorage.getItem('userType');
      return userType ? require('@/assets/img/' + userType + '.svg') : require('@/assets/img/admin.svg')
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command == 'loginout') {
        localStorage.removeItem('menuData')
        localStorage.removeItem('userType')
        localStorage.removeItem('userName')
        this.$router.push('/login');
        window.location.reload(true)
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    onNavClick (evt) {
      if (evt.target && evt.target.nodeName === 'LI') {
        const route = evt.target.getAttribute('data-route');
        const userType = localStorage.getItem('userType');

        localStorage.setItem('currentNav', route);
        this.currentNav = route;
        this.$router.push(route);
        bus.$emit('route-change', route);
      }
    }
  },
  created () {
    bus.$on('hideSidebar', (isHideSidebar) => {
      this.addLeftPadding = isHideSidebar;
    });
    bus.$on('route-change', route => {
      this.currentNav = localStorage.getItem('currentNav');
    });
  },
  mounted () {
    const menuData = JSON.parse(localStorage.getItem('menuData'));
    for (let item of menuData) {
      const path = item.path.substr(1);
      this.navItems[path] = true;
    }
    this.currentNav = localStorage.getItem('currentNav');

    if (this.currentNav !== '/' && this.currentNav !== '/dashboard') {
      this.addLeftPadding = false;
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  color: #fff;
  font-size: 22px;
  background: #0c7fc6;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  padding-left: 20px;

  .nav-list {
    float: left;
    display: flex;
    list-style-type: none;
    font-size: 14px;
    padding: 10px;

    .nav-item {
      position: relative;
      margin: 0 40px;
      cursor: pointer;
      text-align: center;

      i {
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 auto 5px;
        pointer-events: none;
      }
      span {
        color: #fff;
        text-align: center;
        opacity: 0.7;
        pointer-events: none;
      }
      .icon-home {
        background: center / cover no-repeat url(../../assets/img/home/首页.png);
      }
      .icon-collect {
        background: center / cover no-repeat
          url(../../assets/img/home/数据采集.png);
      }
      .icon-evaluate {
        background: center / cover no-repeat
          url(../../assets/img/home/综合评价.png);
      }
      .icon-region {
        background: center / cover no-repeat
          url(../../assets/img/home/决策分析.png);
      }

      &.active {
        span {
          opacity: 1;
        }
        .icon-home {
          background-image: url(../../assets/img/home/首页_selected.png);
        }
        .icon-collect {
          background-image: url(../../assets/img/home/数据采集_selected.png);
        }
        .icon-evaluate {
          background-image: url(../../assets/img/home/综合评价_selected.png);
        }
        .icon-region {
          background-image: url(../../assets/img/home/决策分析_selected.png);
        }
      }
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  &.left-padding {
    .wrapper {
      margin: 0 auto;
      width: 920px;
    }
  }
}
.collapse-btn {
  padding: 0 21px;
  cursor: pointer;
  line-height: 64px;
  display: none;
}
.header .logo {
  width: 222px;
  height: 36px;
  margin-top: 16px;
  img {
    display: inline-block;
    max-width: 222px;
  }
}
.header-right {
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  // transform: rotate(45deg);
  margin-right: 10px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.el-dropdown-menu {
  padding: 0 0 5px;
}
.el-dropdown-menu__item--divided {
  margin-top: 0;
  border-top: none;
}
</style>
