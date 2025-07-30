import request from '@/utils/request';

// 获取分类列表
export function getCategories(params) {
  return request({
    url: '/categories',
    method: 'get',
    params
  });
}

// 添加分类
export function addCategory(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  });
}

// 更新分类
export function updateCategory(id, data) {
  return request({
    url: `/categories/${id}`,
    method: 'put',
    data
  });
}

// 删除分类
export function deleteCategory(id) {
  return request({
    url: `/categories/${id}`,
    method: 'delete'
  });
}

// 批量删除分类
export function batchDeleteCategories(ids) {
  return request({
    url: '/categories/batch',
    method: 'delete',
    data: { ids }
  });
}

// 批量更新分类状态
export function batchUpdateStatus(ids, status) {
  return request({
    url: '/categories/status',
    method: 'put',
    data: { ids, status }
  });
}    