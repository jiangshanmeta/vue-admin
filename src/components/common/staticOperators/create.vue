<template>
    <div>
        <el-button
            type="primary"  
            @click="handleClick"
        >
            {{triggerText}}
        </el-button>
        <el-dialog
            :title="title"
            :visible.sync="isShowCreatebox"
            size="large"
        >
            <editor 
                :fields="create_editor" 
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
            create_fields:[],
            create_editor:[],
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
        }
    },
    watch:{
        field_list(){
            this.init();
        },
    },
    methods:{
        showDialog(){
            this.isShowCreatebox = true;
        },
        init(){
            this.create_fields = [];
            this.create_editor = [];
        },
        initEditor(){
            this.create_editor = this.create_fields.reduce((arr,row)=>{
                let rowitem = row.reduce((rowitem,field)=>{
                    let configDefault = this.field_list[field].editorComponent.default;

                    let value = typeof configDefault === 'function'?configDefault() : configDefault;

                    rowitem.push({
                        field,
                        value:value,
                        label:this.field_list[field].label,
                        editorComponent:this.field_list[field].editorComponent,
                        tip:this.field_list[field].tip,
                        validator:this.field_list[field].validator,
                        default:configDefault,
                    })
                    return rowitem;
                },[]);

                arr.push(rowitem)
                return arr;
            },[])
        },
        resetEditor(){
            this.create_editor.forEach((row)=>{
                row.forEach((item)=>{
                    item.value = typeof item.default==='function'?item.default():item.default;
                })
            })
        },
        handleClick(){
            if(this.create_fields.length === 0){
                new Promise((resolve,reject)=>{
                    this.getCreateFields(resolve)
                }).then((fields)=>{
                    this.create_fields = fields;
                    this.initEditor();
                    this.showDialog();
                }).catch(logError)

            }else{
                this.resetEditor();
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