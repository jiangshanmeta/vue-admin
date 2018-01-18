## view_enum

这个组件是为了展示枚举类型的字段用的

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是 | String Number | 真实值 | 作为showComponent时该值自动传入   |
| enums  |  是  | Object    | 枚举配置项 | - |

## view_staticpath

设计之初设为了展示注册在store上的内容

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| path   | 是    | String | 路径描述 | 例如 "$store.state.activity.name" |

## view_html

输出真正的 HTML