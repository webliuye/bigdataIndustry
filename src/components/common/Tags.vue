<template>
  <div
    class="tags"
    v-if="showBreadcrumbs"
  >
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in breadcrumbs"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link
          :to="item.path"
          class="tags-li-title"
          v-if="item.path"
        >
          <span class="nav-link">{{item.title}}</span>
        </router-link>
        <span
          class="nav-link"
          @click="emitEvent(item.event)"
          v-else-if="item.event"
        >
          {{item.title}}
        </span>
        <span
          class="nav-link disabled"
          v-else
        >
          {{item.title}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from './bus';
import { SET_BREADCRUMBS } from '@/utils/constants';

export default {
  data () {
    return {
      tagsList: [],
      breadcrumbs: []
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push('/');
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = [];
      this.$router.push('/');
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      })
      this.tagsList = curItem;
    },
    // 设置标签
    setTags (route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList);

      const trackList = [];
      const menuList = JSON.parse(localStorage.getItem('menuData'));
      if (route.fullPath !== '/' && route.fullPath !== '/dashboard' && menuList) {
        for (let item of menuList) {
          if (item.path === route.fullPath) {
            trackList.push({ title: item.label });
            break;
          }
          if (item.children) {
            for (let child of item.children) {
              if (child.path === route.fullPath) {
                trackList.push({ title: item.label });
                trackList.push({ title: child.label });
                break;
              }
              if (child.children) {
                for (let c of child.children) {
                  if (c.path === route.fullPath) {
                    trackList.push({ title: item.label });
                    trackList.push({ title: child.label });
                    trackList.push({ title: c.label });
                    break;
                  }
                }
              }
            }
          }
        }
      }
      bus.$emit(SET_BREADCRUMBS, trackList);
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll();
    },
    emitEvent (eventType) {
      bus.$emit(eventType);
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0;
    },
    showBreadcrumbs () {
      return this.breadcrumbs.length > 0;
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue);
      localStorage.setItem('currentNav', '/' + newValue.fullPath.split('/')[1]);
      bus.$emit('route-change', newValue.fullPath);
    }
  },
  created () {
    this.setTags(this.$route);

    bus.$on(SET_BREADCRUMBS, breadcrumbs => {
      this.breadcrumbs = [];
      if (Array.isArray(breadcrumbs) && breadcrumbs.length) {
        this.breadcrumbs = breadcrumbs.slice(0);
      }
      console.log(this.breadcrumbs)
    })

  },
  mounted () {
    this.setTags(this.$route);
  }
}

</script>


<style lang="less" scoped>
.tags {
  position: relative;
  height: 40px;
  line-height: 1;
  overflow: hidden;
  padding-right: 120px;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  li:last-child {
    color: #272727;
  }

  .tags-li {
    float: left;
    font-size: 14px;
    overflow: hidden;
    list-style-type: none;
    height: 40px;
    line-height: 40px;
    padding: 0 2px;
    vertical-align: middle;
    color: #888888;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;

    .nav-link {
      cursor: pointer;
      &.disabled {
        cursor: default;
      }
      &::after {
        content: '/';
        cursor: default;
        display: inline-block;
        width: 8px;
        padding-left: 8px;
      }
    }
  }

  .tags-li:last-child {
    .nav-link {
      cursor: default;
      &::after {
        display: none;
      }
    }
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li.active {
    color: #fff;
  }

  .tags-li-title {
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
}
</style>
