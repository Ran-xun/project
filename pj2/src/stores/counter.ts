// stores/counter.ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  // 从 localStorage 恢复 Token
  const token = ref(localStorage.getItem('token') || '');
  
  // 设置 Token 时同步到 localStorage
  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  return { token, setToken };
});