# 数据模型设计

## 用户

```json
{
  _id:'',
  _openid:'',
  avatarUrl:'',
  nickName: '',
  gender: number,
  createdTime: Date,
  updatedTime: Date
}
```

## 商品
```json
{
  _id: '',
  _openid:'',
  imgUrls:[''],
  title: '',
  desc: '',
  abrase: Number,
  bargin: Boolean,
  category: '',
  price: Number,
  getMethod: Number,
  pos: '',
  qq: '',
  saled: Boolean,
  createdTime: Date
}
```

# 收藏
```json
{
  _id: '',
  _openid: '',
  productid: '',
  createTime: Date
}
```