view是为了展示字段而设立的配置项，目前支持函数和组件两种模式。如果不配置该项则原样展示。

为了能让多个字段作为一个字段展示，设立了join参数(可选)。可以是对象，也可以是数组。

```javascript
join:{
    customername:"name",
    address:"position"
},
```

上面代码的意思是，原来的数据中有customername和address两个字段，但是分别用name和position作为新的key传递。对于数组形式，意味着key和原数据保持一致。

为了提高通用性，提供了config参数(可选，一个对象)。

函数形式使用示例：

```javascript
view:{
    // handler是一个函数，对应函数模式
    // 为了使用方便，this被绑定到父组件上
    handler(data,config){
        return `${data.customername} ${config.glue} ${data.address}`;
    },
    // 数组形式声明，不需要改变字段的名称
    join:["customername","address"],
    config:{
        glue:" 的收货地址是 ",
    },
}
```

组件形式使用示例：

```javascript
view:{
    // view组件的名称，必传，要保证唯一性
    name:"test_view_join",
    // 组件模式
    component:()=>import("@/components/book/views/test_view_join").then((rst)=>rst.default),
    // 联合customername和address字段，但是传递给组件的时候名称分别为name和position
    join:{
        customername:"name",
        address:"position"
    },
    config:{
        glue:" 的收货地址是 ",
    },
}
```

考虑到viewComponent仅仅是负责展示，因而推荐使用functional component。下面提及的几个viewComponent实现也都是基于functional component的。


## view_enum

这个组件是为了展示枚举类型的字段用的

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是 | String Number | 真实值 | 作为viewComponent时该值自动传入   |
| enums  |  是  | Object    | 枚举配置项 | - |

## view_html

输出真正的 HTML

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是 | String | 真实值 | 作为viewComponent时该值自动传入   |

## view_transform

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是 | String Number | 真实值 | 作为viewComponent时该值自动传入   |
| transform  |  是  | Function    | 转换函数，第一个参数是data | - |

这个组件其实是函数模式的前身，用处不大