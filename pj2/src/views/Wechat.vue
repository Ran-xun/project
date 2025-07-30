<template>
  <!-- 最外层容器，作为窗口背景载体 -->
  <div class="app-container">
    <!-- 页面内容（你的原有布局） -->
    <el-container class="container">
        <div class="head">
          <!-- 搜索建议框 -->
          <div 
          class="suggest-box" 
          v-if="showSuggestBox"
          style="width: 500px;border: 30px; background-color:white;position: absolute;left: 482px;margin-top: 60px;"
        >
          <div 
            class="suggest-item" 
            v-for="(item, index) in suggestList" 
            :key="index"
            @click="handleSuggestClick(item.link)"
          >
           <el-button text style="width: 500px;"><el-icon><Clock /></el-icon> {{item.text}}</el-button>
          </div>
        </div>
      <el-header >
      <el-button  :icon="Message" circle class="msg" />
      <el-input
      v-model="input"
      style="width: 500px;margin-left: 430px;height: 50px;margin-top: 10px;border-radius: 0;"
      placeholder="请输入搜索内容"
      @focus="showSuggestBox = true"
      @blur="showSuggestBox = false"
      @keyup.enter="handleSearch"
      >
      <template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon>
      </template>
      <template #suffix>
        <el-button  type="primary" size="large" round :icon="Search" @click="handleSuggestClick('https://cn.bing.com/search')">搜索</el-button>
      </template>
    </el-input>
      </el-header>
      <!-- 消息框 -->
      <div class="msgbox">
       <el-badge value="99" class="item">
       <el-button type="primary">信息</el-button>
       <template #content="{ value }">
       <div class="custom-content">
        <el-icon>
          <MessageBox />
        </el-icon>
        <span>{{ value }}</span>
       </div>
       </template>
       </el-badge>
      </div>
      <el-button color="rgba(255, 255, 255, 0)" round class="loginbt" :icon="User">登录</el-button>
      </div>
      
      <el-container>
      <el-main>
        
      <div class="body">
      <div class="bdhead" style="height: 100px;">
      <a href="https://www.jd.com/" target="_blank">
        <img src="../pic/jd.png" alt="">
        <span>京东</span>
      </a>
      <a href="https://www.doubao.com/" target="_blank">
        <img src="../pic/db.png" alt="">
        <span>豆包</span>
      </a>
      <a href="https://www.jd.com/" target="_blank">
        <img src="../pic/jd.png" alt="">
        <span>京东</span>
      </a>
      <a href="https://www.doubao.com/" target="_blank">
        <img src="../pic/db.png" alt="">
        <span>豆包</span>
      </a>
      <a href="https://www.jd.com/" target="_blank">
        <img src="../pic/jd.png" alt="">
        <span>京东</span>
      </a>
      <a href="https://www.doubao.com/" target="_blank">
        <img src="../pic/db.png" alt="">
        <span>豆包</span>
      </a>
      <a href="https://www.jd.com/" target="_blank">
        <img src="../pic/jd.png" alt="">
        <span>京东</span>
      </a>
      <a href="https://www.doubao.com/" target="_blank">
        <img src="../pic/db.png" alt="">
        <span>豆包</span>
      </a>
      <a href="https://www.jd.com/" target="_blank">
        <img src="../pic/jd.png" alt="">
        <span>京东</span>
      </a>
      <Source :item="hdlink"></Source>
      </div>
      <div class="box">
      <el-carousel :interval="4000" type="card" height="200px">
     <el-carousel-item v-for="item in 6" :key="item">
      <a href="https://www.msn.cn/zh-cn/news/other/%E5%8D%8E%E4%B8%BApura-80%E6%A0%87%E5%87%86%E7%89%88%E6%88%96%E4%BA%8E7%E6%9C%8824%E6%97%A5%E5%BC%80%E5%94%AE-%E8%AF%A6%E7%BB%86%E9%85%8D%E7%BD%AE%E5%B7%B2%E6%9B%9D%E5%85%89/ar-AA1IKwa5?ocid=msedgntp&pc=HCTS&cvid=6878e5882f754d569313d11e0cc4d3be&ei=37" class="scrollbox" target="_blank">
        <img src="../pic/1.jpg" alt="Huawei pura80pro" class="scrollpic">
        <h2>华为Pura 80标准版或于7月24日开售 详细配置已曝光</h2>
      </a>
    </el-carousel-item>
    </el-carousel>
      <ul style="display: inline-flex;margin-left: 350px; ">
        <li style="list-style: none;"><a href="">生活</a></li>
        <li style="list-style: none;"><a href="https://www.msn.cn/zh-cn/gaming?ocid=msedgntphdr&cvid=6878e5882f754d569313d11e0cc4d3be">游戏</a></li>
        <li style="list-style: none;"><a href="">资讯</a></li>
        <li style="list-style: none;"><a href="https://www.msn.cn/zh-cn/sports?ocid=msedgntphdr&cvid=6878e5882f754d569313d11e0cc4d3be">体育</a></li>
        <li style="list-style: none;"><a href="">高考</a></li>
        <li style="list-style: none;"><a href="">财经</a></li>
        <li style="list-style: none;"><a href="">天气</a></li>
        <li style="list-style: none;"><a href="">日历</a></li>
      </ul>
      <el-button round :prefix-icon="Message"  class="more">更多</el-button>
         
     <!-- 主要内容模块 -->
     <el-row :gutter="20" >
     <el-col :span="12"><div class="grid-content ep-bg-purple" />
     <el-carousel height="200px" direction="vertical" :autoplay="false">
     <el-carousel-item v-for="item in 4" :key="item">
      <a href="https://www.msn.cn/zh-cn/news/other/%E5%8D%8E%E4%B8%BApura-80%E6%A0%87%E5%87%86%E7%89%88%E6%88%96%E4%BA%8E7%E6%9C%8824%E6%97%A5%E5%BC%80%E5%94%AE-%E8%AF%A6%E7%BB%86%E9%85%8D%E7%BD%AE%E5%B7%B2%E6%9B%9D%E5%85%89/ar-AA1IKwa5?ocid=msedgntp&pc=HCTS&cvid=6878e5882f754d569313d11e0cc4d3be&ei=37" class="scrollbox" target="_blank">
        <img src="../pic/2.webp" alt="Huawei pura80pro" class="scrollpic">
        <h2>华为Pura 80标准版或于7月24日开售 详细配置已曝光</h2>
      </a>
     </el-carousel-item>
     </el-carousel>
     </el-col>
     <el-col :span="6"><div class="grid-content ep-bg-purple" />
        <a href="https://www.msn.cn/zh-cn/news/other/%E5%8D%8E%E4%B8%BApura-80%E6%A0%87%E5%87%86%E7%89%88%E6%88%96%E4%BA%8E7%E6%9C%8824%E6%97%A5%E5%BC%80%E5%94%AE-%E8%AF%A6%E7%BB%86%E9%85%8D%E7%BD%AE%E5%B7%B2%E6%9B%9D%E5%85%89/ar-AA1IKwa5?ocid=msedgntp&pc=HCTS&cvid=6878e5882f754d569313d11e0cc4d3be&ei=37" class="scrollbox" target="_blank">
        <img src="../pic/2.webp" alt="Huawei pura80pro" class="scrollpic">
        <h2>华为Pura 80标准版或于7月24日开售 详细配置已曝光</h2>
      </a></el-col>
     <el-col :span="6"><div class="grid-content ep-bg-purple" />
     <Card
     temperature=32
     ></Card>
     </el-col>
     </el-row>
     <el-row :gutter="20" style="margin-top: 10px;">
     <el-col :span="18"><div class="earth" style="height: 300px;">
      <Piecharts></Piecharts>
     </div>
    </el-col>
     <el-col :span="6"><div class="card1">
      <!-- 点击按钮查看更多显示卡片内容 -->
      <InfoCard>
      <template #card>
       <el-card style="max-width: 200px">
       <template #header>
        <el-button text style="width: 160px;"><el-icon><CirclePlusFilled /></el-icon>关注一点资讯</el-button>
       </template>
       <el-button text style="width: 160px;"><el-icon><Share /></el-icon>分享</el-button>
       <el-button text style="width: 160px;"><el-icon><DeleteFilled /></el-icon>不喜欢此内容</el-button>
       </el-card>
       </template>
      </InfoCard>
     </div></el-col>
     </el-row>
      </div>
      </div>
      </el-main>
          <el-footer>
           
          </el-footer>
      </el-container>
    </el-container>
    
  </div>
