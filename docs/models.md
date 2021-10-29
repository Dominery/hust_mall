# 数据模型设计

## 用户

```json
{
  _id:'',
  _openid:'',
  avatarUrl:'',
  nickName: '',
  sex: number,
  createdTime: Date,
  updatedTime: Date
}
```

## 商品
```json
{
  _id: '',
  userid:'',
  imgUrls:[''],
  title: '',
  desc: '',
  abrase: Number,
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
  userid: '',
  productid: '',
  createTime: Date
}
```