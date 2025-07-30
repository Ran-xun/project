import { useCounterStore } from '@/stores/counter'
import IndexView from '@/views/IndexView.vue'
import Login from '@/views/Login.vue'
import PicView from '@/views/PicView.vue'
import PwdView from '@/views/PwdView.vue'
import Register from '@/views/Register.vue'
import UserView from '@/views/UserView.vue'
import Wechat from '@/views/Wechat.vue'
import { createRouter, createWebHistory } from 'vue-router'
// 从 localStorage 获取上次保存的路由
const savedPath = localStorage.getItem('lastRoute');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    {
    path: '/', // 默认路径
     redirect: savedPath || '/login' // 优先使用保存的路由
    },
    {
      path:'/index',
      name:'index',
      component:IndexView,
      children: [ // 子路由：在 el-main 区域切换
        
        { path: '/index/user', name: 'user', component: UserView },
        {path:'/index/headpic',name:'/headpic',component:PicView},
        {path:'/index/pwd',name:'/pwd',component:PwdView},
      ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/wechat',
      name:'wechat',
      component:Wechat
    }
   
   ]
})
// 路由守卫
router.beforeEach((to)=>{
  const useStore=useCounterStore()
  if(!useStore.token&& to.path !=='/login') return '/login'
})
// 每次路由变化时保存当前路径
router.afterEach((to) => {
  localStorage.setItem('lastRoute', to.fullPath);
});
export default router
