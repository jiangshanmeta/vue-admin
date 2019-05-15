<template>
    <div>
        <el-button
            @click="getEditFields"
            v-bind="triggerConfig"
        >
            {{triggerConfig.text}}
        </el-button>
        <el-dialog
            v-if="canInitDialog"
            :visible.sync="isShowEditbox"
            v-bind="dialogConfig"
        >
            <editor
                :fields="fields"
                :record="record"
                :field_list="field_list"
                :autoValidate="autoValidate"
                mode="edit"
                ref="editbox"
            ></editor>
            <template #footer>
                <el-button 
                    @click="isShowEditbox=false"
                    v-bind="cancelBtnConfig"
                >
                    {{cancelBtnConfig.text}}
                </el-button>
                <el-button
                    @click="doEdit"
                    v-bind="editBtnConfig"
                >
                    {{editBtnConfig.text}}
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {logError} from "@/widget/utility.js"

export default {
    name:"edit",
    mixins:[
        _id_mixin,
    ],
    components:{
        editor:()=>import("@/components/common/editor/editor"),
    },
    data(){
        return {
            isShowEditbox:false,
            fields:[],
            record:{},
            canInitDialog:false,
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
        getEditInfo:{
            type:Function,
            required:true,
        },
        doEditRequest:{
            type:Function,
            required:true,
        },
        triggerConfig:{
            type:Object,
            default(){
                return {};
            },
        },
        dialogConfig:{
            type:Object,
            default(){
                return {}
            },
        },
        editBtnConfig:{
            type:Object,
            default(){
                return {};
            },
        },
        cancelBtnConfig:{
            type:Object,
            default(){
                return {};
            },
        },
        autoValidate:{
            type:Boolean,
            default:false,
        },
        transformData:{
            type:Function,
            default:function(data){
                return data;
            }
        },
        reserveFields:{
            type:Array,
            default:function(){
                return [];
            },
        },
    },
    methods:{
        getEditFields(){
            new Promise((resolve,reject)=>{
                this.getEditInfo(resolve,this.data);
            }).then(({fields,record})=>{
                this.fields = fields;
                this.record = record;
                this.canInitDialog = true;
                this.isShowEditbox = true;
            }).catch(logError);
        },
        doEdit(){
            this.$refs.editbox.validate().then((data)=>{
                this.reserveFields.forEach((field)=>{
                    data[field] = this.record[field];
                });
                
                new Promise((resolve,reject)=>{
                    this.doEditRequest(resolve,this.transformData(data))
                }).then(()=>{
                    this.isShowEditbox = false;
                    this.$emit('update');
                }).catch(logError);

            }).catch((err)=>{
                this.$message(err);
            })

        },
    },
}
</script>
