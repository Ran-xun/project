const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'categories.json');
const validateCategory = require('./middleware/validateCategory');
// 中间件
app.use(cors());
app.use(express.json());

// 获取所有分类
app.get('/api/categories', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('读取分类失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});



// 添加分类
app.post('/api/categories', validateCategory,async (req, res) => {
  try {
    
    // 补充创建时间（如果前端没传，后端自动生成，避免数据缺失）
    newCategory.createTime = new Date().toISOString().split('T')[0];
    // 读取现有数据
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const categories = JSON.parse(data);
    // 生成新ID（取当前最大ID+1）
    const maxId = categories.reduce((max, cat) => Math.max(max, cat.id), 0);
    newCategory.id = maxId + 1;
    // 核心修改：用unshift()插入到数组最前面（而非push()）
    categories.unshift(newCategory); 
    // 写入数据库
    await fs.writeFile(DATA_FILE, JSON.stringify(categories, null, 2));
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('添加分类失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 修改分类
app.put('/api/categories/:id', validateCategory,async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedCategory = req.body;
    // 验证分类名称是否为空
    if (!updatedCategory.name || updatedCategory.name.trim() === '') {
      return res.status(400).json({ error: '分类名称不能为空' });
    }
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const categories = JSON.parse(data);
    const index = categories.findIndex(cat => cat.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updatedCategory };
      await fs.writeFile(DATA_FILE, JSON.stringify(categories, null, 2));
      res.json(categories[index]);
    } else {
      res.status(404).json({ error: '分类未找到' });
    }
  } catch (error) {
    console.error('修改分类失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 删除分类
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const categories = JSON.parse(data);
    const newCategories = categories.filter(cat => cat.id !== id);
    if (newCategories.length < categories.length) {
      await fs.writeFile(DATA_FILE, JSON.stringify(newCategories, null, 2));
      res.status(204).send();
    } else {
      res.status(404).json({ error: '分类未找到' });
    }
  } catch (error) {
    console.error('删除分类失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`后端服务启动：http://localhost:${PORT}`);
});