</template>

<script setup>
import { CirclePlusFilled, Clock, DeleteFilled, Message, MessageBox, Search, Share, User } from '@element-plus/icons-vue';
import { ref } from 'vue';
import * as echarts from 'echarts';
const input = ref('');
const showSuggestBox = ref(false); // 控制自定义盒子显示隐藏

// 自定义内容数据（可按需修改）
const suggestList = [
  { text: '有关js的文章', link: 'https://cn.bing.com/search?q=有关js的文章' },
  { text: '有关科技的文章', link: 'https://cn.bing.com/search?q=有关科技的文章' },
  { text: '原神5.8前瞻兑换码', link: 'https://cn.bing.com/search?q=原神5.8前瞻兑换码' },
  { text: 'iphone 17 最新消息', link: 'https://cn.bing.com/search?q=iphone 17 最新消息' },
];

// 聚焦输入框时显示盒子
// 失去焦点时隐藏盒子（可优化：点击盒子内部不隐藏，需结合事件委托，这里简单处理）

// 点击自定义内容跳转
const handleSuggestClick = (link) => {
  window.open(link, '_blank'); // 新窗口打开
  showSuggestBox.value = false; // 隐藏盒子
};

// 点击搜索跳转必应
const handleSearch = () => {
  const searchUrl = `https://cn.bing.com/search?q=${encodeURIComponent(input.value)}`;
  window.open(searchUrl, '_blank');
  showSuggestBox.value = false; // 隐藏盒子
};


