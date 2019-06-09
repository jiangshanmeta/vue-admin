# Operators

operators是针对一条记录的操作集合，它是个数组，数组中每一项对应一个针对一条记录的操作

## 组件模式与函数模式

声明一个operator有两种模式，组件模式和函数模式。

### 组件模式

#### 组件模式配置项

组件模式有以下几个配置项

* name 组件名称 必填
* component 组件 必填
* config 对组件的配置 如果有的话，应为一个对象，被展开传给组件

#### 开发Operator组件

* 组件会被传入fields，对应model的fields
* 组件会被传入data属性，对应一条记录
* emit update时间，会刷新列表

### 函数模式

#### 函数模式配置项

函数模式会被渲染为一个btn，点击btn会调用handler

* handler 一个函数 调用时会被传入两个参数 cb 和 data 对应一个回调函数和这条记录 调用cb会刷新列表。调用handler时this指向operator组件实例
* triggerConfig 一个可选对象 用来配置该模式下对应的btn。其中text是按钮的内容
* label 按钮的内容 同triggerConfig.text 但是优先级比triggerConfig.text低

## 内置Operators

### OperatorInfo

详情操作组件

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| fields | 是 | Object | model的字段列表 | 作为operator组件自动传入 |
| data | 是 | Object | 这一条记录的数据 | 作为operator组件自动传入 |
| getDetailInfo | 是 | Function | 获得详情信息的方法 | - |
| triggerConfig | 否 | Object | 触发按钮的配置项 | 默认为空对象 |
| dialogConfig | 否 | Object | 弹框组件的配置项 | 默认为空对象 |

更多说明:

* getDetailInfo(resolve,data) 一般情况下该函数的this指向info组件实例，data是这条记录的原始记录,详情信息通过resolve方法传入，格式如下：

```javascript
{
    // 布局信息
    "fieldLayoutList":[
        ["name"],
        ["gender","typ"],
        ["desc"]
    ],
    // 需要的字段
    "record":{
        "name":"张三",
        "gender":0,
        "typ":"店小二",
        "desc":"假装有段描述",
    }
}
```

### OperatorEdit

编辑操作组件

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| fields | 是 | Object | model的字段列表 | 作为operator组件自动传入 |
| data | 是 | Object | 这一条记录的数据  | 作为operator组件自动传入 |
| getEditInfo | 是 | Function | 获取编辑相关信息 | - |
| doEditRequest | 是 | Function | 编辑操作的方法 | - |
| triggerConfig | 否 | Object | 触发按钮的配置项 | 默认为空对象 |
| dialogConfig | 否 | Object | 弹框组件的配置项 | 默认为空对象 |
| editBtnConfig | 否 | Object | 取消按钮的配置项 | 默认为空对象 |
| cancelBtnConfig | 否 | Object | 确认创建按钮的配置项 | 默认为空对象 |
| autoValidate | 否 | Boolean | 是否自动表单验证 | 默认为false,第一次点提交时才自动表单验证 |
| transformData | 否 | Function | 在doEditRequest前对表单数据做一次转换 |
| reserveFields | 否 | Array | 不需要编辑但是需要提交的字段，例如id |
| idfield | 否 | String | 指明id字段 | 默认是id |

更多说明:

* getEditInfo(resolve,data) , 一般情况下该函数的this指向edit组件实例,data是这条记录的原始记录,编辑需要的信息通过resolve传入，示例如下：

```javascript
{
    // 需要编辑的字段
    "fieldLayoutList":[
        ["name"],
        ["gender","typ"],
        ["privilege"],
        ["desc"]
    ],
    // 字段及对应值
    "record":{
        "name":"张三",
        "gender":"0",
        "typ":1,
        "privilege":[],
        "desc":"假装有段描述"
    }
}
```

* transformData(data) data为表单中的数据，需要返回一个对象(处理后的数据)
* doEditRequest(resolve,data) 一般情况下该函数的this指向edit组件实例，data是经过transformData处理的数据，更新完成后调用resolve，会刷新列表。

### OperatorDelete

删除操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 作为operator组件自动传入 |
| doDeleteRequest | 是 | Function | 删除操作请求 | - |
| triggerConfig | 否 | Object | 触发按钮的配置项 | 默认为空对象 |
| idfield | 否 | String | 指明id字段 | 默认是id |

更多说明:

* doDeleteRequest(resolve,data) 一般情况该函数调用时this指向Delete组件实例，data是这条记录原始数据，删除完成后调用resolve会刷新列表
* 在doDeleteRequest中，可以通过```this.id```访问id字段，它本身是```this.data[this.idfield]```的语法糖
