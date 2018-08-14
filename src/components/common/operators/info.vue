<template>
    <div>
        <el-button
            @click="handleClick"
            v-bind="triggerConfig"
        >
            {{triggerConfig.text}}
        </el-button>
        <el-dialog
            v-if="canInitDialog"
            :visible.sync="isShowLightbox"
            v-bind="dialogConfig"
        >
            <meta-table
                v-if="!hasInjectComponent || componentsInjected"
                :field_list="field_list"
                :fields="fields"
                mode="info"
            >
                <template slot="label" slot-scope="scope">
                    <labels
                        :label="field_list[scope.field].label"
                        :labelComponent="needInjectLabelComponentsMap[scope.field]"
                    >
                        <component
                            v-if="needInjectLabelComponentsMap[scope.field]"
                            :is="needInjectLabelComponentsMap[scope.field].name"
                            :label="field_list[scope.field].label"
                            v-bind="needInjectLabelComponentsMap[scope.field].config || {}"
                        ></component>
                    </labels>
                </template>
                <template slot-scope="scope">
                    <views
                        :descriptor="field_list[scope.field]"
                        :record="record"
                        :field="scope.field"
                    >
                        <template
                            v-if="field_list[scope.field].view && field_list[scope.field].view.component"
                            slot-scope="viewScope"
                        >
                            <component
                                :is="field_list[scope.field].view.name"
                                v-bind="viewScope"
                            ></component>
                        </template>
                    </views>
                </template>
            </meta-table>
        </el-dialog>
    </div>
</template>

<script>
import metaTable from "@/components/common/meta-table"
import labels from "@/components/common/labels/labels"
import views from "@/components/common/views/views"

import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import injectComponents from "@/widget/injectComponents"

import {logError} from "@/widget/utility.js"

import filterLabelComponents from "@/injectHelper/labelComponentHelper"

export default{
    name:"info",
    inheritAttrs:true,
    components:{
        metaTable,
        views,
        labels,
    },
    mixins:[
        mergeAttrsConfig,
    ],
    data(){
        return {
            injectInited:false,
            labelComponentsInjected:false,
            viewComponentsInjected:false,
            isShowLightbox:false,
            fields:[],
            record:{},
            canInitDialog:false,
        }
    },
    props:{
        field_list:{
            type:Object,
            required:true,
        },
        getDetailInfo:{
            type:Function,
            required:true,
        },
        data:{
            type:Object,
            required:true,
        },
        triggerConfig:{
            type:Object,
            default(){
                return {};
            }
        },
        dialogConfig:{
            type:Object,
            default(){
                return {};
            },
        },
    },
    computed:{
        needInjectViewComponents(){
            return Object.keys(this.field_list).filter((field)=>{
                return this.field_list[field].view && this.field_list[field].view.component;
            }).map((field)=>{
                return this.field_list[field].view;
            });
        },
        hasInjectComponent(){
            return this.needInjectLabelComponentsList.length || this.needInjectViewComponents.length;
        },
        componentsInjected(){
            return this.labelComponentsInjected && this.viewComponentsInjected;
        },
    },
    methods:{
        handleClick(){
            if(!this.injectInited){
                const {
                    list,
                    map,
                } = filterLabelComponents(this.field_list,Object.keys(this.field_list),'info');

                this.needInjectLabelComponentsList = list;
                this.needInjectLabelComponentsMap = map;

                this.injectLabelComponents();
                this.injectViewComponents();
                this.injectInited = true;
            }

            new Promise((resolve,reject)=>{
                this.getDetailInfo(resolve);
            }).then(({fields,record})=>{
                this.fields = fields;
                this.record = record;
                this.canInitDialog = true;
                this.isShowLightbox = true;
            }).catch(logError);
        },
        injectLabelComponents(){
            if(!this.needInjectLabelComponentsList.length){
                return this.labelComponentsInjected = true;
            }
            injectComponents(this,this.needInjectLabelComponentsList).then(()=>{
                this.labelComponentsInjected = true;
            });
        },
        injectViewComponents(){
            if(!this.needInjectViewComponents.length){
                return this.viewComponentsInjected = true;
            }
            injectComponents(this,this.needInjectViewComponents).then(()=>{
                this.viewComponentsInjected = true;
            });
        },
    },
}
</script>