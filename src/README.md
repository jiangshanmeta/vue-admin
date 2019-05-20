# 组件命名规则

整体风格为PascalCase。

本系统把组件分为Editor、Filter、View、Label、Operator、StaticOperator、FilterOperator七大类，分属于这七大类的组件应以对应的类型作为组件名前缀。

业务组件，在类型的基础上添加业务前缀

对于Editor、Filter组件，优先描述数据结构，然后是前端特殊功能，最后是前端展示。