<template>
  <div
    ref="graph"
    class="graph-chart"
    style="height: 240px;"
  ></div>
</template>

<script>
export default {
  data () {
    return {
      graph: null
    }
  },
  mounted () {
    this.graph = this.$echarts.init(this.$refs.graph);
    this.initGraph();
  },
  methods: {
    initGraph () {
      const adata = [
        {
          name: "陆群 董事长",
          value: 300,
          children: [
            {
              name: "王克坚 总裁",
              value: 200,
              children: [
                {
                  name: "姚华 副总裁",
                  value: 150
                },
                {
                  name: "吴欢 副总裁",
                  value: 150
                },
                {
                  name: "王立新 董事会秘书",
                  value: 150
                }
              ]
            },
            {
              name: "吴燕民 董事",
              value: 200
            },
            {
              name: "孙百汇 董事",
              value: 200
            },
            {
              name: "李汉生 董事",
              value: 200
            },
            {
              name: "沈祥超 监事会主席",
              value: 200,
              children: [
                { name: "李然 监事", value: 100 },
                { name: "戴明 监事", value: 100 },
                { name: "刘艳 职工监事", value: 100 },
                { name: "郭峰 职工监事", value: 100 }
              ]
            }
          ]
        }
      ];

      const option = {
        backgroundColor: '#FFF',
        tooltip: {
          formatter: function (params) {
            const dat = params.data;
            return `${dat.name} ${dat.category}`;
          }
        },
        animationDuration: 1500,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '股权结构',
            type: 'graph',
            layout: 'force',
            focusNodeAdjacency: true,
            zoom: .6,
            force: {
              repulsion: 1000,
              edgeLength: 20
            },
            label: {
              normal: {
                show: true
              }
            },
            symbolSize: 60,
            edgeSymbolSize: [4, 10],
            roam: true,
            data: [
              {
                "name": "陆群",
                "symbolSize": 88,
                "symbol": "path://M300,150 225,280 75,280 0,150 75,20 225,20z",
                "symbolKeepAspect": true,
                "draggable": "true",
                "category": "董事长",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(0,118,255,0.28)',
                    borderWidth: 8,
                    color: '#007AFF'
                  }
                },
                label: {
                  fontSize: 16
                }
              },
              {
                name: '王克坚',
                "symbolSize": 62,
                "draggable": "true",
                "category": "董事",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(240,178,59,0.28)',
                    borderWidth: 8,
                    color: '#F0B23B'
                  }
                },
                label: {
                  fontSize: 14
                }
              },
              {
                "name": "吴燕民",
                "symbolSize": 62,
                "draggable": "true",
                "category": "董事",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(0,122,255,0.28)',
                    borderWidth: 8,
                    color: '#007AFF'
                  }
                },
                label: {
                  fontSize: 14
                }
              },
              {
                "name": "孙百汇",
                "symbolSize": 62,
                "draggable": "true",
                "category": "董事",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(0,122,255,0.28)',
                    borderWidth: 8,
                    color: '#007AFF'
                  }
                },
                label: {
                  fontSize: 14
                }
              },
              {
                "name": "李汉生",
                "symbolSize": 62,
                "draggable": "true",
                "category": "董事",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(0,122,255,0.28)',
                    borderWidth: 8,
                    color: '#007AFF'
                  }
                },
                label: {
                  fontSize: 14
                }
              },
              {
                "name": "沈祥超",
                "symbolSize": 62,
                "draggable": "true",
                "category": "监事会主席",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(240,178,59,0.28)',
                    borderWidth: 8,
                    color: '#F0B23B'
                  }
                },
                label: {
                  fontSize: 14
                }
              },
              {
                "name": "姚华",
                "symbolSize": 30,
                "draggable": "true",
                "category": "副总裁",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(19,194,194,0.28)',
                    borderWidth: 8,
                    color: '#13C2C2'
                  }
                },
                label: {
                  fontSize: 12
                }
              },
              {
                "name": "吴欢",
                "symbolSize": 30,
                "draggable": "true",
                "category": "副总裁",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(19,194,194,0.28)',
                    borderWidth: 8,
                    color: '#13C2C2'
                  }
                },
                label: {
                  fontSize: 12
                }
              },
              {
                "name": "王立新",
                "symbolSize": 30,
                "draggable": "true",
                "category": "董事会秘书",
                itemStyle: {
                  normal: {
                    borderColor: 'rgba(19,194,194,0.28)',
                    borderWidth: 8,
                    color: '#13C2C2'
                  }
                },
                label: {
                  fontSize: 12
                }
              },
            ],
            links: [
              {
                "source": "陆群",
                "target": "王克坚",
                lineStyle: {
                  normal: {
                    color: '#007AFF'
                  }
                }
              },
              {
                "source": "陆群",
                "target": "吴燕民",
                lineStyle: {
                  normal: {
                    color: '#007AFF'
                  }
                }
              },
              {
                "source": "陆群",
                "target": "孙百汇",
                lineStyle: {
                  normal: {
                    color: '#007AFF'
                  }
                }
              },
              {
                "source": "陆群",
                "target": "李汉生",
                lineStyle: {
                  normal: {
                    color: '#007AFF'
                  }
                }
              },
              {
                source: '陆群',
                target: '沈祥超',
                lineStyle: {
                  normal: {
                    color: '#007AFF'
                  }
                }
              },
              {
                source: '王克坚',
                target: '姚华',
                lineStyle: {
                  normal: {
                    color: '#13C2C2'
                  }
                }
              },
              {
                source: '王克坚',
                target: '吴欢',
                lineStyle: {
                  normal: {
                    color: '#13C2C2'
                  }
                }
              },
              {
                source: '王克坚',
                target: '王立新',
                lineStyle: {
                  normal: {
                    color: '#13C2C2'
                  }
                }
              }
            ],
            categories: [
              {
                'name': '董事长'
              },
              {
                'name': '董事'
              },
              {
                name: '总裁'
              },
              {
                'name': '副总裁'
              },
              {
                name: '监事会主席'
              }
            ],
            lineStyle: {
              normal: {
                width: 1,
                curveness: 0
              }
            }
          }
        ]
      };
      this.graph.setOption(option);
    }
  }
}
</script>
