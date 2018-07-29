<template>
    <el-form
        v-if="filters.length || (!hasInjectComponent || componentsInjected)"
        :inline="true"
        class="filters"
        v-show="filters.length"
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
            <section>
                <el-button 
                    type="primary"
                    @click="search"
                    v-if="filters.length"
                    style="margin-right:10px;"
                >
                    查询
                </el-button>

                <operators
                    :field_list="field_list"
                    :operators="filterOperators"
                    :data="formData"
                    :filters="filters"
                    @update="search"
                    style="display:inline-block;"
                ></operators>

                <slot :formData="formData"></slot>
            </section>
        </el-form-item>
    </el-form>
</template>

<script>
import {observe_relates} from "./field_relates_helper.js"

import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import injectComponents from "@/mixins/common/injectComponents"

function hasFilterInjectComponent(item){
    return item.editorComponent.component
}

export default{
    name:"filters",
    inheritAttrs:true,
    mixins:[
        mergeAttrsConfig,
        injectComponents,
    ],
    components:{
        filter_enum:()=>import("./filter_enum"),
        filter_async_enum:()=>import("./filter_async_enum"),
        filter_model:()=>import("./filter_model"),
        filter_async_model:()=>import("./filter_async_model"),
        filter_relates_enum:()=>import("./filter_relates_enum"),

        field_enum_select:()=>import("./field_enum_select"),
        field_async_enum_select:()=>import("./field_async_enum_select"),
        field_model:()=>import("./field_model"),
        field_async_model:()=>import("./field_async_model"),
        field_year:()=>import("./field_year"),
        field_month:()=>import("./field_month"),
        field_day:()=>import("./field_day"),
        field_string:()=>import("./field_string"),
        field_number:()=>import("./field_number"),
        field_relates_enum_select:()=>import("./field_relates_enum_select"),
        field_relates_model:()=>import("./field_relates_model"),

        operators:()=>import("@/components/common/operators/operators"),
    },
    data(){
        return {
            proxyFields:{},
            unwatchs:[],
        }
    },
    props:{
        filters:{
            type:Array,
            required:true,
        },
        field_list:{
            type:Object,
            required:true,
        },
        filterOperators:{
            type:Array,
            default(){
                return [];
            },
        },
    },
    watch:{
        filters:{
            immediate:true,
            handler(newFilters){
                this.isComponentsLoaded = false;
                this.proxyFields = {};
                this.importFilter();
                this.unwatchs.forEach((unwatch)=>{
                    unwatch && unwatch();
                });
                this.unwatchs.splice(0,this.unwatchs.length);
                this.resetValue();
                this.initRelates(newFilters);
                this.initWatch();
            },
        }
    },
    computed:{
        formData(){
            let data = this.filters.reduce((obj,item)=>{
                obj[item.field] = item.value;
                return obj;
            },{});
            return JSON.parse(JSON.stringify(data));
        },
        hasInjectComponent(){
            return this.filters.some(hasFilterInjectComponent);
        }
    },
    methods:{
        search(){
            console.log(this)
            this.$emit('search',this.formData);
        },
        importFilter(){
            if(!this.hasInjectComponent){
                return;
            }

            const components = this.filters.filter(hasFilterInjectComponent)
                .map((item)=>{
                    return {
                        name:item.editorComponent.name,
                        component:item.editorComponent.component,
                    }
                });

        
            this.injectComponents(components);
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
        },
        initWatch(){
            this.filters.forEach((item)=>{
                if(!item.watch){
                    return;
                }
                let unwatch = this.$watch(()=>{
                    return item.value
                },this.search);
                this.unwatchs.push(unwatch);
            })
        },
    }
}
</script>

<style scoped>
.filters >>> .el-form-item{
    margin-bottom:5px;
}
</style>