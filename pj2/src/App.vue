<script setup>
 import { onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();


onMounted(() => {
  // 从 localStorage 恢复 Token
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    counterStore.setToken(savedToken);
  }
});
</script>
<template>
<div>
 <router-view></router-view>
</div>
</template>

<style scoped>
 
</style>