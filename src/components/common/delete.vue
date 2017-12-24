<template>
    <el-button
        type="danger"
        size="small"
        @click="handleClick"
    >
        删除
    </el-button>
</template>

<script>
import _id_mixin from "@/mixins/common/_id_mixin.js"
import {doDeleteRequest} from "@/server/common.js"
import {noop} from "@/helpers/utility.js"
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
                    this.doDeleteRequest(this,resolve);
                }).then(()=>{
                    this.$message("删除成功");
                    this.$emit('update');
                }).catch((e)=>{
                    console.log(e);
                });
            }).catch(noop)   
        }
    },
}
</script>