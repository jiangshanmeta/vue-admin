# Introduction

这个项目是基于vue-cli构建的针对于后台业务的通用业务层，UI库采用了element-ui。

本项目的核心页面是 */src/pages/common/list_view*，这个页面涵盖了后台页面最常见的增删查改功能。

## model

对于这个核心列表页，有相当多的可配置信息，这些可配置项被抽象成为一个model统一管理，这就是src目录下的**models**目录要存放的内容。

一个model由以下几个部分构成：

* field_list 字段，是一个model最基础的配置项，具体的请先看[关于editor的介绍](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)，然后看下面的具体描述

* createConfig [create组件需要的配置项](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common/staticOperators/#create)

* filters，筛选组件的配置项。具体的请先看[关于editor的介绍](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)，然后看下面的具体描述

* listConfig，[列表组件的配置项](https://github.com/jiangshanmeta/vue-admin/tree/master/src/components/common#listinfo)

* operators 操作集，具体使用方法在下面

声明了一个model后，我们还需要在vue-router配置中指明用了哪个model，因而用到了vue-router的meta属性。具体的声明请看 */src/router/menu.js* 文件


## field_list

field_list是一个字段集合，每一个键是对应的字段名，值是关于这个字段相关的描述。

label描述是这个字段的展示名

editorComponent是这个字段编辑相关的配置，包括name(组件名),config(对组件的配置项),path(自定义组件的路径),default(默认值)。我提供了一些[通用业务组件](https://github.com/jiangshanmeta/vue-admin/tree/master/src/editor)

showComponent是展示时对应的组件，他用在列表页和详情模态框中(info组件)。它的声明格式如下：

```javascript
showComponent:{
    // 组件名
    name:"showusername",
    // 组件路径
    path:"components/user/showusername",
    // 配置项，一个配置项对应一个props
    config:{
        msg:"测试列表页组件形式展示"
    }
},
```

validator 表单验证用的

tip是展示在表单元素下面的用来提示用户的信息。

## filters

filters与field_list相类似，但是他是个数组结构，页面中按照顺序渲染筛选组件。

label属性类似于field_list中的label属性，仅仅是展示名

field是筛选时请求query传参的key

editorComponent与field_list中的editorComponent一致。

filters也支持你传入自定义的业务filter，只需要在editorComponent中声明path属性即可。

## operators

在model中的operators是一个数组，数组中每一项对应一个操作。操作支持两种声明方式：第一种是声明一个函数，第二种是声明一个组件。

第一种声明示例如下：

```javascript
{
    label:"搞个大新闻",
    type:"warning",
    function(data,index,resolve){
        console.log(data.name);
        this.$message({
            message:"不要总想着搞个大新闻",
            type:"success",
            duration:2000,
        })
        resolve();
    },
},
```

这种声明方式被渲染为一个button，label是button显示的文字，type是按钮的类型(el-button的类型) ，function是点击按钮时的调用的函数，function的参数第一个是该条记录的信息，第二个是该记录的前端索引。
调用resolve方法,operators组件会自动通知父组件状态更新，列表页会自动刷新。注意这里的this指向的是这个operators组件。

第二种声明方式示例如下：

```javascript
{
    component:"delete",
    componentPath:"components/common/operators/delete",
    config:{
        // delete组件有个名为uri的props属性
        uri:"/user/delete",
    }
}
```

component字段是组件名，对应组件的name属性，**使用这一模式时务必声明组件的name属性**。componentPath是组件相对于src目录的路径，推荐放在src目录下的components目录下，并保持文件名和组件name属性一致。考虑到组件复用问题，还有一个config参数，用来向这些子组件传递配置参数。在这种模式下，仅需声明这三项，其余的operators组件会自动处理。

operators加载的子组件会被传入```data```和```index```，对应第一种声明方式下函数的前两个参数。在这一模式下，组件需要手动通过以下程序通知operators状态更新：

```javascript
this.$emit('update')
```

operators会自动通知列表组件状态更新，剩下的更新列表就和第一种声明方式一致了。


## TODO

* <del> 通用的删除组件 (done)</del>
* <del>寻找一个基于vue的富文本编辑器，目前考虑[这个第三方组件](https://github.com/surmon-china/vue-quill-editor) (done)</del>
* <del>传图、传文件，这个任务依然要基于element-ui，主要是对应的后端的代码我还没有写。</del>
* <del>优化列表显示。目前列表的treatData方法只能做一些数据处理，比如说一些映射操作。一些特殊的字段，比如一组图片的地址，界面上应该显示的是图片，但是目前只能支持显示图片地址。这个实现上可以参考 operators组件。 (done)  </del>
* operators以及edit组件的优化。目前是一条记录对应一个operators组件以及一个edit组件，其对应的子组件数量可能很多(目前edit组件就是这样)，尝试这些子组件被共享使用。
* 去除vuex。在这个项目中vuex用处并不大，几个共享的状态其实可以直接放在根vue实例上。(似乎vuex还是有点用的)
* <del>表单前端验证</del>采用[这个表单验证库](https://github.com/yiminghe/async-validator)，然而我考虑自己写一个(一个大TODO)
* <del>editor允许通过field_list声明业务editor，类似于opeartor组件的声明方式。(done)</del>
* <del>[对应后端php代码](https://github.com/jiangshanmeta/CodeIgniter)</del>由于前端大改过一次后端代码没有对应修改，暂时不能使用。
* <del>允许filters传入用户自定义filter</del>
* <del>允许有ajax操作的editor传入自定义ajax方法。(done)</del>
* <del>筛选组件配置按照field_list的改</del>
* <del>更新field_relates_*组件</del>

## 后端接口

虽然这是个前端项目但我依然规定了后端接口的格式，毕竟统一的接口规范对大家来说都是件好事。这个接口规范只是推荐，默认请求是按照这个接口规范来的，我支持了自定义请求方法，只要最后结果满足需求即可。

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