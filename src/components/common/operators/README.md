在model中的operators是一个数组，数组中每一项对应一个操作。操作支持两种声明方式：第一种是声明一个函数，第二种是声明一个组件。

第一种声明示例如下：

```javascript
{
    handler(resolve,data){
        this.$message({
            message:`${data.name}不要总想着搞个大新闻`,
            type:"success",
            duration:2000,
        });
        setTimeout(()=>{
            resolve();
        },1000)
    },
    triggerConfig:{
        text:"搞个大新闻",
        type:"warning",
        size:"small",
    },
}
```

这种声明方式被渲染为一个button，triggerConfig.text是button显示的文字，triggerConfig.type是按钮的类型(el-button的类型) ，handler是点击按钮时的调用的函数，调用resolve方法,operators组件会自动通知父组件状态更新，列表页会自动刷新。注意这里的this指向的是这个operators组件。

第二种声明方式示例如下：

```javascript
{
    name:"delete",
    component:()=>import("@/components/common/operators/delete").then((rst)=>rst.default),
    config:{
        // delete组件有个名为uri的props属性
        uri:"/user/delete",
    }
}
```

name字段是组件名，对应组件的name属性。component是要传入的组件，一般结合动态导入import()使用。考虑到组件复用问题，还有一个config参数，用来向这些子组件传递配置参数。在这种模式下，仅需声明这三项，其余的operators组件会自动处理。

在这种声明情况下，一个data参数会被自动传入，对应一条记录(一个对象)。


这种声明方式要想通知列表刷新需要手动触发update事件：

```javascript
this.$emit('update')
```



下面是几个内置的operators组件说明

## info

用来展示详情信息的操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| field_list | 是 | Object | 字段列表 | 自动传入 |
| getDetailInfo | 是 | Function | 获得详情信息的方法 | - |
| data | 是 | Object | 对应的记录信息 | 自动传入 |
| triggerConfig | 否 | Object | 触发按钮的配置项 | 默认为空对象 |
| dialogConfig | 否 | Object | 弹框组件的配置项 | 默认为空对象 |


函数类型配置项的参数：

* getDetailInfo(resolve) 一般情况下该函数的this指向info组件实例，详情信息通过resolve方法传入，格式如下：

```
{
    "fields":[
        ["name"],
        ["gender","typ"],
        ["desc"]
    ],
    "record":{
        "name":"张三",
        "gender":0,
        "typ":"店小二",
        "desc":"假装有段描述",
    }
}
```


## edit

编辑组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 对于操作组件是自动传入的 |
| field_list | 是 | Object | 字段列表 | 对于操作组件自动传入 |
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






函数类型配置项的参数：

* getEditInfo(resolve) , 一般情况下该函数的this指向edit组件实例，，编辑需要的信息通过resolve传入，示例如下：

```
{
    "fields":[
        ["name"],
        ["gender","typ"],
        ["privilege"],
        ["desc"]
    ],
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
* doEditRequest(resolve,data) 一般情况下该函数的this指向edit组件实例，，data是经过transformData处理的数据，更新完成后调用resolve。

## delete

删除操作组件

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 对于操作组件是自动传入的 |
| doDeleteRequest | 是 | Function | 删除操作请求 | - |
| triggerConfig | 否 | Object | 触发按钮的配置项 | 默认为空对象 |
| idfield | 否 | String | 指明id字段 | 默认是id |



函数类型配置项的参数：

* doDeleteRequest(resolve) 一般情况下该函数的this指向delete组件实例，，通过this.id可以访问到利用idfield指明的id字段，删除完成后调用resolve


## toggle

反转状态的更新

参数：

| 属性名 | 是否必需  | 类型      | 属性描述 |  备注 |
| :---:  | :--:  | :--: | :-----:  | :--: |
| data | 是 | Object | 这一条记录的数据  | 对于操作组件是自动传入的 |
| field | 是  | String | 反转状态的字段名 | - |
| descriptor | 是 | Array | toggle状态描述 | - |
| reserveFields | 否 | Array | 提交时需要保留的字段，通edit组件 | - |
| handleToggle | 是 | Function | 对数据处理，第一个参数是resolve回调，第二个参数是这一条记录 | - |
| triggerConfig | 否 | Object | 触发按钮的配置项 | 默认为空对象 |


descriptor字段实例：

```javascript
descriptor:[
    {value:0,text:"更改性别为男",type:"warning"},
    {value:1,text:"更改性别为女",type:"danger"},
],
```