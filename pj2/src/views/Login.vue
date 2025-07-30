<script setup>
import { Delete, Edit, Lock, Share, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import 'element-plus/dist/index.css'
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';

const form = ref({
  user: '',
  pwd: '',
});

const rules = {
  user: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 5, max: 10, message: '用户名必须是5-10位字符', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15位非空字符', trigger: 'change' }
  ]
  
};

const counterStore = useCounterStore();
const loginForm = ref(null); 
const router = useRouter();

// 登录函数
const loginfn = () => { 
  loginForm.value.validate((valid) => {
    if (valid) {
      // 从localStorage获取已注册用户
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // 查找用户是否存在
      const existingUser = users.find(u => u.user === form.value.user);
      
      if (!existingUser) {
        ElMessage.error('账号不存在，请先注册');
        return;
      }
      
      // 验证密码是否正确
      if (existingUser.pwd !== form.value.pwd) {
        ElMessage.error('用户名或密码错误');
        return;
      }

      // 验证通过，执行登录逻辑
      ElMessage.success('登录成功');
      const mockToken = 'lfr'; // 实际项目中应该是后端返回的token
      counterStore.setToken(mockToken);
      router.push('/index'); // 跳转到首页
    } else {
      ElMessage.error('请检查输入信息是否正确');
      return false;
    }
  });
};
</script>

<template>
  <!-- 模板部分可以保持不变，但建议做以下优化：
  1. 去掉repwd相关的输入框
  2. 将按钮文字从"登录"改为"注册"
  3. 调整相关class命名使其更符合登录场景
  -->
  <div class="box">
    <el-row>
      <el-col :span="12">
        <el-card style="width: 800px; height: 700px">
          <template #header> The best hamburger belong to LFR</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
      </el-col>
      <el-col :span="6" :offset="3" class="login">
        <el-form 
          :model="form"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item prop="user">
            <el-input v-model="form.user" :prefix-icon="User" placeholder="请输入账号" class="user" />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="form.pwd" :prefix-icon="Lock" placeholder="请输入密码" type="password"/>
          </el-form-item>
          <!-- 登录页可以去掉确认密码输入框 -->
          <el-form-item class="login">
            <el-button @click="loginfn" type="primary" round class="cross" >登录</el-button>
            <el-button-group class="ml-4">
              <el-button type="primary" :icon="Edit" />
              <el-button type="primary" :icon="Share" />
              <el-button type="primary" :icon="Delete" />
            </el-button-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
/* 样式保持不变 */
.box {
  height: 500px;
}
.user {
  margin-top: 100px;
}
.cross {
  margin-right: 172px;
}
.login {
  margin-top: 20px;
  display: flex;
}
</style>