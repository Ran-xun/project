

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Card from './components/Card.vue'; // 导入组件
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Piecharts from './components/PieChartIn.vue';
import InfoCard from './components/InfoCard.vue';
// import AI from './components/AI.vue';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.component('Card',Card,)
app.component('Piecharts',Piecharts)
app.component('InfoCard',InfoCard)
// app.component('AI',AI)
app.config.globalProperties.$echarts = echarts;
app.mount('#app')
