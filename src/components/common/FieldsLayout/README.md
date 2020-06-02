# FieldsLayout

## MetaTable

默认提供的字段布局方式

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| fields | 是 | Object | 字段列表 | 就是model的fields  |
| mode | 是 | String | 模式 | 由使用该组件的组件提供  |
| fieldLayoutList | 是 | Array | 字段布局数组 | 二维数组  |

每个字段的label和field占据几个格子是在fields下每个字段的colspan配置的(虽然我一直感觉配在这里似乎不太合适，但是先这么用着吧)，如果不配置该项则默认label和field均为1

```javascript
colspan: {
    default: {
        label: 1,
        field: 3,
        exclude:['edit'],
    },
    create: 3,
    // edit: 3,
    info: {
        label: 2,
        field: 2,
    },
},
```

上面是个比较全的例子，含义是 对于mode为info的，label和field均占两格；对于create，field占3格，label走默认占1格。edit没有自己特定的，所以尝试走default 但是default又使用了exclude排除了edit，所以edit只能走兜底默认，即label和field均为1格。
