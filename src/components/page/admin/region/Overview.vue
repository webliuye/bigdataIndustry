<template>
    <div class="wrapper">
        <el-row style="margin-bottom: 0">
            <el-col :span="24" class="col-cards">
                <tile-list />
                <regional-map />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TileList from  '@/components/widget/region/TileList.vue';
import RegionalMap from  '@/components/widget/region/RegionalMap.vue';
import bus from '@/components/common/bus';

export default {
  components: {
      TileList,
      RegionalMap
  },
  data () {
    return {

    }
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="less" scoped>
    .wrapper {
        overflow-y: auto;

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
    }
    .el-row {
        margin-bottom: 20px;
        .col-cards > * {
            margin-bottom: 20px;
        }
    }
</style>



