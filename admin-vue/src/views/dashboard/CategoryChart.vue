<template>
  <div ref="TagChart" class="chart" />
</template>
<script>
import * as echarts from 'echarts'
import { categoryProChartData } from '@/api/category'
export default {
  data() {
    return {
      dataSync: null
    }
  },
  created() {
    this.dataSync = this.getData()
  },
  mounted() {
    this.initChart()
  },
  methods: {
    async initChart() {
      let data = await this.dataSync
      data = data.filter(v => v.postCount)
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '分类',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data.map(v => ({ value: v.postCount, name: v.name }))
          }
        ]
      }
      const dom = this.$refs['TagChart']
      const chart = echarts.init(dom)
      chart.setOption(option)
      chart.on('click', (params) => {
        const { dataIndex } = params
        this.$router.push({ name: 'postList', query: { category: data[dataIndex].id }})
      })
    },
    /**
     * 获取数据
     * @returns {Promise<{list: *}>}
     */
    getData() {
      return categoryProChartData({ _limit: 20, _start: 0, _sort: 'postCount:desc' }).then(res => {
        return res.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart {
    height: 380px;
  }
</style>
