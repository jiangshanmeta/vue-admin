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
            <table 
                class="table"
                v-if="!hasAsyncComponent || isComponentsLoaded"
            >
                <tr
                    v-for="(row,rowIndex) in infoData"
                >
                    <template v-for="item in row">
                        <td>{{field_list[item.field]['label']}}</td>
                        <td :colspan="(field_list[item.field].colspan && field_list[item.field].colspan.info) || 1">

                            <views
                                :descriptor="field_list[item.field]"
                                :record="record"
                                :field="item.field"
                            >
                                <template
                                    v-if="field_list[item.field].view && field_list[item.field].view.component"
                                    slot-scope="viewScope"
                                >
                                    <component
                                        :is="field_list[item.field].view.component"
                                        v-bind="viewScope"
                                    ></component>
                                </template>
                            </views>
                        </td>
                    </template>
                    <td v-if="restCols[rowIndex]" :colspan="restCols[rowIndex]"></td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
import views from "@/components/common/views/views"
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {getDetailInfo} from "@/server/common.js"
import {logError} from "@/widget/utility.js"
export default{
    components:{
        views,
    },
    mixins:[
        dynamicImportComponent,
        mergeAttrsConfig,
        _id_mixin,
    ],
    name:"info",
    data(){
        return {
            isShowLightbox:false,
            infoData:[],
            isComponentsLoaded:false,
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
        record(){
            return this.infoData.reduce((obj,row)=>{
                row.forEach((item)=>{
                    obj[item.field] = item.value;
                });
                return obj;
            },{});
        },
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
            for(let row of this.infoData){
                let rowCol = 0;
                for(let item of row){
                    let field = item.field;
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
            for(let row of this.infoData){
                let rowCol = 0;
                for(let item of row){
                    let field = item.field;
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
            }).then((infoData)=>{
                this.infoData = infoData;
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
                            name:this.field_list[item].view.component,
                            path:this.field_list[item].view.componentPath,
                        });
                    }
                }

                this.dynamicImportComponent(components).then(()=>{
                    this.isComponentsLoaded = true;
                })
            }
        },
    },
}
</script>