<script setup>
import { Delete, Edit, Lock, Share, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import 'element-plus/dist/index.css';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';

// 用于存储用户输入的账号、密码和确认密码
const form = ref({
  user: '',
  pwd: '',
  repwd: '',
});

// 表单验证规则
const rules = {
  user: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 5, max: 10, message: '用户名必须是5-10位字符', trigger: 'change' },
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15为非空字符', trigger: 'change' },
  ],
  repwd: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { pattern: /^\S{6,15}$/, message: '密码必须是6-15为非空字符', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.pwd) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
    },
  ],
};

const counterStore = useCounterStore();
const register = ref(null);
const router = useRouter();

// 注册函数
const registerfn = () => {
  register.value.validate((valid) => {
    if (valid) {
      // 从 localStorage 获取已注册的用户信息
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // 检查账号是否已存在
      const existingUser = users.find((u) => u.user === form.value.user);
      if (existingUser) {
        ElMessage.error('该账号已存在');
        return;
      }

      // 将新用户信息添加到用户列表
      users.push({
        user: form.value.user,
        pwd: form.value.pwd,
      });
      
      // 更新 localStorage 中的用户信息
      localStorage.setItem('users', JSON.stringify(users));

      ElMessage.success('注册成功');
      const mockToken = 'lfr';
      counterStore.setToken(mockToken);
      router.push('/login');
    } else {
      ElMessage.error('请检查输入信息是否正确');
      return false;
    }
  });
};
</script>

<template>
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
        <el-form :model="form" :rules="rules" ref="register">
          <el-form-item prop="user">
            <el-input
              v-model="form.user"
              :prefix-icon="User"
              placeholder="请输入账号"
              class="user"
            />
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              v-model="form.pwd"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              type="password"
            />
          </el-form-item>
          <el-form-item prop="repwd">
            <el-input
              v-model="form.repwd"
              :prefix-icon="Lock"
              placeholder="请确认密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="login">
            <el-button
              @click="registerfn"
              type="primary"
              round
              class="cross"
              >注册</el-button
            >
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