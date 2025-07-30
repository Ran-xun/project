import { defineStore } from "pinia";
import { ref } from "vue";
 export const useCouter=defineStore(
    'couter',
    // 这是唯一id一般和仓库同名
    ()=>{
    const num=ref(100)
    const numAdd=()=>{
        num.value++
    }
    
     return{
    num,
    numAdd
 }
 
  },
//   上面是第二个参数回调函数,控制全局共享变量和函数方法
  {persist:false}
//   这里控制可持续化,当页面刷新时保存在本地
 )