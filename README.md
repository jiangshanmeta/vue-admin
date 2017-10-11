# Introduction

这个项目是基于vue-cli构建的针对于后台业务的通用业务层，UI库采用了element-ui。

本项目的核心页面是 */src/pages/common/list_view*，这个页面涵盖了后台页面最常见的增删查改功能。

新建功能对应 */src/components/common/create* 组件，更新功能对应 */src/components/common/edit* 组件，这两个组件都是基于 */src/editor/editor* 组件，关于该组件请[移步查看](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)。

查找功能是由两部分构成，一个是筛选条件，一个是结果展示列表及分页。筛选条件对应 */src/editor/filters* 组件，结果列表对应 */src/components/common/listInfo* 组件。

删除功能我并没有特意去实现，而是实现了一个 operators组件(*/src/components/common/operators*)，这个组件是针对每条记录的操作的集合，删除组件应该作为该组件的子组件(从逻辑上讲edit组件也应该作为operators组件的子组件使用，但是编辑功能是常规需求，于是在list_view这个界面这两个组件被放到了同级的位置，避免重复声明)。

## model

对于这个核心列表页，有相当多的可配置信息(列表请求地址、新建请求地址、操作组件等)，这些可配置项被抽象成为一个model统一管理，这就是src目录下的**models**目录要存放的内容。

一个model由以下几个部分构成：

* field_list 字段，这个在新建、编辑、列表都用到了，具体的请先看[关于editor的介绍](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)，然后看下面的具体描述

* create_link、docreate_link。这两个是用于新建功能的，前者是请求哪些字段是创建时需要的，后者是创建时要请求的接口。之所以有create_link这个配置项是考虑到了不同的人有不同的权限，因而有不同的创建字段，考虑到权限还是放在后端去处理吧。

* filters 筛选的配置项，具体的请先看[关于editor的介绍](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)，然后看下面的具体描述

* baseUrl 列表请求路径。使用GET方法请求，默认会通过query带上分页信息pageIndex(从1开始的页数)、pageSize(每一页多少条记录)，以及下面要介绍的两个排序相关字段。

* sortFields 可排序字段，当向后端请求列表时，使用GET方法query传参，sortField表示排序的字段，sortOrder表示升序还是降序(asc或者desc)。

* treatData 这个是获得列表数据后对数据的处理方法，默认是原样返回。这个配置项支持async函数(或者说推荐使用async函数)，所以可以在这里做一些ajax操作获取数据操作所需要的信息。

* edit_link、doedit_link。这两个配置项是为编辑操作准备的，前者是请求可以编辑的字段及数据，后者是编辑操作所要请求的接口。

* operators 操作集，具体使用方法在下面


声明了一个model后，我们还需要在vue-router配置中指明用了哪个model，因而用到了vue-router的meta属性。具体的声明请看 */src/router/menu.js* 文件


## field_list

field_list是一个字段集合，每一个键是对应的字段名，值是关于这个字段相关的描述。

editor描述表明该字段在新建和编辑时所需要的表单组件，可以根据[这个说明选择相应的表单元素组件和查询相关参数](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)。每一个editor相关参数都作为一个描述。

label描述是这个字段的展示名

default描述用于新增和筛选，如果需要新增和筛选该字段，请**务必声明default描述**。类似于vue组件的props属性，对于引用类型default用一个函数来处理。

## filters

filters与field_list相类似，但是他是个数组结构，页面中按照顺序渲染筛选组件。

label属性类似于field_list中的label属性，仅仅是展示名

field是筛选时请求query传参的key

editor是筛选框需要的表单组件，和field_list的editor描述类似。但是filters有一些特有的表单元素(editor目录下以*filter_*开头的组件)，它们都是单选，但是允许一个不限选项，这几个组件需要我们填写allvalue和alllabel，前者默认值是空字符串，后者默认值是 "不限"两个字。

filters的default目测用不到引用类型，但是default为函数依然是有用处的，比如筛选时间时默认时间为三天前。

## operators

在model中的operators是一个数组，数组中每一项对应一个操作。操作支持两种声明方式：第一种是声明一个函数，第二种是声明一个组件。

第一种声明示例如下：

```javascript
{
    label:"搞个大新闻",
    type:"warning",
    function(data){
        console.log(data.name);
        this.$message({
            message:"不要总想着搞个大新闻",
            type:"success",
            duration:2000,
        })
    },
},
```

这种声明方式被渲染为一个button，label是button显示的文字，type是按钮的类型(el-button的类型) ，function是点击按钮时的调用的函数，function的参数第一个是该条记录的信息，第二个是该记录的前端索引。
function被调用完之后operators组件会自动通知父组件状态更新，列表页会自动刷新。注意这里的this指向的是这个operators组件。

