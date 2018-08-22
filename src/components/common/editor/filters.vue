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
                v-model="filtersValueMap[item.field]"
                v-bind="mergeAttrsConfig(item.editorComponent.config)"
            ></component>
        </el-form-item>
        <el-form-item>
            <section>
                <el-button 
                    type="primary"
                    @click="search"
                    style="margin-right:10px;"
                >
                    查询
                </el-button>

                <operators
                    :field_list="field_list"
                    :operators="filterOperators"
                    :data="filtersValueMap"
                    :filters="filters"
                    @update="search"
                    style="display:inline-block;"
                ></operators>

            </section>
        </el-form-item>
    </el-form>
</template>

<script>
import {observe_relates} from "./field_relates_helper.js"

import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import injectComponents from "@/widget/injectComponents"


export default{
    name:"filters",
    inheritAttrs:true,
    mixins:[
        mergeAttrsConfig,
    ],
    components:{
        filter_enum:()=>import("./filter_enum"),
        filter_async_enum:()=>import("./filter_async_enum"),
        filter_model:()=>import("./filter_model"),
        filter_async_model:()=>import("./filter_async_model"),
        filter_relates_enum:()=>import("./filter_relates_enum"),
        filter_relates_model:()=>import("./filter_relates_model"),

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
            componentsInjected:false,
            filtersValueMap:{},
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
    created(){
        this.injectFilterComponents();
        this.resetValue();
        this.initRelates();
        this.initWatch();
    },
    computed:{
        formData(){
            return JSON.parse(JSON.stringify(this.filtersValueMap));
        },
        needInjectFilterComponents(){
            return this.filters.filter((item)=>{
                return item.editorComponent.component;
            }).map(item=>item.editorComponent);
        },
        hasInjectComponent(){
            return this.needInjectFilterComponents.length;
        }
    },
    methods:{
        search(){
            this.$emit('search');
        },
        injectFilterComponents(){
            if(!this.hasInjectComponent){
                return;
            }
            injectComponents(this,this.needInjectFilterComponents).then(()=>{
                this.componentsInjected = true;
            });

        },
        resetValue(){
            this.filtersValueMap = this.filters.reduce((obj,item)=>{
                const defaultConfig = item.editorComponent.default;
                obj[item.field] = typeof defaultConfig === 'function'?defaultConfig.call(this):defaultConfig;
                return obj;
            },{});
        },
        initRelates(){
            // TODO support custom relates
            this.filters.forEach((item)=>{
                if(item.editorComponent && item.editorComponent.config && item.editorComponent.config.relates){
                    observe_relates(item.editorComponent.config.relates,this.filtersValueMap)
                }
            })
        },
        initWatch(){
            const watchFilters = this.filters.filter(item=>item.watch);
            if(watchFilters.length){
                this.$watch(()=>{
                    return watchFilters.map(item=>this.filtersValueMap[item.field]);
                },this.search);
            }
        },
    }
}
</script>

<style scoped>
.filters >>> .el-form-item{
    margin-bottom:5px;
}
</style>