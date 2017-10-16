<template>
    <el-button
        v-if="config"
        type="danger"
        size="small"
        @click="handleClick"
    >
        删除
    </el-button>
</template>

<script>
import _computed_id_mixin from "./_computed_id_mixin.js";
export default {
    name:"delete",
    mixins:[
        _computed_id_mixin,
    ],
    props:{
        config:{
            type:Object,
            required:true,
        },
        data:{
            type:Object
        }
    },
    methods:{
        handleClick(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$axios.post(`${this.config.uri}/${this.id}`).then(()=>{
                    this.$message("删除成功");
                    this.$emit('update');
                });
            }).catch(()=>{

            })   
        }
    },
}
</script>