<script setup>
import { List } from '@element-plus/icons-vue';

const props=defineProps({
   item:{
     type:Array
   }
})
const source=props.item
console.log(source);


</script>
<template>
<div>
   <div v-for="(item, index) in props.item" :key="index">
      <a :href="item.link " target="_blank">
         <img src="../pic/db.png" alt="">
         <span>{{ item.title }}</span>
      </a>
    </div>
</div>
</template>

<style scoped>
a{
  width: 80px;
  height: 20px;
  display: flex;
  text-decoration: none;
  color: aliceblue;
  border-radius: 5px;
  
}
a:hover{
  background-color:rgba(240, 248, 255, 0.125);
}
a span{
  height: 19px;
  padding-left: 5px;
  font-size: 14px;
}
</style>