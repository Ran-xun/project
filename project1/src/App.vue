<script setup>
 import { computed, onMounted, ref, watch } from 'vue';
 import testSon from './components/icons/testSon.vue';
//  响应式数据和计算属性测试----------------------------------------------
 const a=ref([1,2,3,4,5,6,7,8])
 console.log(a);
 const comPuted=computed(()=>{
  return a.value.filter(item=>item>4)
 })

const changeA=()=>{
  a.value=[1,2,3,4,5]
}
// 测试watch----------------------------------------------------------
watch(
  a,
  (newValue ,oldValue)=>{
    console.log(newValue,oldValue)
  },
  {
    immediate:true,
    deep:true
  }
)
// 父子交互，父传子：moeny，defineProps；子传父，defineEmits------------------------------------------
const money=ref(1000)
const changefn=( b)=>{
  money.value=b
}
const num=ref(null)
onMounted(()=>{
  num.value.focus()
})
// 页面渲染完成立马获取光标
const getFoucs=()=>{
  num.value.focus()
}
// 点击获取光标

const com=ref(null)

console.log(com);
// pini练习测试--------------------------------------------------
import { useCouter } from './store/couter';
const usecouter=useCouter()

</script>
<template>
<div>
 <p>{{ a }}</p>
 <button @click="changeA">改变a</button>
 <p>{{ comPuted }}</p>
  <testSon ref="com"   @change-money="changefn" :money="money"></testSon>
<!-- 通过ref对象获取dom和组件------------------------------------->
   <input ref="num" type="text">
   <button @click="getFoucs">点击获取光标</button>
   <!-- pinia和definestore练习---------------------------------- -->
    <p>----------------------------------------------------------------------------------------------------------------------</p>
  <h3>{{ usecouter.num }}   ----      这是一个全局共享数据</h3>
  <button @click="usecouter.numAdd">自增</button>
  
</div>
</template>

<style scoped>
 
</style>