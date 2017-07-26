<template>
<el-form :inline="true" v-if="currentFilter.length">
    <el-form-item
        v-for="item in currentFilter"
        :label="item.label"
        :key="item.field"
    >
        <component 
            :is="item.editor"
            v-model="item.value"
            :candidate="item.candidate"
            :placeholder="item.placeholder"
        ></component>
    </el-form-item>
    <el-form-item>
        <el-button  @click="doSearch" type="primary">查询</el-button>
        <slot></slot>
    </el-form-item>
</el-form>
</template>

<script>
// import field_array_model from "./field_array_model"
// import field_bool from "./field_bool"
import filter_day from './filter_day'


import filter_enum from "./filter_enum"
// import field_enum from "./field_enum"


// import field_float from "./field_float"
// import field_int from "./field_int"
import field_model from "./field_model"
import filter_month from "./filter_month"
import field_string from "./field_string"
// import field_tag from "./field_tag"
// import field_text from "./field_text"
// import field_ts from "./field_ts"

import {formHelper} from "./mixins"

export default{
    data(){
        return {
            currentFilter:this.filters,
        }
    },
    mixins:[formHelper],
    props:{
        filters:{
            type:Array,
            default:function(){
                return []
            }
        },
        mode:{
            type:String,
            default:'object'
        },
    },
    methods:{
        getData(mode='object'){
            if(mode==='object'){
                return this.currentFilter.reduce((function(obj,item){
                    obj[item.field] = item.value;
                    return obj;
                }),{})
            }else if(mode==='array'){
                return this.currentFilter.reduce(function(arr,item){
                    arr.push({
                        field:item.field,
                        value:item.value,
                    })
                    return arr;
                },[])
            }

        },
        doSearch(){
            this.$emit('search',this.getData(this.mode));
        }
    },
    created(){
        this._asyncProp('currentFilter','filters');
    },
    components:{
        // field_bool,
        filter_day,
        // field_enum,
        filter_enum,
        field_model,
        filter_month,
        field_string,
    }
}

</script>