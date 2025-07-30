// src/middleware/validateCategory.js
const validateCategory = (req, res, next) => {
  const category = req.body;
  
  if (!category.name || !category.name.trim()) {
    return res.status(400).json({ error: '分类名称不能为空' });
  }
  
  if (!category.description || !category.description.trim()) {
    return res.status(400).json({ error: '分类描述不能为空' });
  }
  
  // 可以添加更多验证规则...
  if (category.name.length > 50) {
    return res.status(400).json({ error: '分类名称长度不能超过50个字符' });
  }
  
  if (category.description.length > 200) {
    return res.status(400).json({ error: '分类描述长度不能超过200个字符' });
  }
  
  next(); // 验证通过，继续处理请求
};

module.exports = validateCategory;