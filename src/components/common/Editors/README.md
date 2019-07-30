# Editors

Editors目录下的组件是对element-ui的表单组件的包装，更加关注的是特定的数据类型和数据结构，而不是特定的表现形式，因此一个数据结构可能会对应多种表现形式。在具体实现上借鉴了React中高阶组件的理念，把一些特定功能以mixin形式剥离出来，以生成新的组件。

## editor配置

* name 必填项，使用哪个表单组件
* component 使用自定义表单元素组件
* config 表单元素组件的配置项，如果有的话，是对象形式
* [mode]Config 包括createConfig和editConfig不同mode下的额外配置项
* default 默认值，目前在ListOperatorCreate中用到
* relates 联动配置，Array，具体描述见下

### 联动

Editors组件为表单元素组件之间联动提供了两种方式，一种是handler模式，Editors组件观察到关联数值变化时，调用handler，一种是propField模式，把关联的数据作为prop传递给表单元素组件，由具体的表单元素组件处理关联关系。

要声明联动关系，需要先声明一个relateField，表示相关联的其他字段。可以是一个字符串，表示关联一个字段，也可以是一个数组，表示关联多个字段。

对于handler模式，需要handler函数，它被调用时this指向表单元素组件实例，同时会被传入以下三个参数:

* newVal 关联字段对应的新值
* oldVal 关联字段对应的旧值
* fields 该字段的fields配置

handler模式还可以有一个config配置项，它本质上是vue的$watch方法的第三个参数。

对于propField模式，需要一个propField字符串作为传递的prop的key

## 基础组件

### 基础组件分类

* EditorString/EditorText/EditorPwd 最基本的输入框，分别表现为最普通的输入框、textarea和password型输入框
* EditorTextrich 是富文本编辑器，底层使用了quill
* EditorNumber EditorInt 是数字类型输入框，前者限定了输入为数字，后者更为严格，限定为int类型

### 基础组件参数

* value 必传参数，EditorString/EditorText/EditorPwd/EditorTextrich 要求类型为String，EditorNumber要求类型为Number,EditorInt要求类型为Int

## 单选组件

### 单选组件分类

* EditorEnumRadio/EditorEnumSelect/EditorEnumAutocomplete 是基础的单选组件，表现上分别对应radio/select/autocomplete,他们有以下参数:
  * value 必传参数
  * candidate 必传参数，Array,选择的候选项
  * labelfield 默认为label，指定candidate中每一项哪个字段是展示字段
  * valuefield 默认为value，指定candidate中每一项哪个字段是值字段
  * handleInvalidValue 当值有误时(不在可选项中)调用,this指向当前组件，参数如下：
    * value 当前组件的值
    * options 可选值数组
* EditorEnumAsyncRadio/EditorEnumAsyncSelect/EditorEnumAsyncAutocomplete 是对上面三个组件的包装，它们的candidate不是传入的，而是异步获得的，因而没有candidate参数，而是有一个getCandidate参数：
  * getCandidate 获取候选项的方法，必传参数，参数如下：
    * cb 一个函数，需要调用该方法传入候选项
* EditorEnumRelatesRadio/EditorEnumRelatesSelect/EditorEnumRelatesAutocomplete 单选联动组件，是对EditorEnumRadio/EditorEnumSelect/EditorEnumAutocomplete进行的包装。这一类联动组件的的propField统一为**relateData**。参数如下:
  * getCandidate 类似于上面的几个Async组件，第一个参数是cb，调用它把候选项传递，第二个参数是关联字段及其对应值构成的对象。(组件内部做过优化，会缓存结果，只在必要时调用这个方法)
  * isValidValue 判断关联字段的值是否有效，第一个参数是关联字段及其值构成的对象
  * getCacheKey 似乎没什么用
  * handleInvalidRelateIds 当关联字段的值无效时调用，默认什么都不做

## 多选组件

* EditorArrayCheckbox/EditorArrayAutocomplete 基础多选组件，表现为checkbox/autocomplete。其参数和EditorEnumRadio完全一致，除了value的类型是数组而不是简单值。
* EditorArrayAsyncCheckbox/EditorArrayAsyncAutocomplete 相当于EditorEnumAsyncRadio对于EditorEnumRadio的关系，参数也是
* EditorArrayRelatesCheckbox/EditorArrayRelatesAutocomplete关联版的EditorArrayCheckbox/EditorArrayAutocomplete
* EditorArrayJSONCheckbox/EditorArrayJSONAutocomplete/EditorArrayJSONAsyncCheckbox/EditorArrayJSONAsyncAutocomplete/EditorArrayJSONRelatesCheckbox/EditorArrayJSONRelatesAutocomplete 最终把组件的值压成JSON。参数：
  * struct 当JSON.parse解析失败时调用该方法，默认返回一个空数组

## 上传组件

上传组件是以Field为开头的那几个，由于element-ui底层的上传有点问题，可能会有bug，谨慎使用。
