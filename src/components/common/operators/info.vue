<template>
    <div>
        <el-button
            :type="type"
            :size="size"
            @click="handleClick"
        >
            {{triggerText}}
        </el-button>
        <el-dialog
            :title="title"
            :visible.sync="isShowLightbox"
            size="large"
        >
            <meta-table
                v-if="!hasAsyncComponent || $asyncComponent.$all"
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
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {getDetailInfo} from "@/server/common.js"
import {logError} from "@/widget/utility.js"
export default{
    components:{
        views,
        metaTable,
    },
    mixins:[

        mergeAttrsConfig,
        _id_mixin,
    ],
    name:"info",
    data(){
        return {
            isShowLightbox:false,

            fields:[],
            record:{},
        }
    },
    props:{
        data:{
            type:Object,
            required:true,
        },
        field_list:{
            type:Object,
            required:true,
        },
        uri:{
            type:String,
        },
        title:{
            type:[String,Number],
            default:"详情",
        },
        getDetailInfo:{
            type:Function,
            default:getDetailInfo
        },
        triggerText:{
            type:String,
            default:"详情"
        },
        type:{
            type:String,
            default:"primary",
        },
        size:{
            type:String,
            default:"small",
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
        maxCol(){
            let max = 2;
            for(let row of this.fields){
                let rowCol = 0;
                for(let field of row){
                    rowCol += ( (this.field_list[field].colspan && this.field_list[field].colspan.info) || 1) + 1;
                }
                if(rowCol>max){
                    max = rowCol;
                }
            }
            return max;
        },
        restCols(){
            let arr = [];
            const max = this.maxCol;
            for(let row of this.fields){
                let rowCol = 0;
                for(let field of row){
                    rowCol += ( (this.field_list[field].colspan && this.field_list[field].colspan.info) || 1) + 1;
                }
                arr.push(max - rowCol);
            }
            return arr;
        }
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

                this.$resetAsyncComponent(components);
            }
        },
    },
}
</script>