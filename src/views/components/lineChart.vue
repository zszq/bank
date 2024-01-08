<script setup lang="ts">
import * as echarts from 'echarts/core'
import { GridComponent, type GridComponentOption, TooltipComponent } from 'echarts/components'
import { LineChart, type LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { onMounted, ref } from 'vue'

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, UniversalTransition])

type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>

onMounted(() => {
  drawChart()
})

let chartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | null = null
function drawChart() {
  myChart = myChart || echarts.init(chartRef.value as HTMLDivElement)
  let option: EChartsOption

  option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      min: 'dataMin'
    },
    grid: {
      left: 80,
      right: 20,
      top: 20,
      bottom: 20
    },
    series: [
      {
        data: [35000000, 43000000, 56000000, 58000000, 70000000, 78545872.71],
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#ED9122'
        }
      }
    ]
  }

  option && myChart.setOption(option)
}
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<style lang="scss" scoped></style>
