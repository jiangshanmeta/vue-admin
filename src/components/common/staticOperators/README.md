staticOperators声明方式与operators一致，所不同的是对于传入的data参数含义不同，对应列表中的所有数据(数组)。另外还会传入selectedData参数，如果有选中的话对应选中的数据(一个数组)


下面是几个内置staticOperators组件的说明

## create

创建model的组件

配置项：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |

| field_list | 是 | Object | 字段列表 | 在list_view中该字段为默认传入 |
| getCreateFields | 是 | Function | 获取创建需要的字段的请求 | - |
| doCreateRequest | 是 | Function | 创建需要进行的请求 | - |
| triggerConfig | 否 | Object | 触发弹框的按钮的配置项 | 默认为空对象 |
| dialogConfig | 否 | Object | 弹框的配置项 | 默认为空对象 |
| createBtnConfig | 否 | Object | 创建按钮的配置项 | 默认为空对象 |
| cancelBtnConfig | 否 | Object | 取消配置项 | 默认为空对象 |
| transformData | 否  | Function | 用来在doCreateRequest前对表单数据进行一次处理，比如修改某个字段的格式 | 默认方法是原样返回表单数据 |
| autoValidate | 否 | Boolean | 是否一开始输入就表单验证 | 默认为false，第一次点击确定才开始表单验证 |


注意，按钮的文案可以通过相应配置项的text属性配置



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
| handleData | 否 | Function | 对数据处理，第一个参数是回调resolve，第二个参数是数据数组 |
| triggerConfig | 否 | Object | 触发弹框的按钮的配置项 | 默认为空对象 |


调用resolve函数之后，列表会自动刷新