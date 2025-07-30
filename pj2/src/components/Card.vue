<template>
  <div class="card">
    <div class="cardheader">
        <el-icon color="white" size="25px"><Position /></el-icon>
        <!-- v-model 绑定响应式变量 -->
        <el-select v-model="city" placeholder="利川市" style="width: 200px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
    <button class="star" style="background-color:hsla(0, 0%, 100%, 0) ;"><el-icon color="white"><Star /></el-icon></button>    
    </div>
    <div class="card-info">
        <img src="../pic/weather.svg" alt="天气" title="天气">
          <span class="temperature">{{ temperature }}°C</span>
        <!-- 确保 props 存在默认值或父组件传递 -->
         <span class="wetspan"><img src="../pic/wet.svg" title="湿度" alt="湿度" style="width: 16px;height: 16px;">
         <a href="https://www.msn.cn/zh-cn/weather/hourlyforecast/in-%E6%B9%96%E5%8C%97%E7%9C%81,%E6%81%A9%E6%96%BD%E5%9C%9F%E5%AE%B6%E6%97%8F%E8%8B%97%E6%97%8F%E8%87%AA%E6%B2%BB%E5%B7%9E" title="湿度" target="_blank">湿度70%</a></span>
         
       <p class="uv-tip">{{ uvDesc || '' }}</p>
      </div>
    <slot></slot> 
    <div class="echarts-container" ref="chart" style="width: 100%; height: 200px;"></div> 
  </div>
</template>

<script setup>
import { Position } from '@element-plus/icons-vue';
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts'; 
// 响应式数据：城市选择
const city = ref(''); 


const options = [
  { value: 'Option1', label: '成都市' },
  { value: 'Option2', label: '武汉市' },
  { value: 'Option3', label: '重庆市' },
  { value: 'Option4', label: '北京市' },
  { value: 'Option5', label: '上海市' },
];

// 接收父组件传值
const props = defineProps({
  temperature: {
    type: Number,
   
  },
  uvDesc: {
    type: String,
  },
});
const chart = ref(null);
let myChart = null;

// 初始化 ECharts
onMounted(() => {
  myChart = echarts.init(chart.value);
  renderChart();
});

// 渲染图表函数
const renderChart = () => {
  const option = {
    // 这里使用你从 ECharts 示例中想要的配置，比如柱状图示例
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [60, 100, 75, 40, 35, 55, 65],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.5)'
        }
      }
    ]
  };
  myChart.setOption(option);
};

// 监听窗口变化，让图表自适应
watch(() => ({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
}), () => {
  if (myChart) {
    myChart.resize();
  }
});
</script>

<style scoped>
.card {
    position: relative;
  border-radius: 5px;
  height: 200px;
  background-image: url(https://assets.msn.cn/weathermapdata/1/static/background/v2.0/jpg/sunny.jpg);
  
}
.cardheader {
  display: flex;
  align-items: center;
  height: 40px;
}
.cardheader .el-select{
    margin-left: 30px;
}
.temperature {
  font-size: 25px;
  font-weight: bold;
  color: #fdfafa;
}
.uv-tip {
  color: #666;
}
.star{
    border: 0;
    margin-left: 30px;
    cursor: pointer;
}
.star .el-icon{
    font-size: large;
}
a{
    text-decoration: none;
    color: #f6f1f1ee;
}
.wetspan{
    position: absolute;
    right: 10px;
    top: 40px;
}
.card-info{
    position: relative;
}
.echarts-container{
    position: absolute;
    bottom: -50px;
    opacity: 0.5;
    
}
</style>