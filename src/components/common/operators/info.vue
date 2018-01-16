<template>
    <div style="display:inline-block;">
        <el-button
            type="primary"
            size="small"
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
                    v-for="row in infoData"
                >
                    <template v-for="item in row">
                        <td>{{field_list[item.field]['label']}}</td>
                        <td :colspan="row.length===1?3:1">
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
        }
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
                        components.push(this.field_list[item]['showComponent']['path']);
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