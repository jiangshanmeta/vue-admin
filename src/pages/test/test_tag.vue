<template>
<section>
    <el-input v-model="relates"></el-input>
    <table class="table">
        <thead>
            <tr>
                <th>组件名</th>
                <th>组件值</th>
                <th>组件实例</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>field_tag</td>
                <td>{{field_tag}}</td>
                <td>
                    <field_tag 
                        v-model="field_tag" 
                        :candidate="field_tag_candidate"
                    ></field_tag>
                </td>
            </tr>
            <tr>
                <td>field_async_tag</td>
                <td>{{field_async_tag}}</td>
                <td>
                    <field_async_tag
                        v-model="field_async_tag"
                        uri="/test/field_async_tag"
                    ></field_async_tag>
                </td>
            </tr>
            <tr>
                <td>field_array_model</td>
                <td>{{field_array_model}}</td>
                <td>
                    <field_array_model
                        v-model="field_array_model"
                        :candidate="field_array_model_candidate"
                        placeholder="placeholder2"
                        labelfield="name"
                        valuefield="id"
                    ></field_array_model>
                </td>
            </tr>
            <tr>
                <td>field_async_array_model</td>
                <td>{{field_async_array_model}}</td>
                <td>
                    <field_async_array_model
                        v-model="field_async_array_model"
                        uri="/test/field_async_array_model"
                        labelfield="name"
                        valuefield="id"
                    ></field_async_array_model>
                </td>
            </tr>
            <tr>
                <td>field_relates_tag</td>
                <td>{{field_relates_tag}}</td>
                <td>
                    <field_relates_tag
                        v-model="field_relates_tag"
                        :relates="field_relates_tag_relates"
                        uri='/test/field_relates_tag'
                        labelfield="name"
                        valuefield="id"
                    ></field_relates_tag>
                </td>
            </tr>
            <tr>
                <td>field_relates_array_model</td>
                <td>{{field_relates_array_model}}</td>
                <td>
                    <field_relates_array_model
                        v-model="field_relates_array_model"
                        :relates="field_relates_model_relates"
                        labelfield="name"
                        valuefield="id"
                        uri='/test/field_relates_array_model'
                    ></field_relates_array_model>
                </td>
            </tr>
        </tbody>
    </table>
</section>
</template>

<script>
import field_tag from "@/components/common/editor/field_tag"
import field_async_tag from "@/components/common/editor/field_async_tag"
import field_array_model from "@/components/common/editor/field_array_model"
import field_async_array_model from "@/components/common/editor/field_async_array_model"

import field_relates_tag from "@/components/common/editor/field_relates_tag"
import field_relates_array_model from "@/components/common/editor/field_relates_array_model"

import {observe_relates} from "@/components/common/editor/field_relates_helper.js"
export default{
    config:{
        field_tag_candidate:[
            {value:1,label:'aaa'},
            {value:2,label:'bbb'},
            {value:3,label:"ccc"},
            {value:4,label:"ddd"},
            {value:5,label:"eee"}
        ],
        field_array_model_candidate:[
            {id:1,name:"太年轻"},
            {id:2,name:"太天真"},
            {id:3,name:"亦可赛艇"},
            {id:4,name:"exciting"},
            {id:5,name:"simple"},
            {id:6,name:"naive"}
        ],
        field_relates_tag_relates:[
            {
                relateField:"relates",
                invalidValue:"",
                requestField:"sex"
            },
        ],
        field_relates_model_relates:[
            {
                relateField:"relates",
                invalidValue:"",
                requestField:"sex"
            },

        ],
    },
    components:{
        field_tag,
        field_async_tag,
        field_array_model,
        field_async_array_model,
        field_relates_tag,
        field_relates_array_model,
    },
    data(){
        return {
            relates:"",
            field_tag:[1,1,5,7],
            field_async_tag:[1,1],
            field_array_model:[2,2,8],
            field_async_array_model:[2,2,8],
            field_relates_tag:[2,2,8],
            field_relates_array_model:[2,2,8],
        }
    },
    created(){
        observe_relates(this.field_relates_tag_relates,this)
        observe_relates(this.field_relates_model_relates,this)

        setTimeout(()=>{
            // this.field_tag = [1,1,5,7];
            // this.field_async_tag = [5];
            // this.field_async_array_model = [2]
        },1000)
    }
}
</script>