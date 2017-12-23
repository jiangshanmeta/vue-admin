<template>
<section
    v-if="canCreate"
    style="display:inline-block;"
>
    <el-button
        type="primary"  
        @click="handleClick"
    >
        新建
    </el-button>
    <el-dialog
        :title="title"
        :visible.sync="isShowCreatebox"
        size="large"
    >
        <editor 
            :fields="create_editor" 
            ref="createbox"
        ></editor>
        <div slot="footer">
            <el-button 
                @click="isShowCreatebox=false"
            >
                取消
            </el-button>
            <el-button 
                @click="doCreate" 
                type="success"
            >
                确认创建
            </el-button>
        </div>
    </el-dialog>
</section>
</template>

<script>
import editor from "@/editor/editor"
import {getCreateInfo,doCreate} from "@/server/common.js"
import {noop} from "@/helpers/utility.js"
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
        canCreate:{
            type:Boolean,
            default:true,
        },
        createLink:{

        },
        doCreateLink:{
            
        },
        field_list:{
            type:Object,
            required:true,
        },
        getInfoRequest:{
            type:Function,
            default:getCreateInfo,
        },
        doCreateRequest:{
            type:Function,
            default:doCreate
        },
        title:{
            type:String,
            default:"创建"
        },
        transformData:{
            type:Function,
            default:function(data){
                return data;
            }
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
                    this.getInfoRequest(this,resolve)
                }).then((fields)=>{
                    this.create_fields = fields;
                    this.initEditor();
                    this.showDialog();
                }).catch(noop)

            }else{
                this.resetEditor();
                this.showDialog()
            }    
        },
        doCreate(){
            this.$refs.createbox.validate().then((data)=>{
                new Promise((resolve,reject)=>{
                    this.doCreateRequest(this,this.transformData(data),resolve)
                }).then(()=>{
                    this.$message({
                        message:"创建成功",
                        type:"success",
                        duration:2000,
                    })
                    this.isShowCreatebox = false;
                    this.$emit('create');
                }).catch(noop)

            }).catch((err)=>{
                this.$message(err);
            })

        },
    }
}
</script>