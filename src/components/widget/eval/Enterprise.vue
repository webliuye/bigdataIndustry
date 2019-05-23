<template>
  <el-card class="box-card">
    <div>
      <div
        v-for="o in enterprises"
        :key="o.title"
        class="text item"
      >
        <div class="item">
          <h4>{{ o.title }}</h4>
          <div class="ltr">
            <div>
              <div class="row">
                <span class="label">上期总数</span> <span class="value">{{ o.previous }}家</span>
              </div>
              <div class="row">
                <span class="label">本期总数</span>
                <span class="value">{{ o.current }}家</span>
              </div>
            </div>
            <span class="number">{{ Math.abs(o.precent) }}</span>
            <i
              class="icon-arrow"
              :class="{'icon-up' : o.precent > 0, 'icon-down': o.precent < 0}"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      enterprises: [
        {
          title: '总企业数量',
          previous: 10979,
          current: 11048,
          precent: 9
        },
        {
          title: '升档企业',
          previous: 380,
          current: 379,
          precent: 0
        },
        {
          title: '降档企业',
          previous: 15,
          current: 32,
          precent: 0
        },
        {
          title: 'A类企业',
          previous: 1325,
          current: 1499,
          precent: 0
        },
        {
          title: 'B类企业',
          previous: 6051,
          current: 6130,
          precent: 0
        },
        {
          title: 'C类企业',
          previous: 2302,
          current: 2205,
          precent: 0
        },
        {
          title: 'D类企业',
          previous: 1301,
          current: 1214,
          precent: 0
        }
      ]
    }
  },
  created () {
    this.enterprises.forEach(it => {
      it.precent = it.current - it.previous
    })
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-top: 10px;
  border-bottom: 1px solid #e9e9e9;
  height: 100px;
  over h4 {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 2;
  }
  .ltr {
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .row {
      width: 140px;
      line-height: 24px;
    }
    .label {
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
      width: 50%;
      line-height: 24px;
      text-align: left;
    }
    .value {
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
      width: 50%;
      line-height: 24px;
      text-align: left;
    }
    .number {
      font-size: 20px;
    }
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
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
  height: 790px;
  overflow: auto;
  .icon-arrow {
    &.icon-up::before {
      content: ' ';
      display: inline-block;
      width: 18px;
      height: 20px;
      background: center / cover no-repeat url(../../../assets/img/up.svg);
    }
    &.icon-down::before {
      content: ' ';
      display: inline-block;
      width: 18px;
      height: 20px;
      background: center / cover no-repeat url(../../../assets/img/down.svg);
    }
  }
}
</style>