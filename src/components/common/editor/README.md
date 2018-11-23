## Introduction

editor目录下是基于element-ui进行封装的表单组件。表单组件更加关注的是特定的数据类型和数据结构，而不是特定的表现形式，因此一个数据结构可能会对应多种表现形式。在具体实现上借鉴了React中高阶组件的理念，把一些特定功能以mixin形式剥离出来，以生成新的组件。

## 分类

* editor_string editor_text editor_pwd 是最基本的输入框，分别表现为最普通的输入框、textarea和password型输入框

* editor_textrich 是富文本编辑器，底层使用了quill

* editor_number editor_int 是数字类型输入框，前者限定了输入为数字，后者更为严格，限定为int类型

* editor_enum_radio editor_enum_select editor_enum_autocomplete 是基础的单选组件，表现上分别对应radio、select、和具有搜索功能的select，这三个是针对不同数量候选项而设立的

* editor_array_checkbox editor_array_autocomplete 对应对选，分别表现为checkbox和带有下拉搜索的select

* editor_time_ts、editor_time_day、editor_time_month、editor_time_year是关于时间的选择框

* field_file_multi是基础的上传组件，在它的基础上有field_file_mono 限定上传一个文件。


以上都是基础组件，下面要说的组件都是根据上面组件包装而来的。

* 单选、多选组件包装异步加载选项功能。这类组件包括 editor_enum_radio_async、editor_enum_select_async、editor_enum_autocomplete_async、editor_array_checkbox_async、editor_array_autocomplete_async。

* 单选、多选组件包装关联异步查询选项功能。这类组件包括 editor_enum_radio_relates、editor_enum_select_relates、editor_enum_autocomplete_relates、editor_array_checkbox_relates、editor_array_autocomplete_relates。

* 多选组件包装将组件的值处理成json功能。这类组件包括 editor_array_checkbox_json、editor_array_autocomplete_json、editor_array_checkbox_async_json、editor_array_autocomplete_async_json、editor_array_checkbox_relates_json、editor_array_autocomplete_relates_json。

* 上传限定类型为图片。这类组件包括field_image_multi和field_image_mono。

* 上传组件组件的值处理成json。这类组件包括 field_file_multi_json、field_file_mono_json、field_image_multi_json、field_image_mono_json。


## 参数

### 字符串

字符串类型是对el-input的封装只是限定了类型分别为input、textarea、password，具体参数可查阅elementUI文档

#### editor_string

* value 必传参数，类型没有做校验

#### editor_text

* value 必传参数，类型没有做校验

#### editor_pwd

* value 必传参数，类型没有做校验


### 数字

数字类型封装自element-ui的el-input-number，因此el-input-number具有的属性它都可以直接使用

#### field_number

* value 必传参数，类型为number

#### field_int

* value 必传参数，类型为int

#### 单选

基础的单选(editor_enum_radio、editor_enum_select、editor_enum_autocomplete)具有以下常用参数：

* value 必传参数
* candidate 必传参数，类型为数组，单选的候选项数组
* labelfield 默认为label，指定candidate中每一项哪个字段是展示字段
* valuefield 默认为value，指定candidate中每一项哪个字段是值字段
* handleInvalidValue 当值有误时(不在可选项中)调用,this指向当前组件，参数如下：
    * value 当前组件的值，一个数组
    * options 可选值数组


#### 多选

基础多选组件(editor_array_checkbox、editor_array_autocomplete)具有以下参数：

* value 必传参数，类型为数组
* candidate 必传参数，类型为数组，选项数组
* labelfield 默认为label，指定candidate中每一项哪个字段是展示字段
* valuefield 默认为value，指定candidate中每一项哪个字段是值字段
* handleInvalidValue 当值有误时(不在可选项中，或者有重复)调用,this指向当前组件，参数如下：
    * value 当前组件的值，一个数组
    * options 可选值数组

#### 异步加载选项

editor_enum_radio_async、editor_enum_select_async、editor_enum_autocomplete_async、editor_array_checkbox_async、editor_array_autocomplete_async的candidate选项是异步加载出来的，因此没有candidate配置项。它们在其对应的基础组件基础上，又添加了getCandidate这个参数。

