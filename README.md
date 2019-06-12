# vue-admin

本项目提供了一种配置式生成后台页面的方案。

## model

model是对一个后台页面的描述，由以下几部分构成

* fields 对字段的描述
  * labelName 字段的名称
  * [label](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/Labels/)
  * [editorComponent](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/Editors/)
  * [view](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/Views/)
  * validator 表单验证用的，底层依赖async-validator
  * tip tip用在Editor组件中，用于对应字段做些说明，它可以是一个函数(调用时this指向Editor组件实例，其返回值作为显示值)，也可以是个简单值(直接作为显示值)
  * [colspan](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/#MetaTable)
  * tableColumnConfig 对应el-table-column的其他配置项 一个对象 展开传递
* [listConfig](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common#ListInfo)，列表组件的配置项
* [operators]((https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/Operators)) 针对一条记录的操作集
* [staticOperators](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/StaticOperators/) 类似于operators，但staticOperators不针对于一条特定的记录，它对应的data是选中的数据数组。
* [filters](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/Filters/)，筛选组件的配置项。
* [filterOperators](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/FilterOperators/)

类似于operators，是为了拓展筛选功能设计的(目前没发现什么特别的用途)，除了传入代表筛选参数的data属性，它还传入了filters属性。

声明了一个model后，我们还需要在vue-router配置中指明用了哪个model，因而用到了vue-router的meta属性。

## 组件命名规则

整体风格为PascalCase。

本系统把组件分为Editor、Filter、View、Label、Operator、StaticOperator、FilterOperator七大类，分属于这七大类的组件应以对应的类型作为组件名前缀。

业务组件，在类型的基础上添加业务前缀

对于Editor、Filter组件，优先描述数据结构，然后是前端特殊功能，最后是前端展示。

## 写model的tip

* 一般而言，一个model对应和一个后端model(对应一张表)对应，但实际上不一定。
* 一个model的内容不一定要放在一个文件中，可以放在多个文件中最后组合
* 一个具体的业务系统可能有非常多的相似配置项，可以写成辅助函数来生成这些配置(类似于redux的action，本身只是对象，但是可以有action creator)
