# View

view属性是用来处理字段的展示问题而设定的配置项，如果不设置该选项则直接渲染原始数据。

## 函数模式和组件模式

view属性提供了两种模式，函数模式和组件模式。

函数模式一般是在渲染比较简单的情况下使用，这种模式仅需要配置handler属性:

```javascript
view:{
    handler(data){
        return (
            <div class="view-handler">
                {data}
            </div>
        )
    },
},
```

组件模式是在渲染相对比较复杂，或者可复用性比较强的时候使用，它需要配置component这个属性：

```javascript
view:{
    component:() => import('@/components/common/Views/ViewMarkdown').then((rst) => rst.default),
},
```

要开发一个View类型组件，推荐使用函数式组件。一般情况下会被传入data属性，这个prop是该字段的值。

## config属性

为了提高可复用性，提供了一个config属性。

对于函数模式，config会作为第二个参数传给handler：

```javascript
view:{
    handler(data,config){
        return `${config.prefix} ${data}`
    },
    config:{
        prefix:'一个前缀',
    },
}
```

对于组件模式，config属性会被展开传入给组件，所以一定要是对象形式

```javascript
view:{
    component:()=>import("@/components/common/Views/ViewEnum").then((rst)=>rst.default),
    config:{
        enums:{
            1:'失败人士',
            2:'成功人士',
            3:'自杀人士',
        }
    },
}
```

对于ViewEnum组件，其props属性如下:

```javascript
props:{
    data:{
        type:[Number,String],
        required:true,
    },
    enums:{
        type:Object,
        required:true,
    },
},
```

## join属性

在前端可能会遇到这么一个需求，需要把几个字段放到一起去展示，join字段就是用来解决这个问题的。

join可以配置为数组，也可以配置为对象。配置为数组意味着传入的字段名和原始字段名一致，配置为对象意味着key是数据原始字段名，value是传入的新字段名。

对于函数模式，所有的字段都会被或合并到第一个参数中：

```javascript
view:{
    handler(data){
        return `${data.name} -- ${data.address}`
    },
    join:['address','name'],
},
```

对于组件模式，这些字段会被展开传入：

```javascript
view:{
    component:ViewJoin,
    join:{
        'address':'joinAddress',
    },
},
```

则joinAddress会作为一个prop传入

## getViewValue

getViewValue配置项是个函数，默认原样返回。用它对要展示的数据进行处理。

例如，我们有渲染枚举的组件ViewEnum，一般情况下后端仅需返回1 2 3这样的枚举值即可，但是有的后端可能会返回```{index:1}```这种，为了处理这种数据，写个新组件ViewEnumFuckBackend当然可以，getViewValue也是一种解决方案：

```javascript
view:{
    component:()=>import("@/components/common/Views/ViewEnum").then((rst)=>rst.default),
    config:{
        enums:{
            1:'失败人士',
            2:'成功人士',
            3:'自杀人士',
        }
    },
    getViewValue(data){
        return data.index;
    },
},
```

这个函数调用时，this指向一个Vue实例(别问是哪个), 可以访问```$store```等资源

然而，遇到需要这个配置项的时候，一般意味着项目管理出现了问题。

## 提供的几个组件

### ViewEnum

这个组件是为了展示枚举类型的字段用的

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 否 | String Number | 真实值 | 作为ViewComponent时该值自动传入   |
| enums  |  是  | Object Function   | 枚举配置项 | 为函数时this指向一个vue实例(可以用来访问store) 函数应返回enums对象  |

### ViewHTML

相当于v-html

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 否 | String | 真实值 | 作为ViewComponent时该值自动传入   |

### ViewMarkdown

渲染markdown用的，本组件仅作为vue-markdown的包装，其余参数参考[vue-markdown](https://github.com/miaolz123/vue-markdown)

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 否 | String | 真实值 | 作为ViewComponent时该值自动传入   |

### ViewLink

作为router-link的包装

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 否 | 不限 | 真实值 | 作为ViewComponent时该值自动传入，一般而言是关联id   |
| getLink | 是 | Function | 获取链接的方法 | 第一个参数是data值，返回值作为router-link的to参数，this指向一个vue实例 |
| getText | 是 | Function | 获取展示文字的方法 | 第一个参数是data值，返回值作为router-link的内容，this指向一个vue实例 |

### ViewTransform

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 否 | String Number | 真实值 | 作为viewComponent时该值自动传入   |
| transform  |  是  | Function    | 转换函数，第一个参数是data | - |

这个组件其实是函数模式的前身，用处不大
