<template>
    <div>
        <el-button
            @click="handleClick"
            v-bind="triggerConfig"
        >
            {{triggerConfig.text}}
        </el-button>
        <el-dialog
            :visible.sync="isShowLightbox"
            v-bind="dialogConfig"
        >
            <meta-table
                v-if="!hasAsyncComponent || componentsInjected"
                :field_list="field_list"
                :fields="fields"
                mode="info"
            >
                <template slot="label" slot-scope="scope">
                    {{field_list[scope.field].label}}
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
import views from "@/components/common/views/views"
import metaTable from "@/components/common/meta-table"

import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import injectComponents from "@/mixins/common/injectComponents"

import {logError} from "@/widget/utility.js"
export default{
    name:"info",
    inheritAttrs:true,
    components:{
        views,
        metaTable,
    },
    mixins:[
        mergeAttrsConfig,
        injectComponents,
    ],
    data(){
        return {
            isShowLightbox:false,
            fields:[],
            record:{},
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
        hasAsyncComponent(){
            let keys = Object.keys(this.field_list);
            for(let item of keys){
                if(this.field_list[item].view && this.field_list[item].view.component){
                    return true;
                }
            }
            return false;
        },
    },
    methods:{
        handleClick(){
            if(!this.isComponentsLoaded){
                this.importviewComponent();
            }

            new Promise((resolve,reject)=>{
                this.getDetailInfo(resolve);
            }).then(({fields,record})=>{
                this.fields = fields;
                this.record = record;
                this.isShowLightbox = true;
            }).catch(logError);
        },
        importviewComponent(){
            if(this.hasAsyncComponent){
                let keys = Object.keys(this.field_list);
                let components = [];
                for(let item of keys){
                    if(this.field_list[item].view && this.field_list[item].view.component){
                        components.push({
                            name:this.field_list[item].view.name,
                            component:this.field_list[item].view.component,
                        });
                    }
                }

                this.injectComponents(components);
            }
        },
    },
}
</script>