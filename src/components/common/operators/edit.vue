<template>
    <div>
        <el-button
            @click="getEditFields"
            :type="type"
            :size="size"
        >
            {{triggerText}}
        </el-button>
        <el-dialog
            :title="title"
            :visible.sync="isShowEditbox"
            size="large"
        >
            <editor
                :fields="fields"
                :record="record"
                :field_list="field_list"
                :autoValidate="autoValidate"
                mode="edit"
                ref="editbox"
            ></editor>
            <section slot="footer">
                <el-button 
                    @click="isShowEditbox=false"
                >
                    {{cancelText}}
                </el-button>
                <el-button
                    type="danger"
                    @click="doEdit"
                >
                    {{editText}}
                </el-button>
            </section>
        </el-dialog>
    </div>
</template>

<script>
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {getEditInfo,doEditRequest} from "@/server/common.js"
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
        editInfoUri:{

        },
        doEditUri:{
            type:String,
        },
        autoValidate:{
            type:Boolean,
            default:false,
        },
        getEditInfo:{
            type:Function,
            default:getEditInfo,
        },
        doEditRequest:{
            type:Function,
            default:doEditRequest
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
        title:{
            type:String,
            default:"编辑",
        },
        triggerText:{
            type:String,
            default:"编辑"
        },
        editText:{
            type:String,
            default:"确认编辑"
        },
        cancelText:{
            type:String,
            default:"取消"
        },
        type:{
            type:String,
            default:"primary",
        },
        size:{
            type:String,
            default:"small",
        }
    },
    methods:{
        showDialog(){
            this.isShowEditbox = true;
        },
        getEditFields(){
            new Promise((resolve,reject)=>{
                this.getEditInfo(resolve);
            }).then(({fields,record})=>{
                this.fields = fields;
                this.record = record;
                this.showDialog();
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
