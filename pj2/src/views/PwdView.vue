<template>
  <div class="task-dashboard">
    <!-- 任务管理模块 -->
    <el-card class="task-section">
      <template #header>
        <div class="card-header">
          <h2>任务管理</h2>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="24">
          <!-- 任务筛选 -->
          <el-form inline class="task-filter">
            <el-form-item label="状态">
              <el-select v-model="filterStatus" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="未完成" value="未完成" />
                <el-option label="已完成" value="已完成" />
              </el-select>
            </el-form-item>
            <el-form-item label="优先级">
              <el-select v-model="filterPriority" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="低" value="低" />
                <el-option label="中" value="中" />
                <el-option label="高" value="高" />
              </el-select>
            </el-form-item>
            <el-form-item label="分类">
              <el-select v-model="filterCategory" placeholder="全部">
                <el-option label="全部" value="" />
                <el-option label="开发" value="开发" />
                <el-option label="测试" value="测试" />
                <el-option label="文档" value="文档" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <el-form-item label="截止日期">
              <el-date-picker v-model="filterDeadline" type="date" placeholder="选择日期" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetFilter">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <!-- 任务列表 -->
          <el-table :data="filteredTasks" border style="width: 100%">
            <el-table-column prop="name" label="任务名称" />
            <el-table-column prop="deadline" label="截止日期" />
            <el-table-column prop="priority" label="优先级">
              <template #default="scope">
                <el-tag :type="getTagType(scope.row.priority)">{{ scope.row.priority }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="分类" />
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="scope.row.status === '已完成' ? 'success' : 'danger'">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-button size="small" @click="toggleTaskStatus(scope.row.id)">{{ scope.row.status === '未完成' ? '完成' : '未完成' }}</el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="small" @click="viewTaskDetail(scope.row.id)">详情</el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="small" type="danger" @click="deleteTask(scope.row.id)">删除</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>

    <!-- 任务详情 -->
    <el-drawer v-model="drawerVisible" title="任务详情" direction="rtl" size="50%">
      <div v-if="selectedTask" class="task-detail">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="任务名称">{{ selectedTask.name }}</el-descriptions-item>
          <el-descriptions-item label="截止日期">{{ selectedTask.deadline }}</el-descriptions-item>
          <el-descriptions-item label="优先级">
            <el-tag :type="getTagType(selectedTask.priority)">{{ selectedTask.priority }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="分类">{{ selectedTask.category }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="selectedTask.status === '已完成' ? 'success' : 'danger'">{{ selectedTask.status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="描述">{{ selectedTask.description }}</el-descriptions-item>
          <el-descriptions-item label="提醒设置">
            {{ selectedTask.remind === '0' ? '不提醒' : `提前${selectedTask.remind}天` }}
          </el-descriptions-item>
        </el-descriptions>
        <el-button @click="closeTaskDetail">关闭</el-button>
      </div>
    </el-drawer>

    <!-- 任务分析模块 -->
    <el-card class="task-section">
      <template #header>
        <div class="card-header">
          <h2>任务分析</h2>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <!-- 任务进度 -->
          <div class="task-progress">
            <h3>任务完成进度</h3>
            <div id="taskProgressChart" class="chart"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 任务分类统计 -->
          <div class="task-category">
            <h3>任务分类统计</h3>
            <div id="taskCategoryChart" class="chart"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 任务优先级分布 -->
          <div class="task-priority">
            <h3>任务优先级分布</h3>
            <div id="taskPriorityChart" class="chart"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 任务分配 -->
          <div class="task-assignment">
            <h3>分配任务</h3>
            <el-form @submit.prevent="assignTask" :rules="rules" :model="newTask">
              <el-form-item label="任务名称" prop="name">
                <el-input v-model="newTask.name" placeholder="请输入任务名称" />
              </el-form-item>
              <el-form-item label="截止日期" prop="deadline">
                <el-date-picker v-model="newTask.deadline" type="date" placeholder="选择日期" />
              </el-form-item>
              <el-form-item label="优先级" prop="priority">
                <el-select v-model="newTask.priority" placeholder="请选择优先级">
                  <el-option label="低" value="低" />
                  <el-option label="中" value="中" />
                  <el-option label="高" value="高" />
                </el-select>
              </el-form-item>
              <el-form-item label="分类" prop="category">
                <el-select v-model="newTask.category" placeholder="请选择分类">
                  <el-option label="开发" value="开发" />
                  <el-option label="测试" value="测试" />
                  <el-option label="文档" value="文档" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
              <el-form-item label="提醒设置" prop="remind">
                <el-select v-model="newTask.remind" placeholder="请选择提醒时间">
                  <el-option label="不提醒" value="0" />
                  <el-option label="提前1天" value="1" />
                  <el-option label="提前3天" value="3" />
                  <el-option label="提前7天" value="7" />
                </el-select>
              </el-form-item>
              <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="newTask.description" placeholder="请输入任务描述" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit">分配</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import * as echarts from 'echarts';

// 模拟任务数据
const tasks = ref([
  { id: 1, name: '完成项目计划', deadline: '2025-08-15', priority: '高', status: '未完成', description: '制定项目的详细计划和时间表', category: '开发', remind: '1' },
  { id: 2, name: '编写技术文档', deadline: '2025-08-20', priority: '中', status: '已完成', description: '编写项目的技术文档，包括API说明和架构设计', category: '文档', remind: '3' },
  { id: 3, name: '测试新功能', deadline: '2025-08-25', priority: '低', status: '未完成', description: '测试新开发的功能，确保没有BUG', category: '测试', remind: '0' },
  { id: 4, name: '修复已知问题', deadline: '2025-08-10', priority: '高', status: '已完成', description: '修复用户反馈的已知问题', category: '开发', remind: '7' },
  { id: 5, name: '准备会议材料', deadline: '2025-08-12', priority: '中', status: '未完成', description: '准备下周会议的演示材料', category: '其他', remind: '1' }
]);

// 筛选条件
const filterStatus = ref('');
const filterPriority = ref('');
const filterCategory = ref('');
const filterDeadline = ref('');

// 新任务数据
const newTask = ref({
  name: '',
  deadline: '',
  priority: '中',
  description: '',
  category: '',
  remind: '0'
});

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入任务名称', trigger: 'blur' }
  ],
  deadline: [
    { required: true, message: '请选择截止日期', trigger: 'change' }
  ],
  priority: [
    { required: true, message: '请选择优先级', trigger: 'change' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
};

// 选中的任务详情
const selectedTask = ref(null);
const drawerVisible = ref(false);

// 筛选后的任务列表
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const statusMatch = !filterStatus.value || task.status === filterStatus.value;
    const priorityMatch = !filterPriority.value || task.priority === filterPriority.value;
    const categoryMatch = !filterCategory.value || task.category === filterCategory.value;
    const deadlineMatch = !filterDeadline.value || task.deadline === filterDeadline.value;
    return statusMatch && priorityMatch && categoryMatch && deadlineMatch;
  });
});

// 获取标签类型
const getTagType = (priority) => {
  switch (priority) {
    case '高':
      return 'danger';
    case '中':
      return 'warning';
    case '低':
      return 'success';
    default:
      return '';
  }
};

// 切换任务状态
const toggleTaskStatus = (id) => {
  const task = tasks.value.find(item => item.id === id);
  if (task) {
    task.status = task.status === '未完成' ? '已完成' : '未完成';
    updateTaskProgressChart();
    updateTaskCategoryChart();
    updateTaskPriorityChart();
  }
};

// 查看任务详情
const viewTaskDetail = (id) => {
  const task = tasks.value.find(item => item.id === id);
  if (task) {
    selectedTask.value = { ...task };
    drawerVisible.value = true;
  }
};

// 关闭任务详情
const closeTaskDetail = () => {
  drawerVisible.value = false;
  selectedTask.value = null;
};

// 删除任务
const deleteTask = (id) => {
  if (confirm('确定要删除此任务吗？')) {
    tasks.value = tasks.value.filter(item => item.id !== id);
    updateTaskProgressChart();
    updateTaskCategoryChart();
    updateTaskPriorityChart();
  }
};

// 分配任务
const assignTask = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const newId = tasks.value.length + 1;
      tasks.value.push({
        id: newId,
        name: newTask.value.name,
        deadline: newTask.value.deadline,
        priority: newTask.value.priority,
        status: '未完成',
        description: newTask.value.description,
        category: newTask.value.category,
        remind: newTask.value.remind
      });
      newTask.value = {
        name: '',
        deadline: '',
        priority: '中',
        description: '',
        category: '',
        remind: '0'
      };
      updateTaskProgressChart();
      updateTaskCategoryChart();
      updateTaskPriorityChart();
      ElMessage.success('任务分配成功');
    } else {
      ElMessage.error('请完成必填信息');
      return false;
    }
  });
};

