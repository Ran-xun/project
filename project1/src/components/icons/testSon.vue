<script setup>
import { ref } from 'vue';

const emit=defineEmits(['changeMoney'])
const props=defineProps({
    money:Number
 })
 console.log(props);
 const buy=()=>{
 emit('changeMoney',10)
 }
 const car=ref('兰博基尼')

 defineExpose({
    car
 })
 
</script>
<template>
<div>
  <p>{{ money }}</p>
  <button @click="buy">花钱</button>
</div>
</template>

<style scoped>
 
</style>