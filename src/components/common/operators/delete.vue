<template>
    <el-button
        :type="type"
        :size="size"
        @click="handleClick"
    >
        {{triggerText}}
    </el-button>
</template>

<script>
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {doDeleteRequest} from "@/server/common.js"
import {logError} from "@/widget/utility.js"
export default {
    name:"delete",
    mixins:[
        _id_mixin,
    ],
    props:{
        data:{
            type:Object
        },
        uri:{
            type:String,
        },
        doDeleteRequest:{
            type:Function,
            default:doDeleteRequest
        },
        triggerText:{
            type:String,
            default:"删除",
        },
        type:{
            type:String,
            default:"danger",
        },
        size:{
            type:String,
            default:"small",
        }
    },
    methods:{
        handleClick(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                new Promise((resolve,reject)=>{
                    this.doDeleteRequest(resolve);
                }).then(()=>{
                    this.$emit('update');
                }).catch(logError);
            }).catch(logError);
        }
    },
}
</script>