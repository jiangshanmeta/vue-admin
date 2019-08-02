# label

label这个配置项是labelName配置项的补充。labelName配置项只是一个简单的字符串，label支持一个组件或者函数。目前该配置项应用在 OperatorInfo、OperatorEdit、CollectionOperatorCreate三个组件中。

## 多种mode

由于在上面三个组件中表现形式可能不一样，因此由多个不同的key进行分别配置：

```javascript
label:{
    info:{},
    edit:{},
    create:{},
    default:{},
},
```

有一个default配置项，作为最终兜底

```javascript
labelComponent:{
    default:{
        component:() => import('@/components/user/Labels/LabelUserRedstar').then((rst) => rst.default),
        exclude:[
            'info',
        ],
    },
},
```

default有一个特殊参数exclude(Array)，排除的mode，即该mode不会采用default提供的方式，而是直接采用labelName作为label。

## 组件模式和函数模式

类似于view这个配置项，label也支持了组件模式和函数模式。

组件模式需要配置component属性。

函数模式需要配置handler属性。handler被调用时this指向某个vue实例，第一个参数是labelName。

## config

和component以及handler平级的有个config参数。对于组件模式config会被展开传入组件，因此如果有的话，应该是对象形式。对于函数模式，config作为handler的第二个参数。

## 开发label组件

label组件非常接近于ViewComponent，一般情况下仅仅需要负责纯渲染，所以推荐使用函数式组件。

有一个labelName属性会作为prop传入。
