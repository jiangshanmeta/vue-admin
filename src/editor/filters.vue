<template>
    <el-form :inline="true"
        v-if="filters.length"
    >
        <el-form-item
            v-for="item in filters"
            :label="item.label"
            :key="item.field"
        >
            {{item.value}}
            <component
                :is="item.editor"
                v-model="item.value"
                :candidate="item.candidate"
                :uri="item.uri"
                :labelfield="item.labelfield"
                :valuefield="item.valuefield"
                :placeholder="item.placeholder"
                :allvalue="item.allvalue"
                :alllabel="item.alllabel"
            ></component>
        </el-form-item>
        <el-form-item>
            <el-button 
                type="primary"
                @click="search"
            >
                查询
            </el-button>
            <el-button
                type="warning"
                @click="reset"
            >
                重置
            </el-button>
            <slot></slot>
        </el-form-item>
    </el-form>
</template>

<script>
import filter_enum from "./filter_enum.vue"
import filter_async_enum from "./filter_async_enum.vue"
import filter_model from "./filter_model.vue"
import filter_async_model from "./filter_async_model.vue"

import field_enum_select from "./field_enum_select.vue"
import field_async_enum_select from "./field_async_enum_select.vue"
import field_model from "./field_model.vue"
import field_async_model from "./field_async_model.vue"
import field_year from "./field_year.vue"
import field_month from "./field_month.vue"
import field_day from "./field_day.vue"
import field_string from "./field_string.vue"

export default{
    components:{
        filter_enum,
        filter_async_enum,
        filter_model,
        filter_async_model,
        field_enum_select,
        field_async_enum_select,
        field_model,
        field_async_model,
        field_year,
        field_month,
        field_day,
        field_string,
    },
    props:{
        filters:{
            type:Array,
            required:true,
        },
    },
    watch:{
        filters:{
            immediate:true,
            handler(newFilters){
                this.reset()
            },
        }
    },
    computed:{
        formData(){
            return this.filters.reduce((obj,item)=>{
                obj[item.field] = item.value;
                return obj;
            },{})
        }
    },
    methods:{
        search(){
            this.$emit('search',this.formData);
        },
        reset(){
            this.filters.forEach((item)=>{
                let value = typeof item.default === 'function'?item.default():item.default;
                this.$set(item,'value',value);
            })
        },
    }
}
</script>