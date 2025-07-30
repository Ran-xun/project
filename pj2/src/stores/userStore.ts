import { defineStore } from 'pinia';

// 定义用户类型接口
interface User {
  username: string;
  password: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    // 初始化时从localStorage读取数据，并指定类型为User[]
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[]
  }),
  actions: {
    // 注册时添加用户（自动校验账号是否已存在）
    addUser(username: string, password: string) {
      // 检查账号是否已存在
      const isExist = this.users.some(user => user.username === username);
      if (isExist) return false; // 存在则返回失败
      
      // 新增用户（账号密码一一对应）
      this.users.push({ username, password });
      // 同步到localStorage持久化
      localStorage.setItem('users', JSON.stringify(this.users));
      return true; // 成功返回true
    },
    
    // 登录时验证账号密码
    validateLogin(username: string, password: string) {
      // 查找账号对应的用户
      const user = this.users.find(u => u.username === username);
      
      if (!user) {
        return { success: false, message: '账号不存在' }; // 账号不存在
      }
      if (user.password !== password) {
        return { success: false, message: '密码错误' }; // 密码不匹配
      }
      return { success: true, message: '登录成功' }; // 验证通过
    }
  }
});