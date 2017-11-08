## Introduction

该目录下主要是基于element-ui封装的表单相关的组件。这里关注的重点是特定的数据类型和数据结构，而不是特定的表现形式。在这里一个数据类型/结构可以对应多个表现形式(即多个组件)。

在封装的同时还统一了接口，这些组件有以下几个props属性：

* value  组件的值
* candidate 候选项，用于单选/多选中
* placeholder 
* uri 需要ajax请求的组件的请求相对路径
* valuefield 实际值对应的字段
* labelfield 展示值对应的字段
* relates 关联查询组件所需要的特殊属性

不同组件所需要的属性不一样，但都在上面几个属性中

## 组件分类

* field_number 限定表单元素值为数字

* field_string、field_text限定表单元素值为字符串，两者的区别在于表现形式，前者是一个input框，后者是一个textarea

* field_pwd 是password形式的input框

* field_text_rich 是富文本编辑器

* field_enum_radio、field_enum_select、field_model对应单选，三者是表现形式不一样。候选项比较少的时候用field_enum_radio，数量略多的时候用field_enum_select，数量更多的时候用field_model，它支持输入筛选功能。

* field_async_enum_radio、field_async_enum_select、field_async_model与上面三个类似，但是他们的选项是异步加载的。

* field_relates_enum_radio、field_relates_enum_select、field_relates_model与上面三个类似，选项都是异步加载进来的，但是带查询参数，查询参数决定于其他表单元素

* field_tag对应多选，现形式上对应checkbox。field_async_tag是异步加载选项的field_tag。field_array_model是选项较多时的版本，field_array_model的异步版本是field_async_array_model。field_relates_tag和field_relates_array_model是关联查询版的多选。

* field_ts、field_day、field_month、field_year是关于时间的筛选框

* field_sex、field_bool是特异化的field_enum_select

* field_file 是基础的上传组件，field_images限定只能传图片,field_image限定只能传一张图

## editor

editor组件是对本目录下封装的表单组件的集中运用，该组件是作为基础组件create和edit的基础。

它类似于form元素，它的子组件类似于表单中的input、select等元素。

editor组件还做了一件事，为关联查询组件(那一堆带有relates字样的组件)建立关联关系。对于正常的使用我们仅需在model文件中声明一下相关关系即可，无须关注我的具体实现。

关联组件的关联关系声明示例如下：

```javascript
relates:[
    {
        invalidValue:0,
        relateField:'typ',
        requestField:'req_typ',
    }
],
```

这里的含义是某个字段与typ字段相关联，该字段GET请求查询时query的key是req_typ(如果没有requestField，则请求的key是relateField，在这里是typ)，同时在typ的值不为0的时候才会发送请求。关联组件内部做了优化，可以缓存请求的结果，减少关联查询数量。目前一个字段可以有多个相关联的字段。


## filters

filters组件是为了通用列表页的筛选条件所设计的

目前支持单选、日期、字符串、数字筛选

单选支持 select、可搜索select两种表现形式，根据选项来源有可细分为同步和异步两种形式。

同时单选可以有一个不限选项，也可以没有，于是单选对应8个组件：

* filter_enum 同步、不可搜索、有不限选项
* filter_async_enum 异步、不可搜索、有不限选项
* filter_model from 同步、可搜索、有不限选项
* filter_async_model 异步、可搜索、有不限选项
* field_enum_select 同步、不可搜索、无不限选项
* field_async_enum_select 异步、不可搜索、无不限选项
* field_model 同步、可搜索、无不限选项
* field_async_model 异步、可搜索、无不限选项

## 异步请求接口格式

这里所有的以 *field_async_* 和 *field_relates_* 开头的组件都是异步请求候选项的，这些组件都必须配置请求uri。返回的json格式如下：

```json
{
    "data":{
        "data":[
            {"_id":3,"storename":"北京店"},
            {"_id":5,"storename":"上海店"},
            {"_id":7,"storename":"广州店"},
            {"_id":9,"storename":"深圳店"},
            {"_id":11,"storename":"杭州店"}
        ]
    },
    "rstno":1
}
```

我们约定rstno为正数才算请求成功，data的data属性对应候选项列表。我们的labelfield要声明为storename，valuefield要声明为_id

所有的请求都是GET请求，以 *field_async_* 为名称开头的组件没有请求时的query参数，以 *field_relates* 为名称开头的组件请求时会带query参数，query的key上面已经提到了，value就是对应表单元素的value，这里推荐query的key和字段名保持一致。

注意哈，上面的json结构只是默认请求模式下使用的。


## 参数详情

### 数字

#### field_number

