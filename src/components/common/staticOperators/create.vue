<template>
    <div>
        <el-button
            @click="handleClick"
            v-bind="triggerConfig"
        >
            {{triggerConfig.text}}
        </el-button>
        <el-dialog
            v-if="canInitDialog"
            :visible.sync="isShowCreatebox"
            v-bind="dialogConfig"
        >
            <editor
                :fields="fields"
                :field_list="field_list"
                :record="record"
                :autoValidate="autoValidate"
                ref="createbox"
                mode="create"
            ></editor>
            <template #footer>
                <el-button
                    @click="isShowCreatebox=false"
                    v-bind="cancelBtnConfig"
                >
                    {{cancelBtnConfig.text}}
                </el-button>
                <el-button 
                    @click="doCreate" 
                    v-bind="createBtnConfig"
                >
                    {{createBtnConfig.text}}
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {logError} from "@/widget/utility"

export default{
    name:"create",
    inheritAttrs:true,
    components:{
        editor:()=>import("@/components/common/editor/editor"),
    },
    data (){
        return {
            isShowCreatebox:false,
            fields:[],
            record:{},
            canInitDialog:false,
        }
    },
    props:{
        field_list:{
            type:Object,
            required:true,
        },
        getCreateFields:{
            type:Function,
            required:true,
        },
        doCreateRequest:{
            type:Function,
            required:true,
        },
        triggerConfig:{
            type:Object,
            default(){
                return {}
            },
        },
        dialogConfig:{
            type:Object,
            default(){
                return {}
            }
        },
        createBtnConfig:{
            type:Object,
            default(){
                return {};
            },
        },
        cancelBtnConfig:{
            type:Object,
            default(){
                return {};
            }
        },
        transformData:{
            type:Function,
            default(data){
                return data;
            }
        },
        autoValidate:{
            type:Boolean,
            default:false,
        },
    },
    methods:{
        showDialog(){
            this.isShowCreatebox = true;
        },
        resetRecord(){
            this.record = this.fields.reduce((obj,row)=>{
                row.forEach((field)=>{
                    const configDefault = this.field_list[field].editorComponent.default;
                    obj[field] = typeof configDefault === 'function'?configDefault.call(this,field):configDefault;
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
                    this.canInitDialog = true;
                    this.showDialog();
                }).catch(logError)

            }else{
                this.resetRecord();
                this.showDialog()
            }    
        },
        doCreate(){
            this.$refs.createbox.validate().then((data)=>{
                new Promise((resolve)=>{
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