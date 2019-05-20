## ListInfo

列表组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| field_list | 是 | Object | 字段列表 | 作为list_view子组件时自动传入  |
| filters | 否 | Array | 筛选组件的配置项 | 默认为空数组 |
| filterOperators | 否 | Array | 筛选对应的操作 | 默认为空数组 |
| pageSize | 否 | Number   | 分页组件需要的，每页多少条记录 | 默认为20 |
| pageIndexReqName | 否 | String   | 请求时pageIndex的key | 默认为 pageIndex |
| pageSizeReqName  | 否 | String   | 请求时pageSize的key  | 默认为 pageSize  |
| sortFieldReqName | 否 | String   | 请求时排序字段的key  | 默认为 sortField |
| sortOrderReqName | 否 | String   | 请求时排序顺序的key  | 默认为sortOrder 值为asc或者desc |
| transformRequestData | 否 | Function | 请求列表前对请求参数做处理 | 默认什么都不做 |
| listRequest | 是 | Function | 列表请求 | - |
| transformListData        | 否 | Function | 获得后端传回的列表数据是对列表数据的操作 | 支持async函数，默认什么都不做 |
| tableConfig | 否 | Object | 列表的配置项，如求和 | 默认为空对象 |
| selection |  否 | Boolean | 是否有多选栏 | 默认为 false |
| sortFields | 否 | Array | 可排序字段列表 | 默认为空数组 |
| operators | 否 | Array | 操作组件的配置项 | 默认为空数组 |
| operatorsLabel | 否 | String | 操作列的名称 | 默认为 “操作” |
| emptyText | 否 | String | 无数据时的展示文字 | 默认为 "暂无数据" |
| paginated | 否 | Boolean | 是否需要分页 | 默认为true |
| paginationConfig | 否 | Object |  分页组件的配置项，可填pageSizes和layout | 默认为空对象 |


函数类型配置项的参数：

* transformRequestData(data) data是请求的参数

* listRequest(resolve,data) 请求列表数据，返回字段格式如下：

```
{
    "data":[{"id":1,"name":"A"}],
    "total":50,
    "fields":["name"]
}
```

* transformListData(data) 对列表数组做处理，支持async函数