* value 必传参数，类型为number
* placeholder 可选

### 字符串

#### field_string

* value 必传参数，类型没有做校验
* placeholder 可选

#### field_text

* value 必传参数，类型没有做校验
* placeholder 可选

#### field_pwd

* value 必传参数，类型没有做校验
* placeholder 可选

### 单选

#### field_enum_radio

* value 必传参数
* candidate 必传参数，类型为数组，单选的候选项数组
* labelfield 默认为label
* valuefield 默认为value

#### field_enum_select

* value 必传参数
* candidate 必传参数，类型为数组，单选的候选项数组
* labelfield 默认为label
* valuefield 默认为value
* placeholder

#### field_model

* value 必传参数
* candidate 必传参数，类型为数组，单选的候选项数组
* labelfield 默认为label
* valuefield 默认为value
* placeholder

#### field_async_enum_radio

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* labelfield 默认为label
* valuefield 默认为value
* httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * cb，你需要调用该方法传入选项数组

#### field_async_enum_select

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* labelfield 默认为label
* valuefield 默认为value
* placeholder
* httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * cb，你需要调用该方法传入选项数组

#### field_async_model

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* labelfield 默认为label
* valuefield 默认为value
* placeholder
* httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * cb，你需要调用该方法传入选项数组


#### field_relates_enum_radio

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* relates 必传参数，类型为对象，声明了和其他表单元素的关联关系
* labelfield 默认为label
* valuefield 默认为value
* httpRequest httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * data，查询参数，一个对象
    * cb，你需要调用该方法传入选项数组

#### field_relates_enum_select

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* relates 必传参数，类型为对象，声明了和其他表单元素的关联关系
* labelfield 默认为label
* valuefield 默认为value
* placeholder
* httpRequest httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * data，查询参数，一个对象
    * cb，你需要调用该方法传入选项数组

#### field_relates_model

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* relates 必传参数，类型为对象，声明了和其他表单元素的关联关系
* labelfield 默认为label
* valuefield 默认为value
* placeholder
* httpRequest httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * data，查询参数，一个对象
    * cb，你需要调用该方法传入选项数组


### 多选

#### field_tag

* value 必传参数，类型为数组
* candidate 必传参数，类型为数组，选项数组
* labelfield 默认为label
* valuefield 默认为value

#### field_array_model

* value 必传参数，类型为数组
* candidate 必传参数，类型为数组，选项数组
* labelfield 默认为label
* valuefield 默认为value
* placeholder

#### field_async_tag

* value 必传参数，类型为数组
* uri 必传参数，请求候选选项的相对路径
* labelfield 默认为label
* valuefield 默认为value
* httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * cb，你需要调用该方法传入选项数组


#### field_async_array_model

* value 必传参数，类型为数组
* uri 必传参数，请求候选选项的相对路径
* labelfield 默认为label
* valuefield 默认为value
* placeholder
* httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * cb，你需要调用该方法传入选项数组


#### field_relates_tag

* value 必传参数，类型为数组
* uri 必传参数，请求候选选项的相对路径
* relates 必传参数，类型为对象，声明了和其他表单元素的关联关系
* labelfield 默认为label
* valuefield 默认为value
* httpRequest httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * data，查询参数，一个对象
    * cb，你需要调用该方法传入选项数组

#### field_relates_array_model

* value 必传参数
* uri 必传参数，请求候选选项的相对路径
* relates 必传参数，类型为对象，声明了和其他表单元素的关联关系
* labelfield 默认为label
* valuefield 默认为value
* placeholder
* httpRequest httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * vm，组件实例
    * data，查询参数，一个对象
    * cb，你需要调用该方法传入选项数组

### 时间

#### field_ts

* value 必传参数，值为空字符串或者*yyyy-MM-dd HH:mm:ss*格式的时间字符串
* placeholder

#### field_day

* value 必传参数，值为空字符串或者*yyyy-MM-dd*格式的时间字符串
* placeholder

#### field_month

* value 必传参数，值为空字符串或者*yyyy-MM*格式的时间字符串
* placeholder

#### field_year

* value 必传参数，值为空字符串或者*yyyy*格式的时间字符串
* placeholder

### 上传

#### field_file

* value 必传参数，数组类型
* uri 上传路径
* labelfield 名称字段，默认为name
* valuefield 路径字段，默认为url

#### field_images

* value 必传参数，数组类型
* uri 上传路径
* labelfield 名称字段，默认为name
* valuefield 路径字段，默认为url

#### field_image

* value 必传参数，数组类型
* uri 上传路径
* labelfield 名称字段，默认为name
* valuefield 路径字段，默认为url