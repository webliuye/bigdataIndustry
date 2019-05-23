<template>
  <div id="cloud-main" />
</template>

<script>
var echarts = require('echarts')
require('echarts-wordcloud')
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var chart = echarts.init(document.getElementById('cloud-main'))
      var box = document.getElementById('cloud-main')
      var width = box.clientWidth
      var height = box.clientHeight
      var rightLength = height > width ? width : height
      const getColor = () => {
        return Math.ceil(Math.random(100, 255) * 255)
      }
      var d_color = null
      const currentColor = (d) => {
        d_color = `rgb(${getColor()} ,${getColor()} , ${getColor()})`
        d.colors = d_color
        return d_color
      }

      var option = {
        tooltip: {
          show: true,
          formatter: "{b}"
        },
        series: [{
          type: 'wordCloud',
          gridSize: 6,
          sizeRange: [10, 32],
          rotationRange: [0, 0],
          rotationStep: 0,
          shape: 'circle',
          // maskImage: '',
          width: width,
          height: height,
          drawOutOfBound: false,
          textStyle: {
            normal: {
              color: function (d) {
                return currentColor(d)
              }
            },
            emphasis: {
              shadowBlur: 5,
              textShadowOffsetX: 0,
              textShadowOffsetY: 2,
              shadowColor: '#ddd'
            }
          },
          data: this.list.map(e => { return { name: e.tag, value: e.count } })
        }]
      }
      chart.setOption(option)
      chart.on('click', params => { this.$emit('preview', { dataResourceCompilationId: params.data.value }) })
      window.onresize = chart.resize
    }
  }

}
</script>

<style lang="less" scoped>
#cloud-main {
  // border: 1px solid #ddd;
  canvas {
    border-radius: 100%;
  }
  border-radius: 100%;
}
</style>