## Introduction

editor目录下是基于element-ui进行封装的表单组件。表单组件更加关注的是特定的数据类型和数据结构，而不是特定的表现形式。一个数据结构可能会对应多种表现形式。在我的实现中，有一部分组件是基于包装的理念生成出来的，即有一个基础组件，还有一个对组件的包装(目前看来是以mixin的形式独立出来),基础组件结合包装构成了新的组件。

## 分类

* field_number 限定表单元素值为数字 field_int 限定表单元素值为int

* field_string、field_text是基础的文本编辑框，前者表现为input框，后者表现为textarea

* field_pwd 是password的输入框，本质上是field_string，只是限定了类型为password

* field_text_rich 是富文本编辑器

* field_enum_radio、field_enum_select、field_model是基础的单选组件。表现形式上分别为radio、select和具有输入下拉搜索功能的选择框。一般对应选项数量从少到多。

* field_tag、field_array_model是基础的多选组件。前者表现为checkbox，后者表现为下拉搜索框。

* field_ts、field_day、field_month、field_year是关于时间的选择框

* field_file_multi是基础的上传组件，在它的基础上有field_file_mono 限定上传一个文件。


以上都是基础组件，下面要说的组件都是根据上面组件包装而来的。

* 单选、多选组件包装异步加载选项功能。这类组件包括 field_async_enum_radio、field_async_enum_select、field_async_model、field_async_tag、field_async_array_model。

* 单选、多选组件包装关联异步查询选项功能。这类组件包括 field_relates_enum_radio、field_relates_enum_select、field_relates_model、field_relates_tag、field_relates_array_model。

* 多选组件包装将组件的值处理成json功能。这类组件包括 field_tag_json、field_array_model_json、field_async_tag_json、field_async_array_model_json、field_relates_tag_json、field_relates_array_model_json。

* 上传限定类型为图片。这类组件包括field_image_multi和field_image_mono。

* 上传组件组件的值处理成json。这类组件包括 field_file_multi_json、field_file_mono_json、field_image_multi_json、field_image_mono_json。


## 参数

### 数字

数字类型封装自element-ui的el-input-number，因此el-input-number具有的属性它都可以直接使用

#### field_number

常用参数

* value 必传参数，类型为number
* min 允许的最小值，默认为0
* max 允许的最大值，默认为Infinity
* disabled 是否禁用，默认为false

#### field_int

field_int是对field_number的封装，未提供新的参数


### 字符串

字符串类型是对el-input的封装只是限定了类型分别为input、textarea、password。

#### field_string

常用参数

* value 必传参数，类型没有做校验
* placeholder 可选
* disabled 是否禁用，默认为false

#### field_text

* value 必传参数，类型没有做校验
* placeholder 可选
* disabled 是否禁用，默认为false

#### field_pwd

* value 必传参数，类型没有做校验
* placeholder 可选
* disabled 是否禁用，默认为false

#### 单选

基础的单选(field_enum_radio、field_enum_select、field_model)具有以下常用参数：

* value 必传参数
* candidate 必传参数，类型为数组，单选的候选项数组
* labelfield 默认为label，指定candidate中每一项哪个字段是展示字段
* valuefield 默认为value，指定candidate中每一项哪个字段是值字段
* disabled 是否禁用 默认为false
* handleInvalidValue 当值有误时(不在可选项中)调用,this指向当前组件，参数如下：
    * value 当前组件的值，一个数组
    * options 可选值数组


#### 多选

基础多选组件(field_tag、field_array_model)具有以下参数：

* value 必传参数，类型为数组
* candidate 必传参数，类型为数组，选项数组
* labelfield 默认为label，指定candidate中每一项哪个字段是展示字段
* valuefield 默认为value，指定candidate中每一项哪个字段是值字段
* disabled 是否禁用 默认为false
* handleInvalidValue 当值有误时(不在可选项中，或者有重复)调用,this指向当前组件，参数如下：
    * value 当前组件的值，一个数组
    * options 可选值数组

#### 时间

* value 必传参数
* placeholder
* disabled 是否禁用 默认为false
* format 所获取的值的格式，有 timestamp string object custom三种。timestamp对应js时间戳，string和input框内容一致，object获得的是Date实例，custom允许自定义格式化方法，需要结合 formatMethod 参数。默认为string。
* formatMethod 函数类型，当format为custom时需要此方法，传入的参数与input框中内容一致。

#### 上传

基础上传组件field_file_multi具有以下参数：

* value 必传参数，数组类型
* getInfoFromResponse 函数，从后端返回的结果中解析出要添加到数组的信息。第一个参数是后端返回的结果。默认是原样返回。
* getName 函数，用来从列表中每一项解析出展示名称。第一个参数是列表的一项。默认是原样返回。
* getUrl 类似于getName，用来从每一项中获取文件的地址。

对于传单个文件来说，底层是field_file_multi，需要从一项映射到一个数组，这里就需要面对如何判断这一项结构是否正确(可能存一个对象(包含地址、名称、尺寸、描述等信息)，也可能存一个url字符串)，对应参数isMonoValid处理。当我们删除这一项时，field_file_mono的值也是不确定的，因此需要monoStruct这个参数。monoStruct默认返回一个空对象。

上传图片只是限制了展示类型，并没有添加新的参数。


#### 异步加载选项

field_async_enum_radio、field_async_enum_select、field_async_model、field_async_tag、field_async_array_model的candidate选项是异步加载出来的，它们在其对应的基础组件基础上，又添加了uri和httpRequest两个选项。

* httpRequest 请求接口方法，参数如下：
    * cb，你需要调用该方法传入选项数组
* uri 采用默认请求方法时才会用到，请求的路径

#### 关联异步查询选项

当一个单选/多选组件的选项依赖于其它组件的值时，就需要关联异步查询。它提供了relates参数：

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

请求选项的配置参数如下：

* httpRequest httpRequest 请求接口方法，默认返回json格式在上面，参数如下：
    * cb，你需要调用该方法传入选项数组
    * data，查询参数，一个对象

另外，通常场景下是通过ajax向后端请求，但并不妨碍在前端根据data决定选项。这里关心的只是最最终选项通过cb方法传递回去。

关于relates参数还有另外一个用法：

```javascript
relates:[
    {
        relateField:["customername",'address'],
        handler(info){
            if(info.customername === 'lelouch' && info.address === 'area11'){
                this.$emit('input',0);
            }
        },
    }
],
```

这其实是更通用版的组件间关联了。relateField可以是一个字符串(对应一个字段),也可以是一个数组(对应多个字段)。这意味着任何两个组件间都可以通过relates参数关联起来。

对于关联组件还有一个参数handleInvalidRelateIds方法，当其关联的值满足invalidValue时触发，默认什么都不做


#### 多选组件值json化

json解析有可能失败，这时我们需要一个方法struct提供默认值。对于多选的json化组件以及上传多文件的json化组件，这个struct默认返回空数组，对于单文件上传的json化组件，struct默认返回空对象。


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