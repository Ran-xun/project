// src/utils/validators.ts
import { ElMessage } from 'element-plus';

// 分类表单验证接口
interface CategoryForm {
  name: string;
  description: string;
}

// 验证分类表单
export const validateCategoryForm = (form: CategoryForm): boolean => {
  if (!form.name.trim()) {
    ElMessage.error('分类名称不能为空');
    return false;
  }
  
  if (!form.description.trim()) {
    ElMessage.error('分类描述不能为空');
    return false;
  }
  
  // 可以添加更多验证规则...
  if (form.name.length > 50) {
    ElMessage.error('分类名称长度不能超过50个字符');
    return false;
  }
  
  if (form.description.length > 200) {
    ElMessage.error('分类描述长度不能超过200个字符');
    return false;
  }
  
  return true;
};