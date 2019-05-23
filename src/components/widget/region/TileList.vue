<template>
  <div class="tile-list">
    <div class="tile" 
      v-for="(item, index) in tileList" 
      :key="item.title" 
      :style="{backgroundColor: item.backgroundColor, marginRight: index === 5 || index === 11 ? '0px' : '1.5%'}">
      <h4>{{ item.title }}</h4>
      <div>
        <span class="number">{{ item.value }}</span>
        <span class="unit">{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tileList: []
    }
  },
  mounted () {
    this.$axios.get('/mock/region/regional-stat.json')
      .then(res => {
        this.tileList = res.data;
      })
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
.tile-list {
  display: flex;
  flex-wrap: wrap;
  
  .tile {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    width: 15.2%;
    height: 7.6%;
    color: #FFF;
    min-height: 100px;
    margin-right: 1.5%;
    margin-bottom: 20px;
    box-shadow: 0 2px 7px 5px rgba(0,0,0,0.04);
    background: center / cover no-repeat url(../../../assets/img/texture.svg);

    h4 {
      font-size: 14px;
      color: #FFFFFF;
      line-height: 1.33;
      margin-left: 15px;
    }

    .number {
      display: inline-block;
      font-size: 30px;
      line-height: 1.66;
      margin-left: 15px;
      margin-right: 2px; 
    }

    .unit {
      font-size: 14px;
    }
  }
}
</style>
