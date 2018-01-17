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
| transformData | 否  | Function | 用来在doCreateRequest对表单数据进行一次处理，比如修改某个字段的格式 | 默认方法是原样返回表单数据 |
| title | 否 | String | 创建时弹出框的标题 | 默认为 "创建" |
| triggerText | 否 | String | 触发按钮的文字 | 默认为 "新建" |
| createText  | 否 | String | 创建按钮的文字 | 默认为 "确认创建" |
| cancelText  | 否 | String | 取消按钮的文字 | 默认为 "取消" |



函数类型配置项的参数：

* getCreateFields(resolve) 获取的创建字段通过调用resolve返回，一般情况下该函数的this指向create组件实例


创建字段格式如下：

```
[
    ["customername","totalprice"],
    ["address"],
    ["store","saler"]
]
```

* transformData(data) data为表单中的数据，需要返回一个对象(处理后的数据)
* doCreateRequest(resolve,data) data是经过transformData处理过的表单数据，resolve是Promise的resolve，创建完成触发update事件。一般情况下该函数的this指向create组件实例

## csv

导入CSV文件，需要浏览器支持fileReader

配置项：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| text  |  否 | String | 显示文字 | 默认为 “导入csv” |
| type  |  否 | String | 按钮类型 | 默认为 “success” |
| size  |  否 | String | 按钮大小 | 默认为空，正常大小 |
| handleData | 否 | Function | 对数据处理，第一个参数是回调resolve，第二个参数是数据数组 |


调用resolve函数之后，列表会自动刷新