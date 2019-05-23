<template>
  <div class="content">
    <img
      src="@/assets/img/ended_green.svg"
      alt=""
    >
    <h2>完成</h2>
    <div class="text">
      <p>你可对本次评价结果进行保存！</p>
      <p>请到评价信息反馈中对企业进行告知、确认及信息公布！</p>
    </div>
    <p>
      <el-button
        type="primary"
        @click="goPath"
      >跳转至通知页面</el-button>
      <el-button @click="back">返回</el-button>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$emit('back')
    },
    goPath () {
      this.$router.push({ path: '/eval/notify' })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  text-align: center;
  padding: 10% 20%;
}
h2 {
  line-height: 60px;
}
.text {
  line-height: 22px;
  color: rgba(0, 0, 0, 0.43);
  margin-bottom: 24px;
}
</style>