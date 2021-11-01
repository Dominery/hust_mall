# API设计

## 用户信息

### 注册

提交
```json
{
  avatarUrl:'',
  nickName: '',
  gender: Number,
  createdTime: Date,
  updatedTime: Date
}
```

返回
```json
{
  _id: ''
}
```

### 登录

提交
```json
{
  _openid:''
}
```

返回
```json
{
  data: {
    avatarUrl:'',
    nickName: '',
    gender: Number
  }
}
```

### 获取用户信息

提交
```json
{
  _openid: ''
}
```

返回
```json
{
  data: {
    avatarUrl:'',
    nickName: '',
    gender: Number
  }
}
```

## 商品信息

oldPrice作为可选项，用0表示用户没有输入
getMethod 0表示送达，1表示自提

### 创建

提交
```json
{
  _openid:'',
  imgUrls:[''],
  title: '',
  desc: '',
  abrase: Number,
  category: '',
  price: Number,
  bargain: Boolean,
  oldPrice:Number,
  getMethod: Number,
  pos: '',
  qq: '',
  saled: Boolean
}
```

返回
```json
{
  _id:''
}
```

### 获取分类商品列表

提交
```json
{
  category:''
}
```

返回
```json
{
  data: [{
    _id:'',
    _openid:'',
    imgUrls:'',
    title: '',
    price: Number,
    bargain: Boolean,
    pos: ''
  }]
}
```

### 获取推荐商品列表

提交


返回
```json
{
  data: [{
    _id:'',
    _openid:'',
    imgUrls:'',
    title: '',
    price: Number,
    bargain: Boolean,
    pos: ''
  }]
}
```

### 搜索商品列表

提交
```json
{
  query:''
}
```

返回
```json
{
  data: [{
    _id:'',
    _openid:'',
    imgUrls:'',
    title: '',
    price: Number,
    bargain: Boolean,
    pos: '',
    saled: Boolean
  }]
}
```

### 获取商品信息

提交
```json
{
  _id:''
}
```

返回
```json
{
  data: {
    _openid:'',
    imgUrls:[''],
    title: '',
    desc: '',
    abrase: Number,
    price: Number,
    bargain: Boolean,
    oldPrice: Number,
    getMethod: Number,
    pos: '',
    saled: Boolean
  }
}
```

### 删除商品

提交
```json
{
  _id: [''],
  _openid: ''
}
```

返回
```json
{
  errno:0
}
```

### 标记售出

提交
```json
{
  _openid: '',
  _id:['']
}
```

返回
```json
{
  errno:0
}
```

### 获取某用户商品

提交
```json
{
  _openid:''
}
```

返回
```json
{
  data: {
    onsale: ['productid'],
    saled: [''],
    collect: ['']
  }
}
```
