# 基础组件

## ListInfo

列表组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| fields | 是 | Object | 字段列表 | 作为ListView子组件时自动传入  |
| filters | 否 | Array | 筛选组件的配置项 | 默认为空数组 |
| filterOperators | 否 | Array | 筛选对应的操作 | 默认为空数组 |
| createdHook | 否 | Function | 在ListInfo的created中调用，做一些初始化操作 |
| initialPageSize | 否 | Number   | 分页组件需要的，初始每页多少条记录 | 默认为20 |
| pageIndexReqName | 否 | String   | 请求时pageIndex的key | 默认为 pageIndex |
| pageSizeReqName  | 否 | String   | 请求时pageSize的key  | 默认为 pageSize  |
| initialSortField | 否 | String   | 初始排序字段          | 默认为空字符串    |
| initialSortOrder | 否 | String   | 初始排序顺序          | 默认为空字符串    |
| sortFieldReqName | 否 | String   | 请求时排序字段的key  | 默认为 sortField |
| sortOrderReqName | 否 | String   | 请求时排序顺序的key  | 默认为sortOrder 值为asc或者desc |
| transformRequestData | 否 | Function | 请求列表前对请求参数做处理 | 默认原样返回 |
| listRequest | 是 | Function | 列表请求 | 见下 |
| transformListData        | 否 | Function | 获得后端传回的列表数据是对列表数据的操作 | 支持async函数，默认原样返回 |
| tableConfig | 否 | Object | 列表的配置项，如求和 | 默认为空对象 |
| selection |  否 | Boolean | 是否有多选栏 | 默认为 false |
| sortableFields | 否 | Object | 可排序字段列表 | 默认为空对象 |
| operators | 否 | Array | 操作组件的配置项 | 默认为空数组 |
| operatorsLabel | 否 | String | 操作列的名称 | 默认为 “操作” |
| emptyText | 否 | String | 无数据时的展示文字 | 默认为 "暂无数据" |
| paginated | 否 | Boolean | 是否需要分页 | 默认为true |
| paginationConfig | 否 | Object |  分页组件的配置项，可填pageSizes和layout | 默认为空对象 |

函数类型配置项的参数：

* transformRequestData(data) data是请求的参数
* listRequest(data) 请求列表数据，需要返回promise,返回字段格式如下：

```javascript
{
    // 列表数据数组
    "data":[{"id":1,"name":"A"}],
    // 总共有几条记录 分页用
    "total":50,
    // 需要在列表中展示的字段
    "fieldList":["name"]
}
```

* transformListData(data) 对列表数组做处理，支持async函数

## MetaFieldsLayout

处理布局的一个功能性组件

* layoutComponentName 布局组件的名称 默认为MetaTable，且对应的组件已被引入，自定义配置时请保证唯一
* layoutComponent 布局组件 需要自定义布局组件的时候需要配合layoutComponentName传入

## Operators

在底层支撑collectionOperators/filterOperators/documentOperators这三个参数的就是Operators组件。在model中对应的三个属性应该为数组或者返回数组的函数，当为函数类型时，this指向operators组件本身，函数的第一个参数为data值

### 组件模式与函数模式

声明一个operator有两种模式，组件模式和函数模式。

#### 组件模式配置项

组件模式有以下几个配置项

* name 组件名称 必填
* component 组件 必填
* config 对组件的配置 如果有的话，应为一个对象，被展开传给组件

#### 开发Operator组件

* 组件会被传入fields，对应model的fields
* 组件会被传入data属性，对于collectionOperator/filterOperator/documentOperator该参数含义不同
* emit update事件，会刷新列表

### 函数模式

#### 函数模式配置项

函数模式会被渲染为一个btn，点击btn会调用handler

* handler 一个函数 调用时会被传入参数data,collectionOperator/filterOperator/documentOperator该参数含义不同。调用handler时this指向Operators组件实例
* triggerConfig 一个可选对象 用来配置该模式下对应的btn。其中text是按钮的内容
* label 按钮的内容 同triggerConfig.text 但是优先级比triggerConfig.text低
* emit update事件，会刷新列表

## MetaComponentCreate

配置参数可参考CollectionOperatorCreate

* handleCancel 取消按钮点击回调函数
* handleCreateSuccess 新建成功后执行的函数
