<template>
<section>
    <field_string v-model="field_string"></field_string> {{field_string}}
    <field_text v-model="field_text"></field_text>{{field_text}}
    <field_pwd v-model="field_pwd"></field_pwd>{{field_pwd}}
    <field_tag v-model="field_tag" :candidate="field_tag_candidate"></field_tag>{{field_tag}}
    <field_enum_select 
        v-model="field_enum_select" 
        :candidate="field_enum_select_candidate"
        valuefield="valuefield"
    ></field_enum_select>{{field_enum_select}}

    <field_enum_radio
        v-model="field_enum_radio"
        :candidate="field_enum_radio_candidate"
        labelfield="labelfield"
    ></field_enum_radio>{{field_enum_radio}}

    <field_bool v-model="field_bool"></field_bool>{{field_bool}}
    <field_sex v-model="field_sex"></field_sex>{{field_sex}}
    <hr>
    <field_model 
        v-model="field_model" 
        
        valuefield="id" 
        labelfield='name'
        :candidate="field_model_candidate"
    ></field_model>{{field_model}} || field_model

    <hr>
    <field_async_tag
        v-model="field_async_tag"
        uri="/test/field_async_tag"
    ></field_async_tag>{{field_async_tag}}

    <hr>

    <field_async_enum_select
        v-model="field_async_enum_select"
        uri='/test/field_async_enum_select'
    ></field_async_enum_select>{{field_async_enum_select}}
    <hr>

    <field_async_enum_radio
        v-model="field_async_enum_radio"
        uri="/test/field_async_enum_radio"
    ></field_async_enum_radio>{{field_async_enum_radio}}

    <hr>

    <field_async_model
        v-model="field_async_model"
        uri='/test/field_async_model'
        labelfield='name'
        valuefield='id'
    ></field_async_model>{{field_async_model}} || field_async_model

    <hr>

    <div style="width:100%;">
    field_enum 和field_tag 对应数量较少情况下的单选和多选

    field_async 的版本只是把获取枚举值异步化，防止后端不支持

    field_model是数量较多的时候的单选，因为数量多 异步请求列表？？？
    同步的话只负责筛选即可，异步的话显示名如何处理？？再实现一个labeluri用来请求？？

    这里考虑只请求一次，然后本地利用autocomplete筛选？
    field_array_model也是？？


    所以表现形式为异步autocomplete
    初始值的label怎么办？？

    // TODO
    field_array_model 是数量较多是的复选框，基于autocomplete+列表实现吧


    field_relates是关联版本的单选框/复选框，关联情况下 可筛选数量应该不会太多，所以用select/radio/checkbox这种表现形式

    数量再多 relates + autocomplete？？？ 关联搜索 + input筛选。。 再说吧
    </div>
</section>
</template>

<script>
import field_string from "@/editor/field_string"
import field_text from "@/editor/field_text"
import field_pwd from "@/editor/field_pwd"
import field_tag from "@/editor/field_tag"
import field_enum_select from "@/editor/field_enum_select"
import field_enum_radio from "@/editor/field_enum_radio"
import field_bool from "@/editor/field_bool"
import field_sex from "@/editor/field_sex"
import field_model from "@/editor/field_model"

import field_async_tag from "@/editor/field_async_tag"
import field_async_enum_select from "@/editor/field_async_enum_select"
import field_async_enum_radio from "@/editor/field_async_enum_radio"
import field_async_model from "@/editor/field_async_model"


export default {
    components:{
        field_string,
        field_text,
        field_pwd,
        field_tag,
        field_enum_select,
        field_enum_radio,
        field_bool,
        field_sex,
        field_model,
        field_async_tag,
        field_async_enum_select,
        field_async_enum_radio,
        field_async_model,
    },
    data(){
        return {
            field_string:"",
            field_text:"",
            field_pwd:"",
            field_tag:[],
            field_tag_candidate:[{value:1,label:'aaa'},{value:2,label:'bbb'},{value:3,label:"ccc"},{value:4,label:"ddd"},{value:5,label:"eee"}],
            field_enum_select:3,
            field_enum_select_candidate:[
                {valuefield:1,label:"qqq"},
                {valuefield:2,label:"www"},
                {valuefield:3,label:"eee"},
            ],
            field_enum_radio:5,
            field_enum_radio_candidate:[
                {value:4,labelfield:"rrr"},
                {value:5,labelfield:"ttt"},
                {value:6,labelfield:"yyy"},
                {value:7,labelfield:"uuu"},
            ],
            field_bool:0,
            field_sex:1,
            field_model:3,
            field_async_tag:[5],
            field_async_enum_select:2,
            field_async_enum_radio:3,
            field_model_candidate:[
                {id:1,name:"太年轻"},
                {id:2,name:"太天真"},
                {id:3,name:"亦可赛艇"},
                {id:4,name:"exciting"},
                {id:5,name:"simple"},
                {id:6,name:"naive"}
            ],
            field_async_model:2,
        }
        
    },
    created(){
        setTimeout(()=>{
            this.field_string = "naive";
            this.field_text = "too young too simple";
            this.field_pwd = "abc123";
            this.field_tag = [3,5];
            this.field_enum_select = 2;
            this.field_enum_radio = 7;
            this.field_bool = 1;
            this.field_sex = 0;
            this.field_model = 1;
        },2000);
        // console.log(123)
    },
    methods:{

    }
}

</script>