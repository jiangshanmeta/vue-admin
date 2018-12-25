# Introduction

这个项目是基于vue-cli构建的针对于后台业务的通用业务层，UI库采用了element-ui。

本项目的核心页面是 */src/components/listView* 。

## model

对于这个核心列表页，有相当多的可配置信息，这些可配置项被抽象成为一个model统一管理，这就是 */src/model/* 要存放的内容。

一个model由以下几个部分构成：

* [field_list](https://github.com/jiangshanmeta/vue-admin#field_list) 字段列表，是一个model最基础的配置项

* [listConfig](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common#listinfo)，列表组件的配置项

* [operators]((https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/operators)) 针对一条记录的操作集

* [staticOperators](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/staticOperators) 类似于operators，但staticOperators不针对于一条特定的记录，它对应的data是选中的数据数组。

* [filters](https://github.com/jiangshanmeta/vue-admin#filters)，筛选组件的配置项。

* filterOperators 类似于operators，是为了拓展筛选功能设计的(目前没发现什么特别的用途)，除了传入代表筛选参数的data属性，它还传入了filters属性。

声明了一个model后，我们还需要在vue-router配置中指明用了哪个model，因而用到了vue-router的meta属性。


## field_list

field_list是一个字段集合，每一个键是对应的字段名，值是关于这个字段相关的描述。

关于字段的描述可以自行扩展，目前支持以下描述：

* label 这个字段的展示名

* labelComponent 用组件处理复杂的label

```javascript
labelComponent:{
    // 默认模式
    default:{
        name:"label_redstar",
        component:()=>import("@/components/user/labels/label_redstar").then((rst)=>rst.default),
        // 排除create模式
        exclude:['create']
    },
    // info 模式下采用该labelComponent
    info:{
        name:"label_redstar",
        component:()=>import("@/components/user/labels/label_redstar").then((rst)=>rst.default),
    },
},
```

* editorComponent 这个字段编辑相关的配置，包括name(组件名),config(对组件的配置项),component(自定义组件，一般是结合动态导入import()方法),default(默认值)。我提供了一些[通用业务组件](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)。声明示例如下：

```javascript
editorComponent:{
    // 必须，唯一
    name:"field_naive",
    // 传入自定义表单元素组件才需要component属性
    component:()=>import("@/components/test/field_naive").then((rst)=>rst.default),
    config:{
        placeholder:'请输入用户名',
    },
    createConfig:{

    },
    editConfig:{
        placeholder:"测试editconfig"
    },
    // 必须
    default:'',
},
```

createConfig和editConfig是考虑到不同模式下有不同的配置项而设立的。

* view [字段展示时的配置项](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/views)

* validator 表单验证用的，底层依赖async-validator

* tip 展示在表单元素下面的用来提示用户的信息，支持字符串/数字/函数

* colspan 用于info edit create 组件中的，用来控制组件对应的colspan。声明格式如下：

```javascript
colspan:{
    // 默认模式
    default:{
        label:1,
        field:3,
        // 排除掉edit，即此时edit 对应 {label:1,field:1}
        // exclude:['edit'],
    },
    // 先找具体的模式，再看default模式
    // 值为数字，指label为1，field为这个值
    create:3,
    info:{
        // label对应比例
        label:2,
        // field对应比例，field可能对应formComponent 可能对应viewComponent
        field:2,
    }
}
```

* tableColumnConfig 在表格中table column的配置项




## filters

filters是筛选的配置项，它是一个数组，其组成元素示例如下：

```javascript
{
    label:"自定义filter",
    field:"test",
    editorComponent:{
        name:"test_custom_filter",
        config:{
            msg:"测试自定义filter",
        },
        component:import("@/components/user/test_custom_filter"),
        default:"test",
    },
    watch:true,
}
```

* label是展示名
* field是请求时的key
* editorComponent是编辑组件相关配置项，name是编辑组件名称，config是对这个编辑组件的配置项，component是传入自定义组件，用于自定义编辑组件时动态引入，default是编辑组件的默认值
* watch是用来实现当一个编辑组件变化时就触发查询(默认是有个查询按钮，点击才查询)，值为true则开启此功能。

