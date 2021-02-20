<template>
  <div ref="TagChart" class="chart" />
</template>
<script>
import * as echarts from 'echarts'
import { categoryProChartData } from '@/api/category'
import { tagProCharData } from '@/api/tag'
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
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data.map(v => v.name),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '文章数量',
            type: 'bar',
            barWidth: '60%',
            data: data.map(v => v.postCount)
          }
        ]
      }
      const dom = this.$refs['TagChart']
      const chart = echarts.init(dom)
      chart.setOption(option)
      chart.on('click', (params) => {
        const { dataIndex } = params
        this.$router.push({ name: 'postList', query: { tags: data[dataIndex].id }})
      })
    },
    // 获取数据
    getData() {
      return tagProCharData({ _limit: 20, _start: 0, _sort: 'postCount:desc' }).then(res => res.list)
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart {
    height: 380px;
  }
</style>
