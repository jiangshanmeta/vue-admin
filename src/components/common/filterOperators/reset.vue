<template>
    <el-button
        :type="type"
        :size="size"
        @click="handleClick"
    >
        重置
    </el-button>
</template>

<script>
export default{
    name:"reset",
    props:{
        filters:{
            type:Array,
            required:true,
        },
        data:{
            type:Object,
        },
        type:{
            type:String,
            default:"warning",
        },
        size:{
            type:String,
            default:""
        },
        btnText:{
            type:String,
            default:"重置",
        },
    },
    methods:{
        handleClick(){
            this.filters.forEach((item)=>{
                let defaultConfig = item.editorComponent.default;
                let value = typeof defaultConfig === 'function'?defaultConfig():defaultConfig;

                this.$set(item,'value',value);
            });
        },
    },
}
</script>