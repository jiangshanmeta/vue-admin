<template>
<section>
    <table class="table">
        <thead>
            <tr>
                <td>组件名</td>
                <td>组件值</td>
                <td>组件实例</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>field_sex</td>
                <td>{{field_sex}}</td>
                <td>
                    <field_sex
                        v-model="field_sex"
                    ></field_sex>
                </td>
            </tr>
            <tr>
                <td>field_bool</td>
                <td>{{field_bool}}</td>
                <td>
                    <field_bool
                        v-model="field_bool"
                    ></field_bool>
                </td>
            </tr>
            <tr>
                <td>field_enum_radio</td>
                <td>{{field_enum_radio}}</td>
                <td>
                    <field_enum_radio
                        v-model="field_enum_radio"
                        :candidate="field_enum_candidate"
                        valuefield="valuefield"
                    ></field_enum_radio>
                </td>
            </tr>
            <tr>
                <td>field_enum_select</td>
                <td>{{field_enum_select}}</td>
                <td>
                    <field_enum_select
                        v-model="field_enum_select"
                        :candidate="field_enum_candidate"
                        valuefield="valuefield"
                    ></field_enum_select>
                </td>
            </tr>
            <tr>
                <td>field_model</td>
                <td>{{field_model}}</td>
                <td>
                    <field_model
                        v-model="field_model"
                        :candidate="field_enum_candidate"
                        valuefield="valuefield"
                        placeholder="field_model的placeholder"
                    ></field_model>
                </td>
            </tr>
            <tr>
                <td>field_async_enum_radio</td>
                <td>{{field_async_enum_radio}}</td>
                <td>
                    <field_async_enum_radio
                        v-model="field_async_enum_radio"
                        uri="/test/field_async_enum_radio"
                        labelfield="name"
                        valuefield="id"
                    ></field_async_enum_radio>
                </td>
            </tr>
            <tr>
                <td>field_async_enum_select</td>
                <td>{{field_async_enum_select}}</td>
                <td>
                    <field_async_enum_select
                        v-model="field_async_enum_select"
                        uri='/test/field_async_enum_select'
                        labelfield="name"
                        valuefield="id"
                        placeholder="the placeholder"
                    ></field_async_enum_select>
                </td>
            </tr>
            <tr>
                <td>field_async_model</td>
                <td>{{field_async_model}}</td>
                <td>
                    <field_async_model
                        v-model="field_async_model"
                        uri='/test/field_async_model'
                        labelfield='name'
                        valuefield='id'
                        placeholder="placeholder"
                    ></field_async_model>
                </td>
            </tr>
            <tr>
                <td>field_relates_enum_radio</td>
                <td>{{field_relates_enum_radio}}</td>
                <td>
                    <field_relates_enum_radio
                        v-model="field_relates_enum_radio"
                        :relates="field_relates_enum_radio_relates"
                        uri='/test/field_relates_enum_radio'
                        labelfield="name"
                        valuefield="id"
                    ></field_relates_enum_radio>
                </td>
            </tr>
            <tr>
                <td>field_relates_enum_select</td>
                <td>{{field_relates_enum_select}}</td>
                <td>
                    <field_relates_enum_select
                        v-model="field_relates_enum_select"
                        :relates="field_relates_enum_radio_relates"
                        uri='/test/field_relates_enum_select'
                        labelfield="name"
                        valuefield="id"
                    ></field_relates_enum_select>
                </td>
            </tr>
            <tr>
                <td>field_relates_model</td>
                <td>{{field_relates_model}}</td>
                <td>
                    <field_relates_model
                        v-model="field_relates_model"
                        :relates="field_relates_enum_radio_relates"
                        uri="/test/field_relates_model"
                        labelfield="name"
                        valuefield="id"
                    ></field_relates_model>
                </td>
            </tr>
        </tbody>
    </table>
</section>
</template>

<script>
import field_sex from "@/editor/field_sex.vue"
import field_bool from "@/editor/field_bool.vue"

import field_enum_radio from "@/editor/field_enum_radio"
import field_enum_select from "@/editor/field_enum_select"
import field_model from "@/editor/field_model"

import field_async_enum_radio from "@/editor/field_async_enum_radio"
import field_async_enum_select from "@/editor/field_async_enum_select"
import field_async_model from "@/editor/field_async_model"

import field_relates_enum_radio from "@/editor/field_relates_enum_radio"
import field_relates_enum_select from "@/editor/field_relates_enum_select"
import field_relates_model from "@/editor/field_relates_model"


import {observe_relates} from "@/editor/field_relates_helper.js"

export default{
    components:{
        field_sex,
        field_bool,
        field_enum_radio,
        field_enum_select,
        field_model,
        field_async_enum_radio,
        field_async_enum_select,
        field_async_model,
        field_relates_enum_radio,
        field_relates_enum_select,
        field_relates_model,
    },
    config:{
        field_enum_candidate:[
            {valuefield:1,label:"eins"},
            {valuefield:2,label:"zwei"},
            {valuefield:3,label:"drei"},
            {valuefield:4,label:"fuer"},
        ],
        field_relates_enum_radio_relates:{
            "bool":{
                relatefield:"field_bool",
            },
            "ppp":{
                relatefield:"field_enum_radio"
            }
        },



    },
    data(){
        return {
            field_sex:0,
            field_bool:0,
            field_enum_radio:0,
            field_enum_select:0,
            field_model:"",
            field_async_enum_radio:"",
            field_async_enum_select:"",
            field_async_model:"",
            field_relates_enum_radio:"",
            field_relates_enum_select:"",
            field_relates_model:"",
        }
    },
    created(){
        observe_relates(this.field_relates_enum_radio_relates,this)

        setTimeout(()=>{
            this.field_sex = 1;
            this.field_bool = 1;
            this.field_enum_radio = 1;
            this.field_enum_select = 2;
            this.field_model = 3;

        },2000)
    }
}
</script>