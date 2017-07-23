<template>
    <table class="table">
        <tr v-for="row in currentFields">
            <template v-for="item in row">
                <td>{{item.name}}</td>
                <td :colspan="row.length===1?3:1">
                    <component 
                        :is="item.editor" 
                        v-model="item.value" 
                        :candidate="item.candidate"
                        :placeholder="item.placeholder"
                        :key="item.field"
                    ></component>
                </td>
            </template>
        </tr>
    </table>
</template>

<script>
import field_array_model from "./field_array_model"
import field_bool from "./field_bool"
import field_enum from "./field_enum"
import field_float from "./field_float"
import field_int from "./field_int"
import field_model from "./field_model"
import field_string from "./field_string"
import field_tag from "./field_tag"
import field_text from "./field_text"
import field_ts from "./field_ts"

import {formHelper} from "./mixins"
export default{
    data(){
        return {
            currentFields:this.fields,
        }
    },
    mixins:[formHelper],
    methods:{
        getData(){
            return this.currentFields.reduce(function(obj,item){

                item.reduce(function(obj,item){
                    obj[item.field] = item.value;
                    return obj;
                },obj)

                return obj;
            },{});
        },
    },
    props:{
        fields:{
            type:Array,
            required:true,
        }
    },
    components:{
        field_array_model,
        field_bool,
        field_enum,
        field_float,
        field_int,
        field_model,
        field_string,
        field_tag,
        field_text,
        field_ts,
    },
    created(){
        this._asyncProp('currentFields','fields');
    }
}
</script>