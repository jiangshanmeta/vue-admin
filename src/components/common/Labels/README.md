# labelComponent

labelComponent这个配置项是label配置项的补充。label配置项只是一个简单的字符串，labelComponent则对应一个组件。目前该配置项应用在 OperatorInfo、OperatorEdit、StaticOperatorCreate三个组件中。

## 配置规则

由于在上面三个组件中表现形式可能不一样，因此由多个不同的key进行分别配置：

```javascript
labelComponent:{
    info:{},
    edit:{},
    create:{},
    default:{},
},
```

有一个default配置项，作为最终兜底采用的labelComponent

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

注意到default配置时有一个特殊的exclude选项，意味着不采用default的labelComponent，仅仅采用label值渲染。上面配置的含义是info、edit和create都没有独特的labelComponent，尝试采用默认值，但是默认值又排除了info组件，所以info组件会直接采用label值，而create和edit会采用默认的labelUserRedStar组件。

另外，和component平级的还有一个config选项，用来配置组件。这个选项如果存在，需要是一个对象，然后会被展开传递给组件。

## 开发LabelComponent

LabelComponent非常接近于ViewComponent，一般情况下仅仅需要负责纯渲染，所以推荐使用函数式组件。

有一个label属性会作为prop传入，这个label就是和labelComponent同级的那个label配置项。

## TDOD

* 类似于view配置项，要不要支持函数模式
