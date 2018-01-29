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
                            <template v-if="!field_list[item.field]['showComponent']">
                                {{item.value}}
                            </template>
                            <component
                                v-else
                                :is="field_list[item.field]['showComponent']['name']"
                                :data="item.value"
                                v-bind="mergeAttrsConfig(field_list[item.field]['showComponent']['config'])"
                            ></component>
                        </td>
                    </template>
                    <td v-if="restCols[rowIndex]" :colspan="restCols[rowIndex]"></td>
                </tr>
            </table>
        </el-dialog>
    </div>
</template>

<script>
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {getDetailInfo} from "@/server/common.js"
import {logError} from "@/widget/utility.js"
export default{
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
        hasAsyncComponent(){
            let keys = Object.keys(this.field_list);
            for(let item of keys){
                if(this.field_list[item]['showComponent']){
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
                this.importshowComponent();
            }

            new Promise((resolve,reject)=>{
                this.getDetailInfo(resolve);
            }).then((infoData)=>{
                this.infoData = infoData;
                this.isShowLightbox = true;
            }).catch(logError);
        },
        importshowComponent(){
            if(this.hasAsyncComponent){
                let keys = Object.keys(this.field_list);
                let components = [];
                for(let item of keys){
                    if(this.field_list[item]['showComponent']){
                        components.push({
                            name:this.field_list[item]['showComponent']['name'],
                            path:this.field_list[item]['showComponent']['path'],
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