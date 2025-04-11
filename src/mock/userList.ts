import Mock from 'mockjs';
// 模拟的接口数据
Mock.mock('/api/users', 'post', {
    code: 200,
    message: '成功',
    data: {
      'list|5': [{  // 生成5个用户数据
        'id|+1': 1,  // id 从 1 开始递增
        'name': '@name',  // 随机生成用户名
        'age|18-60': 20,  // 随机生成年龄，范围是 18 到 60
        'email': '@email'  // 随机生成邮箱
      }]
    }
  });
  
  Mock.mock('/api/product', 'get', {
    code: 200,
    message: '成功',
    data: {
      'list|10': [{  // 生成10个商品数据
        'id|+1': 1,
        'name': '@word(3, 5)',  // 随机生成商品名
        'price|100-1000.2': 100,  // 随机生成价格
      }]
    }
  });