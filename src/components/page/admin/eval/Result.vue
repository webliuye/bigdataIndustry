<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col
        :span="18"
        class="col-cards"
      >
        <proportion-card />
        <high-grade-card style="margin-bottom: 0;" />
      </el-col>
      <el-col
        :span="6"
        class="col-cards"
      >
        <enterprise-list />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProportionCard from '@/components/widget/eval/Proportion.vue';
import HighGradeCard from '@/components/widget/eval/HighGrade.vue';
import EnterpriseList from '@/components/widget/eval/Enterprise.vue';

export default {
  components: {
    ProportionCard,
    HighGradeCard,
    EnterpriseList
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  // height: calc(100vh - 40px);
  overflow-y: auto;
  &::-webkit-scrollbar-track-piece {
    background: #d3dce6;
  }
  &::-webkit-scrollbar {
    width: 0px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #99a9bf;
    border-radius: 20px;
  }
}
.el-row {
  //   margin-bottom: 20px;
  .col-cards {
    max-height: calc(100% - 120px);
  }
  .col-cards > * {
    margin-bottom: 20px;
  }
}
</style>



