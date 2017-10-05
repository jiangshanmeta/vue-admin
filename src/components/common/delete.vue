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
export default {
    name:"delete",
    props:{
        config:{
            type:String
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
                this.$axios.post(`${this.config}/${this.data.id}`).then(()=>{
                    this.$message("删除成功");
                    this.$emit('update');
                });
            }).catch(()=>{

            })   
        }
    },
}
</script>