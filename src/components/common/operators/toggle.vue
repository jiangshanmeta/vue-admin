<template>
    <el-button
        :type="typeMap[data[field]]"
        size="small"
        @click="handleClick"
    >
        {{textMap[data[field]]}}
    </el-button>
</template>

<script>
import {logError} from "@/widget/utility.js"
export default{
    name:"toggle",
    props:{
        data:{
            type:Object,
            required:true,
        },
        field:{
            type:String,
            required:true,
        },
        typeMap:{
            type:Object,
            required:true,
        },
        textMap:{
            type:Object,
            required:true,
        },
        handleToggle:{
            type:Function,
            default:function(){

            },
        }
    },
    methods:{
        handleClick(){
            new Promise((resolve,reject)=>{
                this.handleToggle(resolve,this.data);
            }).then(()=>{
                this.$emit('update');
            }).catch(logError)
        },
    },
}
</script>