第二种声明方式示例如下：

```javascript
{
    component:"delete",
    path:"components/common/delete",
    config:"/user/delete"
}
```

component字段是组件名，对应组件的name属性，**使用这一模式时务必声明组件的name属性**。path是组件相对于src目录的路径，推荐放在src目录下的components目录下，并保持文件名和组件name属性一致。考虑到组件复用问题，还有一个config参数，用来向这些子组件传递配置参数。在这种模式下，仅需声明这三项，其余的operators组件会自动处理。

operators加载的子组件会被传入三个属性：```data```、```index```和```config```，前两个对应第一种声明方式下函数的前两个参数，第三个对应声明的config参数。在这一模式下，组件需要手动通过以下程序通知operators状态更新：

```javascript
this.$emit('update')
```

operators会自动通知列表组件状态更新，剩下的更新列表就和第一种声明方式一致了。


## TODO


<del>* 寻找一个基于vue的富文本编辑器，目前考虑[这个第三方组件](https://github.com/surmon-china/vue-quill-editor)</del>
* 传图、传文件，这个任务依然要基于element-ui，主要是对应的后端的代码我还没有写。
* 优化列表显示。目前列表的treatData方法只能做一些数据处理，比如说一些映射操作。一些特殊的字段，比如一组图片的地址，界面上应该显示的是图片，但是目前只能支持显示图片地址。这个实现上可以参考 operators组件。
* operators以及edit组件的优化。目前是一条记录对应一个operators组件以及一个edit组件，其对应的子组件数量可能很多(目前edit组件就是这样)，尝试这些子组件被共享使用。
* 去除vuex。在这个项目中vuex用处并不大，几个共享的状态其实可以直接放在根vue实例上。
* 表单前端验证
* editor允许通过field_list声明业务editor，类似于opeartor组件的声明方式。

<del>[对应后端php代码](https://github.com/jiangshanmeta/CodeIgniter)</del>由于前端大改过一次后端代码没有对应修改，暂时不能使用。

## 后端接口

虽然这是个前端项目但我依然规定了后端接口的格式，毕竟统一的接口规范对大家来说都是件好事。

#### 列表

列表请求使用GET方法，默认会带上的query参数有pageIndex、pageSize、sortField、sortOrder。如果有filters则会带上filters的query参数，请注意不要覆盖上面几个参数。

响应json格式如下：

```json
{
    "data":{
        "data":[
            {
                "id":15,
                "customername":"野比大雄",
                "totalprice":500,
                "address":"东京"
            },
            {
                "id":17,
                "customername":"鲁路修",
                "totalprice":9999,
                "address":"11区"
            },
            {
                "id":19,
                "customername":"坂本",
                "totalprice":2345,
                "address":"日本"
            },
            {
                "id":121,
                "customername":"凉风青叶",
                "totalprice":555,
                "address":"飞鹰跃动"
            }

        ],
        "total":234,
        "fields":["customername","totalprice","address"]
    },
    "rstno":1
}
```

rstno为正数表示请求正常，data.data是查询出来的列表信息，data.total是分页用到的总记录条数，data.fields是要展示的字段。之所以有fields这个字段是考虑到了不同权限下看到的字段不一致。

#### 新建

新建对应两个接口：create_link、docreate_link。

create_link是查询创建时允许设置的字段，请求方式为GET，响应json示例如下：

```json
{
    "data":{
        "fields":[
            ["name","password"],
            ["gender","typ"],
            ["privilege"]

        ]
    },
    "rstno":1
}
```

docreate_link是创建时请求的接口，请求方式为POST。响应json示例如下：

```json
{
    "data":{
        "msg":"创建成功"
    },
    "rstno":1
}
```

事实上我们仅仅需要rstno为正数。

#### 更新

类似于新建，更新也对应两个接口：edit_link、doedit_link

edit_link是请求要更新的字段及其值，请求方式为GET，我把对应的id放到请求的路径中了，例如：```http://jiangshanmeta.github.io/user/edit/234``` ,其中234就是对应记录的id。

响应json示例如下：

```json
{
    "data":{
        "fields":[
            [{"field":"name","value":"张三"}],
            [{"field":"gender","value":0},{"field":"typ","value":1}],
            [{"field":"privilege"}]

        ]
    },
    "rstno":1
}
```

doedit_link是更新要请求的接口，请求方式为POST，id也是放在请求路径中了，响应json示例如下：

```json
{
    "data":{
        "msg":"更新成功"
    },
    "rstno":1
}
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).