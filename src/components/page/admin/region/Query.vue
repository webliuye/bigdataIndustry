<template>
  <!-- 企业综合查询 -->
  <div
    class="scrollBar query-box"
    style="height: 100%; overflow: auto;"
  >
    <avue-crud
      v-if="!isShowImage && !isShowHealth"
      :data="tableData"
      :option="tableOpts"
      @search-reset="searchReset"
      @search-change="searchChange"
    >
      <template slot="search">
        <el-row>
          <el-col :span="5">
            <label>所属行业:</label>
            <el-select
              v-model="search.business"
              placeholder="全部"
            >
              <el-option
                v-for="(biz, idx) in lstBusiness"
                :key="idx"
                :label="biz.label"
                :value="biz.value"
              />
            </el-select>
          </el-col>

          <el-col :span="5">
            <label>所属区域:</label>
            <el-select
              v-model="search.area"
              placeholder="全部"
              
            >
              <el-option
                v-for="(area, idx) in lstArea"
                :key="idx"
                :label="area.label"
                :value="area.value"
              />
            </el-select>
          </el-col>
          <el-col :span="5">
            <label>企业类型:</label>
            <el-select
              v-model="search.type"
              placeholder="全部"
              
            >
              <el-option
                v-for="(type, idx) in lstType"
                :key="idx"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-col>
          <el-col :span="5">
            <label>评估结果:</label>
            <el-select
              v-model="search.evalResult"
              placeholder="全部"
              
            >
              <el-option
                v-for="(ret, idx) in lstEvalResult"
                :key="idx"
                :label="ret.label"
                :value="ret.value"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <label>标签类型:</label>
            <el-select
              v-model="search.tagType"
              placeholder="全部"
              
            >
              <el-option
                v-for="(tag, idx) in lstTag"
                :key="idx"
                :label="tag.label"
                :value="tag.value"
              />
            </el-select>
          </el-col>
        </el-row>

        <el-form-item label="">
          <el-input
            style="width: 260px"
            v-model="search.name"
            placeholder="请输入企业名称"
            
          />
        </el-form-item>
      </template>

      <template
        slot-scope="scope"
        slot="name"
      >
        <section class="table-row">
          <b
            class="grade"
            :class="{['grade-' + scope.row.grade]:  true}"
          >{{ scope.row.grade }}</b>

          <div class="flex-row">
            <div class="flex-item">
              <span class="title">{{ scope.row.name }}</span>
              <ul class="tags">
                <li
                  v-for="(tag, index) in scope.row.tags"
                  :key="index"
                >
                  <i
                    class="icon-tag"
                    :class="{['icon-' + tag.icon]:  true}"
                  ></i>
                  <span>{{ tag.name }}</span>
                </li>
              </ul>
            </div>

            <div class="flex-item">
              <ul class="indices">
                <li
                  v-for="(item, index) in scope.row.indices"
                  :key="index"
                >
                  <i class="rect"></i>
                  <span>{{ item.name }}</span>
                  <span>{{ item.value }}{{ item.unit }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="operation">
            <el-button
              class="btn-image"
              @click="showImage"
            >企业画像</el-button>
            <el-button
              class="btn-health"
              @click="showHealth"
            >企业体检</el-button>
          </div>
        </section>
      </template>
    </avue-crud>

    <enterprise-image v-if="isShowImage">

    </enterprise-image>

    <enterprise-health v-if="isShowHealth">

    </enterprise-health>

    
  </div>
</template>


<script>
import bus from '@/components/common/bus';
import EnterpriseImage from '@/components/widget/region/EnterpriseImage';
import EnterpriseHealth from '@/components/widget/region/EnterpriseHealth';

export default {
  components: {
    EnterpriseImage,
    EnterpriseHealth
  },
  data () {
    return {
      isShowImage: false,
      isShowHealth: false,
      search: {
        name: '',
        business: '',
        area: '',
        type: '',
        evalResult: '',
        tagType: ''
      },
      tableData: [],
      originalData: [],
      tableOpts: {
        page: false,
        size: 'large',
        menu: false,
        align: 'center',
        menuAlign: 'center',
        searchMenuSpan: 12,
        addBtn: false,
        editBtn: false,
        delBtn: false,
        refreshBtn: false,
        columnBtn: false,
        searchBtn: false,
        showHeader: false,
        column: [
          {
            label: '企业名称',
            prop: 'name',
            minWidth: '100%',
            solt: true
          },
          {
            label: '所属行业',
            prop: 'business',
            hide: true
          },
          {
            label: '所属区域',
            prop: 'area',
            hide: true
          }
        ]
      },
      lstBusiness: [
        {label: "智能新能源汽车产业", value: "智能新能源汽车产业"},
        {label: "航空航天产业", value: "航空航天产业"},
        {label: "生物医药大健康产业", value: "生物医药大健康产业"},
        {label: "智能装备", value: "智能装备"}
      ],
      lstArea: [
        {label: "中关村科技园区顺义园", value: "中关村科技园区顺义园"},
        {label: "顺义区北石槽镇中北工业区", value: "顺义区北石槽镇中北工业区"},
        {label: "天竺空港工业区", value: "天竺空港工业区"},
        {label: "顺义马坡聚源工业区", value: "顺义马坡聚源工业区"},
        {label: "顺义区牛栏山工业区", value: "顺义区牛栏山工业区"}
      ],
      lstType: [
        {label: "A类", value: "A"},
        {label: "B类", value: "B"},
        {label: "C类", value: "C"},
        {label: "D类", value: "D"}
      ],
      lstEvalResult: [],
      lstTag: []
    };
  },
  created () {
    bus.$on('back-region-query', this.goHome);
  },
  mounted () {
    this.$axios.get('/mock/region/enterprise-query-list.json')
      .then(res => {
        this.tableData = res.data;
        this.originalData = res.data;
      })
  },
  destroyed () {
    bus.$off('back-region-query', this.goHome);
  },
  methods: {
    searchChange (params) {
      const list = [];
      const dict = new Map();

      if (this.search.name) {
        const qname = this.search.name;        
        this.tableData.forEach(it => {
          if (it.name.indexOf(qname) !== -1) {
            dict.set(it.name, true);
            list.push(it);
          }
        });
      }

      if (this.search.business) {
        const biz = this.search.business;        
        this.tableData.forEach(it => {
          if (it.tags[1].name === biz && !dict.has(it.name)) {
            dict.set(it.name, true);
            list.push(it);
          }
        });
      }

      if (this.search.type) {
        const type = this.search.type;        
        this.tableData.forEach(it => {
          if (it.grade === type && !dict.has(it.name)) {
            dict.set(it.name, true);
            list.push(it);
          }
        });
      }

      if (this.search.area) {
        const area = this.search.area;        
        this.tableData.forEach(it => {
          if (it.area === area && !dict.has(it.name)) {
            dict.set(it.name, true);
            list.push(it);
          }
        });
      }

      if (dict.keys()) {
        this.tableData = list;
      }
    },
    searchReset () {
      this.search = {};
      this.tableData = this.originalData;
    },
    goHome () {
      this.isShowImage = false;
      this.isShowHealth = false;
    },
    showImage () {
      this.isShowHealth = false;
      this.isShowImage = true;
    },
    showHealth () {
      this.isShowImage = false;
      this.isShowHealth = true;
    }
  }
}
</script>

<style lang="less" scoped>
.query-box{
  .el-form{
    .el-select{
      width: calc(100% - 72px);
    }
  }
}
.avue-crud{
  height: 100%;

  /deep/ .el-card{
    height: 100%;
    box-sizing: border-box;
    .el-card__body {
        padding: 20px;
        height: 100%;
        .el-table {
          height: 100%;
          /deep/ .el-table__body-wrapper {
            height: calc(100% - 160px);
            overflow: auto;
            overflow-x: hidden;
          }
        }
    }
  }
}

.el-row {
  margin-bottom: 20px;

  .el-col {
    display: flex;
    align-items: center;
    label {
      min-width: 72px;
    }
    .el-select {
      margin-right: 25px;
    }
  }
}
.table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: 8px 0;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }
  .grade {
    display: block;
    width: 48px;
    height: 48px;
    line-height: 48px;
    background: #f0f0f0;
    border-radius: 4px;
    margin: 0 20px 0 0;
    text-align: center;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.97);

    &.grade-A {
      background: #f2637b;
    }
    &.grade-B {
      background: #13c2c2;
    }
    &.grade-C {
      background: #f0b23b;
    }
    &.grade-D {
      background: #3aa0ff;
    }
  }
  .flex-row {
    flex-grow: 1;
    .flex-item {
      display: flex;
      align-items: center;
      line-height: 2.33;

      .title {
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
        text-align: left;
        line-height: 22px;
      }
      .tags {
        li {
          margin-right: 15px;
        }
        .icon-tag {
          display: inline-block;
          vertical-align: middle;
          width: 12px;
          height: 12px;
          margin: 0 6px 0 12px;

          &.icon-company,
          &.icon-business {
            background: center / cover no-repeat
              url(../../../../assets/img/tag-green.svg);
          }
        }
        span {
          font-size: 14px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.85);
          text-align: left;
          line-height: 22px;
        }
      }

      .indices {
        li {
          margin-right: 12px;

          .rect {
            display: inline-block;
            width: 7px;
            height: 7px;
            background: #3aa0ff;
            margin-right: 4px;
          }

          span {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.65);
            text-align: left;
            line-height: 22px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .operation {
    min-width: 175px;
    .el-button {
      font-size: 14px;
      font-weight: 700;
      line-height: 22px;
      padding: 4px 12px;
    }
    .btn-image {
      background: #e6f7ff;
      border: 1px solid #91d5ff;
      color: #1890ff;
    }
    .btn-health {
      background: #fff0f6;
      border: 1px solid #ffadd2;
      color: #eb2f96;
    }
  }
}
</style>
