<template>
<span>
    <el-button
        @click="run"
        size="small"
    >
        香港记者
    </el-button>
    <el-dialog
        :visible.sync="dialogVisible"
    >
        {{data.name}} 跑得比香港记者还快
        <section slot="footer">
            <el-button @click="doRun" type="danger">
                确定
            </el-button>
        </section>
    </el-dialog>
</span>
</template>

<script>
export default{
    name:"run",
    data(){
        return {
            dialogVisible:false,
        }
    },
    props:{
        data:{
            type:Object,
            required:true,
        },
        index:{
            type:Number,
            required:true,
        },
    },
    methods:{
        run(){
            this.dialogVisible = true;
        },
        doRun(){
            this.dialogVisible = false;
            this.$emit('update')
        }
    }
}
</script>