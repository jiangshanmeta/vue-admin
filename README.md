# vue-admin

本项目提供了一种配置式生成后台页面的方案。

## model

model是对一个后台页面的描述，由以下几部分构成

* fields 对字段的描述
  * labelName 字段的名称
  * [label](./src/components/common/Labels/)
  * [editor](./src/components/common/Editors/)
  * [view](./src/components/common/Views/)
  * validator 表单验证用的，底层依赖async-validator,该配置项支持函数，第一个参数为整条记录，第二个参数为当前模式(create | edit)，用于支付复杂情况的校验，函数返回值是async-validator的验证配置项。
  * autoValidate，是否自动表单验证该字段，布尔值或者返回布尔值的函数(函数会被传入一个参数mode，为create或edit)
  * tip tip用在Editor组件中，用于对应字段做些说明，它可以是一个函数(调用时this指向Editor组件实例，其返回值作为显示值)，也可以是个简单值(直接作为显示值)
  * [colspan](./src/components/common/#MetaTable)
  * tableColumnConfig 对应el-table-column的其他配置项 一个对象 展开传递
* [listConfig](./src/components/common#ListInfo)，列表组件的配置项
* [documentOperators](./src/components/common/DocumentOperators/) 针对一条记录的操作集
* [collectionOperators](./src/components/common/CollectionOperators/) 类似于documentOperators，但collectionOperators不针对于一条特定的记录，它对应的data是选中的数据数组。
* [filters](./src/components/common/Filters/)，筛选组件的配置项。
* [filterOperators](./src/components/common/FilterOperators/)

documentOperators/collectionOperators/filterOperators在底层都依赖于[Operators](./src/components/common/#Operators)

声明了一个model后，我们还需要在vue-router配置中指明用了哪个model，因而用到了vue-router的meta属性。

## 组件命名规则

整体风格为PascalCase。

本系统把组件分为Editor、Filter、View、Label、DocumentOperator、CollectionOperator、FilterOperator七大类，分属于这七大类的组件应以对应的类型作为组件名前缀。

对于Editor、Filter组件，优先描述数据结构，然后是前端特殊功能，最后是前端展示。

对于只会用一次的组件，采用组件类型+model名+字段名的形式

## 写model的tip

* 一般而言，一个model对应和一个后端model(对应一张表)对应，但实际上不一定。
* 一个model的内容不一定要放在一个文件中，可以放在多个文件中最后组合
* 一个具体的业务系统可能有非常多的相似配置项，可以写成辅助函数来生成这些配置(类似于redux的action，本身只是对象，但是可以有action creator)
* 如果通过MetaPage页面级组件使用model, 会默认把model深度freeze优化性能。deepFreeze情况下如果model中有同步引用的组件(不是通过动态import)，需要手动使用Vue.extend转换为Vue子类，否则Vue自动调用extend将配置对象转换为子类时，由于配置对象被冻结转换为子类失败。
