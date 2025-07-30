<script setup>
 const item = {
  date: '2023-07-17',
  name: '冉迅',
  address: '湖北省利川市利北路',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>
<template>
<div>
  <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140" />
            <el-table-column prop="name" label="发件人" width="120" />
            <el-table-column prop="address" label="地址" />
          </el-table>
        </el-scrollbar>
      </el-main>
</div>
</template>

<style scoped>
 
</style>