// 重置筛选条件
const resetFilter = () => {
  filterStatus.value = '';
  filterPriority.value = '';
  filterCategory.value = '';
  filterDeadline.value = '';
};

// 初始化任务进度图表
let taskProgressChart;
const initTaskProgressChart = () => {
  const chartDom = document.getElementById('taskProgressChart');
  taskProgressChart = echarts.init(chartDom);
  
  const completedTasks = tasks.value.filter(task => task.status === '已完成').length;
  const totalTasks = tasks.value.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const option = {
    title: { text: '任务完成进度' },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '任务完成率',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: completionRate }]
      }
    ]
  };
  
  taskProgressChart.setOption(option);
};

// 更新任务进度图表
const updateTaskProgressChart = () => {
  if (taskProgressChart) {
    const completedTasks = tasks.value.filter(task => task.status === '已完成').length;
    const totalTasks = tasks.value.length;
    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    taskProgressChart.setOption({
      series: [
        {
          data: [{ value: completionRate }]
        }
      ]
    });
  }
};

// 初始化任务分类统计图表
let taskCategoryChart;
const initTaskCategoryChart = () => {
  const chartDom = document.getElementById('taskCategoryChart');
  taskCategoryChart = echarts.init(chartDom);
  
  // 统计各类任务数量
  const categories = ['开发', '测试', '文档', '其他'];
  const categoryData = categories.map(category => {
    return {
      name: category,
      value: tasks.value.filter(task => task.category === category).length
    };
  });
  
  const option = {
    title: { text: '任务分类统计' },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '任务分类',
        type: 'pie',
        radius: '60%',
        data: categoryData
      }
    ]
  };
  
  taskCategoryChart.setOption(option);
};

