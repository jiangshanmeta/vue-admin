## info

用来展示详情信息的操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data   | 是    | Object | 一条记录  |  作为操作组件，该属性自动传入 |
| field_list | 是 | Object | 字段列表 | - |
| uri | 否 | String | 获得详情时请求地址 | 采用默认getDetailInfo时该参数必需 |
| getDetailInfo | 否 | Function | 获得详情信息的方法 | 采用默认方法需要配合uri参数 |
| title | 否 | String | 详情dialog的标题 | 默认为 “详情” | 
| triggerText | 否 | String | 触发按钮文字 | 默认为 "详情" |

函数类型配置项的参数：

* getDetailInfo(resolve) 一般情况下该函数的this指向info组件实例，详情信息通过resolve方法传入，格式如下：

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
| autoValidate | 否 | Boolean | 是否自动表单验证 | 默认为false,第一次点提交时才自动表单验证 |
| transformData | 否 | Function | 在doEditRequest前对表单数据做一次转换 |
| idfield | 否 | String | 指明id字段 | 默认是id |
| title | 否 | String | 编辑对话框的标题 | 默认为编辑 |
| triggerText | 否 | String | 触发按钮文字 | 默认为 "编辑" |
| editText | 否 | String | 确认编辑按钮文字 | 默认为 "确认编辑" |
| cancelText | 否 | String | 取消按钮文字 | 默认为 "取消" |

函数类型配置项的参数：

* getEditInfo(resolve) , 一般情况下该函数的this指向edit组件实例，，编辑需要的信息通过resolve传入，示例如下：

```
[
    [{"field":"name","value":"张三"}],
    [{"field":"gender","value":0},{"field":"typ","value":1}],
    [{"field":"privilege"}],
    [{"field":"desc","value":"假装有段描述"}]
]
```

* transformData(data) data为表单中的数据，需要返回一个对象(处理后的数据)
* doEditRequest(resolve,data) 一般情况下该函数的this指向edit组件实例，，data是经过transformData处理的数据，更新完成后调用resolve。

## delete

删除操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 对于操作组件是自动传入的 |
| uri | 否 | String | 删除时请求的uri | 配合doDeleteRequest使用 | 
| doDeleteRequest | 否 | Function | 删除操作请求 | 默认方法需要结合uri，且删除的id作为路径的一部分 |
| idfield | 否 | String | 指明id字段 | 默认是id |
| triggerText | 否 | String | 触发按钮文案 | 默认是 "删除" |


函数类型配置项的参数：

* doDeleteRequest(resolve) 一般情况下该函数的this指向delete组件实例，，通过this.id可以访问到利用idfield指明的id字段，删除完成后调用resolve
