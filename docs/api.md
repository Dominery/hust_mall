# API设计

## 用户信息

### 注册

提交
```json
{
  _openid:'',
  avatarUrl:'',
  nickName: '',
  sex: number
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

缓存期限内

提交
```json
{
  _id:''
}
```

返回
```json
{
  avatarUrl:'',
  nickName: '',
  sex: number
}
```

超出期限

提交
```json
{
  _openid:''
}
```

返回
```json
{
  avatarUrl:'',
  nickName: '',
  sex: number
}
```

### 获取用户信息

提交
```json
{
  _id: ''
}
```

返回
```json
{
  data: {
    avatarUrl:'',
    nickName: '',
    sex: number
  }
}
```

## 商品信息

### 创建

提交
```json
{
  userid:'',
  imgUrls:[''],
  title: '',
  desc: '',
  abrase: number,
  category: '',
  price: number,
  getMethod: number,
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
    userid:'',
    imgUrls:'',
    title: '',
    price: Number,
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
    userid:'',
    imgUrls:'',
    title: '',
    price: Number,
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
    userid:'',
    imgUrls:'',
    title: '',
    price: Number,
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
    userid:'',
    imgUrls:[''],
    title: '',
    desc: '',
    abrase: number,
    price: Number,
    getMethod: number,
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
  userid: ''
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
  userid: '',
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
  userid:''
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