const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const hdlink=[
  {title:'京东',pic:'../pic/jd.png',link:'https://www.jd.com/'},
]

</script>

<style scoped>
/* 最外层容器样式：占满整个窗口 */
.app-container {
  /* 设置背景图 */
  background-image: url(https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg);
  /* 背景图自适应窗口 */
  background-size: cover; /* 覆盖整个容器，可能裁剪边缘 */
  /* 背景图居中 */
  background-position: center center;
  /* 背景图不重复 */
  background-repeat: no-repeat;
  /* 固定背景图（滚动时不跟随滚动） */
  background-attachment: fixed;
  /* 占满整个窗口 */
  width: 100%;  /* 视口宽度的100% */
  height: 100%; /* 视口高度的100% */
  overflow: auto; /* 内容超出时可滚动 */
}

/* 可选：给内部组件添加半透明背景，增强文字可读性 */
.el-header, .el-aside, .el-main, .el-footer {
  background-color: rgba(255, 255, 255, 0); /* 白色半透明背景 */
  border-radius: 10px; /* 轻微圆角 */
}
.el-header{
    display: flex;
    line-height: 60px;
    
}
.msg{
    margin-top: 12px;
    padding-top: 10px;
}
.loginbt{
    position: absolute;
    margin-top: 20px;
    right: 10px;
}
.container{
    display:block;
}
.head{
    position: relative;
    display: flex;
}
.body{
  margin: 100px auto;
  width: 1200px;
  height: 1000px;
}
.bdhead a{
  width: 80px;
  height: 20px;
  display: flex;
  text-decoration: none;
  color: aliceblue;
  border-radius: 5px;
  margin-right: 10px;
  
}
a:hover{
  background-color:rgba(240, 248, 255, 0.125);
}
a span{
  height: 19px;
  padding-left: 5px;
  font-size: 14px;
}
.bdhead{
  display: flex;
}
.box{
  height: 1000px;
  background-color: #ffffff2c;
}
.msgbox{
 position: absolute;
 right: 100px;
 top: 18px;
}

.el-carousel__item h3 {
  color: #475669ee;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.scrollbox{
  position: relative;
}
.scrollpic{
  width: 100%;
  height:200px;
  opacity: 0.8;
}
.scrollbox h2{
  position: absolute;
  bottom: 10%;
  
}
a{
  text-decoration: none;
  color: rgba(240, 248, 255, 0.771);
}

ul li{
  padding-left: 20px;
  font-size: 20px;
}
.more{
  transform: translate(240px, -4px);
}
.el-col{
  height: 200px;
}
</style>