<template>
    <div>
        <el-button
            :type="type"  
            @click="handleClick"
            :size="size"
        >
            {{triggerText}}
        </el-button>
        <el-dialog
            :title="title"
            :visible.sync="isShowCreatebox"
            size="large"
        >
            <editor 
                :fields="fields"
                :field_list="field_list"
                :record="record"
                :autoValidate="autoValidate"
                ref="createbox"
                mode="create"
            ></editor>
            <div slot="footer">
                <el-button 
                    @click="isShowCreatebox=false"
                >
                    {{cancelText}}
                </el-button>
                <el-button 
                    @click="doCreate" 
                    type="success"
                >
                    {{createText}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import editor from "@/editor/editor"
import {getCreateFields,doCreateRequest} from "@/server/common.js"
import {logError} from "@/widget/utility.js"
export default{
    name:"create",
    components:{
        editor,
    },
    data (){
        return {
            isShowCreatebox:false,
            fields:[],
            record:{},
        }
    },
    props:{
        getCreateFieldsUri:{

        },
        doCreateUri:{
            
        },
        field_list:{
            type:Object,
            required:true,
        },
        getCreateFields:{
            type:Function,
            default:getCreateFields,
        },
        doCreateRequest:{
            type:Function,
            default:doCreateRequest
        },
        transformData:{
            type:Function,
            default:function(data){
                return data;
            }
        },
        title:{
            type:String,
            default:"创建"
        },
        triggerText:{
            type:String,
            default:"新建"
        },
        createText:{
            type:String,
            default:"确认创建"
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
            default:"",
        },
        autoValidate:{
            type:Boolean,
            default:false,
        },
    },
    watch:{
        field_list(){
            this.fields = [];
        },
    },
    methods:{
        showDialog(){
            this.isShowCreatebox = true;
        },
        resetRecord(){
            this.record = this.fields.reduce((obj,row)=>{
                row.forEach((field)=>{
                    let configDefault = this.field_list[field].editorComponent.default;
                    obj[field] = typeof configDefault === 'function'?configDefault():configDefault;
                })
                return obj;
            },{});
        },
        handleClick(){
            if(this.fields.length === 0){
                new Promise((resolve,reject)=>{
                    this.getCreateFields(resolve)
                }).then((fields)=>{
                    this.fields = fields;
                    this.resetRecord();
                    this.showDialog();
                }).catch(logError)

            }else{
                this.resetRecord();
                this.showDialog()
            }    
        },
        doCreate(){
            this.$refs.createbox.validate().then((data)=>{
                new Promise((resolve,reject)=>{
                    this.doCreateRequest(resolve,this.transformData(data))
                }).then(()=>{
                    this.isShowCreatebox = false;
                    this.$emit('update');
                }).catch(logError)

            }).catch((err)=>{
                this.$message(err);
            })

        },
    }
}
</script>