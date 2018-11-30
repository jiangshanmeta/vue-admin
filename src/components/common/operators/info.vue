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
                <labels
                    slot="label" 
                    slot-scope="scope"
                    :label="field_list[scope.field].label"
                >
                    <component
                        v-if="needInjectLabelComponentsMap[scope.field]"
                        :is="needInjectLabelComponentsMap[scope.field].name"
                        :label="field_list[scope.field].label"
                        v-bind="needInjectLabelComponentsMap[scope.field].config || {}"
                    ></component>
                </labels>

                <views
                    slot-scope="scope"
                    :view="field_list[scope.field].view"
                    :record="record"
                    :field="scope.field"
                >
                    <component
                        v-if="needInjectViewComponentsMap[scope.field]"
                        slot-scope="viewScope"
                        :is="needInjectViewComponentsMap[scope.field].name"
                        v-bind="viewScope"
                    ></component>
                </views>
            </meta-table>
        </el-dialog>
    </div>
</template>

<script>
import injectComponents from "@/widget/injectComponents"
import getNeedInjectLabelComponentsMap from "@/injectHelper/injectLabelComponentsHelper"
import getNeedInjectViewComponentsMap from "@/injectHelper/injectViewComponentsHelper"

import {logError} from "@/widget/utility.js"

export default{
    name:"info",
    inheritAttrs:true,
    components:{
        metaTable:()=>import("@/components/common/meta-table"),
        views:()=>import("@/components/common/views/views"),
        labels:()=>import("@/components/common/labels/labels"),
    },
    state:{
        injectInited:false,
        needInjectLabelComponentsMap:{},
        needInjectViewComponentsMap:{},
        get hasInjectLabelComponents(){
            return Object.keys(this.needInjectLabelComponentsMap).length>0;
        },
        get hasInjectViewComponents(){
            return Object.keys(this.needInjectViewComponentsMap).length>0;
        },
        get hasInjectComponent(){
            return this.hasInjectLabelComponents || this.hasInjectViewComponents;
        },
    },
    data(){
        return {
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
        componentsInjected(){
            return this.labelComponentsInjected && this.viewComponentsInjected;
        },
    },
    methods:{
        handleClick(){
            if(!this.injectInited){
                this.needInjectLabelComponentsMap = getNeedInjectLabelComponentsMap(this.field_list,Object.keys(this.field_list));
                this.needInjectViewComponentsMap = getNeedInjectViewComponentsMap(this.field_list,Object.keys(this.field_list));
                this.injectLabelComponents();
                this.injectViewComponents();
                this.injectInited = true;
            }

            new Promise((resolve,reject)=>{
                this.getDetailInfo(resolve,this.data);
            }).then(({fields,record})=>{
                this.fields = fields;
                this.record = record;
                this.canInitDialog = true;
                this.isShowLightbox = true;
            }).catch(logError);
        },
        injectLabelComponents(){
            if(!this.hasInjectLabelComponents){
                return this.labelComponentsInjected = true;
            }
            injectComponents(this,this.needInjectLabelComponentsMap).then(()=>{
                this.labelComponentsInjected = true;
            });
        },
        injectViewComponents(){
            if(!this.hasInjectViewComponents){
                return this.viewComponentsInjected = true;
            }
            injectComponents(this,this.needInjectViewComponentsMap).then(()=>{
                this.viewComponentsInjected = true;
            });
        },
    },
}
</script>