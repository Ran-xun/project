<template>
  <el-container class="layout-container-demo" style="height: 900px">
    <el-aside width="200px" >
      <el-scrollbar>
        <el-menu :default-openeds="['1']"  @select="handleselect">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Menu /></el-icon>主页
            </template>
            <el-menu-item-group>
                <template #title>Group 1</template>
              <el-menu-item index="user" ><el-icon><User /></el-icon>信息管理</el-menu-item>
              <el-menu-item index="headpic"><el-icon><List /></el-icon>员工绩效</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
                <template #title>Group 2</template>
              <el-menu-item  index="pwd"><el-icon><Clock /></el-icon>任务管理</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><el-icon><Link /></el-icon>广告邮件</template>
              <el-menu-item index="1-4-1">垃圾邮件</el-menu-item>
              <el-menu-item index="1-4-2">广告邮件</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>多功能模块
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>设置
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown @command="Handlecmd">
            <el-avatar :size="30"  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <template #dropdown>
              <el-dropdown-menu >
                <el-dropdown-item command="user">信息管理</el-dropdown-item>
                <el-dropdown-item command="headpic">基本账户</el-dropdown-item>
                <el-dropdown-item command="pwd">切换账号</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-icon size=""><User /></el-icon>
          <span>冉迅</span>
        </div>
      </el-header>

      <el-main>
         <el-scrollbar>
       <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { User,Menu as IconMenu, Message, Setting, CircleCheck, List, Menu } from '@element-plus/icons-vue'
import router from '@/router'
const Handlecmd=(key:string)=>{
  router.push(`/index/${key}`)
}
const handleselect=(index:string)=>{
  router.push(`/index/${index}`)
}
const item = {
  date: '2023-07-17',
  name: '冉迅',
  address: '湖北省利川市利北路',
}
// 从 localStorage 恢复表格数据
const savedTableData = localStorage.getItem('tableData');
const tableData = ref(savedTableData 
  ? JSON.parse(savedTableData) 
  : Array.from({ length: 20 }).fill(item)
);
// 监听表格数据变化，实时保存
watch(tableData, (newData) => {
  localStorage.setItem('tableData', JSON.stringify(newData));
}, { deep: true });

// 页面加载时恢复数据
onMounted(() => {
  const savedData = localStorage.getItem('tableData');
  if (savedData) {
    tableData.value = JSON.parse(savedData);
  }
});
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>