* getCandidate 获取候选项的方法，必传参数，参数如下：
    * cb 一个函数，需要调用该方法传入候选项

#### 联动处理

联动是表单中一个很常见的需求，在editor组件中做了一些工作处理联动。目前提供了两种模式，一种是在具体的表单元素组件中处理联动关系，editor组件仅仅负责把相关的数据传递下去，另一种是editor组件处理掉联动关系，联动对表单元素是透明的。

为此我们需要配置relates参数，它是一个数组，数组的每一项表示一个联动关系。

relateField表示关联的字段，可以是一个数组，表示关联一组字段作为一个整体，也可以是一个字符串，表示关联一个字段。

当我们需要让具体表单元素处理联动关系时，需要把关联字段传递下去，通过配置propField来配置prop的key。

```javascript
relates:[
    {
        relateField:["store"],
        invalidValue:{
            store:"",
        },
        requestField:{
            store:"storeId",
        },
        propField:"relateData",
    }
],
```

对于relates组件，propField为确定的relateData，请不要更改。上面示例的invalidValue和requestField是relates组件特殊需要的(可选)，分别为无效值map和请求的key的map。relates组件也有一个getCandidate参数，类似于async组件，但是入参多一个，其第二个参数是请求的params。



editor组件处理掉联动时，我们需要配置一个handler参数，入参是关联的数据。

```javascript
relates:[
    {
        relateField:"customername",
        handler(customername){
            console.log(customername);
            if(customername === 'lelouch'){
                this.$emit("input",2333);
            }
        },
        config:{
            immediate:true,
        },
    }
],
```

注意，这个handler会被call在具体的表单元素vue实例上，this指向的不是editor元素。


#### 多选组件值json化

json解析有可能失败，这时我们需要一个方法struct提供默认值。对于多选的json化组件以及上传多文件的json化组件，这个struct默认返回空数组，对于单文件上传的json化组件，struct默认返回空对象。


## filters

filters组件是为了通用列表页的筛选条件所设计的

目前支持单选、日期、字符串、数字筛选

单选支持 select、可搜索select两种表现形式，根据选项来源有可细分为同步和异步两种形式。

同时单选可以有一个不限选项，也可以没有，于是单选对应8个组件：

* filter_enum_select 同步、不可搜索、有不限选项
* filter_enum_select_async 异步、不可搜索、有不限选项
* filter_enum_autocomplete from 同步、可搜索、有不限选项
* filter_enum_autocomplete_async 异步、可搜索、有不限选项
* editor_enum_select 同步、不可搜索、无不限选项
* editor_enum_select_async 异步、不可搜索、无不限选项
* editor_enum_autocomplete 同步、可搜索、无不限选项
* editor_enum_autocomplete_async 异步、可搜索、无不限选项


#### 时间

* value 必传参数
* placeholder
* disabled 是否禁用 默认为false
* format 所获取的值的格式，有 timestamp string object custom三种。timestamp对应js时间戳，string和input框内容一致，object获得的是Date实例，custom允许自定义格式化方法，需要结合 formatMethod 参数。默认为string。
* formatMethod 函数类型，当format为custom时需要此方法，传入的参数与input框中内容一致。
* parseDateFromValue 从value中解析出parse对象，入参是value值。考虑到最终存储数据格式的复杂性而设计。

#### 上传

基础上传组件field_file_multi具有以下参数：

* value 必传参数，数组类型
* getInfoFromResponse 函数，从后端返回的结果中解析出要添加到数组的信息。第一个参数是后端返回的结果。默认是原样返回。
* getName 函数，用来从列表中每一项解析出展示名称。第一个参数是列表的一项。默认是原样返回。
* getUrl 类似于getName，用来从每一项中获取文件的地址。

对于传单个文件来说，底层是field_file_multi，需要从一项映射到一个数组，这里就需要面对如何判断这一项结构是否正确(可能存一个对象(包含地址、名称、尺寸、描述等信息)，也可能存一个url字符串)，对应参数isMonoValid处理。当我们删除这一项时，field_file_mono的值也是不确定的，因此需要monoStruct这个参数。monoStruct默认返回一个空对象。

上传图片只是限制了展示类型，并没有添加新的参数。


