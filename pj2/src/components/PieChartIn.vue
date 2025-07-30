<template>
  <!-- 包含 earth 模块和饼图容器的结构，假设 .earth 是已有样式的容器 -->
  <div class="earth">
    <h3 style="color: aliceblue;">年轻人兴趣爱好数据图</h3>
    <!-- 这里可保留 earth 模块原有的内容，比如背景等 -->
    <div id="pieChart" style="width: 400px; height: 400px; margin: 0 10px;"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
  // 初始化饼图
  const chartDom = document.getElementById('pieChart');
  const myChart = echarts.init(chartDom);

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
        name: 'Access From',
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
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '游戏' },
          { value: 735, name: '短视频' },
          { value: 580, name: '美食' },
          { value: 484, name: '旅游' },
          { value: 300, name: '美妆' }
        ]
      }
    ]
  };

  myChart.setOption(option);

  // 监听窗口变化，让饼图自适应（可选）
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>
.earth {
  /* 可根据实际需求设置 .earth 的样式，比如背景、 padding 等 */
  padding: 20px;
}
</style>