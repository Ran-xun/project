<script lang="ts" setup>
import { Delete, Edit, Checked, CircleClose } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { computed, reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import { validateCategoryForm } from '@/utils/validators';
// 定义分类接口
interface Category {
  id: number;
  name: string;
  description: string;
  createTime: string;
  status: 'active' | 'inactive';
}

// 分类列表
const categories = ref<Category[]>([]);

// 加载分类数据
const loadCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('加载分类失败:', error);
    ElMessage.error('数据加载失败，请检查后端服务');
  }
};

// 页面加载时初始化数据
onMounted(() => {
  loadCategories();
});

// 分页控制
const pagination = reactive({
  currentPage: 1,       // 当前页码
  pageSize: 5,          // 每页条数
  pageSizes: [5, 10, 20] // 每页条数选项
});

// 计算总条数
const total = computed(() => categories.value.length);

// 计算当前页数据
const currentPageData = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  return categories.value.slice(start, end);
});

// 搜索功能
const search = ref('');
const filteredCategories = computed(() => {
  if (!search.value.trim()) return currentPageData.value;
  
  const keyword = search.value.toLowerCase();
  return currentPageData.value.filter(
    (cat) =>
      cat.name.toLowerCase().includes(keyword) ||
      cat.description.toLowerCase().includes(keyword)
  );
});

// 多选功能
const multipleSelection = ref<Category[]>([]);

// 选择变化时更新选中项
const handleSelectionChange = (val: Category[]) => {
  multipleSelection.value = val;
};

// 批量删除
const batchDelete = async () => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请先选择要删除的分类');
    return;
  }
  try {
    for (const category of multipleSelection.value) {
      await axios.delete(`http://localhost:3000/api/categories/${category.id}`);
    }
    ElMessage.success('批量删除成功');
    loadCategories();
  } catch (error) {
    console.error('批量删除失败:', error);
    ElMessage.error('批量删除失败，请检查后端服务');
  }
};

// 批量更新状态
const batchUpdateStatus = async (status: 'active' | 'inactive') => {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning('请先选择要操作的分类');
    return;
  }
  try {
    for (const category of multipleSelection.value) {
      await axios.put(`http://localhost:3000/api/categories/${category.id}`, { ...category, status });
    }
    ElMessage.success('批量更新状态成功');
    loadCategories();
  } catch (error) {
    console.error('批量更新状态失败:', error);
    ElMessage.error('批量更新状态失败，请检查后端服务');
  }
};

// 对话框 & 表单
const dialogFormVisible = ref(false);
const form = reactive<{
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}>({
  id: 0,
  name: '',
  description: '',
  status: 'active',
});
const dialogTitle = computed(() => (form.id ? '编辑分类' : '添加分类'));

const openAddDialog = () => {
  form.id = 0;
  form.name = '';
  form.description = '';
  form.status = 'active';
  dialogFormVisible.value = true;
};

const openEditDialog = (category: Category) => {
  form.id = category.id;
  form.name = category.name;
  form.description = category.description;
  form.status = category.status;
  dialogFormVisible.value = true;
};

const saveCategory = async () => {
  // 验证分类名称是否为空
  if (!validateCategoryForm(form)) {
    return;
  }
  try {
    if (form.id) {
      // 编辑分类
      await axios.put(`http://localhost:3000/api/categories/${form.id}`, form);
      ElMessage.success('编辑分类成功');
    } else {
      // 添加分类
      const response = await axios.post('http://localhost:3000/api/categories', form);
      // 将新分类添加到列表的最前面
      categories.value.unshift(response.data);
      ElMessage.success('添加分类成功');
    }
    dialogFormVisible.value = false;
    // 不需要再调用 loadCategories，因为已经手动更新了 categories
  } catch (error) {
    console.error('保存分类失败:', error);
    ElMessage.error('保存分类失败，请检查后端服务');
  }
};

const handleDelete = async (category: Category) => {
  try {
    await axios.delete(`http://localhost:3000/api/categories/${category.id}`);
    ElMessage.success('删除分类成功');
    loadCategories();
  } catch (error) {
    console.error('删除分类失败:', error);
    ElMessage.error('删除分类失败，请检查后端服务');
  }
};
</script>

<template>
  <div>
    <!-- 卡片头部：标题 + 批量操作按钮 -->
    <el-card style="width: 100%" shadow="always">
      <div class="card-header">
        <span>信息分类管理</span>
        <div class="batch-actions">
          <el-button 
            type="danger" 
            size="small" 
            @click="batchDelete"
            :disabled="multipleSelection.length === 0"
          >
            <Delete /> 批量删除
          </el-button>
          <el-button 
            type="success" 
            size="small" 
            @click="batchUpdateStatus('active')"
            :disabled="multipleSelection.length === 0"
          >
            <Checked /> 批量启用
          </el-button>
          <el-button 
            type="info" 
            size="small" 
            @click="batchUpdateStatus('inactive')"
            :disabled="multipleSelection.length === 0"
          >
            <CircleClose /> 批量禁用
          </el-button>
          <el-button type="primary" @click="openAddDialog">添加分类</el-button>
        </div>
      </div>
    </el-card>

    <!-- 分类列表表格 -->
    <el-table
      :data="filteredCategories"
      style="width: 100%; margin-top: 20px"
      empty-text="暂无分类数据"
      @selection-change="handleSelectionChange"
      ref="tableRef"
    >
      <!-- 多选框列 -->
      <el-table-column type="selection" width="55" />
      
      <el-table-column label="分类名称" prop="name" />
      <el-table-column label="描述" prop="description" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="状态" prop="status">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
            {{ scope.row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="搜索分类（名称/描述）"
            clearable
          />
        </template>
        <template #default="scope">
          <el-button
            :icon="Edit"
            circle
            type="primary"
            size="small"
            @click="openEditDialog(scope.row)"
          />
          <el-button
            :icon="Delete"
            circle
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <el-pagination
      @size-change="pagination.pageSize = $event"
      @current-change="pagination.currentPage = $event"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px; text-align: right;"
    />

    <!-- 添加/编辑分类对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="分类名称">
          <el-input
            v-model="form.name"
            placeholder="请输入分类名称"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="请输入分类描述"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="'active'">启用</el-radio>
            <el-radio :label="'inactive'">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="saveCategory">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.batch-actions {
  display: flex;
  gap: 8px;
}
</style>