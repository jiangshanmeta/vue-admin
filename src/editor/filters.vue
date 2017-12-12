<template>
    <el-form :inline="true"
        v-if="filters.length && (!hasAsyncComponent || isComponentsLoaded)"
    >
        <el-form-item
            v-for="item in filters"
            :label="item.label"
            :key="item.field"
        >
            <component
                :is="item.editorComponent.name"
                v-model="item.value"
                v-bind="mergeAttrsConfig(item.editorComponent.config)"
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
                @click="resetValue"
            >
                重置
            </el-button>
            <slot :formData="formData"></slot>
        </el-form-item>
    </el-form>
</template>

<script>
import filter_enum from "./filter_enum.vue"
import filter_async_enum from "./filter_async_enum.vue"
import filter_model from "./filter_model.vue"
import filter_async_model from "./filter_async_model.vue"
import filter_relates_enum from "./filter_relates_enum.vue"

import field_enum_select from "./field_enum_select.vue"
import field_async_enum_select from "./field_async_enum_select.vue"
import field_model from "./field_model.vue"
import field_async_model from "./field_async_model.vue"
import field_year from "./field_year.vue"
import field_month from "./field_month.vue"
import field_day from "./field_day.vue"
import field_string from "./field_string.vue"

import field_relates_enum_select from "./field_relates_enum_select.vue"
import field_relates_model from "./field_relates_model.vue"

import field_number from "./field_number"

import {observe_relates} from "./field_relates_helper.js"
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
export default{
    name:"filters",
    inheritAttrs:true,
    mixins:[
        dynamicImportComponent,
        mergeAttrsConfig,
    ],
    components:{
        filter_enum,
        filter_async_enum,
        filter_model,
        filter_async_model,
        filter_relates_enum,



        field_enum_select,
        field_async_enum_select,
        field_model,
        field_async_model,
        field_year,
        field_month,
        field_day,
        field_string,
        field_number,
        field_relates_enum_select,
        field_relates_model,
    },
    data(){
        return {
            isComponentsLoaded:false,
            proxyFields:{},
        }
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
                this.isComponentsLoaded = false;
                this.proxyFields = {};
                this.importFilter();
                this.resetValue();
                this.initRelates(newFilters);
            },
        }
    },
    computed:{
        formData(){
            return this.filters.reduce((obj,item)=>{
                obj[item.field] = item.value;
                return obj;
            },{})
        },
        hasAsyncComponent(){
            return this.filters.some((item)=>{
                return item.editorComponent.path;
            })
        }
    },
    methods:{
        search(){
            this.$emit('search',this.formData);
        },
        importFilter(){
            if(this.hasAsyncComponent){
                let componentPaths = this.filters.reduce((arr,item)=>{
                    if(item.editorComponent.path){
                        arr.push(item.editorComponent.path)
                    }
                    return arr;
                },[]);

                this.dynamicImportComponent(componentPaths).then(()=>{
                    this.isComponentsLoaded = true;
                })
            }
        },
        resetValue(){
            this.filters.forEach((item)=>{
                let defaultConfig = item.editorComponent.default;
                let value = typeof defaultConfig === 'function'?defaultConfig():defaultConfig;

                this.$set(item,'value',value);
            });
        },
        initRelates(newFilters){
            newFilters.forEach((item)=>{
                Object.defineProperty(this.proxyFields,item.field,{
                    get(){
                        return item.value
                    },
                    set(){

                    },
                    enumerable:true,
                    configurable:true,
                });
                if(item.editorComponent && item.editorComponent.config && item.editorComponent.config.relates){
                    observe_relates(item.editorComponent.config.relates,this.proxyFields)
                }
            })
        }
    }
}
</script>