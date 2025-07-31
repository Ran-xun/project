<template>
  <!-- 保持原有模板结构不变 -->
  <div class="performance-dashboard">
    <!-- 绩效概览 -->
    <div class="overview">
      <h2>员工绩效概览</h2>
      <div id="performanceRadar" class="chart"></div>
    </div>

    <!-- 绩效趋势（修改后） -->
    <div class="trend">
      <h2>绩效目标达成率趋势</h2> <!-- 标题修改 -->
      <div id="performanceTrend" class="chart"></div>
    </div>

    <!-- 团队对比 -->
    <div class="team-comparison">
      <h2>团队绩效对比</h2>
      <div id="teamComparison" class="chart"></div>
    </div>

    <!-- 员工贡献饼图 -->
    <div class="contribution">
      <h2>员工贡献占比</h2>
      <div id="contributionChart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

// 模拟绩效数据（仅修改trendData部分）
const performanceData = ref({
  radarData: {
    // 保持原有雷达图数据不变
    indicator: [
      { name: '任务完成率', max: 100 },
      { name: '代码质量', max: 100 },
      { name: '团队协作', max: 100 },
      { name: '创新贡献', max: 100 },
      { name: '问题解决', max: 100 },
      { name: '工作效率', max: 100 },
      { name: '客户满意度', max: 100 }
    ],
    data: [
      { value: [90, 85, 92, 78, 88, 95, 89], name: '张三' },
      { value: [85, 90, 82, 85, 92, 88, 91], name: '李四' },
      { value: [92, 88, 95, 82, 86, 93, 87], name: '王五' },
      { value: [88, 92, 86, 89, 94, 87, 90], name: '赵六' }
    ]
  },
  trendData: {
    // 折线图数据修改为“绩效目标达成率”（%）
    xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
    series: [
      { name: '张三', data: [82, 88, 92, 89, 95, 97, 96, 98] }, // 达成率数据
      { name: '李四', data: [78, 83, 87, 91, 89, 93, 95, 94] },
      { name: '王五', data: [85, 89, 90, 93, 96, 94, 97, 99] },
      { name: '赵六', data: [80, 85, 88, 90, 92, 94, 93, 96] }
    ]
  },
  teamData: {
    // 保持原有团队对比数据不变
    xAxis: ['张三', '李四', '王五', '赵六'],
    series: [
      { name: '任务完成率', data: [90, 85, 92, 88] },
      { name: '代码质量', data: [85, 90, 82, 85] },
      { name: '工作效率', data: [95, 88, 93, 87] },
      { name: '客户满意度', data: [89, 91, 87, 90] }
    ]
  }
});

// 初始化雷达图（不变）
const initRadarChart = () => {
  const chartDom = document.getElementById('performanceRadar');
  const myChart = echarts.init(chartDom);
  
  const option = {
    tooltip: { trigger: 'item' },
    radar: {
      indicator: performanceData.value.radarData.indicator
    },
    series: [
      {
        name: '绩效雷达图',
        type: 'radar',
        data: performanceData.value.radarData.data
      }
    ]
  };
  
  myChart.setOption(option);
};

// 【修改后的折线图初始化函数】
const initTrendChart = () => {
  const chartDom = document.getElementById('performanceTrend');
  const myChart = echarts.init(chartDom);
  
  // 定义每条线的颜色（确保区分度）
  const lineColors = ['#3366CC', '#DC3912', '#FF9900', '#109618'];
  
  const option = {
    // 新增图例（点击可隐藏/显示对应员工数据）
    legend: {
      data: performanceData.value.trendData.series.map(item => item.name),
      top: 10,
      left: 'center'
    },
    // 提示框优化：显示达成率及目标对比
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        let result = `${params[0].name}月<br/>`;
        params.forEach(item => {
          // 模拟目标值（假设月度目标为90%）
          const target = 90;
          result += `${item.seriesName}：达成率 ${item.value}%（目标${target}%）<br/>`;
        });
        return result;
      }
    },
    xAxis: {
      type: 'category',
      data: performanceData.value.trendData.xAxis,
      boundaryGap: false // 让折线与坐标轴对齐
    },
    yAxis: {
      type: 'value',
      name: '达成率（%）',
      min: 70, // 从70%开始，聚焦有效区间
      max: 100,
      // 显示网格线，便于读数
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    // 系列数据配置（确保所有员工数据都被正确映射）
    series: performanceData.value.trendData.series.map((item, index) => ({
      ...item,
      type: 'line',
      symbol: 'circle', // 数据点显示为圆点
      symbolSize: 8, // 数据点大小
      lineStyle: {
        width: 3, // 线宽
        color: lineColors[index] // 每条线用不同颜色
      },
      itemStyle: {
        color: lineColors[index], // 数据点颜色
        borderWidth: 2,
        borderColor: '#fff' // 数据点边框（增强视觉效果）
      },
      emphasis: {
        // 鼠标悬停时放大数据点
        scale: true
      }
    }))
  };
  
  myChart.setOption(option);
  
  // 监听窗口大小变化，自动调整图表尺寸
  window.addEventListener('resize', () => {
    myChart.resize();
  });
};

// 初始化柱状图（不变）
const initTeamChart = () => {
  const chartDom = document.getElementById('teamComparison');
  const myChart = echarts.init(chartDom);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        let html = params[0].name + '<br/>';
        params.forEach(item => {
          html += item.seriesName + ': ' + item.value + '<br/>';
        });
        return html;
      }
    },
    xAxis: {
      type: 'category',
      data: performanceData.value.teamData.xAxis
    },
    yAxis: { type: 'value' },
    series: performanceData.value.teamData.series.map(item => ({
      ...item,
      type: 'bar'
    }))
  };
  
  myChart.setOption(option);
};

// 初始化饼图（不变）
const initContributionChart = () => {
  const chartDom = document.getElementById('contributionChart');
  const myChart = echarts.init(chartDom);
  
  const option = {
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '贡献占比',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 30, name: '张三' },
          { value: 25, name: '李四' },
          { value: 22, name: '王五' },
          { value: 23, name: '赵六' }
        ]
      }
    ]
  };
  
  myChart.setOption(option);
};

onMounted(() => {
  initRadarChart();
  initTrendChart(); // 调用修改后的折线图初始化函数
  initTeamChart();
  initContributionChart();
});
</script>

<style scoped>
/* 保持原有样式不变 */
.performance-dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.overview, .trend, .team-comparison, .contribution {
  flex: 1 1 400px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.chart {
  width: 100%;
  height: 400px;
}
</style>