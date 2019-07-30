# filters

## 基础配置

filters配置项应为一个数组，或者一个返回数组的函数，每一项都是一个筛选条件。

每一个筛选条件的配置项有：

* label 筛选条件显示名
* field 筛选条件key，该筛选条件的值将以该字段为key 最终参与列表筛选 应保证唯一性 必填
* filterComponent 筛选所用的组件
* relates 关联关系
* watch 是否监听该筛选项，默认为```false```，设置为```true```时，一旦该筛选项的值变化，就发送请求刷新列表
* isValidValue  一个函数，当watch为true时可用，第一个参数是该筛选项的值，第二个筛选项是field 返回布尔值。用来过滤掉一些不必要的请求 (比如输入要有N个字符才进行筛选)

## filterComponent

filterComponent选项是用来配置筛选组件的。它非常类似于在fields的filterComponent属性。

* name 组件名称 必填
* component 采用的自定义筛选组件
* config 对筛选组件的配置
* default 筛选组件的初始值 如果为函数，则调用时的this指向Filters组件

## relates

relates是关联关系数组，每一项表示一个关联关系。

对于关联关系有两种处理方式，一种是声明一个handler，filters组件负责调用它，一种是把关联的字段作为prop传递给具体的筛选组件，由筛选组件处理具体的关联关系。

* relateField 通过它可以声明和哪些其他筛选项关联，可以是一个字符串，也可以是一个数组(和多个关联)
* handler 处理关联的handler，在调用时它的this指向对应的筛选组件，传入两个参数，新值和旧值。当relateField为字符串时，这里的值就是关联的筛选组件的值。让relateField为数组时，这里的值是一个对象，key是关联的字段，value是对应关联组件的值。
* config handler模式才有用 其本质上是vue的$watch的第三个参数
* propField 作为prop传递时的key 当采用这种模式时，relateField为简单字符串居多

## 开发filterComponent

filterComponent本质上就是filterComponent，只是一般是在筛选中使用所以特意独立出来。

## 内置Filters

filters组件是为了通用列表页的筛选条件所设计的，可直接使用的筛选组件包括：

* EditorString
* EditorNumber
* EditorEnumSelect
* EditorEnumAsyncSelect
* EditorEnumRelatesSelect
* EditorEnumAutocomplete
* EditorEnumAsyncAutocomplete
* EditorEnumRelatesAutocomplete
* FilterEnumSelect
* FilterEnumAsyncSelect
* FilterEnumRelatesSelect
* FilterEnumAutocomplete
* FilterEnumAsyncAutocomplete
* FilterEnumRelatesAutocomplete

以Filter为前缀的组件可以看做对应以Editor为前缀的组件的包装(实现上不全是直接包装)，它们增加了两个参数alllabel(默认为不限)和allvalue(默认为空字符串)，用来添加一个全部(或者叫不限)选项。
