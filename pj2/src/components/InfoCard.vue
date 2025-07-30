<script setup>
import { More, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const isSlotVisible = ref(false);
const handleMoreClick = () => {
  isSlotVisible.value = !isSlotVisible.value;
};
const showButtons = ref(false); 
// 鼠标进入大盒子
const handleMouseEnter = () => {
  showButtons.value = true;
};

// 鼠标离开大盒子
const handleMouseLeave = () => {
  showButtons.value = false;
};
</script>
<template>
<div style="position: relative;" 
   @mouseenter="handleMouseEnter"
   @mouseleave="handleMouseLeave">
 <a href="https://www.trae.cn/sem" target="_blank">
 <div class="head">
   <img src="../pic/2.jpg" alt="">
   </div>
 <div class="body">
  <a target="_blank" href="https://www.msn.cn/zh-cn/news/other/%E4%BA%8C%E5%8D%81%E5%A4%9A%E5%B9%B4%E6%81%A9%E6%80%A8%E8%87%B3%E4%BB%8A%E9%83%BD%E6%B2%A1%E5%92%8C%E8%A7%A3-%E6%9D%A8%E5%B0%91%E5%8D%8E%E7%A6%BB%E4%B8%964%E5%A4%A9-%E8%B5%B5%E4%BC%9F%E6%B4%B2%E4%BE%9D%E6%97%A7%E6%AF%AB%E6%97%A0%E5%8A%A8%E9%9D%99/ar-AA1ILXDi">
    <img src="../pic/1.png" alt="热点观察网">
    <h5>热点观察网</h5>
    </a>
    <button style="height: 20px;position: absolute;left: 94px;margin-top: 2px;line-height: 18px;" v-if="showButtons">+关注</button>
    <p style="color: black;">Trae，致力于成为真正的 AI 工程师（The Real AI Engineer）。Trae 旗下的 AI IDE 产品，以智能生产力为核心，无缝融入你的开发流程，与你默契配合，更高质量、高效率完成每一个任务。</p>
</div>
 </a>
 <div class="card" v-if="isSlotVisible">
 <slot name="card"></slot>
 </div>
 <el-button :icon="More" circle  class="more" title="查看更多" @click="handleMoreClick"  v-if="showButtons"/>
</div>
</template>

<style scoped>
 .head{
    position: relative;
    height: 100px;
 }
 .head img{
    width: 100%;
    height: 100%;
 }


 /* 主体部分 */
 .body{
    background-color: white;
    position: relative;
 }
 a{
    text-decoration: none;
    color: #414141;
 }
 h5{
    position: absolute;
    left: 20px;
    top: -21px;
 }
 p{
    margin-top: 0px;
 }

.card{
   transform: translate(60px ,-230px);
   opacity: 1;
}
.more{
  position: absolute;
  top: 0%;
  right: 0;
}
</style>