// 更新任务分类统计图表
const updateTaskCategoryChart = () => {
  if (taskCategoryChart) {
    const categories = ['开发', '测试', '文档', '其他'];
    const categoryData = categories.map(category => {
      return {
        name: category,
        value: tasks.value.filter(task => task.category === category).length
      };
    });
    
    taskCategoryChart.setOption({
      series: [
        {
          data: categoryData
        }
      ]
    });
  }
};

// 初始化任务优先级分布图表
let taskPriorityChart;
const initTaskPriorityChart = () => {
  const chartDom = document.getElementById('taskPriorityChart');
  taskPriorityChart = echarts.init(chartDom);
  
  // 统计各优先级任务数量
  const priorities = ['高', '中', '低'];
  const priorityData = priorities.map(priority => {
    return {
      name: priority,
      value: tasks.value.filter(task => task.priority === priority).length
    };
  });
  
  const option = {
    title: { text: '任务优先级分布' },
    tooltip: { trigger: 'item' },
    xAxis: {
      type: 'category',
      data: priorities
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '任务数量',
        type: 'bar',
        data: priorityData.map(item => item.value),
        itemStyle: {
          color: (params) => {
            const colors = {
              '高': '#f56c6c',
              '中': '#e6a23c',
              '低': '#67c23a'
            };
            return colors[priorities[params.dataIndex]];
          }
        }
      }
    ]
  };
  
  taskPriorityChart.setOption(option);
};

// 更新任务优先级分布图表
const updateTaskPriorityChart = () => {
  if (taskPriorityChart) {
    const priorities = ['高', '中', '低'];
    const priorityData = priorities.map(priority => {
      return {
        name: priority,
        value: tasks.value.filter(task => task.priority === priority).length
      };
    });
    
    taskPriorityChart.setOption({
      series: [
        {
          data: priorityData.map(item => item.value)
        }
      ]
    });
  }
};

onMounted(() => {
  initTaskProgressChart();
  initTaskCategoryChart();
  initTaskPriorityChart();
});
</script>

<style scoped>
.task-dashboard {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.task-section {
  flex: 1 1 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart {
  width: 100%;
  height: 250px;
}

.task-detail {
  padding: 20px;
}

.task-filter {
  margin-bottom: 20px;
}

.task-progress, .task-category, .task-priority, .task-assignment {
  margin-bottom: 20px;
}
</style>