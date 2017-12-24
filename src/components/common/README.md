## enum_view

这个组件是为了展示枚举类型的字段用的

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是 | String Number | 真实值 | 作为showComponent时该值自动传入   |
| enums  |  是  | Object    | 枚举配置项 | - |

## create

创建model的组件

配置项：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| canCreate | 否 | Boolean | 是否可以创建 | 默认为 true，可以创建 |
| getCreateFieldsUri | 否 | String | 创建时获取可填写字段时的请求地址  |  当getCreateFields采用默认值时为必需值 |
| doCreateUri | 否 | String | 创建时的请求地址 | 当采用默认doCreateRequest时为必需值  |
| field_list | 是 | Object | 字段列表 | 在list_view中该字段为默认传入 |
| getCreateFields | 否 | Function | 获取创建需要的字段的请求 | 默认是向后端请求，需要结合getCreateFieldsUri  |
| doCreateRequest | 否 | Function | 创建需要进行的请求 | 默认值需要结合doCreateUri |
| title | 否 | String | 创建时弹出框的标题 | 默认为 "创建" |
| transformData | 否  | Function | 用来在doCreateRequest对表单数据进行一次处理，比如修改某个字段的格式 | 默认方法是原样返回表单数据 |

函数类型配置项的参数：

* getCreateFields(vm,resolve) vm为create组件实例，获取的创建字段通过调用resolve返回，
  创建字段格式如下：

```
[
    ["customername","totalprice"],
    ["address"],
    ["store","saler"]
]
```

* transformData(data) data为表单中的数据，需要返回一个对象(处理后的数据)
* doCreateRequest(vm,data,resolve) vm为createe组件实例，data是经过transformData处理过的表单数据，resolve是Promise的resolve，创建完成触发create事件。

## listInfo

列表组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| field_list | 是 | Object | 字段列表 | 作为list_view子组件时自动传入  |
| sortFields | 否 | Array | 可排序字段列表 | 默认为空数组 |
| baseUrl | 否 | String | 列表请求地址 | 使用默认listRequest时，该参数是必需项 | 
| listRequest | 否 | Function | 列表请求 | 默认值需要baseUrl配合 |
| pageIndexReqName | 否 | String   | 请求时pageIndex的key | 默认为 pageIndex |
| pageSizeReqName  | 否 | String   | 请求时pageSize的key  | 默认为 pageSize  |
| sortFieldReqName | 否 | String   | 请求时排序字段的key  | 默认为 sortField |
| sortOrderReqName | 否 | String   | 请求时排序顺序的key  | 默认为sortOrder 值为asc或者desc |
| treatData        | 否 | Function | 获得后端传回的列表数据是对列表数据的操作 | 支持async函数，默认什么都不做 |
| pageSize         | 否 | Number   | 分页组件需要的，每页多少条记录 | 默认为20 |
| pageSizes        | 否 | Array    | 分页组件需要的，每页记录数选择器配置项，一个数字数组 | 默认为 [10,20,30,40] |
| filters | 否 | Array | 筛选组件的配置项 | 默认为空数组 |
| operators | 否 | Array | 操作组件的配置项 | 默认为空数组 |

## info

用来展示详情信息的操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是    | Object | 一条记录  |  作为操作组件，该属性自动传入 |
| field_list | 是 | Object | 字段列表 | - |
| uri | 否 | String | 获得详情时请求地址 | 采用默认getDetailInfo时该参数必需 |
| title | 否 | String | 详情dialog的标题 | 默认为 “详情” | 
| getDetailInfo | 否 | Function | 获得详情信息的方法 | 采用默认方法需要配合uri参数 |

函数类型配置项的参数：

* getDetailInfo(vm,resolve) vm是info组件实例，详情信息通过resolve方法传入，格式如下：

```
[
    [{"field":"name","value":"张三"}],
    [{"field":"gender","value":0},{"field":"typ","value":"店小二"}],
    [{"field":"desc","value":"假装有段描述"}]
]
```


## edit

编辑组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 对于操作组件是自动传入的 |
| field_list | 是 | Object | 字段列表 | 对于操作组件自动传入 |
| editInfoUri | 否 | String | 获取编辑相关信息的请求地址 | getEditInfo采用默认方法时该属性必需 |
| doEditUri | 否 | String | 编辑操作的请求地址 | doEditRequest采用默认值时该参数必需 |
| getEditInfo | 否 | Function | 获取编辑相关信息 | - |
| doEditRequest | 否 | Function | 编辑操作的方法 | - |
| title | 否 | String | 编辑对话框的标题 | 默认为编辑 |
| autoValidate | 否 | Boolean | 是否自动表单验证 | 默认为false,第一次点提交时才自动表单验证 |
| transformData | 否 | Function | 在doEditRequest前对表单数据做一次转换 |
| idfield | 否 | String | 指明id字段 | 默认是id |



函数类型配置项的参数：

* getEditInfo(vm,resolve) , vm是edit组件实例，编辑需要的信息通过resolve传入，示例如下：

```
[
    [{"field":"name","value":"张三"}],
    [{"field":"gender","value":0},{"field":"typ","value":1}],
    [{"field":"privilege"}],
    [{"field":"desc","value":"假装有段描述"}]
]
```

* transformData(data) data为表单中的数据，需要返回一个对象(处理后的数据)
* doEditRequest(vm,data,resolve) vm是edit组件实例，data是经过transformData处理的数据，更新完成后调用resolve。

## delete

删除操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 对于操作组件是自动传入的 |
| uri | 否 | String | 删除时请求的uri | 配合doDeleteRequest使用 | 
| doDeleteRequest | 否 | Function | 删除操作请求 | 默认方法需要结合uri，且删除的id作为路径的一部分 |
| idfield | 否 | String | 指明id字段 | 默认是id |


函数类型配置项的参数：

* doDeleteRequest(vm,resolve) vm是删除组件实例，通过vm.id可以访问到利用idfield指明的id字段，删除完成后调用resolve