<template>
    <span>
        <el-button
            type="primary"
            size="small"
            @click="handleClick"
        >
            详情
        </el-button>
        <el-dialog
            :title="config.title || '详情'"
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
                            <template v-if="!field_list[item.field]['showcomponent']">
                                {{item.value}}
                            </template>
                            <component
                                v-else
                                :is="field_list[item.field]['showcomponent']['component']"
                                :data="item.value"
                                :config="field_list[item.field]['showcomponent']['config']"
                            ></component>
                        </td>
                    </template>
                </tr>
            </table>
        </el-dialog>
    </span>
</template>

<script>
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
import _computed_id_mixin from "./_computed_id_mixin.js";
export default{
    mixins:[
        dynamicImportComponent,
        _computed_id_mixin,
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
        config:{
            type:Object,
            required:true,
        }
    },
    computed:{
        hasAsyncComponent(){
            let keys = Object.keys(this.field_list);
            for(let item of keys){
                if(this.field_list[item]['showcomponent']){
                    return true;
                }
            }
            return false;
        },
    },
    methods:{
        handleClick(){
            if(!this.isComponentsLoaded){
                this.importShowComponent();
            }

            this.$axios.get(`${this.config.uri}/${this.id}`).then((json)=>{
                this.infoData = json.data.fields;
                this.isShowLightbox = true;
            })
        },
        importShowComponent(){
            if(this.hasAsyncComponent){
                let keys = Object.keys(this.field_list);
                let components = [];
                for(let item of keys){
                    if(this.field_list[item]['showcomponent']){
                        components.push(this.field_list[item]['showcomponent']['path']);
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