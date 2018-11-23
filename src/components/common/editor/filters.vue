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
                :ref="item.field"
                v-model="filtersValueMap[item.field]"
                v-bind="generateFilterProp(item)"
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
        filter_enum_select:()=>import("./filter_enum_select"),
        filter_enum_select_async:()=>import("./filter_enum_select_async"),
        filter_enum_select_relates:()=>import("./filter_enum_select_relates"),
        filter_enum_autocomplete:()=>import("./filter_enum_autocomplete"),
        filter_enum_autocomplete_async:()=>import("./filter_enum_autocomplete_async"),
        filter_enum_autocomplete_relates:()=>import("./filter_enum_autocomplete_relates"),

        editor_enum_select:()=>import("./editor_enum_select"),
        editor_enum_select_async:()=>import("./editor_enum_select_async"),
        editor_enum_select_relates:()=>import("./editor_enum_select_relates"),
        editor_enum_autocomplete:()=>import("./editor_enum_autocomplete"),
        editor_enum_autocomplete_async:()=>import("./editor_enum_autocomplete_async"),
        editor_enum_autocomplete_relates:()=>import("./editor_enum_autocomplete_relates"),
        editor_time_year:()=>import("./editor_time_year"),
        editor_time_month:()=>import("./editor_time_month"),
        editor_time_day:()=>import("./editor_time_day"),
        editor_string:()=>import("./editor_string"),
        editor_number:()=>import("./editor_number"),

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
        getRelateData(relateItem){
            if(Array.isArray(relateItem.relateField)){
                return relateItem.relateField.reduce((obj,field)=>{
                    obj[field] = this.filtersValueMap[field];
                    return obj;
                },{});
            }else{
                return this.filtersValueMap[relateItem.relateField]
            }
        },
        // 支持 editorComponent relates propField 模式
        generateFilterProp(filterItem){
            const config = filterItem.editorComponent.config || {};
            const {
                relates=[]
            } = config

            const relateProps = relates.filter(item=>item.propField).reduce((obj,item)=>{
                obj[item.propField] = this.getRelateData(item);
                return obj;
            },Object.create(null));

            return Object.assign({},this.$attrs,config,relateProps);
        },
        initRelates(){
            // 支持 editorComponent relates handler 模式
            this.filters.forEach((filterItem)=>{
                if(!filterItem.editorComponent || !filterItem.editorComponent.config || !Array.isArray(filterItem.editorComponent.config.relates) ){
                    return;
                }

                const relates = filterItem.editorComponent.config.relates;
                relates.filter((relateItem)=>typeof relateItem.handler === 'function').forEach((relateItem)=>{
                    let callback = function(newVal,oldVal){
                        if(this.$refs[filterItem.field] && this.$refs[filterItem.field][0]){
                            relateItem.handler.call(this.$refs[filterItem.field][0],newVal,oldVal);
                        }else{
                            setTimeout(()=>{
                                callback.call(this,newVal,oldVal)
                            },0)
                        }
                    }

                    this.$watch(()=>{
                        return this.getRelateData(relateItem);
                    },callback,relateItem.config)

                });

            });
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